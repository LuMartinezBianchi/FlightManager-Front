import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { fetchProgramacion, type Vuelo } from '@/api/programacion';

export type DiaVuelos = { title: string; data: Vuelo[] };

// Trae los vuelos cargados. Se vuelve a cargar cada vez que la pantalla gana foco,
// asi se ven los vuelos que se acaban de guardar desde el alta o la importacion.
export function useProgramacion() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(() => {
    fetchProgramacion()
      .then((data) => {
        setVuelos(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(cargar);

  return { vuelos, loading, error };
}

// Agrupa los vuelos por dia, en el orden en que llegan (la API ya los ordena por fecha y hora)
export function agruparPorDia(vuelos: Vuelo[]): DiaVuelos[] {
  const grupos = new Map<string, Vuelo[]>();
  for (const vuelo of vuelos) {
    grupos.set(vuelo.date, [...(grupos.get(vuelo.date) ?? []), vuelo]);
  }
  return [...grupos].map(([fecha, data]) => ({ title: tituloDia(fecha), data }));
}

// La fecha se arma en hora local para que no caiga un dia antes
export function tituloDia(fecha: string) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return new Date(anio, mes - 1, dia)
    .toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'long' })
    .toUpperCase();
}
