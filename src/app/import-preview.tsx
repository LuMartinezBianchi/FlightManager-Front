import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, SectionList, Text, View } from 'react-native';

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
const sections: { title: string; data: Row[] }[] = [
  {
    title: 'CON ERRORES (2)',
    data: [
      { number: 'AR1673', route: 'BRC → AEP', detail: '31/02/2026 · 11:30 → 13:40', error: 'Fecha inválida' },
      { number: 'AR1801', route: 'EZE → ?', detail: '25 Ago 2026 · 09:00 → 10:40', error: 'Falta destino' },
    ],
  },
  {
    title: 'VÁLIDOS (10)',
    data: [
      { number: 'AR1204', route: 'EZE → COR', detail: '24 Ago 2026 · 07:15 → 09:05' },
      { number: 'AR1207', route: 'COR → MDZ', detail: '24 Ago 2026 · 10:10 → 11:35' },
      { number: 'AR1210', route: 'MDZ → EZE', detail: '24 Ago 2026 · 12:40 → 14:30' },
      { number: 'AR1672', route: 'AEP → BRC', detail: '26 Ago 2026 · 08:15 → 10:35' },
    ],
  },
];

// Agregar vuelos desde .xlsx, paso 2: revisar lo que se detecto en el archivo.
export default function ImportPreviewScreen() {
  return (
    <View style={common.screen}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.number}
        style={styles.list}
        ListHeaderComponent={
          <View>
            <Steps step={2} label="Revisar vuelos" />

            <View style={[common.card, styles.summary]}>
              <Text style={calendar.flightNumber}>vuelos_agosto.xlsx</Text>
              <View style={styles.chips}>
                <View style={styles.chipSpace}>
                  <Chip label="10 válidos" tone="green" />
                </View>
                <Chip label="2 con errores" tone="red" />
              </View>
            </View>
          </View>
        }
        ListFooterComponent={<Text style={styles.moreText}>y 6 vuelos válidos más</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.day}>{section.title}</Text>}
        renderItem={({ item }) => (
          <View style={[common.card, styles.importRow, item.error && styles.importRowError]}>
            <View
              style={[styles.importMark, { backgroundColor: item.error ? colors.redSoft : colors.greenSoft }]}
            >
              <Ionicons
                name={item.error ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                size={20}
                color={item.error ? colors.red : colors.green}
              />
            </View>

            <View style={styles.importText}>
              <Text style={calendar.flightNumber}>
                {item.number} · {item.route}
              </Text>
              <Text style={calendar.label}>{item.detail}</Text>
            </View>

            {item.error && <Chip label={item.error} tone="red" />}
          </View>
        )}
      />

      <View style={forms.bottomBar}>
        <Button label="Importar 10 vuelos" icon="cloud-upload-outline" href="/import-success" />
        <Pressable onPress={() => router.back()}>
          <Text style={styles.changeFile}>Cambiar archivo</Text>
        </Pressable>
      </View>
    </View>
  );
}
