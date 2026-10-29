import { read, utils } from 'xlsx';

import { type DutyType, type Flight, type ParsedDuty } from '@/data/flights';

// Parseo puro de un archivo .xlsx de programacion de vuelos o de un roster de
// tripulacion. No depende de React ni de nada de la UI.

type CellValue = string | number | Date | undefined;

type ColumnRole =
  | 'number'
  | 'date'
  | 'route'
  | 'origin'
  | 'destination'
  | 'departure'
  | 'arrival'
  | 'aircraft'
  | 'crew'
  | 'dutyType';

// Encabezados reconocidos, ya normalizados (ver normalizeHeader). Cubre la
// plantilla simple (N.o de vuelo, origen, destino, salida, llegada, avion) y
// el roster real (Vuelo, Ruta combinada, Inicio/Fin local).
const HEADER_ALIASES: Record<ColumnRole, string[]> = {
  number: ['n de vuelo', 'no de vuelo', 'nro de vuelo', 'nro vuelo', 'numero de vuelo', 'numero vuelo', 'vuelo', 'flight', 'flight number'],
  date: ['fecha', 'fecha de duty local', 'fecha de duty', 'date'],
  route: ['ruta', 'route'],
  origin: ['origen', 'origin', 'from'],
  destination: ['destino', 'destination', 'to'],
  departure: ['salida', 'hora salida', 'departure', 'inicio local', 'inicio'],
  arrival: ['llegada', 'hora llegada', 'arrival', 'fin local', 'fin'],
  aircraft: ['avion', 'aeronave', 'aircraft'],
  crew: ['tripulacion', 'tripulantes', 'crew'],
  dutyType: ['tipo de duty', 'duty type', 'tipo'],
};

const MONTH_NAMES: Record<string, number> = {
  ene: 1, jan: 1,
  feb: 2,
  mar: 3,
  abr: 4, apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  ago: 8, aug: 8,
  sep: 9, set: 9,
  oct: 10,
  nov: 11,
  dic: 12, dec: 12,
};

type CalendarDate = { year: number; month: number; day: number };

export type ParseFlightsResult = { duties: ParsedDuty[] } | { globalError: string };

export type DutyInput = {
  id: string;
  dateText: string;
  numberText: string;
  originText: string;
  destinationText: string;
  departureText: string;
  arrivalText: string;
  aircraftText: string;
  crewText: string;
  dutyType: DutyType;
};

// Quita tildes, pasa a minuscula y deja solo letras/numeros separados por un
// espacio, para que "N.º de vuelo" y "nro vuelo" matcheen el mismo alias.
export function normalizeHeader(header: string): string {
  return header
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function matchColumnRoles(headerRow: CellValue[]): Partial<Record<ColumnRole, number>> {
  const roles: Partial<Record<ColumnRole, number>> = {};
  headerRow.forEach((cell, index) => {
    if (typeof cell !== 'string') return;
    const normalized = normalizeHeader(cell);
    (Object.keys(HEADER_ALIASES) as ColumnRole[]).forEach((role) => {
      if (roles[role] !== undefined) return;
      if (HEADER_ALIASES[role].includes(normalized)) {
        roles[role] = index;
      }
    });
  });
  return roles;
}

function pad2(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

function excelSerialToCalendarDate(serial: number): CalendarDate {
  const utcDays = Math.floor(serial);
  const date = new Date(Date.UTC(1899, 11, 30) + utcDays * 86400000);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

function dateObjectToCalendarDate(date: Date): CalendarDate {
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

function isValidCalendarDate({ year, month, day }: CalendarDate): boolean {
  if (month < 1 || month > 12 || day < 1) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
}

function formatCalendarDate({ year, month, day }: CalendarDate): string {
  return `${pad2(day)}/${pad2(month)}/${year}`;
}

// Acepta "24/08/2026", "24-08-2026" y "24 Ago 2026" / "01-Feb-2026" (mes en
// espanol o ingles, 3 letras).
function parseDateText(raw: string): CalendarDate | null {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(\d{1,2})[\/\-. ]+([A-Za-zÀ-ſ]+|\d{1,2})[\/\-. ]+(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const monthRaw = match[2];
  const year = Number(match[3]);

  let month: number | undefined;
  if (/^\d+$/.test(monthRaw)) {
    month = Number(monthRaw);
  } else {
    const key = monthRaw
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .slice(0, 3);
    month = MONTH_NAMES[key];
  }
  if (!month) return null;

  const calendarDate = { year, month, day };
  return isValidCalendarDate(calendarDate) ? calendarDate : null;
}

// Convierte una celda de fecha (Date, numero serial o texto) al texto que
// despues valida parseDateText. Se usa solo al leer el archivo.
function extractDateFromCell(value: CellValue): string {
  if (value instanceof Date) return formatCalendarDate(dateObjectToCalendarDate(value));
  if (typeof value === 'number') return formatCalendarDate(excelSerialToCalendarDate(value));
  if (typeof value === 'string') return value.trim();
  return '';
}

function fractionToTime(fraction: number): string {
  const frac = ((fraction % 1) + 1) % 1;
  const totalMinutes = Math.round(frac * 24 * 60);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${pad2(hours)}:${pad2(minutes)}`;
}

// Convierte una celda de hora (Date, fraccion de dia o texto, incluido
// "01-Feb 07:00") al texto "HH:MM" que despues valida parseTimeText.
function extractTimeFromCell(value: CellValue): string {
  if (value instanceof Date) return `${pad2(value.getUTCHours())}:${pad2(value.getUTCMinutes())}`;
  if (typeof value === 'number') return fractionToTime(value);
  if (typeof value === 'string') {
    const match = value.trim().match(/(\d{1,2}):(\d{2})\s*$/);
    if (match) return `${match[1].padStart(2, '0')}:${match[2]}`;
  }
  return '';
}

function parseTimeText(raw: string): string | null {
  const match = raw.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return `${pad2(hours)}:${pad2(minutes)}`;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatDuration(totalMinutes: number): string {
  return `${Math.floor(totalMinutes / 60)}h ${pad2(totalMinutes % 60)}m`;
}

function isAirportCode(code: string): boolean {
  return /^[A-Z]{3}$/.test(code);
}

function splitRoute(raw: string): { origin: string; destination: string } | null {
  const parts = raw.split(/[-–—]/).map((part) => part.trim()).filter(Boolean);
  if (parts.length !== 2) return null;
  return { origin: parts[0], destination: parts[1] };
}

function stringValue(value: CellValue): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

// Mapea el texto crudo de "tipo de duty" (ej. "OP - (LS)", "STB - STBY",
// "R-OFF", "DH", "NDA") a uno de los 5 tipos que usa la app.
function mapDutyType(raw: string): DutyType {
  const normalized = normalizeHeader(raw);
  if (!normalized) return 'sin_asignar';
  if (normalized.includes('op')) return 'vuelo';
  if (normalized.includes('dh')) return 'deadhead';
  if (normalized.includes('stb')) return 'reserva';
  if (normalized.includes('off')) return 'franco';
  return 'sin_asignar';
}

// Valida y arma una fila. Es pura (sin side-effects) para poder reusarla
// tanto al leer el archivo como al guardar la edicion en el modal de
// Vista previa.
export function buildParsedDuty(input: DutyInput): ParsedDuty {
  const numberValue = input.numberText.trim();
  const origin = input.originText.trim().toUpperCase();
  const destination = input.destinationText.trim().toUpperCase();
  const aircraft = input.aircraftText.trim();
  const crew = input.crewText.trim();
  const departure = parseTimeText(input.departureText);
  const arrival = parseTimeText(input.arrivalText);
  const calendarDate = parseDateText(input.dateText);
  const date = calendarDate ? formatCalendarDate(calendarDate) : input.dateText.trim();

  // El tipo elegido manda: si es Vuelo o Deadhead, se exige y valida la
  // info de vuelo aunque este vacia (para que no se pueda guardar a medias).
  const hasFlightSignal = input.dutyType === 'vuelo' || input.dutyType === 'deadhead';

  if (!hasFlightSignal) {
    return {
      id: input.id,
      date,
      dutyType: input.dutyType,
      error: calendarDate ? undefined : 'Fecha inválida',
    };
  }

  let error: string | undefined;
  if (!numberValue) error = 'Falta número de vuelo';
  else if (!calendarDate) error = 'Fecha inválida';
  else if (!origin) error = 'Falta origen';
  else if (!destination) error = 'Falta destino';
  else if (!isAirportCode(origin)) error = 'Código de origen inválido';
  else if (!isAirportCode(destination)) error = 'Código de destino inválido';
  else if (origin === destination) error = 'Origen igual a destino';
  else if (!departure || !arrival) error = 'Hora inválida';
  else if (toMinutes(arrival) === toMinutes(departure)) error = 'Llegada incoherente';

  // Si la llegada da antes que la salida, es un vuelo que cruza la
  // medianoche (ej. sale 23:00, llega 01:05): suma un dia en vez de marcarlo
  // como error.
  const durationMinutes =
    departure && arrival ? (((toMinutes(arrival) - toMinutes(departure)) % 1440) + 1440) % 1440 : 0;
  const duration = !error && departure && arrival ? formatDuration(durationMinutes) : '';

  const flight: Flight = {
    number: numberValue,
    from: origin,
    to: destination,
    dep: departure ?? '',
    arr: arrival ?? '',
    duration,
    aircraft,
    crew: crew || undefined,
  };

  return { id: input.id, date, dutyType: input.dutyType, flight, error };
}

export function parseFlights(base64: string): ParseFlightsResult {
  let rows: CellValue[][];
  try {
    const workbook = read(base64, { type: 'base64', cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
    if (!sheet) return { globalError: 'El archivo no tiene ninguna hoja con datos.' };
    rows = utils.sheet_to_json<CellValue[]>(sheet, { header: 1, defval: '' });
  } catch {
    return { globalError: 'No se pudo leer el archivo. Verificá que sea un .xlsx válido.' };
  }

  if (rows.length === 0) return { duties: [] };

  const roles = matchColumnRoles(rows[0]);
  if (roles.date === undefined) {
    return { globalError: 'No se encontró la columna de fecha en el archivo.' };
  }

  const duties: ParsedDuty[] = [];

  rows.slice(1).forEach((row, index) => {
    const cell = (role: ColumnRole): CellValue => {
      const columnIndex = roles[role];
      return columnIndex === undefined ? undefined : row[columnIndex];
    };

    const dateText = extractDateFromCell(cell('date'));
    const routeRaw = cell('route');
    const route = typeof routeRaw === 'string' ? splitRoute(routeRaw) : null;
    const originText = route ? route.origin : stringValue(cell('origin'));
    const destinationText = route ? route.destination : stringValue(cell('destination'));
    const numberText = stringValue(cell('number'));
    const departureText = extractTimeFromCell(cell('departure'));
    const arrivalText = extractTimeFromCell(cell('arrival'));
    const aircraftText = stringValue(cell('aircraft'));
    const crewText = stringValue(cell('crew'));
    const dutyTypeRaw = stringValue(cell('dutyType'));
    const dutyType = roles.dutyType === undefined ? 'vuelo' : mapDutyType(dutyTypeRaw);

    const isEmptyRow =
      !dateText &&
      !numberText &&
      !originText &&
      !destinationText &&
      !departureText &&
      !arrivalText &&
      !aircraftText &&
      !crewText &&
      !dutyTypeRaw;
    if (isEmptyRow) return;

    duties.push(
      buildParsedDuty({
        id: `fila-${index + 2}`,
        dateText,
        numberText,
        originText,
        destinationText,
        departureText,
        arrivalText,
        aircraftText,
        crewText,
        dutyType,
      }),
    );
  });

  return { duties };
}
