import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { colors } from '@/constants/theme';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

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
    <View style={common.screen}>
      <View style={[styles.screenBody, common.screen]}>
        <View style={forms.row}>
          <View style={forms.halfLeft}>
            <Field label="N.º de vuelo" value={number} onChangeText={setNumber} />
          </View>
          <View style={forms.halfRight}>
            <Field label="Fecha" value={date} onChangeText={setDate} />
          </View>
        </View>

        <View style={forms.row}>
          <View style={forms.halfLeft}>
            <Field label="Origen" value={from} onChangeText={setFrom} />
          </View>
          <View style={forms.halfRight}>
            <Field label="Destino" value={to} onChangeText={setTo} />
          </View>
        </View>

        <View style={forms.row}>
          <View style={forms.halfLeft}>
            <Field label="Salida (hora local)" value={dep} onChangeText={setDep} />
          </View>
          <View style={forms.halfRight}>
            <Field label="Llegada (hora local)" value={arr} onChangeText={setArr} />
          </View>
        </View>

        <Field label="Avión" value={aircraft} onChangeText={setAircraft} />
      </View>

      <View style={forms.bottomBar}>
        <Button label="Guardar cambios" icon="save-outline" onPress={() => router.back()} />
        <Button label="Eliminar vuelo" kind="danger" icon="trash-outline" onPress={() => setConfirming(true)} />
      </View>

      <Modal visible={confirming} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="trash-outline" size={28} color={colors.red} />
            </View>
            <Text style={common.title}>¿Eliminar vuelo {number}?</Text>
            <Text style={styles.dialogText}>
              Se quitará del calendario y de Vuelos programados. Esta acción no se puede deshacer.
            </Text>

            <View style={styles.dialogButtons}>
              <View style={styles.dialogButtonLeft}>
                <Button label="Cancelar" kind="secondary" onPress={() => setConfirming(false)} />
              </View>
              <View style={styles.dialogButtonRight}>
                <Button label="Eliminar" kind="danger" onPress={deleteFlight} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
