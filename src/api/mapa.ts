// Cliente HTTP del mapa de un vuelo. La app no conoce la base: pide los datos a la API.
import type { Airport } from '@/components/flight-map';

// En el celular no sirve localhost: poner la IP de la PC en EXPO_PUBLIC_API_URL
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

const TIMEOUT_MS = 8000;

export type MapaVuelo = {
  number: string;
  origin: Airport;
  destination: Airport;
};

export async function fetchMapaVuelo(number: string): Promise<MapaVuelo> {
  // Sin timeout, una conexión colgada deja la pantalla en "Cargando" para siempre
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/api/vuelos/${encodeURIComponent(number)}/mapa`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error ?? 'No se pudo cargar el mapa');
    }
    return response.json();
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`Tiempo agotado conectando a ${API_URL}`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
