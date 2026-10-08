import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';
import { styles } from '@/styles/import-success-styles';

// Agregar vuelos desde .xlsx, paso 3: importacion terminada.
export default function ImportSuccessScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.success}>
        <View style={styles.mark}>
          <Ionicons name="checkmark" size={44} color={colors.green} />
        </View>
        <Text style={styles.title}>¡Vuelos importados!</Text>
        <Text style={styles.text}>
          Se agregaron todos los vuelos al calendario.
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <Pressable style={styles.primaryButton} onPress={() => router.dismissTo('/flights')}>
          <Ionicons name="list-outline" size={20} color={colors.onAccent} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Ver vuelos programados</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.dismissTo('/')}>
          <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
