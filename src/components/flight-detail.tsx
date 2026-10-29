import { FlightMap } from '@/components/flight-map';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { API_URL } from '@/api/config';
import { fetchMapaVuelo, type MapaVuelo } from '@/api/mapa';
import { hasFlown } from '@/data/flight-log';
import { proximoVuelo, tituloDia, useVuelos } from '@/hooks/use-vuelos';
import { styles } from '@/styles/flight-styles';

// NOTAMs y clima todavia son de ejemplo: no vienen de la programacion
const NOTAMS = [
  { id: '1', airport: 'EZE', label: '⚠ Precaución', text: 'Pista 11/29 cerrada parcial\n02:00–05:00 UTC.' },
  { id: '2', airport: 'COR', label: '⚠ Precaución', text: 'Grúa a 340m de THR 18,\naltura 45m.' },
];

const WEATHER = [
  { id: 'eze', airport: 'EZE', temp: '19°C', wind: '12kt NW', vis: '10km', metar: 'SAEZ 241800Z 31012KT...', icon: 'partly-sunny' as const },
  { id: 'cor', airport: 'COR', temp: '23°C', wind: '8kt SW', vis: '9km', metar: 'SACO 241800Z 22008KT...', icon: 'cloudy' as const },
];

// --- Titulitos de secciones y items de listas ---
function SectionLabel({ title, summary }: { title: string; summary?: string }) {
  return (
    <View style={styles.sectionLabel}>
      <Text style={styles.sectionLabelTitle}>{title}</Text>
      {summary && <Text style={styles.sectionLabelSubtitle}>{summary}</Text>}
    </View>
  );
}

function NotamItem({ item }: { item: (typeof NOTAMS)[0] }) {
  return (
    <View style={[styles.card, styles.pairItem]}>
      <View style={styles.slides}>
        <Text style={styles.airportName}>{item.airport}</Text>
        <View style={styles.statusTAG_caution}>
          <Text style={styles.statusTAGText_caution}>{item.label}</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{item.text}</Text>
    </View>
  );
}

function WeatherItem({ item }: { item: (typeof WEATHER)[0] }) {
  return (
    <View style={[styles.card, styles.pairItem]}>
      <View style={styles.slides}>
        <Text style={styles.airportName}>{item.airport}</Text>
        <Ionicons name={item.icon} style={styles.planeIcon} />
      </View>
      <Text style={styles.temperature}>{item.temp}</Text>
      <View style={styles.weatherInfo}>
        <Text style={styles.subtitle}>↗ {item.wind}</Text>
        <Text style={styles.subtitle}>👁 {item.vis}</Text>
      </View>
      <Text style={styles.metar}>{item.metar}</Text>
    </View>
  );
}

function CrewItem({ name, isLast }: { name: string; isLast: boolean }) {
  return (
    <View>
      <View style={styles.crewRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.crewmateName}>{name}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.sep} />}
    </View>
  );
}

// Detalle de un vuelo de la programacion. Con proximo muestra siempre el proximo vuelo;
// si no, el que corresponde a numero + fecha.
export function FlightDetail({ number, date, proximo }: { number?: string; date?: string; proximo?: boolean }) {
  const router = useRouter();
  const { vuelos, loading, error } = useVuelos();
  const vuelo = proximo ? proximoVuelo(vuelos) : vuelos.find((v) => v.number === number && v.date === date);

  const [mapa, setMapa] = useState<MapaVuelo | null>(null);
  const [mapaError, setMapaError] = useState<string | null>(null);

  // El mapa (aeropuertos y ruta) viene de la API, no del front
  const numeroVuelo = vuelo?.number;
  const fechaVuelo = vuelo?.date;
  useEffect(() => {
    if (!numeroVuelo || !fechaVuelo) return;
    fetchMapaVuelo(numeroVuelo, fechaVuelo)
      .then(setMapa)
      .catch((error: Error) => setMapaError(error.message));
  }, [numeroVuelo, fechaVuelo]);

  if (!vuelo) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={[styles.gutter, { paddingTop: 24 }]}>
          <Text style={styles.subtitle}>{loading ? 'Cargando vuelo…' : (error ?? (proximo ? 'No hay un próximo vuelo programado' : 'No se encontró el vuelo'))}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const tripulacion = vuelo.crew ? vuelo.crew.split('\n').map((nombre) => nombre.trim()).filter(Boolean) : [];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>

      {/* Encabezado fijo: no scrollea */}
      <View style={[styles.header, styles.gutter]}>
        <View style={styles.next_flight_title}>
          <Text style={styles.title}>Vuelo {vuelo.number}</Text>
          <Text style={styles.subtitle}>
            {tituloDia(vuelo.date)} · {vuelo.dep} hs (local)
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.card, styles.flightCard]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.iata}>{vuelo.from}</Text>
            <Text style={styles.subtitle}>{mapa?.origin.name ?? ''}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="airplane" style={styles.planeIcon} />
            <Text style={styles.subtitle}>{vuelo.duration}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.iata}>{vuelo.to}</Text>
            <Text style={styles.subtitle}>{mapa?.destination.name ?? ''}</Text>
          </View>
        </View>

        {vuelo.aircraft && <Text style={styles.subtitle}>{vuelo.aircraft}</Text>}

        <View>
          <SectionLabel title="Ruta en mapa" />
          {mapa && <FlightMap origin={mapa.origin} destination={mapa.destination} />}
          {!mapa && <Text style={styles.subtitle}>{mapaError ?? `Cargando mapa desde ${API_URL}…`}</Text>}
        </View>

        {mapa && (
          <Pressable
            style={({ pressed }) => [styles.logbookBtn, pressed && { opacity: 0.8 }]}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapa.origin.name)}`
              )
            }
          >
            <Text style={styles.logbookBtnText}>Como llegar al aeropuerto de origen</Text>
          </Pressable>
        )}

        <View>
          <SectionLabel title="NOTAMs" summary={`${NOTAMS.length} activos`} />
          <FlatList
            data={NOTAMS}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.pairList}
            renderItem={({ item }) => <NotamItem item={item} />}
          />
        </View>

        <View>
          <SectionLabel title="Meteorología" summary="Actualizado 08:50" />
          <FlatList
            data={WEATHER}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.pairList}
            renderItem={({ item }) => <WeatherItem item={item} />}
          />
        </View>

        {hasFlown(vuelo, new Date()) ? (
          <Pressable
            style={({ pressed }) => [styles.logbookBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.push({ pathname: '/logbook-entry', params: { number: vuelo.number, date: vuelo.date } })}
          >
            <Text style={styles.logbookBtnText}>Llenar libro de vuelo</Text>
          </Pressable>
        ) : (
          // Un vuelo que todavia no se hizo no tiene nada que registrar
          <Text style={styles.subtitle}>El libro de vuelo se podrá llenar una vez realizado el vuelo.</Text>
        )}

        {tripulacion.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <SectionLabel title="Tripulación" summary={`${tripulacion.length} integrantes`} />
            <View style={[styles.card, { overflow: 'hidden' }]}>
              <FlatList
                data={tripulacion}
                keyExtractor={(nombre) => nombre}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <CrewItem name={item} isLast={index === tripulacion.length - 1} />
                )}
              />
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
