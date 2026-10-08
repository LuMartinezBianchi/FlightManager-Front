import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import { styles } from '@/styles/add-flights-styles';

// Agregar vuelos desde .xlsx, paso 1: elegir el archivo.
export default function AddFlightsScreen() {
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.steps}>
          <View style={[styles.step, styles.stepOn]} />
          <View style={styles.step} />
          <View style={styles.step} />
        </View>
        <Text style={styles.stepLabel}>Paso 1 de 3 · Elegir archivo</Text>
      </View>

      <View style={styles.dropzone}>
        <View style={styles.dropzoneIcon}>
          <Ionicons name="cloud-upload-outline" size={28} color={colors.cyan} />
        </View>
        <Text style={styles.dropzoneTitle}>Elegí un archivo .xlsx</Text>
        <Text style={styles.dropzoneText}>Tocá para buscar el archivo en tu dispositivo</Text>
        <Pressable style={styles.chooseButton} onPress={() => router.push('/import-preview')}>
          <Ionicons name="grid-outline" size={18} color={colors.onAccent} style={styles.chooseIcon} />
          <Text style={styles.chooseButtonText}>Elegir archivo .xlsx</Text>
        </Pressable>
      </View>

      <View style={styles.template}>
        <View style={styles.templateText}>
          <Text style={styles.templateTitle}>Plantilla de vuelos</Text>
          <Text style={styles.templateColumns}>
            Columnas: N.º de vuelo, fecha, origen, destino, salida, llegada y avión
          </Text>
        </View>
        <Ionicons name="download-outline" size={22} color={colors.cyan} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.dividerLine} />
      </View>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/add-flight-manual')}>
        <Ionicons name="add-circle-outline" size={20} color={colors.cyan} style={styles.buttonIcon} />
        <Text style={styles.secondaryButtonText}>Agregar un vuelo manualmente</Text>
      </Pressable>
    </View>
  );
}
