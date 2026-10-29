import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchAeropuertos } from '@/api/aeropuertos';
import { deleteVuelo, updateVuelo, type Vuelo } from '@/api/vuelos';
import { colors } from '@/constants/theme';
import { useVuelos } from '@/hooks/use-vuelos';
import { styles } from '@/styles/edit-flight-styles';
import { type FormularioVuelo, validarVueloManual } from '@/utils/validar-vuelo-manual';

const alerta = { backgroundColor: colors.redSoft, borderRadius: 8, padding: 10, marginBottom: 8 };

// "2026-08-24" -> "24/08/2026", el formato que pide el formulario
function aFechaFormulario(iso: string) {
  const [anio, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${anio}`;
}

// Editar los datos de un vuelo. Recibe numero y fecha por parametro desde Modificar vuelos.
export default function EditFlightScreen() {
  const { number, date } = useLocalSearchParams<{ number?: string; date?: string }>();
  const { vuelos, loading } = useVuelos();
  const vuelo = vuelos.find((v) => v.number === number && v.date === date);

  if (!vuelo) {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>{loading ? 'Cargando vuelo…' : 'No se encontró el vuelo'}</Text>
      </View>
    );
  }

  // El formulario se arma una vez con los datos del vuelo; cambiar la clave reinicia el formulario
  return <EditForm key={`${vuelo.number}-${vuelo.date}`} vuelo={vuelo} />;
}

function EditForm({ vuelo }: { vuelo: Vuelo }) {
  const [form, setForm] = useState<FormularioVuelo>({
    number: vuelo.number,
    date: aFechaFormulario(vuelo.date),
    from: vuelo.from,
    to: vuelo.to,
    dep: vuelo.dep,
    arr: vuelo.arr,
    aircraft: vuelo.aircraft ?? '',
    crew: vuelo.crew ?? '',
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [iatasCargados, setIatasCargados] = useState<Set<string> | null>(null);
  const [errorCatalogo, setErrorCatalogo] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState<string | null>(null);
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    fetchAeropuertos()
      .then((aeropuertos) => setIatasCargados(new Set(aeropuertos.map((a) => a.iata))))
      .catch((error: Error) => setErrorCatalogo(error.message));
  }, []);

  function cambiar(campo: keyof FormularioVuelo, valor: string) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
    setErrores((actuales) => {
      const { [campo]: _resuelto, ...resto } = actuales;
      return resto;
    });
  }

  async function guardar() {
    const encontrados = validarVueloManual(form, iatasCargados);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;
    if (!iatasCargados) {
      setErrorGuardado('No se pudo validar los aeropuertos: revisá la conexión con la API');
      return;
    }

    setGuardando(true);
    setErrorGuardado(null);
    try {
      const [anio, mes, dia] = [form.date.slice(6, 10), form.date.slice(3, 5), form.date.slice(0, 2)];
      await updateVuelo(
        { number: vuelo.number, date: vuelo.date },
        {
          number: form.number.trim().toUpperCase(),
          date: `${anio}-${mes}-${dia}`,
          from: form.from.trim().toUpperCase(),
          to: form.to.trim().toUpperCase(),
          dep: form.dep.trim(),
          arr: form.arr.trim(),
          aircraft: form.aircraft.trim(),
          crew: form.crew.trim(),
        },
      );
      router.back();
    } catch (error) {
      setErrorGuardado((error as Error).message);
      setGuardando(false);
    }
  }

  async function eliminar() {
    setConfirmando(false);
    try {
      await deleteVuelo({ number: vuelo.number, date: vuelo.date });
      router.back();
    } catch (error) {
      setErrorGuardado((error as Error).message);
    }
  }

  // Campo con su mensaje de error debajo
  function campo(clave: keyof FormularioVuelo, etiqueta: string, mitad?: 'izquierda' | 'derecha', multilinea = false) {
    return (
      <View style={[styles.fieldBox, mitad === 'izquierda' && styles.halfLeft, mitad === 'derecha' && styles.halfRight]}>
        <Text style={styles.label}>{etiqueta}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => cambiar(clave, texto)}
          value={form[clave]}
          multiline={multilinea}
          autoCapitalize={clave === 'number' || clave === 'from' || clave === 'to' ? 'characters' : 'sentences'}
        />
        {errores[clave] && <Text style={{ color: colors.red, fontSize: 12, marginTop: 4 }}>{errores[clave]}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        {errorCatalogo && (
          <View style={alerta}>
            <Text style={{ color: colors.red }}>No se pudo cargar la lista de aeropuertos: {errorCatalogo}</Text>
          </View>
        )}

        <View style={styles.row}>
          {campo('number', 'N.º de vuelo', 'izquierda')}
          {campo('date', 'Fecha', 'derecha')}
        </View>
        <View style={styles.row}>
          {campo('from', 'Origen', 'izquierda')}
          {campo('to', 'Destino', 'derecha')}
        </View>
        <View style={styles.row}>
          {campo('dep', 'Salida (hora local)', 'izquierda')}
          {campo('arr', 'Llegada (hora local)', 'derecha')}
        </View>
        {campo('aircraft', 'Avión (opcional)')}
        {campo('crew', 'Tripulación (opcional)', undefined, true)}
      </View>

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        {errorGuardado && (
          <View style={alerta}>
            <Text style={{ color: colors.red }}>{errorGuardado}</Text>
          </View>
        )}
        <Pressable style={styles.primaryButton} onPress={guardar} disabled={guardando}>
          <Ionicons name="save-outline" size={20} color={colors.onAccent} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>{guardando ? 'Guardando…' : 'Guardar cambios'}</Text>
        </Pressable>
        <Pressable style={styles.dangerButton} onPress={() => setConfirmando(true)}>
          <Ionicons name="trash-outline" size={20} color={colors.red} style={styles.buttonIcon} />
          <Text style={styles.dangerButtonText}>Eliminar vuelo</Text>
        </Pressable>
      </SafeAreaView>

      <Modal visible={confirmando} animationType="fade" transparent onRequestClose={() => setConfirmando(false)}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="trash-outline" size={28} color={colors.red} />
            </View>
            <Text style={styles.dialogTitle}>¿Eliminar vuelo {vuelo.number}?</Text>
            <Text style={styles.dialogText}>
              Se quitará de Vuelos programados. Esta acción no se puede deshacer.
            </Text>

            <View style={styles.dialogButtons}>
              <Pressable style={styles.cancelButton} onPress={() => setConfirmando(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={eliminar}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
