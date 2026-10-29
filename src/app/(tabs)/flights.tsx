import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';
import { agruparPorDia, useProgramacion } from '@/hooks/use-programacion';
import { styles } from '@/styles/flights-styles';

// Pantalla 2: Vuelos programados. Desde aca se agregan y se modifican vuelos.
export default function FlightsScreen() {
  const { vuelos, loading, error } = useProgramacion();
  const sections = agruparPorDia(vuelos);

  let vacio = 'No hay vuelos programados. Agregalos desde .xlsx o a mano.';
  if (loading) vacio = 'Cargando vuelos…';
  if (error) vacio = error;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => `${item.number}-${item.date}`}
        style={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Próximos vuelos</Text>
              <Text style={styles.count}>{vuelos.length} programados</Text>
            </View>

            <Pressable style={styles.primaryButton} onPress={() => router.push('/add-flights')}>
              <Ionicons name="grid-outline" size={20} color={colors.onAccent} style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Agregar vuelos desde .xlsx</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={() => router.push('/edit-flights')}>
              <Ionicons name="create-outline" size={20} color={colors.cyan} style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Modificar vuelos</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={<Text style={styles.label}>{vacio}</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.day}>{section.title}</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => router.push({ pathname: '/flight', params: { number: item.number, date: item.date } })}
          >
            <View style={styles.row}>
              <Text style={styles.flightNumber}>Vuelo {item.number}</Text>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.airportCode}>{item.from}</Text>
                <Text style={styles.label}>{item.dep}</Text>
              </View>

              <View style={styles.routeMiddle}>
                <View style={styles.routeLine} />
                <Ionicons name="airplane" size={16} style={styles.planeIcon} />
                <Text style={styles.duration}>{item.duration}</Text>
              </View>

              <View style={styles.alignRight}>
                <Text style={styles.airportCode}>{item.to}</Text>
                <Text style={styles.label}>{item.arr}</Text>
              </View>
            </View>

            <Text style={styles.label}>{item.aircraft}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
