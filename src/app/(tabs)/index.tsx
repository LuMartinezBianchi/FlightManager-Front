import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { sections } from '@/data/flights';
import { styles } from '@/styles/index-styles';

// Datos hardcodeados por ahora.
const stats = [
  { value: '4.820', label: 'HS. TOTALES' },
  { value: '42:10', label: 'ESTE MES' },
  { value: '186', label: 'VUELOS / AÑO' },
];

const flight = sections[0].data[0];

const calendarImage = require('@/assets/images/calendar-placeholder.png');

// Pantalla 1: Inicio.
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.bigTitle}>Flight Manager</Text>

        <Image source={calendarImage} style={styles.calendar} resizeMode='contain' />

        <View style={styles.nextBox}>
          <View style={styles.nextRow}>
            <Text style={styles.nextLabel}>PRÓXIMO VUELO</Text>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Sale en 2 d 4 h</Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => router.push('/flight-detail')}
          >
            <View style={styles.row}>
              <Text style={styles.flightNumber}>Vuelo {flight.number}</Text>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.airportCode}>{flight.from}</Text>
                <Text style={styles.label}>{flight.dep}</Text>
              </View>

              <View style={styles.routeMiddle}>
                <View style={styles.routeLine} />
                <Ionicons name="airplane" size={16} style={styles.planeIcon} />
                <Text style={styles.duration}>{flight.duration}</Text>
              </View>

              <View style={styles.alignRight}>
                <Text style={styles.airportCode}>{flight.to}</Text>
                <Text style={styles.label}>{flight.arr}</Text>
              </View>
            </View>

            <Text style={styles.label}>{flight.aircraft}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.alert} onPress={() => router.push('/flight-log')}>
          <Ionicons name="book-outline" size={22} style={styles.alertIcon} />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>2 vuelos sin registrar</Text>
            <Text style={styles.alertSubtitle}>Completá el libro de vuelo para mantenerlo al día</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} style={styles.alertIcon} />
        </Pressable>

        <View style={styles.stats}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
