import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, Image as RNImage, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, tones, type Tone } from '@/constants/theme';
import { calendar as styles } from '@/styles/calendar';
import { common } from '@/styles/common';

type Flight = {
  number: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  aircraft: string;
  status: string;
  tone: Tone;
};

// Datos hardcodeados por ahora.
const sections: { title: string; data: Flight[] }[] = [
  {
    title: 'LUN · 24 AGOSTO',
    data: [
      { number: 'AR1204', from: 'EZE', to: 'COR', dep: '07:15', arr: '09:05', duration: '1h 50m', aircraft: 'Boeing 737-800', status: 'Programado', tone: 'cyan' },
      { number: 'AR1207', from: 'COR', to: 'MDZ', dep: '10:10', arr: '11:35', duration: '1h 25m', aircraft: 'Boeing 737-800', status: '2do tramo', tone: 'amber' },
      { number: 'AR1210', from: 'MDZ', to: 'EZE', dep: '12:40', arr: '14:30', duration: '1h 50m', aircraft: 'Boeing 737-800', status: '3er tramo', tone: 'amber' },
    ],
  },
  {
    title: 'MIÉ · 26 AGOSTO',
    data: [
      { number: 'AR1672', from: 'AEP', to: 'BRC', dep: '08:15', arr: '10:35', duration: '2h 20m', aircraft: 'Boeing 737 MAX 8', status: 'Programado', tone: 'cyan' },
      { number: 'AR1673', from: 'BRC', to: 'AEP', dep: '11:30', arr: '13:40', duration: '2h 10m', aircraft: 'Boeing 737 MAX 8', status: '2do tramo', tone: 'amber' },
    ],
  },
];

const totalFlights = sections.reduce((n, s) => n + s.data.length, 0);

const calendarImage = require('@/assets/images/calendar-placeholder.png');
const calendarSize = RNImage.resolveAssetSource(calendarImage);

export default function CalendarScreen() {
  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <SectionList
        
        sections={sections}
        keyExtractor={(item) => item.number}
        contentContainerStyle={common.content}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={<Header />}
        
        renderSectionHeader={({ section }) => (
          <Text style={[styles.label, styles.dayLabel]}>{section.title}</Text>
        )}

        renderItem={({ item }) => <FlightCard flight={item} />}
      />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View>
        <Text style={styles.bigTitle}>Flight Manager</Text>

      <Image
        source={calendarImage}
        style={[styles.calendar, { aspectRatio: calendarSize.width / calendarSize.height }]}
      />

      <View style={styles.row}>
        <Text style={common.title}>Próximos vuelos</Text>
        <Text style={styles.label}>{totalFlights} programados</Text>
      </View>
    </View>
  );
}

function FlightCard({ flight }: { flight: Flight }) {
  const tone = tones[flight.tone];

  return (
    <Pressable style={({ pressed }) => [common.card, styles.card, pressed && common.pressed]}>

      <View style={styles.row}>
        <Text style={styles.flightNumber}>Vuelo {flight.number}</Text>

        <View style={[styles.chip, { backgroundColor: tone.soft }]}>
          <Text style={[styles.chipText, { color: tone.color }]}>{flight.status}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.airportCode}>{flight.from}</Text>
          <Text style={styles.label}>{flight.dep}</Text>
        </View>

        <View style={styles.routeMiddle}>
          <View style={styles.routeLine} />
          <Ionicons name="airplane" size={16} color={colors.cyan} style={styles.planeIcon} />
          <Text style={styles.duration}>{flight.duration}</Text>
        </View>

        <View style={styles.alignRight}>
          <Text style={styles.airportCode}>{flight.to}</Text>
          <Text style={styles.label}>{flight.arr}</Text>
        </View>
      </View>

      <Text style={styles.label}>{flight.aircraft}</Text>
    </Pressable>
  );
}
