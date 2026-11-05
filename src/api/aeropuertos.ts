// Llamadas a la API de aeropuertos.
import { API_URL } from './config';

export type Aeropuerto = { iata: string; icao: string; name: string };

// GET /api/aeropuertos: catalogo para validar la carga manual.
export async function fetchAeropuertos(): Promise<Aeropuerto[]> {
  const response = await fetch(`${API_URL}/api/aeropuertos`);

  if (!response.ok) {
    throw new Error('No se pudo cargar la lista de aeropuertos');
  }

  return response.json();
}
