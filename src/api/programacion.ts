// Cliente HTTP de la programación: el tipo de actividad de cada día (vuelo, deadhead, reserva, franco, sin asignar).
// Los datos de cada vuelo están en api/vuelos.ts.
import { type DutyType } from '@/data/flights';

import { API_URL } from './config';

export type DiaProgramacion = {
  // YYYY-MM-DD
  date: string;
  type: DutyType;
};

export async function fetchProgramacion(): Promise<DiaProgramacion[]> {
  const response = await fetch(`${API_URL}/api/programacion`);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'No se pudo cargar la programación');
  }
  return response.json();
}

// Guarda el tipo de cada día. Si el día ya estaba cargado, le cambia el tipo.
export async function createProgramacion(dias: DiaProgramacion[]): Promise<void> {
  const response = await fetch(`${API_URL}/api/programacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dias),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'No se pudo guardar la programación');
  }
}
