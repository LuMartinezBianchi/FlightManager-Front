// Cliente HTTP de la meteorologia de aeropuertos (METAR). La API consulta a NOAA y la app solo habla con la API.
import { API_URL } from './config';

export type Meteo = {
  icao: string;
  temp: number | null;
  windDir: number | 'VRB' | null;
  windSpeed: number | null;
  // Millas terrestres, como en el METAR (puede ser "6+")
  visibility: string | null;
  pressure: number | null;
  cloudCover: string | null;
  flightCategory: string | null;
  // ISO
  observedAt: string;
  raw: string;
};

export async function fetchMeteo(icaos: string[]): Promise<Meteo[]> {
  const response = await fetch(`${API_URL}/api/meteo?icao=${icaos.join(',')}`);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'No se pudo cargar la meteorología');
  }
  return response.json();
}
