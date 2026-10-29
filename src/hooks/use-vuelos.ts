import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { fetchVuelos, type Vuelo } from '@/api/vuelos';
import { hasFlown } from '@/data/flight-log';

export type DiaVuelos = { title: string; data: Vuelo[] };

// Trae los vuelos cargados. Se vuelve a cargar cada vez que la pantalla gana foco,
// asi se ven los vuelos que se acaban de guardar desde el alta o la importacion.
export function useVuelos() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(() => {
    fetchVuelos()
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
    const delDia = grupos.get(vuelo.date);
    if (delDia) delDia.push(vuelo);
    else grupos.set(vuelo.date, [vuelo]);
  }
  return [...grupos].map(([fecha, data]) => ({ title: tituloDia(fecha), data }));
}

// Los vuelos que todavia no aterrizaron
export function vuelosFuturos(vuelos: Vuelo[]) {
  const ahora = new Date();
  return vuelos.filter((v) => !hasFlown(v, ahora));
}

// Un vuelo coincide con lo buscado por numero, ruta o dia (acepta "24/08", "24/08/2026" o "2026-08-24")
export function coincideBusqueda(vuelo: Vuelo, texto: string) {
  const buscado = texto.trim().toLowerCase();
  if (!buscado) return true;
  const [anio, mes, dia] = vuelo.date.split('-');
  const fecha = `${dia}/${mes}/${anio}`;
  return (vuelo.number + vuelo.from + vuelo.to).toLowerCase().includes(buscado) || fecha.includes(buscado) || vuelo.date.includes(buscado);
}

// La fecha se arma en hora local para que no caiga un dia antes
export function tituloDia(fecha: string) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return new Date(anio, mes - 1, dia)
    .toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'long' })
    .toUpperCase();
}

// Próximo vuelo: el primero que todavía no pasó (la API los ordena por fecha y hora). Undefined si no queda ninguno.
export function proximoVuelo(vuelos: Vuelo[]) {
  const ahora = new Date();
  return vuelos.find((v) => !hasFlown(v, ahora));
}
