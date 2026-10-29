// Cliente HTTP de la programación de vuelos (los cargados por el parser o a mano).
import { API_URL } from './config';

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
  // Tripulación: un nombre por línea
  crew?: string | null;
  source: 'parser' | 'manual';
};

// Lo que se manda a la API para guardar un vuelo nuevo. Avion y duracion son opcionales
export type NuevoVuelo = Omit<Vuelo, 'duration' | 'aircraft'> & { duration?: string; aircraft?: string };

export async function fetchProgramacion(): Promise<Vuelo[]> {
  const response = await fetch(`${API_URL}/api/programacion`);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'No se pudo cargar la programación');
  }
  return response.json();
}

// Convierte "24/08/2026" (como se escribe o como sale del parser) a "2026-08-24"
export function toIsoDate(texto: string): string {
  const match = texto.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return texto.trim();
  const [, dia, mes, anio] = match;
  return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

// Arma el mensaje de error que devuelve la API: numeros repetidos, la fila y el motivo, o el error general
function errorDeRespuesta(body: {
  error?: string;
  duplicados?: string[];
  errores?: { fila: number; mensaje: string }[];
}): Error {
  if (body.duplicados) {
    return new Error(`Ya existen estos vuelos: ${body.duplicados.join(', ')}`);
  }
  if (body.errores) {
    const detalle = body.errores.map((e) => `Fila ${e.fila}: ${e.mensaje}`);
    return new Error(detalle.join('\n'));
  }
  return new Error(body.error ?? 'No se pudo guardar');
}

// Guarda los vuelos todos juntos: si uno falla, la API no guarda ninguno.
export async function createProgramacion(vuelos: NuevoVuelo[]): Promise<void> {
  const response = await fetch(`${API_URL}/api/programacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vuelos),
  });
  if (!response.ok) throw errorDeRespuesta(await response.json());
}

// Reemplaza el vuelo identificado por numero + fecha original con los datos nuevos
export async function updateProgramacion(original: { number: string; date: string }, vuelo: NuevoVuelo): Promise<void> {
  const url = `${API_URL}/api/programacion/${encodeURIComponent(original.number)}/${original.date}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vuelo),
  });
  if (!response.ok) throw errorDeRespuesta(await response.json());
}

// Borra el vuelo identificado por numero + fecha
export async function deleteProgramacion(vuelo: { number: string; date: string }): Promise<void> {
  const url = `${API_URL}/api/programacion/${encodeURIComponent(vuelo.number)}/${vuelo.date}`;
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw errorDeRespuesta(await response.json());
}
