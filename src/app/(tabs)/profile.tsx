import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { common } from '@/styles/common';

// Pantalla 4: Perfil (vacía, solo layout).
export default function ProfileScreen() {
  return (
    <SafeAreaView style={common.screen} edges={['top']}>
      <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={common.title}>Perfil</Text>
      </View>
    </SafeAreaView>
  );
}
