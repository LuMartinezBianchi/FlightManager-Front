import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, Tone, tones } from '@/constants/theme';
import { buildCalendar, type DayStatus } from '@/data/calendar';
import { hasFlown } from '@/data/flight-log';
import { claveVuelo, useLibro } from '@/hooks/use-libro';
import { useProgramacion } from '@/hooks/use-programacion';
import { proximoVuelo, useVuelos } from '@/hooks/use-vuelos';
import { styles } from '@/styles/index-styles';

// Datos hardcodeados por ahora.
const stats = [
  { value: '4.820', label: 'HS. TOTALES' },
  { value: '42:10', label: 'ESTE MES' },
  { value: '186', label: 'VUELOS / AÑO' },
];

// Calendario. Cada dia cargado usa el color de su tipo de actividad (vuelo, deadhead, reserva, franco o sin asignar).
// Los datos vienen de la API: vuelos y programacion (ver data/calendar.ts).
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
// Color de cada tipo de dia
const dayTone: Record<DayStatus, Tone> = {
  vuelo: 'cyan',
  deadhead: 'violet',
  reserva: 'amber',
  franco: 'green',
  sin_asignar: 'gray',
};
const legend = [
  { label: 'Vuelo', color: colors.cyan },
  { label: 'Deadhead', color: colors.violet },
  { label: 'Reserva', color: colors.amber },
  { label: 'Franco', color: colors.green },
  { label: 'Sin asignar', color: colors.gray },
];

// Fecha en YYYY-MM-DD (month: 0 = enero), la misma forma en que la API devuelve las fechas
function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Pantalla 1: Inicio.
export default function HomeScreen() {
  const [month, setMonth] = useState(new Date().getMonth()); // 0 = enero
  const [year, setYear] = useState(new Date().getFullYear());
  const { vuelos } = useVuelos();
  const { dias } = useProgramacion();
  const { hojas } = useLibro();
  const marks = useMemo(() => buildCalendar(vuelos, dias), [vuelos, dias]);
  // Vuelos sin registrar: los que ya pasaron y todavia no tienen hoja en el libro
  const sinRegistrar = useMemo(() => {
    const conHoja = new Set(hojas.map((h) => claveVuelo({ number: h.number, date: h.date })));
    const ahora = new Date();
    return vuelos.filter((v) => hasFlown(v, ahora) && !conHoja.has(claveVuelo(v))).length;
  }, [vuelos, hojas]);
  // Próximo vuelo: el primero que todavía no pasó, o nada si no quedan vuelos programados
  const flight = useMemo(() => proximoVuelo(vuelos), [vuelos]);

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
            {cells.map((day, index) => {
              const status = day > 0 ? marks[isoDate(year, month, day)] : undefined;
              return (
                <View key={index} style={styles.cell}>
                  {day > 0 && (
                    <View style={[styles.day, status && { backgroundColor: tones[dayTone[status]].soft }]}>
                      <Text style={[styles.dayText, status && { color: tones[dayTone[status]].color }]}>{day}</Text>
                    </View>
                  )}
                </View>
              );
            })}
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

          {!flight && <Text style={styles.label}>No hay vuelos programados</Text>}

          {flight && (
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
          )}
        </View>

        {sinRegistrar > 0 && (
        <Pressable style={styles.alert} onPress={() => router.push('/flight-log')}>
          <Ionicons name="book-outline" size={22} style={styles.alertIcon} />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>
              {sinRegistrar} {sinRegistrar === 1 ? 'vuelo sin registrar' : 'vuelos sin registrar'}
            </Text>
            <Text style={styles.alertSubtitle}>Completá el libro de vuelo para mantenerlo al día</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} style={styles.alertIcon} />
        </Pressable>
        )}

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
