import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from 'react-native';

import { createProgramacion } from '@/api/programacion';
import { createVuelos, toIsoDate } from '@/api/vuelos';
import { colors } from '@/constants/theme';
import { type DutyType, type ParsedDuty } from '@/data/flights';
import { useFlightImport } from '@/hooks/useFlightImport';
import { styles } from '@/styles/import-preview-styles';
import { buildParsedDuty } from '@/utils/parse-flights';

const DUTY_TYPES: DutyType[] = ['vuelo', 'deadhead', 'reserva', 'franco', 'sin_asignar'];

const DUTY_LABELS: Record<DutyType, string> = {
  vuelo: 'Vuelo',
  deadhead: 'Deadhead',
  reserva: 'Reserva',
  franco: 'Franco',
  sin_asignar: 'Sin asignar',
};

type EditForm = { number: string; date: string; from: string; to: string; dep: string; arr: string; aircraft: string; crew: string };

const EMPTY_FORM: EditForm = { number: '', date: '', from: '', to: '', dep: '', arr: '', aircraft: '', crew: '' };

// Agregar vuelos desde .xlsx, paso 2: revisar lo que se detecto en el archivo.
export default function ImportPreviewScreen() {
  const { uri, name } = useLocalSearchParams<{ uri?: string; name?: string }>();
  const { loading, duties, globalError } = useFlightImport(uri);

  const [flights, setFlights] = useState<ParsedDuty[]>([]);

  const [editing, setEditing] = useState<ParsedDuty | null>(null);
  const [form, setForm] = useState<EditForm>(EMPTY_FORM);
  const [dutyType, setDutyType] = useState<DutyType>('vuelo');
  const [deleting, setDeleting] = useState<ParsedDuty | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    // Sincroniza el resultado async del parseo (useFlightImport) con el
    // estado editable de la pantalla; es la unica fuente de verdad de ahi en mas.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (duties) setFlights(duties);
  }, [duties]);

  const grouped = useMemo(() => {
    const errorRows = flights.filter((duty) => duty.error);
    const validFlights = flights.filter((duty) => !duty.error && duty.flight);
    const otherDays = flights.filter((duty) => !duty.error && !duty.flight);
    return { errorRows, validFlights, otherDays };
  }, [flights]);

  const sections = useMemo(() => {
    const list: { title: string; data: ParsedDuty[] }[] = [];
    if (grouped.errorRows.length > 0) list.push({ title: `CON ERRORES (${grouped.errorRows.length})`, data: grouped.errorRows });
    if (grouped.validFlights.length > 0) list.push({ title: `VUELOS VÁLIDOS (${grouped.validFlights.length})`, data: grouped.validFlights });
    if (grouped.otherDays.length > 0) list.push({ title: `OTROS DÍAS (${grouped.otherDays.length})`, data: grouped.otherDays });
    return list;
  }, [grouped]);

  const canImport = grouped.validFlights.length > 0 && grouped.errorRows.length === 0;

  // Primero guarda el tipo de cada dia que no es un vuelo comun (deadhead, reserva, franco, sin asignar); si el dia ya
  // estaba, solo le cambia el tipo. Despues guarda todos los vuelos juntos: si uno falla (ej. vuelo repetido), la API no guarda ninguno.
  async function importar() {
    setImporting(true);
    setImportError(null);
    try {
      await createProgramacion(
        flights
          .filter((duty) => !duty.error && duty.dutyType !== 'vuelo')
          .map((duty) => ({ date: toIsoDate(duty.date), type: duty.dutyType })),
      );
      await createVuelos(
        grouped.validFlights.flatMap((duty) =>
          duty.flight
            ? [
                {
                  number: duty.flight.number,
                  date: toIsoDate(duty.date),
                  from: duty.flight.from,
                  to: duty.flight.to,
                  dep: duty.flight.dep,
                  arr: duty.flight.arr,
                  duration: duty.flight.duration,
                  aircraft: duty.flight.aircraft,
                  crew: duty.flight.crew,
                },
              ]
            : [],
        ),
      );
      router.push('/import-success');
    } catch (error) {
      setImportError((error as Error).message);
      setImporting(false);
    }
  }

  function openEdit(duty: ParsedDuty) {
    setEditing(duty);
    setDutyType(duty.dutyType);
    setSaveError(null);
    setForm({
      number: duty.flight?.number ?? '',
      date: duty.date,
      from: duty.flight?.from ?? '',
      to: duty.flight?.to ?? '',
      dep: duty.flight?.dep ?? '',
      arr: duty.flight?.arr ?? '',
      aircraft: duty.flight?.aircraft ?? '',
      crew: duty.flight?.crew ?? '',
    });
  }

  function saveEdit() {
    if (!editing) return;
    const updated = buildParsedDuty({
      id: editing.id,
      dateText: form.date,
      numberText: form.number,
      originText: form.from,
      destinationText: form.to,
      departureText: form.dep,
      arrivalText: form.arr,
      aircraftText: form.aircraft,
      crewText: form.crew,
      dutyType,
    });

    if (updated.error) {
      setSaveError(updated.error);
      return;
    }

    setSaveError(null);
    setFlights((current) => current.map((duty) => (duty.id === editing.id ? updated : duty)));
    setEditing(null);
  }

  const isFlightType = dutyType === 'vuelo' || dutyType === 'deadhead';

  function handleDutyTypeChange(type: DutyType) {
    setDutyType(type);
    setSaveError(null);
    // Si el dia deja de ser vuelo/deadhead, los campos de vuelo se ocultan:
    // tambien los vaciamos para que no quede un vuelo "fantasma" guardado.
    if (type !== 'vuelo' && type !== 'deadhead') {
      setForm((f) => ({ ...f, number: '', from: '', to: '', dep: '', arr: '', aircraft: '', crew: '' }));
    }
  }

  function confirmDelete() {
    if (!deleting) return;
    setFlights((current) => current.filter((duty) => duty.id !== deleting.id));
    setDeleting(null);
    setEditing(null);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.cyan} size="large" />
        <Text style={styles.centerText}>Leyendo el archivo...</Text>
      </View>
    );
  }

  if (globalError) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.red} />
        <Text style={styles.centerTitle}>No se pudo leer el archivo</Text>
        <Text style={styles.centerText}>{globalError}</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryButtonText}>Elegir otro archivo</Text>
        </Pressable>
      </View>
    );
  }

  if (flights.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="document-outline" size={40} color={colors.textFaint} />
        <Text style={styles.centerTitle}>El archivo no tiene filas</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryButtonText}>Elegir otro archivo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.summary}>
              <Text style={styles.fileName}>{name ?? 'archivo.xlsx'}</Text>
              <View style={styles.chips}>
                <View style={styles.greenChip}>
                  <Text style={styles.greenChipText}>{grouped.validFlights.length} válidos</Text>
                </View>
                <View style={styles.redChip}>
                  <Text style={styles.redChipText}>{grouped.errorRows.length} con errores</Text>
                </View>
              </View>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => <Text style={styles.group}>{section.title}</Text>}
        renderItem={({ item }) => (
          <Pressable style={[styles.row, item.error && styles.rowError]} onPress={() => openEdit(item)}>
            <View style={styles.dutyBadge}>
              <Text style={styles.dutyBadgeText}>{DUTY_LABELS[item.dutyType]}</Text>
            </View>

            {item.flight ? (
              <View style={styles.rowBody}>
                <View style={styles.mark}>
                  <Ionicons
                    name={item.error ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                    size={20}
                    color={item.error ? colors.red : colors.green}
                  />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>
                    {item.flight.number} · {item.flight.from} → {item.flight.to}
                  </Text>
                  <Text style={styles.rowDetail}>
                    {item.date} · {item.flight.dep} → {item.flight.arr}
                  </Text>
                  {item.error && <Text style={styles.rowHint}>Tocá para corregir</Text>}
                </View>
                {item.error && (
                  <View style={styles.redChip}>
                    <Text style={styles.redChipText}>{item.error}</Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.rowBody}>
                <Text style={styles.rowDetail}>{item.date}</Text>
                {item.error && (
                  <View style={styles.redChip}>
                    <Text style={styles.redChipText}>{item.error}</Text>
                  </View>
                )}
              </View>
            )}
          </Pressable>
        )}
      />

      <View style={styles.bottomBar}>
        {importError && <Text style={{ color: colors.red, marginBottom: 8 }}>{importError}</Text>}
        <Pressable
          style={[styles.primaryButton, (!canImport || importing) && styles.primaryButtonDisabled]}
          disabled={!canImport || importing}
          onPress={importar}
        >
          <Ionicons name="cloud-upload-outline" size={20} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>{importing ? 'Importando…' : 'Importar vuelos'}</Text>
        </Pressable>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.changeFile}>Cambiar archivo</Text>
        </Pressable>
      </View>

      <Modal visible={!!editing} animationType="slide" transparent onRequestClose={() => setEditing(null)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalCard}>
            <ScrollView>
              <View style={styles.dutyChips}>
                {DUTY_TYPES.map((type) => (
                  <Pressable
                    key={type}
                    style={[styles.dutyChip, dutyType === type && styles.dutyChipActive]}
                    onPress={() => handleDutyTypeChange(type)}
                  >
                    <Text style={[styles.dutyChipText, dutyType === type && styles.dutyChipTextActive]}>
                      {DUTY_LABELS[type]}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.fieldBox}>
                <Text style={styles.label}>Fecha</Text>
                <TextInput style={styles.input} value={form.date} onChangeText={(v) => setForm((f) => ({ ...f, date: v }))} />
              </View>

              {isFlightType && (
                <>
                  <View style={styles.fieldRow}>
                    <View style={[styles.fieldBox, styles.halfLeft]}>
                      <Text style={styles.label}>N.º de vuelo</Text>
                      <TextInput style={styles.input} value={form.number} onChangeText={(v) => setForm((f) => ({ ...f, number: v }))} />
                    </View>
                    <View style={[styles.fieldBox, styles.halfRight]}>
                      <Text style={styles.label}>Avión</Text>
                      <TextInput style={styles.input} value={form.aircraft} onChangeText={(v) => setForm((f) => ({ ...f, aircraft: v }))} />
                    </View>
                  </View>

                  <View style={styles.fieldRow}>
                    <View style={[styles.fieldBox, styles.halfLeft]}>
                      <Text style={styles.label}>Origen</Text>
                      <TextInput style={styles.input} value={form.from} onChangeText={(v) => setForm((f) => ({ ...f, from: v }))} />
                    </View>
                    <View style={[styles.fieldBox, styles.halfRight]}>
                      <Text style={styles.label}>Destino</Text>
                      <TextInput style={styles.input} value={form.to} onChangeText={(v) => setForm((f) => ({ ...f, to: v }))} />
                    </View>
                  </View>

                  <View style={styles.fieldRow}>
                    <View style={[styles.fieldBox, styles.halfLeft]}>
                      <Text style={styles.label}>Salida (hora local)</Text>
                      <TextInput style={styles.input} value={form.dep} onChangeText={(v) => setForm((f) => ({ ...f, dep: v }))} />
                    </View>
                    <View style={[styles.fieldBox, styles.halfRight]}>
                      <Text style={styles.label}>Llegada (hora local)</Text>
                      <TextInput style={styles.input} value={form.arr} onChangeText={(v) => setForm((f) => ({ ...f, arr: v }))} />
                    </View>
                  </View>

                  <View style={styles.fieldBox}>
                    <Text style={styles.label}>Tripulación</Text>
                    <TextInput
                      style={[styles.input, styles.multilineInput]}
                      value={form.crew}
                      onChangeText={(v) => setForm((f) => ({ ...f, crew: v }))}
                      multiline
                      placeholder="Un nombre por línea"
                    />
                  </View>
                </>
              )}
            </ScrollView>

            {saveError && <Text style={styles.saveError}>{saveError}</Text>}

            <View style={styles.modalButtons}>
              <Pressable style={styles.primaryButton} onPress={saveEdit}>
                <Ionicons name="save-outline" size={20} color={colors.onAccent} style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Guardar cambios</Text>
              </Pressable>
              <Pressable style={styles.dangerButton} onPress={() => setDeleting(editing)}>
                <Ionicons name="trash-outline" size={20} color={colors.red} style={styles.buttonIcon} />
                <Text style={styles.dangerButtonText}>Eliminar fila</Text>
              </Pressable>
              <Pressable onPress={() => setEditing(null)}>
                <Text style={styles.changeFile}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={!!deleting} animationType="fade" transparent onRequestClose={() => setDeleting(null)}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="trash-outline" size={28} color={colors.red} />
            </View>
            <Text style={styles.dialogTitle}>¿Eliminar esta fila?</Text>
            <Text style={styles.dialogText}>Se va a quitar de la vista previa. Esta acción no se puede deshacer.</Text>

            <View style={styles.dialogButtons}>
              <Pressable style={styles.cancelButton} onPress={() => setDeleting(null)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={confirmDelete}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
