// Tipos de los vuelos que se importan desde un .xlsx o se cargan a mano.
// Los datos los guarda la API, no este archivo.
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

// Tipo de actividad de una fila importada desde un .xlsx (vuelo propiamente
// dicho, o un dia sin vuelo como reserva, franco o sin asignar).
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
