import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Steps } from '@/components/steps';
import { colors } from '@/constants/theme';
import { calendar } from '@/styles/calendar';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';

// Agregar vuelos desde .xlsx, paso 1: elegir el archivo.
export default function AddFlightsScreen() {
  return (
    <View style={[common.screen, styles.screenBody]}>
      <Steps step={1} label="Elegir archivo" />

      <View style={styles.dropzone}>
        <View style={styles.dropzoneIcon}>
          <Ionicons name="cloud-upload-outline" size={28} color={colors.cyan} />
        </View>
        <Text style={common.title}>Elegí un archivo .xlsx</Text>
        <Text style={styles.dropzoneText}>Tocá para buscar el archivo en tu dispositivo</Text>
        <Pressable style={styles.chooseButton} onPress={() => router.push('/import-preview')}>
          <Ionicons name="grid-outline" size={18} color={colors.onAccent} style={styles.chooseIcon} />
          <Text style={styles.chooseButtonText}>Elegir archivo .xlsx</Text>
        </Pressable>
      </View>

      <View style={[common.card, styles.template]}>
        <View style={styles.templateText}>
          <Text style={calendar.flightNumber}>Plantilla de vuelos</Text>
          <Text style={calendar.label}>Columnas: N.º de vuelo, fecha, origen, destino, salida, llegada y avión</Text>
        </View>
        <Ionicons name="download-outline" size={22} color={colors.cyan} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={[calendar.label, styles.dividerText]}>o</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button label="Agregar un vuelo manualmente" kind="secondary" icon="add-circle-outline" href="/add-flight-manual" />
    </View>
  );
}
