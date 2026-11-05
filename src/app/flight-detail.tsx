import { useLocalSearchParams } from 'expo-router';

import { FlightDetail } from '@/components/flight-detail';

// Detalle de un vuelo elegido en la lista de Vuelos. Recibe numero y fecha por parametro.
export default function FlightDetailScreen() {
  const { number, date } = useLocalSearchParams<{ number?: string; date?: string }>();
  return <FlightDetail number={number} date={date} />;
}
