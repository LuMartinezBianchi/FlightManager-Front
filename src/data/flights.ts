export type Flight = {
  number: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  aircraft: string;
};

// Datos hardcodeados por ahora.
export const sections: { title: string; data: Flight[] }[] = [
  {
    title: 'LUN · 24 AGOSTO',
    data: [
      { number: 'AR1204', from: 'EZE', to: 'COR', dep: '07:15', arr: '09:05', duration: '1h 50m', aircraft: 'Boeing 737-800' },
      { number: 'AR1207', from: 'COR', to: 'MDZ', dep: '10:10', arr: '11:35', duration: '1h 25m', aircraft: 'Boeing 737-800' },
      { number: 'AR1210', from: 'MDZ', to: 'EZE', dep: '12:40', arr: '14:30', duration: '1h 50m', aircraft: 'Boeing 737-800' },
    ],
  },
  {
    title: 'MIÉ · 26 AGOSTO',
    data: [
      { number: 'AR1672', from: 'AEP', to: 'BRC', dep: '08:15', arr: '10:35', duration: '2h 20m', aircraft: 'Boeing 737 MAX 8' },
      { number: 'AR1673', from: 'BRC', to: 'AEP', dep: '11:30', arr: '13:40', duration: '2h 10m', aircraft: 'Boeing 737 MAX 8' },
    ],
  },
];

export const totalFlights = sections.reduce((n, s) => n + s.data.length, 0);
