import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { common } from '@/styles/common';

// Pantalla 2: Próximo vuelo (vacía, solo layout).
export default function NextFlightScreen() {
  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={common.title}>Próximo vuelo</Text>
      </View>
    </SafeAreaView>
  );
}
