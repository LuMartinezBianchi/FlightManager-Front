// Cliente HTTP del catalogo de aeropuertos cargados en la base.
import { API_URL } from './config';

export type Aeropuerto = { iata: string; icao: string; name: string };

export async function fetchAeropuertos(): Promise<Aeropuerto[]> {
  const response = await fetch(`${API_URL}/api/aeropuertos`);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'No se pudo cargar la lista de aeropuertos');
  }
  return response.json();
}
