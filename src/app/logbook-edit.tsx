import { LogbookForm } from '@/components/logbook-form';
import { filledLogbook } from '@/data/logbook';

// Editar un registro ya cargado (se abre desde Libro de vuelo, en modo edicion).
export default function LogbookEditScreen() {
  return <LogbookForm initial={filledLogbook} buttonLabel="Guardar cambios" />;
}
