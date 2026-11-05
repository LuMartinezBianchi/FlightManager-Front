import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { fetchLibro, type HojaLibro } from '@/api/libro';

// Trae las hojas del libro guardadas. Se vuelve a cargar cada vez que la pantalla gana foco,
// asi el color de cada vuelo se actualiza apenas se guarda su hoja.
export function useLibro() {
  const [hojas, setHojas] = useState<HojaLibro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(() => {
    fetchLibro()
      .then((data) => {
        setHojas(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(cargar);

  return { hojas, loading, error };
}

// Clave de un vuelo: numero + fecha (el mismo numero puede repetirse otro dia)
export const claveVuelo = (vuelo: { number: string; date: string }) => `${vuelo.number}|${vuelo.date}`;
