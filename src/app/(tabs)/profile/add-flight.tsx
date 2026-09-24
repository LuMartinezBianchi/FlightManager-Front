import { Text, View } from 'react-native';

import { common } from '@/styles/common';

export default function AddFlightScreen() {
  return (
    <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={common.title}>Agregar vuelos</Text>
    </View>
  );
}
