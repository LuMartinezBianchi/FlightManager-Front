import { useRouter } from 'expo-router';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { common } from '@/styles/common';

const FLIGHT = {
  code: 'AR1204',
  status: 'Confirmado',
  date: 'Lunes 24 Agosto · 07:15 hs (local)',
  origin: { iata: 'EZE', name: 'Ezeiza' },
  destination: { iata: 'COR', name: 'Córdoba' },
  duration: '1H 50M · DIRECTO',
};

const NOTAMS = [
  { id: '1', airport: 'EZE', label: 'Precaución', text: 'Pista 11/29 cerrada parcial\n02:00–05:00 UTC.' },
  { id: '2', airport: 'COR', label: 'Precaución', text: 'Grúa a 340m de THR 18,\naltura 45m.' },
];

const WEATHER = [
  { id: 'eze', airport: 'EZE', temp: '19°C', wind: '12kt NW', vis: '10km', metar: 'SAEZ 241800Z 31012KT...', icon: '🌤' },
  { id: 'cor', airport: 'COR', temp: '23°C', wind: '8kt SW',  vis: '9km',  metar: 'SACO 241800Z 22008KT...', icon: '⛅' },
];

const CREW = [
  { id: '1', initials: 'MF', name: 'Martín Fernández', role: 'Capitán' },
  { id: '2', initials: 'LC', name: 'Laura Castillo',   role: 'Primer Oficial' },
  { id: '3', initials: 'RP', name: 'Roberto Paz',      role: 'Tripulante de Cabina' },
  { id: '4', initials: 'SG', name: 'Sofía García',     role: 'Tripulante de Cabina' },
];

function SectionLabel({ title, right }: { title: string; right?: string }) {
  return (
    <View style={styles.sectionLabel}>
      <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: '700' }}>{title}</Text>
      {right && <Text style={{ color: colors.textDim, fontSize: fontSize.sm }}>{right}</Text>}
    </View>
  );
}

function NotamItem({ item }: { item: (typeof NOTAMS)[0] }) {
  return (
    <View style={[common.card, styles.pairItem]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
        <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: '700' }}>{item.airport}</Text>
        <View style={{ backgroundColor: "#ffd500", borderRadius: radius.round, paddingHorizontal: spacing.sm, paddingVertical: 2 }}>
          <Text style={{ color: "#ca8503", fontSize: fontSize.xs, fontWeight: '600' }}>⚠ {item.label}</Text>
        </View>
      </View>
      <Text style={{ color: colors.textDim, fontSize: fontSize.sm, lineHeight: 18 }}>{item.text}</Text>
    </View>
  );
}

function WeatherItem({ item }: { item: (typeof WEATHER)[0] }) {
  return (
    <View style={[common.card, styles.pairItem]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
        <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: '700' }}>{item.airport}</Text>
        <Text style={{ fontSize: 18 }}>{item.icon}</Text>
      </View>
      <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: '700', marginBottom: spacing.xs }}>{item.icon} {item.temp}</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xs }}>
        <Text style={{ color: colors.textDim, fontSize: fontSize.xs }}>↗ {item.wind}</Text>
        <Text style={{ color: colors.textDim, fontSize: fontSize.xs }}>👁 {item.vis}</Text>
      </View>
      <Text style={{ color: colors.textFaint, fontSize: fontSize.xs }}>{item.metar}</Text>
    </View>
  );
}

function CrewItem({ item, isLast }: { item: (typeof CREW)[0]; isLast: boolean }) {
  return (
    <>
      <View style={styles.crewRow}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontSize: fontSize.md, fontWeight: '600' }}>{item.name}</Text>
          <Text style={{ color: colors.textDim, fontSize: fontSize.sm }}>{item.role}</Text>
        </View>
      </View>
      {!isLast && <View style={{ height: 1, backgroundColor: colors.border, marginHorizontal: spacing.lg }} />}
    </>
  );
}

export default function NextFlightScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={common.screen} edges={['top']}>

      {/* Encabezado fijo: no scrollea */}
      <View style={[common.header, common.gutter]}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={common.title}>Vuelo {FLIGHT.code}</Text>
          <Text style={common.subtitle}>{FLIGHT.date}</Text>
        </View>
        <View style={{ backgroundColor: colors.greenSoft, borderRadius: radius.round, paddingHorizontal: spacing.md, paddingVertical: spacing.xs }}>
          <Text style={{ color: colors.green, fontSize: fontSize.sm, fontWeight: '600' }}>{FLIGHT.status}</Text>
        </View>
      </View>

      <ScrollView
        style={common.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[common.card, styles.flightCard]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.iata}>{FLIGHT.origin.iata}</Text>
            <Text style={common.subtitle}>{FLIGHT.origin.name}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: colors.cyan }}>✈</Text>
            <Text style={{ color: colors.textDim, fontSize: fontSize.xs, textAlign: 'center' }}>{FLIGHT.duration}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.iata}>{FLIGHT.destination.iata}</Text>
            <Text style={common.subtitle}>{FLIGHT.destination.name}</Text>
          </View>
        </View>

        <View>
          <SectionLabel title="Ruta en mapa" right={`${FLIGHT.origin.iata} → ${FLIGHT.destination.iata}`} />
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: colors.textFaint, fontSize: fontSize.sm }}>Mapa de ruta</Text>
          </View>
        </View>

        <View>
          <SectionLabel title="NOTAMs" right={`${NOTAMS.length} activos`} />
          <FlatList
            data={NOTAMS}
            keyExtractor={(item) => item.id}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={styles.pairList}
            renderItem={({ item }) => <NotamItem item={item} />}
          />
        </View>

        <View>
          <SectionLabel title="Meteorología" right="Actualizado 08:50" />
          <FlatList
            data={WEATHER}
            keyExtractor={(item) => item.id}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={styles.pairList}
            renderItem={({ item }) => <WeatherItem item={item} />}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.logbookBtn, pressed && { opacity: 0.8 }]}
          onPress={() => router.push('/(tabs)/flight-log')}
        >
          <Text style={{ color: colors.text, fontSize: fontSize.lg, fontWeight: '600' }}>Llenar libro de vuelo</Text>
        </Pressable>

        <View>
          <SectionLabel title="Tripulación" right={`${CREW.length} integrantes`} />
          <View style={[common.card, { overflow: 'hidden' }]}>
            <FlatList
              data={CREW}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <CrewItem item={item} isLast={index === CREW.length - 1} />
              )}
            />
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { gap: spacing.lg, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },

  flightCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  iata:       { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', letterSpacing: 1 },

  sectionLabel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },

  mapPlaceholder: {
    height: 180,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },

  pairList: { gap: spacing.sm },
  pairItem: { width: 170, padding: spacing.md },

  logbookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.cyanSoft,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.cyan,
    paddingVertical: spacing.lg,
  },

  crewRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md },
  avatar:  { width: 40, height: 40, borderRadius: radius.round, backgroundColor: colors.panel, alignItems: 'center', justifyContent: 'center' },
  mailBtn: { width: 36, height: 36, borderRadius: radius.md, backgroundColor: colors.card2, alignItems: 'center', justifyContent: 'center' },
  backBtn: { width: 32, height: 32, borderRadius: radius.round, backgroundColor: colors.card2, alignItems: 'center', justifyContent: 'center' },
});
