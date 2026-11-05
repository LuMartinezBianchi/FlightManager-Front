import { type DiaProgramacion } from '@/api/programacion';
import { type Vuelo } from '@/api/vuelos';
import { type DutyType } from '@/data/flights';

// Estado de un día del calendario: es el mismo tipo de actividad que se lee al importar el .xlsx
export type DayStatus = DutyType;

// Estado de cada día con datos cargados, por fecha (YYYY-MM-DD). Los días que no están acá se muestran sin marcar.
// Un día con vuelos cargados es 'vuelo' (o 'deadhead' si así figura en la programación);
// el resto sale del tipo guardado para ese día (reserva, franco, sin asignar).
export function buildCalendar(vuelos: Vuelo[], dias: DiaProgramacion[]): { [date: string]: DayStatus } {
  const marks: { [date: string]: DayStatus } = {};
  for (const dia of dias) {
    marks[dia.date] = dia.type;
  }
  for (const vuelo of vuelos) {
    marks[vuelo.date] = marks[vuelo.date] === 'deadhead' ? 'deadhead' : 'vuelo';
  }
  return marks;
}
