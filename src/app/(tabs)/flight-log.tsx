import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { common } from '@/styles/common';

// Pantalla 3: Libro de vuelo (vacía, solo layout).
export default function FlightLogScreen() {
  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={common.title}>Libro de vuelo</Text>
      </View>
    </SafeAreaView>
  );
}
