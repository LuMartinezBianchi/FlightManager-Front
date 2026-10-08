import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, SectionList, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { styles } from '@/styles/import-preview-styles';

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
    <View style={styles.screen}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.number}
        style={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.steps}>
              <View style={[styles.step, styles.stepOn]} />
              <View style={[styles.step, styles.stepOn]} />
              <View style={styles.step} />
            </View>
            <Text style={styles.stepLabel}>Paso 2 de 3 · Revisar vuelos</Text>

            <View style={styles.summary}>
              <Text style={styles.fileName}>vuelos_agosto.xlsx</Text>
              <View style={styles.chips}>
                <View style={styles.greenChip}>
                  <Text style={styles.greenChipText}>10 válidos</Text>
                </View>
                <View style={styles.redChip}>
                  <Text style={styles.redChipText}>2 con errores</Text>
                </View>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={<Text style={styles.more}>y 6 vuelos válidos más</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.group}>{section.title}</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, item.error && styles.rowError]}
            onPress={item.error ? () => router.push('/edit-flight') : undefined}
          >
            <View style={[styles.mark, { backgroundColor: item.error ? colors.redSoft : colors.greenSoft }]}>
              <Ionicons
                name={item.error ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                size={20}
                color={item.error ? colors.red : colors.green}
              />
            </View>

            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>
                {item.number} · {item.route}
              </Text>
              <Text style={styles.rowDetail}>{item.detail}</Text>
              {item.error && <Text style={styles.rowHint}>Tocá para corregir</Text>}
            </View>

            {item.error && (
              <View style={styles.redChip}>
                <Text style={styles.redChipText}>{item.error}</Text>
              </View>
            )}
          </Pressable>
        )}
      />

      <View style={styles.bottomBar}>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/import-success')}>
          <Ionicons name="cloud-upload-outline" size={20} color={colors.onAccent} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Importar 10 vuelos</Text>
        </Pressable>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.changeFile}>Cambiar archivo</Text>
        </Pressable>
      </View>
    </View>
  );
}
