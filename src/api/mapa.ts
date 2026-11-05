// Llamadas a la API del mapa de un vuelo.
import type { Airport } from '@/components/flight-map';

import { API_URL } from './config';

export type MapaVuelo = {
  number: string;
  origin: Airport;
  destination: Airport;
};

// GET /api/vuelos/:number/mapa?fecha=AAAA-MM-DD: origen y destino con coordenadas.
// La fecha elige el vuelo exacto si el numero se repite en varios dias.
export async function fetchMapaVuelo(number: string, fecha?: string): Promise<MapaVuelo> {
  const query = fecha ? `?fecha=${encodeURIComponent(fecha)}` : '';
  const response = await fetch(`${API_URL}/api/vuelos/${encodeURIComponent(number)}/mapa${query}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el mapa');
  }

  return response.json();
}
