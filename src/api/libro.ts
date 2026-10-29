// Cliente HTTP del libro de vuelo: una hoja por vuelo, con los mismos keys del formulario.
import { API_URL } from './config';

// number + date identifican el vuelo; el resto son los campos del formulario (todo texto)
export type HojaLibro = Record<string, string>;

export async function fetchLibro(): Promise<HojaLibro[]> {
  const response = await fetch(`${API_URL}/api/libro`);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'No se pudo cargar el libro de vuelo');
  }
  return response.json();
}

// Guarda (o reemplaza) la hoja del vuelo. Si la API rechaza campos, devuelve un mensaje por campo.
export class LibroError extends Error {
  errores: Record<string, string>;
  constructor(mensaje: string, errores: Record<string, string> = {}) {
    super(mensaje);
    this.errores = errores;
  }
}

export async function saveHoja(vuelo: { number: string; date: string }, hoja: HojaLibro): Promise<void> {
  const url = `${API_URL}/api/libro/${encodeURIComponent(vuelo.number)}/${vuelo.date}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hoja),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new LibroError(body.error ?? 'No se pudo guardar el libro de vuelo', body.errores);
  }
}
