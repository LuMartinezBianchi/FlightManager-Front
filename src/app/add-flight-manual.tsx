import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

// Agregar un vuelo cargando los datos a mano.
export default function AddFlightManualScreen() {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [dep, setDep] = useState('');
  const [arr, setArr] = useState('');
  const [aircraft, setAircraft] = useState('');

  return (
    <View style={common.screen}>
      <View style={[styles.screenBody, common.screen]}>
        <View style={forms.row}>
          <View style={forms.halfLeft}>
            <Field label="N.º de vuelo" value={number} onChangeText={setNumber} placeholder="Ej: AR1204" />
          </View>
          <View style={forms.halfRight}>
            <Field label="Fecha" value={date} onChangeText={setDate} placeholder="DD/MM/AAAA" />
          </View>
        </View>

        <View style={forms.row}>
          <View style={forms.halfLeft}>
            <Field label="Origen" value={from} onChangeText={setFrom} placeholder="IATA" />
          </View>
          <View style={forms.halfRight}>
            <Field label="Destino" value={to} onChangeText={setTo} placeholder="IATA" />
          </View>
        </View>

        <View style={forms.row}>
          <View style={forms.halfLeft}>
            <Field label="Salida (hora local)" value={dep} onChangeText={setDep} placeholder="--:--" />
          </View>
          <View style={forms.halfRight}>
            <Field label="Llegada (hora local)" value={arr} onChangeText={setArr} placeholder="--:--" />
          </View>
        </View>

        <Field label="Avión" value={aircraft} onChangeText={setAircraft} placeholder="Ej: Boeing 737-800" />
      </View>

      <View style={forms.bottomBar}>
        <Button label="Guardar vuelo" icon="save-outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
