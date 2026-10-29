import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, SectionList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchAeropuertos } from '@/api/aeropuertos';
import { fetchLibro, LibroError, saveHoja } from '@/api/libro';
import { fetchVuelos } from '@/api/vuelos';
import { hasFlown } from '@/data/flight-log';
import { SignaturePad } from '@/components/signature-pad';
import { colors } from '@/constants/theme';
import { prellenarDesdeVuelo, sections, validateLogbook, type Field } from '@/logbook/logbook-form';
import { styles } from '@/styles/logbook-entry-styles';

const errorText = { color: colors.red, fontSize: 12, marginTop: 4 };

// Formulario del libro de vuelo, con los campos de la hoja en su orden.
// Recibe numero y fecha del vuelo. Si ya tiene hoja guardada la muestra; si no, la arma con lo que se sabe del vuelo
// (fecha, aeropuertos en OACI y avion). Las horas de salida y llegada las completa el piloto.

export default function LogbookEntryScreen() {
  const { number, date } = useLocalSearchParams<{ number?: string; date?: string }>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  // Mientras se firma, la lista no debe scrollear
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const handleDrawingChange = useCallback((drawing: boolean) => setScrollEnabled(!drawing), []);

  useEffect(() => {
    // Sin numero y fecha no hay vuelo que cargar: se rechaza igual que cualquier otro error de carga
    const inicio = !number || !date ? Promise.reject(new Error('Falta elegir el vuelo')) : null;

    (inicio ?? Promise.resolve()).then(() => Promise.all([fetchVuelos(), fetchAeropuertos(), fetchLibro()])
      .then(([vuelos, aeropuertos, hojas]) => {
        const vuelo = vuelos.find((v) => v.number === number && v.date === date);
        if (!vuelo) throw new Error('No se encontró el vuelo');
        if (!hasFlown(vuelo, new Date())) throw new Error('El vuelo todavía no se realizó: no se puede cargar su libro de vuelo');

        const guardada = hojas.find((h) => h.number === number && h.date === date);
        if (guardada) {
          setEditing(true);
          setForm(guardada);
        } else {
          const icaoPorIata = Object.fromEntries(aeropuertos.map((a) => [a.iata, a.icao]));
          setForm(prellenarDesdeVuelo(vuelo, icaoPorIata));
        }
      }))
      .catch((err: Error) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, [number, date]);

  function change(key: string, text: string) {
    setForm({ ...form, [key]: text });
    if (errors[key]) {
      const { [key]: _resuelto, ...resto } = errors;
      setErrors(resto);
    }
  }

  async function save() {
    const encontrados = validateLogbook(form);
    setErrors(encontrados);
    setSaveError(null);
    if (Object.keys(encontrados).length > 0 || !number || !date) return;

    setSaving(true);
    try {
      await saveHoja({ number, date }, form);
      router.back();
    } catch (err) {
      if (err instanceof LibroError) setErrors(err.errores);
      setSaveError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function renderField(item: Field, index: number, total: number) {
    return (
      <View key={item.key} style={[styles.fieldBox, total > 1 && index === 0 ? styles.halfLeft : styles.halfRight]}>
        <Text style={styles.label}>
          {item.label}
          {item.required ? ' *' : ''}
        </Text>
        {item.kind === 'signature' ? (
          <SignaturePad
            value={form[item.key] ?? ''}
            onChange={(dataUrl) => change(item.key, dataUrl)}
            onDrawingChange={handleDrawingChange}
          />
        ) : (
          <TextInput
            style={styles.input}
            onChangeText={(text) => change(item.key, text)}
            value={form[item.key] ?? ''}
            placeholder={item.placeholder}
            keyboardType={item.keyboardType}
            autoCapitalize={item.autoCapitalize ?? 'sentences'}
          />
        )}
        {errors[item.key] && <Text style={errorText}>{errors[item.key]}</Text>}
      </View>
    );
  }

  if (loading || loadError) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: 'Cargar libro de vuelo' }} />
        <Text style={[styles.info, styles.form]}>{loading ? 'Cargando vuelo…' : loadError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: editing ? 'Editar registro' : 'Cargar libro de vuelo' }} />

      <SectionList
        sections={sections.map((section) => ({ title: section.title, data: section.rows }))}
        keyExtractor={(row) => row[0].key}
        style={styles.form}
        scrollEnabled={scrollEnabled}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {row.map((field, index) => renderField(field, index, row.length))}
            {/* Un campo de media fila deja la otra mitad vacia, para que mida lo mismo que los de a dos */}
            {row.length === 1 && row[0].half && <View style={styles.halfSpacer} />}
          </View>
        )}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        {saveError && <Text style={[errorText, styles.saveError]}>{saveError}</Text>}
        <Pressable style={[styles.primaryButton, saving && styles.primaryButtonDisabled]} onPress={save} disabled={saving}>
          <Ionicons name="save-outline" size={20} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>
            {saving ? 'Guardando…' : editing ? 'Guardar cambios' : 'Guardar registro'}
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
