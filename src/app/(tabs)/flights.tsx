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
        style={flights.list}
        ListHeaderComponent={<Header />}
        renderSectionHeader={({ section }) => <Text style={flights.day}>{section.title}</Text>}
        renderItem={({ item }) => <FlightCard flight={item} />}
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

      <Button label="Agregar vuelos desde .xlsx" icon="grid-outline" href="/add-flights" />
      <Button label="Modificar vuelos" kind="secondary" icon="create-outline" href="/edit-flights" />
    </View>
  );
}
