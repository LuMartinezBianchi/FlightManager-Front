import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { exportLibro } from '@/api/libro';
import { hasFlown, sumHours } from '@/data/flight-log';
import { claveVuelo, useLibro } from '@/hooks/use-libro';
import { tituloDia, useVuelos } from '@/hooks/use-vuelos';
import { estadoLibro, type EstadoLibro } from '@/logbook/logbook-form';
import { styles } from '@/styles/flight-log-styles';

const STATUS_STYLE = {
  rojo: { card: styles.recordRed, text: styles.statusRed, label: 'Sin completar' },
  amarillo: { card: styles.recordAmber, text: styles.statusAmber, label: 'Datos obligatorios' },
  verde: { card: styles.recordGreen, text: styles.statusGreen, label: 'Completo' },
} satisfies { [key in EstadoLibro]: object };

// Pantalla 4: Libro de vuelo. Una tarjeta por cada vuelo que ya paso, con el borde segun lo completa que esta su hoja:
// rojo (sin hoja), amarillo (solo lo obligatorio) o verde (hoja completa y firmada).
// Se seleccionan registros para exportar, o se pasa al modo edicion para cargar/modificar uno.

export default function FlightLogScreen() {
  const { vuelos, loading, error } = useVuelos();
  const { hojas } = useLibro();
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);

  // Solo los vuelos que ya aterrizaron a la hora en la que se mira la pantalla, los mas recientes primero
  const records = useMemo(() => {
    const ahora = new Date();
    const hojaPorVuelo = new Map(hojas.map((h) => [claveVuelo({ number: h.number, date: h.date }), h]));
    return vuelos
      .filter((v) => hasFlown(v, ahora))
      .reverse()
      .map((vuelo) => ({ vuelo, key: claveVuelo(vuelo), status: estadoLibro(hojaPorVuelo.get(claveVuelo(vuelo))) }));
  }, [vuelos, hojas]);

  // Solo se pueden exportar los vuelos con la hoja completa (verde)
  const selectable = records.filter((r) => r.status === 'verde');
  const selectedKeys = selected.filter((key) => selectable.some((r) => r.key === key));
  const allSelected = selectable.length > 0 && selectedKeys.length === selectable.length;
  const selectedRecords = selectable.filter((r) => selectedKeys.includes(r.key));

  function toggle(key: string) {
    if (selected.includes(key)) {
      setSelected(selected.filter((k) => k !== key));
    } else {
      setSelected([...selected, key]);
    }
  }

  const canExport = selectedRecords.length > 0 && !exporting;

  async function exportar() {
    setExporting(true);
    try {
      await exportLibro(selectedRecords.map((r) => ({ number: r.vuelo.number, date: r.vuelo.date })));
    } catch (err) {
      Alert.alert('No se pudo exportar', (err as Error).message);
    } finally {
      setExporting(false);
    }
  }

  function toggleAll() {
    setSelected(allSelected ? [] : selectable.map((r) => r.key));
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={[styles.header, styles.gutter]}>
        <View>
          <Text style={styles.title}>Libro de vuelo</Text>
          <Text style={styles.subtitle}>{records.length} vuelos realizados</Text>
        </View>

        <Pressable style={[styles.editToggle, editing && styles.editToggleOn]} onPress={() => setEditing(!editing)}>
          <Text style={[styles.editToggleText, editing && styles.editToggleTextOn]}>
            {editing ? 'Listo' : 'Editar'}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.key}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.subtitle}>
            {loading ? 'Cargando vuelos…' : (error ?? 'Todavía no hay vuelos realizados')}
          </Text>
        }
        ListHeaderComponent={
          editing || selectable.length === 0 ? undefined : (
            <Pressable style={styles.selectRow} onPress={toggleAll}>
              <View style={styles.selectAll}>
                <View style={[styles.checkbox, allSelected && styles.checkboxOn]}>
                  {allSelected && <Ionicons name="checkmark" size={16} style={styles.checkboxOn} />}
                </View>
                <Text style={styles.selectAllText}>Seleccionar todos</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{selectedKeys.length} seleccionados</Text>
              </View>
            </Pressable>
          )
        }
        renderItem={({ item }) => {
          const { vuelo, status } = item;
          const tone = STATUS_STYLE[status];
          const canSelect = status === 'verde';
          const on = !editing && canSelect && selected.includes(item.key);
          return (
            <Pressable
              style={[styles.record, tone.card, on && styles.recordOn]}
              onPress={editing || !canSelect ? undefined : () => toggle(item.key)}
            >
              {!editing && (
                <View style={[styles.checkbox, on && styles.checkboxOn, !canSelect && styles.checkboxDisabled]}>
                  {on && <Ionicons name="checkmark" size={16} style={styles.checkboxOn} />}
                </View>
              )}

              <View style={styles.recordInfo}>
                <View style={styles.recordTop}>
                  <Text style={styles.recordNumber}>{vuelo.number}</Text>
                  <Text style={styles.recordDate}>{tituloDia(vuelo.date)}</Text>
                </View>
                <Text style={styles.recordRoute}>
                  {vuelo.from} → {vuelo.to}
                </Text>
                <Text style={[styles.recordStatus, tone.text]}>{tone.label}</Text>
              </View>

              <View style={styles.hours}>
                <Text style={styles.hoursValue}>{sumHours([vuelo.duration])}</Text>
                <Text style={styles.hoursLabel}>HORAS</Text>
              </View>

              {editing && (
                <Pressable
                  style={styles.pencil}
                  onPress={() =>
                    router.push({ pathname: '/logbook-entry', params: { number: vuelo.number, date: vuelo.date } })
                  }
                >
                  <Ionicons name="pencil" size={16} style={styles.pencilIcon} />
                </Pressable>
              )}
            </Pressable>
          );
        }}
      />

      {!editing && (
        <View style={styles.exportBar}>
          <View>
            <Text style={styles.exportLabel}>{selectedKeys.length} vuelos seleccionados</Text>
            <Text style={styles.exportTotal}>{sumHours(selectedRecords.map((r) => r.vuelo.duration))} hs totales</Text>
          </View>

          {/* Solo se puede exportar con vuelos verdes seleccionados; si no, el boton se ve apagado */}
          <Pressable
            style={[styles.exportButton, !canExport && styles.exportButtonDisabled]}
            onPress={exportar}
            disabled={!canExport}
          >
            <Ionicons name="download-outline" size={20} style={styles.exportIcon} />
            <Text style={styles.exportButtonText}>{exporting ? 'Exportando…' : 'Exportar'}</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
