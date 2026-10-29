// Campos del libro de vuelo, en el orden de la hoja, con sus reglas de validacion.
// Vive fuera de src/app/ porque es logica del formulario, no una pantalla.
import type { KeyboardTypeOptions } from 'react-native';

export type Field = {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'characters' | 'none';
  // 'signature' muestra el pad de firma en lugar de un campo de texto
  kind?: 'signature';
  // Un campo solo en su fila ocupa media fila, igual que los que van de a dos
  half?: boolean;
  check?: (value: string) => string | null;
};

export type Section = { title: string; rows: Field[][] };

const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const TIEMPO = /^\d{1,2}:[0-5]\d$/;
const OACI = /^[A-Z]{4}$/;
const MATRICULA = /^[A-Z0-9-]{4,10}$/;
const MARCA = /^[A-Z0-9-]{2,10}$/;

const ANIO_ACTUAL = new Date().getFullYear();

function entero(min: number, max: number) {
  return (value: string) => {
    if (!/^\d+$/.test(value)) return 'Solo números enteros';
    const n = Number(value);
    return n >= min && n <= max ? null : `Debe estar entre ${min} y ${max}`;
  };
}

function hora(value: string) {
  return HORA.test(value) ? null : 'Usá el formato HH:mm (ej: 07:15)';
}

// Tiempo en h:mm; no puede superar 24 horas
function tiempo(value: string) {
  if (!TIEMPO.test(value)) return 'Usá el formato h:mm (ej: 1:50)';
  const [horas, minutos] = value.split(':').map(Number);
  return horas * 60 + minutos <= 24 * 60 ? null : 'Un tiempo no puede pasar de 24 horas';
}

function oaci(value: string) {
  return OACI.test(value) ? null : 'Código OACI de 4 letras (ej: SAEZ)';
}

function texto(min: number, max: number) {
  return (value: string) =>
    value.length >= min && value.length <= max ? null : `Entre ${min} y ${max} caracteres`;
}

// Campos que el piloto tiene que completar. Los tiempos y la firma son opcionales para guardar, pero si se cargan tienen que ser validos.
export const sections: Section[] = [
  {
    title: 'Itinerario',
    rows: [
      [
        { key: 'anio', label: 'Año', required: true, keyboardType: 'number-pad', check: entero(2000, ANIO_ACTUAL) },
        { key: 'dia', label: 'Día', required: true, keyboardType: 'number-pad', check: entero(1, 31) },
      ],
      [
        { key: 'mes', label: 'Mes', required: true, keyboardType: 'number-pad', check: entero(1, 12) },
        { key: 'horaSalida', label: 'Hora de salida', placeholder: '--:--', required: true, keyboardType: 'numbers-and-punctuation', check: hora },
      ],
      [
        { key: 'desde', label: 'Desde (OACI)', placeholder: 'SAEZ', required: true, autoCapitalize: 'characters', check: oaci },
        { key: 'hasta', label: 'Hasta (OACI)', placeholder: 'SACO', required: true, autoCapitalize: 'characters', check: oaci },
      ],
      [{ key: 'horaLlegada', label: 'Hora de llegada', placeholder: '--:--', required: true, half: true, keyboardType: 'numbers-and-punctuation', check: hora }],
    ],
  },
  {
    title: 'Finalidad del vuelo',
    rows: [[{ key: 'finalidadVuelo', label: 'Finalidad del vuelo', required: true, check: texto(3, 60) }]],
  },
  {
    title: 'Aeronaves utilizadas',
    rows: [
      [
        { key: 'marca', label: 'Marca', placeholder: 'Ej: B-738', required: true, autoCapitalize: 'characters', check: (v) => (MARCA.test(v) ? null : 'Marca inválida (ej: B-738)') },
        { key: 'matricula', label: 'Matrícula', placeholder: 'Ej: LV-GKM', required: true, autoCapitalize: 'characters', check: (v) => (MATRICULA.test(v) ? null : 'Matrícula inválida (ej: LV-GKM)') },
      ],
      [
        { key: 'potencia', label: 'Potencia (lbs)', placeholder: '0', required: true, keyboardType: 'number-pad', check: entero(1, 999999) },
        { key: 'clase', label: 'Clase', placeholder: 'Ej: Multi-1', required: true, check: texto(2, 30) },
      ],
    ],
  },
  {
    title: 'Tiempos de vuelo',
    rows: [
      [
        { key: 'sobreDiaPiloto', label: 'Sobre aeródromo, día (piloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
        { key: 'sobreDiaCopiloto', label: 'Sobre aeródromo, día (copiloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
      ],
      [
        { key: 'sobreNochePiloto', label: 'Sobre aeródromo, noche (piloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
        { key: 'sobreNocheCopiloto', label: 'Sobre aeródromo, noche (copiloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
      ],
      [
        { key: 'travesiaDiaPiloto', label: 'Travesía, día (piloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
        { key: 'travesiaDiaCopiloto', label: 'Travesía, día (copiloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
      ],
      [
        { key: 'travesiaNochePiloto', label: 'Travesía, noche (piloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
        { key: 'travesiaNocheCopiloto', label: 'Travesía, noche (copiloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
      ],
    ],
  },
  {
    title: 'Navegador o mecánico de abordo',
    rows: [[{ key: 'navegadorMecanico', label: 'Cantidad', placeholder: '0', keyboardType: 'number-pad', check: entero(0, 99) }]],
  },
  {
    title: 'Aterrizajes',
    rows: [[{ key: 'aterrizajes', label: 'Cantidad', placeholder: '0', keyboardType: 'number-pad', check: entero(0, 99) }]],
  },
  {
    title: 'Instrucción de vuelo',
    rows: [[{ key: 'instruccion', label: 'Tiempo', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo }]],
  },
  {
    title: 'Multimotor',
    rows: [[{ key: 'multimotor', label: 'Tiempo', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo }]],
  },
  {
    title: 'Reactor',
    rows: [[{ key: 'reactor', label: 'Tiempo', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo }]],
  },
  {
    title: 'Turbohélice',
    rows: [[{ key: 'turbohelice', label: 'Tiempo', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo }]],
  },
  {
    title: 'Adiestrador terrestre',
    rows: [[{ key: 'adiestradorTerrestre', label: 'Tiempo', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo }]],
  },
  {
    title: 'Discriminación de tiempos de vuelo',
    rows: [
      [
        { key: 'instrumentoRealPiloto', label: 'Vuelo por instrumentos, real (piloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
        { key: 'instrumentoRealCopiloto', label: 'Vuelo por instrumentos, real (copiloto)', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo },
      ],
      [{ key: 'instrumentoCapota', label: 'Vuelo por instrumentos, capota', placeholder: 'h:mm', keyboardType: 'numbers-and-punctuation', check: tiempo }],
    ],
  },
  {
    title: 'Firma',
    rows: [[{ key: 'firma', label: 'Firma del titular', kind: 'signature' }]],
  },
];

// Valida el formulario completo y devuelve un mensaje por campo con error (vacio si todo esta bien)
export function validateLogbook(form: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const section of sections) {
    for (const row of section.rows) {
      for (const field of row) {
        const value = (form[field.key] ?? '').trim();
        if (!value) {
          if (field.required) errors[field.key] = 'Campo obligatorio';
          continue;
        }
        const error = field.check?.(value);
        if (error) errors[field.key] = error;
      }
    }
  }

  // Fecha: que exista en el calendario y no sea futura
  if (!errors.anio && !errors.mes && !errors.dia) {
    const anio = Number(form.anio);
    const mes = Number(form.mes);
    const dia = Number(form.dia);
    const fecha = new Date(anio, mes - 1, dia);
    if (fecha.getDate() !== dia || fecha.getMonth() !== mes - 1) {
      errors.dia = 'La fecha no existe';
    } else if (fecha > new Date()) {
      errors.dia = 'La fecha no puede ser futura';
    }
  }

  if (!errors.horaSalida && !errors.horaLlegada && form.horaSalida === form.horaLlegada) {
    errors.horaLlegada = 'La llegada no puede ser igual a la salida';
  }

  if (!errors.desde && !errors.hasta && form.desde === form.hasta) {
    errors.hasta = 'El destino no puede ser igual al origen';
  }

  return errors;
}

// ---------- Estado de la hoja de cada vuelo ----------

// rojo: sin hoja guardada · amarillo: solo lo obligatorio · verde: hoja completa
export type EstadoLibro = 'rojo' | 'amarillo' | 'verde';

const vacio = (hoja: Record<string, string>, key: string) => !(hoja[key] ?? '').trim();
const algunoCargado = (hoja: Record<string, string>, keys: string[]) => keys.some((key) => !vacio(hoja, key));

const TRAVESIA_O_SOBRE = [
  'sobreDiaPiloto', 'sobreDiaCopiloto', 'sobreNochePiloto', 'sobreNocheCopiloto',
  'travesiaDiaPiloto', 'travesiaDiaCopiloto', 'travesiaNochePiloto', 'travesiaNocheCopiloto',
];
const DISCRIMINACION = ['instrumentoRealPiloto', 'instrumentoRealCopiloto', 'instrumentoCapota'];

export function estadoLibro(hoja: Record<string, string> | undefined): EstadoLibro {
  if (!hoja) return 'rojo';

  const obligatorios = sections.flatMap((section) => section.rows.flat()).filter((field) => field.required);
  if (obligatorios.some((field) => vacio(hoja, field.key))) return 'rojo';

  const completa =
    algunoCargado(hoja, TRAVESIA_O_SOBRE) &&
    !vacio(hoja, 'aterrizajes') &&
    algunoCargado(hoja, DISCRIMINACION) &&
    !vacio(hoja, 'firma');
  return completa ? 'verde' : 'amarillo';
}

// ---------- Pre-llenado desde el vuelo ----------

type DatosVuelo = { date: string; from: string; to: string; aircraft: string | null };

// Completa lo que se sabe del vuelo. Las horas de salida y llegada las carga el piloto.
// icaoPorIata sale del catalogo de aeropuertos.
export function prellenarDesdeVuelo(vuelo: DatosVuelo, icaoPorIata: Record<string, string>): Record<string, string> {
  const [anio, mes, dia] = vuelo.date.split('-').map(Number);
  const form: Record<string, string> = {
    anio: String(anio),
    mes: String(mes),
    dia: String(dia),
    desde: icaoPorIata[vuelo.from] ?? '',
    hasta: icaoPorIata[vuelo.to] ?? '',
  };

  // El avion viene como texto libre: solo se usa si tiene forma de matricula (LV-GKM) o de marca (B-738)
  const avion = (vuelo.aircraft ?? '').trim().toUpperCase();
  if (/^[A-Z]{2}-[A-Z0-9]{3}$/.test(avion)) form.matricula = avion;
  else if (MARCA.test(avion)) form.marca = avion;

  return form;
}
