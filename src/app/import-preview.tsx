import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { Steps } from '@/components/steps';
import { colors } from '@/constants/theme';
import { calendar } from '@/styles/calendar';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

type Row = { number: string; route: string; detail: string; error?: string };

// Datos hardcodeados por ahora.
const errors: Row[] = [
  { number: 'AR1673', route: 'BRC → AEP', detail: '31/02/2026 · 11:30 → 13:40', error: 'Fecha inválida' },
  { number: 'AR1801', route: 'EZE → ?', detail: '25 Ago 2026 · 09:00 → 10:40', error: 'Falta destino' },
];

const valid: Row[] = [
  { number: 'AR1204', route: 'EZE → COR', detail: '24 Ago 2026 · 07:15 → 09:05' },
  { number: 'AR1207', route: 'COR → MDZ', detail: '24 Ago 2026 · 10:10 → 11:35' },
  { number: 'AR1210', route: 'MDZ → EZE', detail: '24 Ago 2026 · 12:40 → 14:30' },
  { number: 'AR1672', route: 'AEP → BRC', detail: '26 Ago 2026 · 08:15 → 10:35' },
];

function ImportRow({ row }: { row: Row }) {
  const hasError = !!row.error;

  return (
    <View style={[common.card, styles.importRow, hasError && styles.importRowError]}>
      <View style={[styles.pencil, { backgroundColor: hasError ? colors.redSoft : colors.greenSoft, borderWidth: 0 }]}>
        <Ionicons
          name={hasError ? 'alert-circle-outline' : 'checkmark-circle-outline'}
          size={20}
          color={hasError ? colors.red : colors.green}
        />
      </View>

      <View style={styles.importText}>
        <Text style={calendar.flightNumber}>
          {row.number} · {row.route}
        </Text>
        <Text style={calendar.label}>{row.detail}</Text>
        {hasError && <Text style={calendar.duration}>Tocá para corregir</Text>}
      </View>

      {row.error && <Chip label={row.error} tone="red" />}
    </View>
  );
}

// Agregar vuelos desde .xlsx, paso 2: revisar lo que se detecto en el archivo.
export default function ImportPreviewScreen() {
  return (
    <View style={common.screen}>
      <ScrollView contentContainerStyle={forms.content}>
        <Steps step={2} label="Revisar vuelos" />

        <View style={[common.card, styles.summary]}>
          <View style={styles.pencil}>
            <Ionicons name="grid-outline" size={20} color={colors.cyan} />
          </View>
          <View style={styles.summaryText}>
            <Text style={calendar.flightNumber}>vuelos_agosto.xlsx</Text>
            <View style={styles.chips}>
              <Chip label="10 válidos" tone="green" />
              <Chip label="2 con errores" tone="red" />
            </View>
          </View>
        </View>

        <Text style={styles.groupLabel}>CON ERRORES (2)</Text>
        {errors.map((row) => (
          <ImportRow key={row.number} row={row} />
        ))}

        <Text style={styles.groupLabel}>VÁLIDOS (10)</Text>
        {valid.map((row) => (
          <ImportRow key={row.number} row={row} />
        ))}
        <Text style={styles.moreText}>y 6 vuelos válidos más</Text>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={forms.bottomBar}>
        <Button label="Importar 10 vuelos" icon="cloud-upload-outline" onPress={() => router.push('/import-success')} />
        <Pressable onPress={() => router.back()}>
          <Text style={styles.changeFile}>Cambiar archivo</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
