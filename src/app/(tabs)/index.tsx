import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, Tone, tones } from '@/constants/theme';
import { calendarDays } from '@/data/calendar';
import { sections } from '@/data/flights';
import { styles } from '@/styles/index-styles';

// Datos hardcodeados por ahora.
const stats = [
  { value: '4.820', label: 'HS. TOTALES' },
  { value: '42:10', label: 'ESTE MES' },
  { value: '186', label: 'VUELOS / AÑO' },
];

const flight = sections[0].data[0];

// Calendario. Cada dia con vuelo, guardia o libre usa el color de su estado (los datos estan en data/calendar.ts).
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
// Color de cada estado de un dia
const dayTone: { [status: string]: Tone } = {
  vuelo: 'cyan',
  guardia: 'amber',
  libre: 'green',
};
const legend = [
  { label: 'Vuelo', color: colors.cyan },
  { label: 'Guardia', color: colors.amber },
  { label: 'Libre', color: colors.green },
];

// Pantalla 1: Inicio.
export default function HomeScreen() {
  const [month, setMonth] = useState(7); // 0 = enero
  const [year, setYear] = useState(2026);

  function changeMonth(step: number) {
    let newMonth = month + step;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = year - 1;
    }
    if (newMonth > 11) {
      newMonth = 0;
      newYear = year + 1;
    }
    setMonth(newMonth);
    setYear(newYear);
  }

  // Casillas del mes: 0 = casilla vacia antes del dia 1 (la semana empieza el lunes)
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: number[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(0);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }
  const marks = calendarDays[year + '-' + (month + 1)] || {};

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.bigTitle}>Flight Manager</Text>

        <View style={styles.calendar}>
          <View style={styles.monthRow}>
            <Pressable style={styles.arrow} onPress={() => changeMonth(-1)}>
              <Ionicons name="chevron-back" size={20} color={colors.text} />
            </Pressable>
            <Text style={styles.month}>
              {months[month]} {year}
            </Text>
            <Pressable style={styles.arrow} onPress={() => changeMonth(1)}>
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.week}>
            {weekDays.map((d, index) => ( 
              <Text key={index} style={styles.weekDay}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.days}>
            {cells.map((day, index) => (
              <View key={index} style={styles.cell}>
                {day > 0 && (
                  <View style={[styles.day, marks[day] && { backgroundColor: tones[dayTone[marks[day]]].soft }]}>
                    <Text style={[styles.dayText, marks[day] && { color: tones[dayTone[marks[day]]].color }]}>{day}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.legend}>
          {legend.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.nextBox}>
          <View style={styles.nextRow}>
            <Text style={styles.nextLabel}>PRÓXIMO VUELO</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => router.push('/flight')}
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
          <Ionicons name="book-outline" size={22} color={colors.amber} style={styles.alertIcon} />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>2 vuelos sin registrar</Text>
            <Text style={styles.alertSubtitle}>Completá el libro de vuelo para mantenerlo al día</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.amber} />
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
