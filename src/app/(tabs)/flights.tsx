import { router } from 'expo-router';
import { SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FlightCard } from '@/components/flight-card';
import { sections, totalFlights } from '@/data/flights';
import { calendar as styles } from '@/styles/calendar';
import { common } from '@/styles/common';
import { flights } from '@/styles/flights';

// Pantalla 2: Vuelos programados. Desde aca se agregan y se modifican vuelos.
export default function FlightsScreen() {
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
        renderItem={({ item }) => (
          <FlightCard flight={item} onPress={() => router.push('/(tabs)/next-flight')} />
        )}
      />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View>
      <View style={common.header}>
        <Text style={common.title}>Próximos vuelos</Text>
        <Text style={styles.label}>{totalFlights} programados</Text>
      </View>

      <View style={flights.actions}>
        <Button label="Agregar vuelos desde .xlsx" icon="grid-outline" onPress={() => router.push('/add-flights')} />
        <Button label="Modificar vuelos" kind="secondary" icon="create-outline" onPress={() => router.push('/edit-flights')} />
      </View>
    </View>
  );
}
