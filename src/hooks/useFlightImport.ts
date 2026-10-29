import { File } from 'expo-file-system';
import { useEffect, useState } from 'react';

import { type ParsedDuty } from '@/data/flights';
import { parseFlights } from '@/utils/parse-flights';

// Lee y parsea el .xlsx elegido en Agregar vuelos. Sigue el patron de la
// clase de Sensores: loading/error, y una bandera de cancelacion en el
// cleanup para no hacer setState si la pantalla ya se desmonto.
export function useFlightImport(uri?: string) {
  const [loading, setLoading] = useState(true);
  const [duties, setDuties] = useState<ParsedDuty[] | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setGlobalError(null);
      setDuties(null);

      if (!uri) {
        if (!cancelled) {
          setGlobalError('No se eligió ningún archivo.');
          setLoading(false);
        }
        return;
      }

      try {
        const base64 = await new File(uri).base64();
        const result = parseFlights(base64);
        if (cancelled) return;

        if ('globalError' in result) {
          setGlobalError(result.globalError);
        } else {
          setDuties(result.duties);
        }
      } catch {
        if (!cancelled) setGlobalError('No se pudo leer el archivo. Probá con otro.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [uri]);

  return { loading, duties, globalError };
}
