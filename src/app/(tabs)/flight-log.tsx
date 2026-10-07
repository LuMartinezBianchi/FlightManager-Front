import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
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

  function toggle(number: string) {
    if (selected.includes(number)) {
      setSelected(selected.filter((n) => n !== number));
    } else {
      setSelected([...selected, number]);
    }
  }

  function toggleAll() {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(logRecords.map((r) => r.number));
    }
  }

  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <View style={[common.header, common.gutter]}>
        <View>
          <Text style={common.title}>Libro de vuelo</Text>
          <Text style={common.subtitle}>42 registros totales</Text>
        </View>

        <Pressable style={[styles.editToggle, editing && styles.editToggleOn]} onPress={() => setEditing(!editing)}>
          <Text style={[styles.editToggleText, editing && styles.editToggleTextOn]}>
            {editing ? 'Listo' : 'Editar'}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={logRecords}
        keyExtractor={(item) => item.number}
        style={styles.list}
        ListHeaderComponent={
          editing ? null : (
            <Pressable style={styles.selectRow} onPress={toggleAll}>
              <View style={styles.selectAll}>
                <Checkbox on={allSelected} />
                <Text style={styles.selectAllText}>Seleccionar todos</Text>
              </View>
              <Chip label={`${selected.length} seleccionados`} tone="cyan" />
            </Pressable>
          )
        }
        renderItem={({ item }) => {
          const on = !editing && selected.includes(item.number);
          return (
            <Pressable
              style={[common.card, styles.record, on && styles.recordOn]}
              onPress={editing ? undefined : () => toggle(item.number)}
            >
              {!editing && <Checkbox on={on} />}

              <View style={styles.recordInfo}>
                <View style={styles.recordTop}>
                  <Text style={styles.recordNumber}>{item.number}</Text>
                  <Text style={styles.recordDate}>{item.date}</Text>
                </View>
                <Text style={styles.recordRoute}>
                  {item.from} → {item.to}
                </Text>
              </View>

              <View style={styles.hours}>
                <Text style={styles.hoursValue}>{item.hours}</Text>
                <Text style={styles.hoursLabel}>HORAS</Text>
              </View>

              {editing && (
                <Pressable style={styles.pencil} onPress={() => router.push('/logbook-edit')}>
                  <Ionicons name="pencil" size={16} color={colors.cyan} />
                </Pressable>
              )}
            </Pressable>
          );
        }}
      />

      {!editing && (
        <View style={styles.exportBar}>
          <View>
            <Text style={styles.exportLabel}>{selected.length} vuelos seleccionados</Text>
            <Text style={styles.exportTotal}>{sumHours(selectedRecords.map((r) => r.hours))} hs totales</Text>
          </View>

          <Pressable style={styles.exportButton}>
            <Ionicons name="download-outline" size={20} color={colors.onAccent} style={styles.exportIcon} />
            <Text style={styles.exportButtonText}>Exportar</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
