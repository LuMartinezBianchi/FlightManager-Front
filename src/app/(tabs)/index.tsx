import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/chip';
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

const legend = [
  { label: 'Vuelo', color: colors.cyan },
  { label: 'Guardia', color: colors.amber },
  { label: 'Libre', color: colors.green },
];

const nextFlight = sections[0].data[0];

const calendarImage = require('@/assets/images/calendar-placeholder.png');

// Pantalla 1: Inicio.
export default function HomeScreen() {
  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <ScrollView contentContainerStyle={common.content}>
        <Text style={styles.bigTitle}>Flight Manager</Text>

        <Image source={calendarImage} style={styles.calendar} resizeMode='contain' />

        <View style={home.legend}>
          {legend.map((item) => (
            <View key={item.label} style={home.legendItem}>
              <View style={[home.dot, { backgroundColor: item.color }]} />
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [common.card, home.nextCard, pressed && common.pressed]}
          onPress={() => router.push('/(tabs)/next-flight')}
        >
          <View style={styles.row}>
            <Text style={home.nextLabel}>PRÓXIMO VUELO</Text>
            <Chip label="Sale en 2 d 4 h" tone="cyan" />
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.airportCode}>{nextFlight.from}</Text>
              <Text style={styles.label}>{nextFlight.dep}</Text>
            </View>

            <View style={styles.routeMiddle}>
              <View style={styles.routeLine} />
              <Ionicons name="airplane" size={16} style={styles.planeIcon} />
            </View>

            <View style={styles.alignRight}>
              <Text style={styles.airportCode}>{nextFlight.to}</Text>
              <Text style={styles.label}>{nextFlight.arr}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Vuelo {nextFlight.number} · Lun 24 Ago</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textDim} />
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [home.alert, pressed && common.pressed]}
          onPress={() => router.push('/(tabs)/flight-log')}
        >
          <View style={home.alertIcon}>
            <Ionicons name="book-outline" size={18} color={colors.amber} />
          </View>
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
