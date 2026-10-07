import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { common } from '@/styles/common';
import { nextFlight as styles } from '@/styles/next-flight.ts';



const FLIGHT = {
  code: 'AR1204',
  status: 'Confirmado',
  date: 'Lunes 24 Agosto · 07:15 hs (local)',
  origin: { iata: 'EZE', name: 'Ezeiza' },
  destination: { iata: 'COR', name: 'Córdoba' },
  duration: '1H 50M · DIRECTO',
};

const NOTAMS = [
  { id: '1', airport: 'EZE', label: '⚠ Precaución', text: 'Pista 11/29 cerrada parcial\n02:00–05:00 UTC.' },
  { id: '2', airport: 'COR', label: '⚠ Precaución', text: 'Grúa a 340m de THR 18,\naltura 45m.' },
];

const WEATHER = [
  { id: 'eze', airport: 'EZE', temp: '19°C', wind: '12kt NW', vis: '10km', metar: 'SAEZ 241800Z 31012KT...', icon: 'partly-sunny' },
  { id: 'cor', airport: 'COR', temp: '23°C', wind: '8kt SW',  vis: '9km',  metar: 'SACO 241800Z 22008KT...', icon: 'cloudy' },
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
      <Text style={styles.sectionLabelTitle}>{title}</Text>
      {right && <Text style={styles.sectionLabelSubtitle}>{right}</Text>}
    </View>
  );
}

function NotamItem({ item }: { item: (typeof NOTAMS)[0] }) {
  return (
    <View style={[common.card, styles.pairItem]}>
      <View style={styles.slides}>
        <Text style={styles.airportName}>{item.airport}</Text>
        <View style={styles.statusTAG_caution}>
          <Text style={styles.statusTAGText_caution}>{item.label}</Text>
        </View>
      </View>
      <Text style={common.subtitle}>{item.text}</Text>
    </View>
  );
}

function WeatherItem({ item }: { item: (typeof WEATHER)[0] }) {
  return (
    <View style={[common.card, styles.pairItem]}>
      <View style={styles.slides}>
        <Text style={styles.airportName}>{item.airport}</Text>
        <Ionicons name={item.icon} style={styles.planeIcon} />
      </View>
      <Text style={styles.temperature}>{item.temp}</Text>
      <View style={styles.weatherInfo}>
        <Text style={common.subtitle}>↗ {item.wind}</Text>
        <Text style={common.subtitle}>👁 {item.vis}</Text>
      </View>
      <Text style={styles.metar}>{item.metar}</Text>
    </View>
  );
}

function CrewItem({ item, isLast }: { item: (typeof CREW)[0]; isLast: boolean }) {
  return (
    <>
      <View style={styles.crewRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.crewmateName}>{item.name}</Text>
          <Text style={styles.crewmateRole}>{item.role}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.sep} />}
    </>
  );
}


export default function NextFlightScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={common.screen} edges={['top']}>

      {/* Encabezado fijo: no scrollea */}
      <View style={[common.header, common.gutter]}>
        <View style={styles.next_flight_title}>
          <Text style={common.title}>Vuelo {FLIGHT.code}</Text>
          <Text style={common.subtitle}>{FLIGHT.date}</Text>
        </View>
        <View style={styles.statusTAG_confirmed}>
          <Text style={styles.statusTAGText_confirmed}>{FLIGHT.status}</Text>
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
            <Ionicons name="airplane" style={styles.planeIcon}/>
            <Text style={common.subtitle}>{FLIGHT.duration}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.iata}>{FLIGHT.destination.iata}</Text>
            <Text style={common.subtitle}>{FLIGHT.destination.name}</Text>
          </View>
        </View>

        <View>
          <SectionLabel title="Ruta en mapa" right={`${FLIGHT.origin.iata} → ${FLIGHT.destination.iata}`} />
          <View style={styles.mapPlaceholder}>
            <Text style={{color:'#ffffff'}}>Mapa de ruta</Text>
          </View>
        </View>

        <View>
          <SectionLabel title="NOTAMs" right={`${NOTAMS.length} activos`} />
          <FlatList
            data={NOTAMS}
            keyExtractor={(item) => item.id}
            horizontal
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
            contentContainerStyle={styles.pairList}
            renderItem={({ item }) => <WeatherItem item={item} />}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.logbookBtn, pressed && { opacity: 0.8 }]}
          onPress={() => router.push('/logbook-new')}
        >
          <Text style={styles.logbookBtnText}>Llenar libro de vuelo</Text>
        </Pressable>

        <View  style={{marginBottom:15}}>
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
        
      </ScrollView>
    </SafeAreaView>
  );
}

