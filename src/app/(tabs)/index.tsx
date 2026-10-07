import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/chip';
import { FlightCard } from '@/components/flight-card';
import { colors } from '@/constants/theme';
import { sections } from '@/data/flights';
import { calendar as styles } from '@/styles/calendar';
import { common } from '@/styles/common';
import { home } from '@/styles/home';

// Datos hardcodeados por ahora.
const stats = [
  { value: '4.820', label: 'HS. TOTALES' },
  { value: '42:10', label: 'ESTE MES' },
  { value: '186', label: 'VUELOS / AÑO' },
];

const calendarImage = require('@/assets/images/calendar-placeholder.png');

// Pantalla 1: Inicio.
export default function HomeScreen() {
  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <ScrollView contentContainerStyle={common.content}>
        <Text style={styles.bigTitle}>Flight Manager</Text>

        <Image source={calendarImage} style={styles.calendar} resizeMode='contain' />

        <View style={home.nextBox}>
          <View style={home.nextRow}>
            <Text style={home.nextLabel}>PRÓXIMO VUELO</Text>
            <Chip label="Sale en 2 d 4 h" tone="cyan" />
          </View>
          <FlightCard flight={sections[0].data[0]} />
        </View>

        <Pressable style={home.alert} onPress={() => router.push('/flight-log')}>
          <Ionicons name="book-outline" size={22} color={colors.amber} style={home.alertIcon} />
          <View style={home.alertText}>
            <Text style={home.alertTitle}>2 vuelos sin registrar</Text>
            <Text style={home.alertSubtitle}>Completá el libro de vuelo para mantenerlo al día</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.amber} />
        </Pressable>

        <View style={home.stats}>
          {stats.map((stat) => (
            <View key={stat.label} style={[common.card, home.stat]}>
              <Text style={common.title}>{stat.value}</Text>
              <Text style={home.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
