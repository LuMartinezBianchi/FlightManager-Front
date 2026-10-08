export type LogbookForm = { [key: string]: string };

// Datos que ya se conocen del vuelo (vienen del programa de vuelos)
export const emptyLogbook: LogbookForm = {
  plate: '', type: 'Boeing 737-800', operator: 'Aerolíneas Argentinas',
  date: '24/08/2026', number: 'AR1204', flightType: 'Regular', rules: '',
  from: 'SAEZ · Ezeiza', to: 'SACO · Córdoba', alternate: '',
  blockOff: '', takeoff: '', landing: '', blockOn: '', flightTime: '', blockTime: '',
  condition: '', landings: '', passengers: '', cargo: '',
  fuelTakeoff: '', fuelLanding: '', fuelAdded: '',
  captain: 'Martín Fernández', captainLicense: 'ATPL 48213',
  copilot: 'Laura Castillo', copilotLicense: '', cabin: 'Roberto Paz, Sofía García',
  notes: '', signature: '',
};

// Registro ya cargado, para editar
export const filledLogbook: LogbookForm = {
  plate: 'LV-GKM', type: 'Boeing 737-800', operator: 'Aerolíneas Argentinas',
  date: '24/08/2026', number: 'AR1204', flightType: 'Regular', rules: 'IFR',
  from: 'SAEZ · Ezeiza', to: 'SACO · Córdoba', alternate: 'SAMR',
  blockOff: '10:05', takeoff: '10:15', landing: '12:05', blockOn: '12:15', flightTime: '1:50', blockTime: '2:10',
  condition: 'Diurno', landings: '1', passengers: '148', cargo: '1.250',
  fuelTakeoff: '12.400', fuelLanding: '6.100', fuelAdded: '8.200',
  captain: 'Martín Fernández', captainLicense: 'ATPL 48213',
  copilot: 'Laura Castillo', copilotLicense: 'CPL 51877', cabin: 'Roberto Paz, Sofía García',
  notes: 'Sin novedades.', signature: 'Martín Fernández · firmado',
};
