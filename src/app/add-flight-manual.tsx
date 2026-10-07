import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Field, FieldRow } from '@/components/field';
import { common } from '@/styles/common';
import { forms } from '@/styles/forms';

// Agregar un vuelo cargando los datos a mano.
export default function AddFlightManualScreen() {
  return (
    <View style={common.screen}>
      <ScrollView contentContainerStyle={forms.content}>
        <FieldRow>
          <Field label="N.º de vuelo" placeholder="Ej: AR1204" />
          <Field label="Fecha" placeholder="DD/MM/AAAA" />
        </FieldRow>
        <FieldRow>
          <Field label="Origen" placeholder="IATA" />
          <Field label="Destino" placeholder="IATA" />
        </FieldRow>
        <FieldRow>
          <Field label="Salida (hora local)" placeholder="--:--" />
          <Field label="Llegada (hora local)" placeholder="--:--" />
        </FieldRow>
        <Field label="Avión" placeholder="Ej: Boeing 737-800" />
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={forms.bottomBar}>
        <Button label="Guardar vuelo" icon="save-outline" onPress={() => router.back()} />
      </SafeAreaView>
    </View>
  );
}
