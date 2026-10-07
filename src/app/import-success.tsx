import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { colors } from '@/constants/theme';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

// Agregar vuelos desde .xlsx, paso 3: importacion terminada.
export default function ImportSuccessScreen() {
  return (
    <SafeAreaView style={common.screen}>
      <View style={styles.success}>
        <View style={styles.successMark}>
          <Ionicons name="checkmark" size={44} color={colors.green} />
        </View>
        <Text style={common.title}>¡Vuelos importados!</Text>
        <Text style={styles.successText}>
          Se agregaron 10 vuelos al calendario. Las 2 filas con errores quedaron sin importar.
        </Text>
      </View>

      <View style={forms.bottomBar}>
        <Button label="Ver vuelos programados" icon="list-outline" onPress={() => router.dismissTo('/flights')} />
        <Button label="Volver al inicio" kind="secondary" onPress={() => router.dismissTo('/')} />
      </View>
    </SafeAreaView>
  );
}
