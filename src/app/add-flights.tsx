import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Steps } from '@/components/steps';
import { colors } from '@/constants/theme';
import { calendar } from '@/styles/calendar';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

// Agregar vuelos desde .xlsx, paso 1: elegir el archivo.
export default function AddFlightsScreen() {
  return (
    <ScrollView style={common.screen} contentContainerStyle={forms.content}>
      <Steps step={1} label="Elegir archivo" />

      <View style={styles.dropzone}>
        <View style={styles.dropzoneIcon}>
          <Ionicons name="cloud-upload-outline" size={28} color={colors.cyan} />
        </View>
        <Text style={common.title}>Elegí un archivo .xlsx</Text>
        <Text style={common.subtitle}>Tocá para buscar el archivo en tu dispositivo</Text>
        <Pressable
          style={({ pressed }) => [styles.chooseButton, pressed && common.pressed]}
          onPress={() => router.push('/import-preview')}
        >
          <Ionicons name="grid-outline" size={18} color={colors.onAccent} />
          <Text style={styles.chooseButtonText}>Elegir archivo .xlsx</Text>
        </Pressable>
      </View>

      <View style={[common.card, styles.template]}>
        <View style={styles.pencil}>
          <Ionicons name="grid-outline" size={20} color={colors.cyan} />
        </View>
        <View style={styles.templateText}>
          <Text style={calendar.flightNumber}>Plantilla de vuelos</Text>
          <Text style={calendar.label}>Columnas: N.º de vuelo, fecha, origen, destino, salida, llegada y avión</Text>
        </View>
        <Ionicons name="download-outline" size={22} color={colors.cyan} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={calendar.label}>o</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button
        label="Agregar un vuelo manualmente"
        kind="secondary"
        icon="add-circle-outline"
        onPress={() => router.push('/add-flight-manual')}
      />
    </ScrollView>
  );
}
