import { FlightDetail } from '@/components/flight-detail';

// Pestaña Próx. vuelo: siempre muestra el proximo vuelo, sin importar el ultimo que se haya abierto.
// Si no queda ninguno por hacer, muestra un error.
export default function NextFlightScreen() {
  return <FlightDetail proximo />;
}
