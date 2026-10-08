import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';
import { styles } from '@/styles/edit-flight-styles';

// Editar los datos de un vuelo. El boton rojo abre un dialogo para confirmar la eliminacion.
export default function EditFlightScreen() {
  const [number, setNumber] = useState('AR1204');
  const [date, setDate] = useState('24/08/2026');
  const [from, setFrom] = useState('EZE');
  const [to, setTo] = useState('COR');
  const [dep, setDep] = useState('07:15');
  const [arr, setArr] = useState('09:05');
  const [aircraft, setAircraft] = useState('Boeing 737-800');
  const [confirming, setConfirming] = useState(false);

  function deleteFlight() {
    setConfirming(false);
    router.back();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={[styles.fieldBox, styles.halfLeft]}>
            <Text style={styles.label}>N.º de vuelo</Text>
            <TextInput style={styles.input} onChangeText={setNumber} value={number} />
          </View>
          <View style={[styles.fieldBox, styles.halfRight]}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput style={styles.input} onChangeText={setDate} value={date} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldBox, styles.halfLeft]}>
            <Text style={styles.label}>Origen</Text>
            <TextInput style={styles.input} onChangeText={setFrom} value={from} />
          </View>
          <View style={[styles.fieldBox, styles.halfRight]}>
            <Text style={styles.label}>Destino</Text>
            <TextInput style={styles.input} onChangeText={setTo} value={to} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldBox, styles.halfLeft]}>
            <Text style={styles.label}>Salida (hora local)</Text>
            <TextInput style={styles.input} onChangeText={setDep} value={dep} />
          </View>
          <View style={[styles.fieldBox, styles.halfRight]}>
            <Text style={styles.label}>Llegada (hora local)</Text>
            <TextInput style={styles.input} onChangeText={setArr} value={arr} />
          </View>
        </View>

        <View style={styles.fieldBox}>
          <Text style={styles.label}>Avión</Text>
          <TextInput style={styles.input} onChangeText={setAircraft} value={aircraft} />
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Ionicons name="save-outline" size={20} color={colors.onAccent} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Guardar cambios</Text>
        </Pressable>
        <Pressable style={styles.dangerButton} onPress={() => setConfirming(true)}>
          <Ionicons name="trash-outline" size={20} color={colors.red} style={styles.buttonIcon} />
          <Text style={styles.dangerButtonText}>Eliminar vuelo</Text>
        </Pressable>
      </SafeAreaView>

      <Modal visible={confirming} animationType="fade" transparent onRequestClose={() => setConfirming(false)}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="trash-outline" size={28} color={colors.red} />
            </View>
            <Text style={styles.dialogTitle}>¿Eliminar vuelo {number}?</Text>
            <Text style={styles.dialogText}>
              Se quitará del calendario y de Vuelos programados. Esta acción no se puede deshacer.
            </Text>

            <View style={styles.dialogButtons}>
              <Pressable style={styles.cancelButton} onPress={() => setConfirming(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={deleteFlight}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
