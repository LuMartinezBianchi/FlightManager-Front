export type LogRecord = {
  number: string;
  date: string;
  from: string;
  to: string;
  hours: string; // formato h:mm
};

// Datos hardcodeados por ahora.
export const logRecords: LogRecord[] = [
  { number: 'AR1204', date: '24 Ago 2026', from: 'EZE', to: 'COR', hours: '1:50' },
  { number: 'AR1207', date: '24 Ago 2026', from: 'COR', to: 'EZE', hours: '1:50' },
  { number: 'AR0980', date: '22 Ago 2026', from: 'EZE', to: 'BRC', hours: '2:40' },
  { number: 'AR0981', date: '22 Ago 2026', from: 'BRC', to: 'EZE', hours: '2:35' },
  { number: 'AR1350', date: '18 Ago 2026', from: 'EZE', to: 'REL', hours: '2:10' },
  { number: 'AR1351', date: '18 Ago 2026', from: 'REL', to: 'EZE', hours: '2:05' },
];

// Suma horas en formato h:mm (ej: ['1:50', '2:40'] -> '4:30')
export function sumHours(list: string[]) {
  let minutes = 0;
  for (const hours of list) {
    const parts = hours.split(':');
    minutes = minutes + Number(parts[0]) * 60 + Number(parts[1]);
  }
  const mm = minutes % 60;
  return Math.floor(minutes / 60) + ':' + (mm < 10 ? '0' + mm : mm);
}
