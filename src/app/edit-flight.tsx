import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Field, FieldRow } from '@/components/field';
import { colors } from '@/constants/theme';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

// Editar los datos de un vuelo. El boton rojo abre un dialogo para confirmar la eliminacion.
export default function EditFlightScreen() {
  const [confirming, setConfirming] = useState(false);

  return (
    <View style={common.screen}>
      <ScrollView contentContainerStyle={forms.content}>
        <Text style={forms.info}>AR1204 · EZE → COR</Text>
        <FieldRow>
          <Field label="N.º de vuelo" value="AR1204" />
          <Field label="Fecha" value="24/08/2026" />
        </FieldRow>
        <FieldRow>
          <Field label="Origen" value="EZE" />
          <Field label="Destino" value="COR" />
        </FieldRow>
        <FieldRow>
          <Field label="Salida (hora local)" value="07:15" />
          <Field label="Llegada (hora local)" value="09:05" />
        </FieldRow>
        <Field label="Avión" value="Boeing 737-800" />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={forms.bottomBar}>
        <Button label="Guardar cambios" icon="save-outline" onPress={() => router.back()} />
        <Button label="Eliminar vuelo" kind="danger" icon="trash-outline" onPress={() => setConfirming(true)} />
      </SafeAreaView>

      <Modal
        visible={confirming}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirming(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setConfirming(false)}>
          {/* Pressable sin onPress para que tocar el dialogo no lo cierre */}
          <Pressable style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="trash-outline" size={28} color={colors.red} />
            </View>
            <Text style={common.title}>¿Eliminar vuelo AR1204?</Text>
            <Text style={styles.dialogText}>
              Se quitará del calendario y de Vuelos programados. Esta acción no se puede deshacer.
            </Text>

            <View style={styles.dialogButtons}>
              <View style={styles.dialogButton}>
                <Button label="Cancelar" kind="secondary" onPress={() => setConfirming(false)} />
              </View>
              <View style={styles.dialogButton}>
                <Button
                  label="Eliminar"
                  kind="danger"
                  onPress={() => {
                    setConfirming(false);
                    router.back();
                  }}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
