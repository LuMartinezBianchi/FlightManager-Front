import { LogbookForm } from '@/components/logbook-form';
import { emptyLogbook } from '@/data/logbook';

// Cargar un vuelo en el libro por primera vez (se abre desde Próx. vuelo).
export default function LogbookNewScreen() {
  return <LogbookForm initial={emptyLogbook} buttonLabel="Guardar registro" />;
}
