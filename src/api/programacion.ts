// Llamadas a la API de programacion: el tipo de actividad de cada dia.
// Los datos de cada vuelo estan en api/vuelos.ts.
import { type DutyType } from '@/data/flights';

import { API_URL } from './config';
import { fetchConSesion } from './sesion';

export type DiaProgramacion = {
  // YYYY-MM-DD
  date: string;
  type: DutyType;
};

// GET /api/programacion: lista de dias con su tipo.
export async function fetchProgramacion(): Promise<DiaProgramacion[]> {
  const response = await fetchConSesion(`${API_URL}/api/programacion`);

  if (!response.ok) {
    throw new Error('No se pudo cargar la programación');
  }

  return response.json();
}

// POST /api/programacion: guarda el tipo de cada dia (si el dia ya existe, le cambia el tipo).
export async function createProgramacion(dias: DiaProgramacion[]): Promise<void> {
  const response = await fetchConSesion(`${API_URL}/api/programacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dias),
  });

  if (!response.ok) {
    throw new Error('No se pudo guardar la programación');
  }
}
