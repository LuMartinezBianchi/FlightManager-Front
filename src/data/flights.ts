// Tipos de los vuelos que se importan desde un .xlsx o se cargan a mano.
export type Flight = {
  number: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  aircraft: string;
  crew?: string;
};

export type DutyType = 'vuelo' | 'deadhead' | 'reserva' | 'franco' | 'sin_asignar';

// Una fila del archivo importado. Si trae datos de vuelo (numero y/o ruta)
// se completa `flight`; si no, es un dia sin vuelo y `flight` queda vacio.
export type ParsedDuty = {
  id: string;
  date: string; // "dd/mm/yyyy"
  dutyType: DutyType;
  flight?: Flight;
  error?: string;
};
