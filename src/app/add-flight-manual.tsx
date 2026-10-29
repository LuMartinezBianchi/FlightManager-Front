import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchAeropuertos } from '@/api/aeropuertos';
import { createVuelos, toIsoDate } from '@/api/vuelos';
import { colors } from '@/constants/theme';
import { styles } from '@/styles/add-flight-manual-styles';
import { type FormularioVuelo, validarVueloManual } from '@/utils/validar-vuelo-manual';

const FORMULARIO_VACIO: FormularioVuelo = {
  number: '',
  date: '',
  from: '',
  to: '',
  dep: '',
  arr: '',
  aircraft: '',
  crew: '',
};

const alerta = {
  backgroundColor: colors.redSoft,
  borderRadius: 8,
  padding: 10,
  marginBottom: 8,
};

// Agregar un vuelo cargando los datos a mano.
export default function AddFlightManualScreen() {
  const [form, setForm] = useState<FormularioVuelo>(FORMULARIO_VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [iatasCargados, setIatasCargados] = useState<Set<string> | null>(null);
  const [errorCatalogo, setErrorCatalogo] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState<string | null>(null);

  // Los aeropuertos se validan contra la base: se cargan una vez al abrir la pantalla
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
      await createVuelos([
        {
          number: form.number.trim().toUpperCase(),
          date: toIsoDate(form.date),
          from: form.from.trim().toUpperCase(),
          to: form.to.trim().toUpperCase(),
          dep: form.dep.trim(),
          arr: form.arr.trim(),
          aircraft: form.aircraft.trim(),
          crew: form.crew.trim(),
        },
      ]);
      router.back();
    } catch (error) {
      setErrorGuardado((error as Error).message);
      setGuardando(false);
    }
  }

  // Campo con su mensaje de error debajo
  function campo(
    clave: keyof FormularioVuelo,
    etiqueta: string,
    opciones: { placeholder?: string; mitad?: 'izquierda' | 'derecha'; multilinea?: boolean } = {},
  ) {
    const estiloCaja: StyleProp<ViewStyle> = opciones.mitad
      ? [styles.fieldBox, opciones.mitad === 'izquierda' ? styles.halfLeft : styles.halfRight]
      : styles.fieldBox;
    return (
      <View style={estiloCaja}>
        <Text style={styles.label}>{etiqueta}</Text>
        <TextInput
          style={[styles.input, opciones.multilinea && styles.multilineInput]}
          onChangeText={(texto) => cambiar(clave, texto)}
          value={form[clave]}
          placeholder={opciones.placeholder}
          multiline={opciones.multilinea}
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
            <Text style={{ color: colors.red }}>
              No se pudo cargar la lista de aeropuertos: {errorCatalogo}
            </Text>
          </View>
        )}

        <View style={styles.row}>
          {campo('number', 'N.º de vuelo', { placeholder: 'Ej: AR1204', mitad: 'izquierda' })}
          {campo('date', 'Fecha', { placeholder: 'DD/MM/AAAA', mitad: 'derecha' })}
        </View>

        <View style={styles.row}>
          {campo('from', 'Origen', { placeholder: 'IATA', mitad: 'izquierda' })}
          {campo('to', 'Destino', { placeholder: 'IATA', mitad: 'derecha' })}
        </View>

        <View style={styles.row}>
          {campo('dep', 'Salida (hora local)', { placeholder: '--:--', mitad: 'izquierda' })}
          {campo('arr', 'Llegada (hora local)', { placeholder: '--:--', mitad: 'derecha' })}
        </View>

        {campo('aircraft', 'Avión (opcional)', { placeholder: 'Ej: Boeing 737-800' })}
        {campo('crew', 'Tripulación (opcional)', { placeholder: 'Un nombre por línea', multilinea: true })}
      </View>

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        {errorGuardado && (
          <View style={alerta}>
            <Text style={{ color: colors.red }}>{errorGuardado}</Text>
          </View>
        )}
        <Pressable
          style={[styles.primaryButton, guardando && { opacity: 0.5 }]}
          onPress={guardar}
          disabled={guardando}
        >
          <Ionicons name="save-outline" size={20} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>{guardando ? 'Guardando…' : 'Guardar vuelo'}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
