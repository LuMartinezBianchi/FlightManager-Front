import { Text, View } from 'react-native';

import { common } from '@/styles/common';

export default function EditFlightsScreen() {
  return (
    <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={common.title}>Modificar vuelos</Text>
    </View>
  );
}
