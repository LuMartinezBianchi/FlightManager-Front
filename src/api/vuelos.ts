// Llamadas a la API de vuelos (los cargados por el parser o a mano).
import { API_URL } from './config';
import { fetchConSesion } from './sesion';

export type Vuelo = {
  number: string;
  // YYYY-MM-DD
  date: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  aircraft: string | null;
  crew?: string | null;
};

// Lo que se manda para guardar un vuelo nuevo. Avion y duracion son opcionales.
export type NuevoVuelo = Omit<Vuelo, 'duration' | 'aircraft'> & { duration?: string; aircraft?: string };

// Arma el mensaje cuando el back rechaza el guardado: vuelos repetidos, fila con su motivo, o el error general.
async function mensajeDeError(response: Response): Promise<Error> {
  const body = await response.json();

  if (body.duplicados) {
    return new Error(`Ya existen estos vuelos: ${body.duplicados.join(', ')}`);
  }
  if (body.errores) {
    return new Error(body.errores.map((e: { fila: number; mensaje: string }) => `Fila ${e.fila}: ${e.mensaje}`).join('\n'));
  }
  return new Error(body.error ?? 'No se pudo guardar');
}

// GET /api/vuelos: lista de vuelos.
export async function fetchVuelos(): Promise<Vuelo[]> {
  const response = await fetchConSesion(`${API_URL}/api/vuelos`);

  if (!response.ok) {
    throw new Error('No se pudo cargar los vuelos');
  }

  return response.json();
}

// POST /api/vuelos: guarda todos los vuelos juntos (si uno falla, no se guarda ninguno).
export async function createVuelos(vuelos: NuevoVuelo[]): Promise<void> {
  const response = await fetchConSesion(`${API_URL}/api/vuelos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vuelos),
  });

  if (!response.ok) throw await mensajeDeError(response);
}

// PUT /api/vuelos/:number/:fecha: reemplaza el vuelo identificado por numero + fecha original.
export async function updateVuelo(original: { number: string; date: string }, vuelo: NuevoVuelo): Promise<void> {
  const response = await fetchConSesion(`${API_URL}/api/vuelos/${encodeURIComponent(original.number)}/${original.date}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vuelo),
  });

  if (!response.ok) throw await mensajeDeError(response);
}

// DELETE /api/vuelos/:number/:fecha: borra el vuelo identificado por numero + fecha.
export async function deleteVuelo(vuelo: { number: string; date: string }): Promise<void> {
  const response = await fetchConSesion(`${API_URL}/api/vuelos/${encodeURIComponent(vuelo.number)}/${vuelo.date}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw await mensajeDeError(response);
}
