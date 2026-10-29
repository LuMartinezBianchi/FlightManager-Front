// Reglas de la carga manual de un vuelo. Devuelve un mensaje por campo con error (vacio si todo esta bien).
// Los aeropuertos se revisan contra el catalogo de la base, no solo por formato.

export type FormularioVuelo = {
  number: string;
  date: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  aircraft: string;
  crew: string;
};

const NUMERO = /^[A-Z0-9]{3,8}$/;
const FECHA = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const IATA = /^[A-Z]{3}$/;

function fechaValida(texto: string) {
  const match = texto.match(FECHA);
  if (!match) return false;
  const dia = Number(match[1]);
  const mes = Number(match[2]);
  const anio = Number(match[3]);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getDate() === dia && fecha.getMonth() === mes - 1;
}

// Si el catalogo todavia no llego (null), solo se revisa el formato
function revisarAeropuerto(codigo: string, iatasCargados: Set<string> | null) {
  if (!codigo) return 'Ingresá el código IATA';
  if (!IATA.test(codigo)) return 'Usá 3 letras (ej: EZE)';
  if (iatasCargados && !iatasCargados.has(codigo)) return `${codigo} no está cargado en la base de aeropuertos`;
  return null;
}

export function validarVueloManual(form: FormularioVuelo, iatasCargados: Set<string> | null): Record<string, string> {
  const errores: Record<string, string> = {};

  const number = form.number.trim().toUpperCase();
  if (!number) errores.number = 'Ingresá el número de vuelo';
  else if (!NUMERO.test(number)) errores.number = 'Número inválido (ej: AR1204)';

  const date = form.date.trim();
  if (!date) errores.date = 'Ingresá la fecha';
  else if (!fechaValida(date)) errores.date = 'Fecha inválida (DD/MM/AAAA)';

  const from = form.from.trim().toUpperCase();
  const to = form.to.trim().toUpperCase();
  const errorOrigen = revisarAeropuerto(from, iatasCargados);
  const errorDestino = revisarAeropuerto(to, iatasCargados);
  if (errorOrigen) errores.from = errorOrigen;
  if (errorDestino) errores.to = errorDestino;
  if (!errorOrigen && !errorDestino && from === to) errores.to = 'El destino no puede ser igual al origen';

  const dep = form.dep.trim();
  const arr = form.arr.trim();
  if (!dep) errores.dep = 'Ingresá la hora de salida';
  else if (!HORA.test(dep)) errores.dep = 'Usá el formato HH:mm (ej: 07:15)';
  if (!arr) errores.arr = 'Ingresá la hora de llegada';
  else if (!HORA.test(arr)) errores.arr = 'Usá el formato HH:mm (ej: 09:05)';
  if (!errores.dep && !errores.arr && dep === arr) errores.arr = 'La llegada no puede ser igual a la salida';

  // Avion y tripulacion son opcionales: no se validan
  return errores;
}
