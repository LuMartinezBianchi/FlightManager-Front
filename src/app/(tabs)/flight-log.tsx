import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/chip';
import { colors } from '@/constants/theme';
import { logRecords, sumHours } from '@/data/flight-log';
import { common } from '@/styles/common';
import { flightLog as styles } from '@/styles/flight-log';

function Checkbox({ on }: { on: boolean }) {
  return (
    <View style={[styles.checkbox, on && styles.checkboxOn]}>
      {on && <Ionicons name="checkmark" size={16} color={colors.onAccent} />}
    </View>
  );
}

// Pantalla 4: Libro de vuelo. Se seleccionan registros para exportar,
// o se pasa al modo edicion para modificar uno.
export default function FlightLogScreen() {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(['AR1204', 'AR1207', 'AR0980']);

  const allSelected = selected.length === logRecords.length;
  const selectedRecords = logRecords.filter((r) => selected.includes(r.number));

  const toggle = (number: string) =>
    setSelected(selected.includes(number) ? selected.filter((n) => n !== number) : [...selected, number]);

  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <View style={[common.header, common.gutter]}>
        <View>
          <Text style={common.title}>Libro de vuelo</Text>
          <Text style={common.subtitle}>42 registros totales</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.editButton, editing && styles.editButtonOn, pressed && common.pressed]}
          onPress={() => setEditing(!editing)}
        >
          {!editing && <Ionicons name="pencil" size={16} color={colors.text} />}
          <Text style={[styles.editText, editing && styles.editTextOn]}>{editing ? 'Listo' : 'Editar'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {!editing && (
          <Pressable
            style={styles.selectRow}
            onPress={() => setSelected(allSelected ? [] : logRecords.map((r) => r.number))}
          >
            <View style={styles.selectAll}>
              <Checkbox on={allSelected} />
              <Text style={styles.selectAllText}>Seleccionar todos</Text>
            </View>
            <Chip label={`${selected.length} seleccionados`} tone="cyan" />
          </Pressable>
        )}

        {logRecords.map((record) => {
          const on = !editing && selected.includes(record.number);
          return (
            <Pressable
              key={record.number}
              style={[common.card, styles.record, on && styles.recordOn]}
              onPress={() => !editing && toggle(record.number)}
            >
              {!editing && <Checkbox on={on} />}

              <View style={styles.recordInfo}>
                <View style={styles.recordTop}>
                  <Text style={styles.recordNumber}>{record.number}</Text>
                  <Text style={styles.recordDate}>{record.date}</Text>
                </View>
                <Text style={styles.recordRoute}>
                  {record.from} → {record.to}
                </Text>
              </View>

              <View style={styles.hours}>
                <Text style={styles.hoursValue}>{record.hours}</Text>
                <Text style={styles.hoursLabel}>HORAS</Text>
              </View>

              {editing && (
                <Pressable
                  style={styles.pencil}
                  onPress={() => router.push({ pathname: '/logbook-entry', params: { mode: 'edit' } })}
                >
                  <Ionicons name="pencil" size={16} color={colors.cyan} />
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {!editing && (
        <View style={styles.exportBar}>
          <View>
            <Text style={styles.exportLabel}>{selected.length} vuelos seleccionados</Text>
            <Text style={styles.exportTotal}>{sumHours(selectedRecords.map((r) => r.hours))} hs totales</Text>
          </View>

          <Pressable style={({ pressed }) => [styles.exportButton, pressed && common.pressed]}>
            <Ionicons name="download-outline" size={20} color={colors.onAccent} />
            <Text style={styles.exportButtonText}>Exportar</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
