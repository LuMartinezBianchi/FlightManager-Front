export type LogbookForm = { [key: string]: string };

// Formulario vacio: todos los campos arrancan en blanco
export const emptyLogbook: LogbookForm = {};

// Registro de ejemplo ya cargado, para editar
export const filledLogbook: LogbookForm = {
  anio: '2026', dia: '24', mes: '8', horaSalida: '07:15', desde: 'SAEZ', hasta: 'SACO', horaLlegada: '09:05',
  finalidadVuelo: 'Transporte de pasajeros',
  marca: 'B-738', matricula: 'LV-GKM', potencia: '28000', clase: 'Multi-1',
  travesiaDiaPiloto: '1:50', aterrizajes: '1',
};
