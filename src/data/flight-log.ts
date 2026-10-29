// Duracion de un vuelo en minutos. Acepta "1h 50m" (como la guarda la API) o "1:50".
export function durationToMinutes(duration: string) {
  const conLetras = duration.match(/^(\d+)h\s*(\d+)m$/);
  if (conLetras) return Number(conLetras[1]) * 60 + Number(conLetras[2]);
  const conDosPuntos = duration.match(/^(\d+):(\d{2})$/);
  if (conDosPuntos) return Number(conDosPuntos[1]) * 60 + Number(conDosPuntos[2]);
  return 0;
}

// Minutos en formato h:mm (ej: 110 -> '1:50')
export function formatMinutes(minutes: number) {
  const mm = minutes % 60;
  return Math.floor(minutes / 60) + ':' + (mm < 10 ? '0' + mm : mm);
}

// Suma duraciones (ej: ['1h 50m', '2:40'] -> '4:30')
export function sumHours(list: string[]) {
  return formatMinutes(list.reduce((total, duration) => total + durationToMinutes(duration), 0));
}

// Un vuelo ya paso cuando su llegada es anterior a ahora (si llega antes de salir, aterriza al dia siguiente)
export function hasFlown(flight: { date: string; dep: string; arr: string }, now: Date) {
  const [anio, mes, dia] = flight.date.split('-').map(Number);
  const [depH, depM] = flight.dep.split(':').map(Number);
  const [arrH, arrM] = (flight.arr || flight.dep).split(':').map(Number);
  const llegada = new Date(anio, mes - 1, dia, arrH, arrM);
  if (arrH * 60 + arrM < depH * 60 + depM) llegada.setDate(llegada.getDate() + 1);
  return llegada <= now;
}
