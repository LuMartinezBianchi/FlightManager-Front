import { useEffect, useState } from 'react';

import { fetchAeropuertos } from '@/api/aeropuertos';
import { fetchMeteo, type Meteo } from '@/api/meteo';

export type MeteoAeropuerto = { iata: string; meteo: Meteo | null };

// Meteorologia de los aeropuertos de un vuelo (codigos IATA). Los codigos OACI salen del catalogo de aeropuertos.
// Un aeropuerto que no informa METAR queda con meteo null.
export function useMeteo(iatas: (string | undefined)[]) {
  const [datos, setDatos] = useState<MeteoAeropuerto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Como dependencia del efecto: un array nuevo en cada render no sirve
  const clave = iatas.filter(Boolean).join(',');

  useEffect(() => {
    if (!clave) return;
    const codigos = clave.split(',');
    let cancelled = false;

    async function cargar() {
      const aeropuertos = await fetchAeropuertos();
      const icaoPorIata = new Map(aeropuertos.map((a) => [a.iata, a.icao]));
      const icaos = codigos.map((iata) => icaoPorIata.get(iata)).filter((icao): icao is string => !!icao);
      const reportes = icaos.length > 0 ? await fetchMeteo(icaos) : [];
      if (cancelled) return;
      setDatos(codigos.map((iata) => ({ iata, meteo: reportes.find((r) => r.icao === icaoPorIata.get(iata)) ?? null })));
      setError(null);
    }

    cargar()
      .catch((err: Error) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [clave]);

  return { datos, loading, error };
}
