// Llamadas a la API de meteorologia. El back consulta a NOAA; la app solo habla con el back.
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

// GET /api/meteo?icao=SAEZ,SACO: ultimo METAR de cada aeropuerto.
export async function fetchMeteo(icaos: string[]): Promise<Meteo[]> {
  const response = await fetch(`${API_URL}/api/meteo?icao=${icaos.join(',')}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar la meteorología');
  }

  return response.json();
}
