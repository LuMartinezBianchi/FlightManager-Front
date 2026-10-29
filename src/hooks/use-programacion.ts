import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { fetchProgramacion, type DiaProgramacion } from '@/api/programacion';

// Trae el tipo de actividad de cada día cargado (para el calendario). Se vuelve a cargar cada vez que la pantalla gana foco,
// asi se ven los días que se acaban de importar.
export function useProgramacion() {
  const [dias, setDias] = useState<DiaProgramacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(() => {
    fetchProgramacion()
      .then((data) => {
        setDias(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(cargar);

  return { dias, loading, error };
}
