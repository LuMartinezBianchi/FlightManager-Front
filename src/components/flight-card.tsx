import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Flight } from '@/data/flights';
import { calendar as styles } from '@/styles/calendar';
import { common } from '@/styles/common';

// Tarjeta de un vuelo: numero, ruta, horarios y avion
export function FlightCard({ flight, onPress }: { flight: Flight; onPress?: () => void }) {
  return (
    <Pressable style={({ pressed }) => [common.card, styles.card, pressed && common.pressed]} onPress={onPress}>

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
  );
}
