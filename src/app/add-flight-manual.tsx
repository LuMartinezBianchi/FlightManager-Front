import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '@/styles/add-flight-manual-styles';

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
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={[styles.fieldBox, styles.halfLeft]}>
            <Text style={styles.label}>N.º de vuelo</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNumber}
              value={number}
              placeholder="Ej: AR1204"
            />
          </View>
          <View style={[styles.fieldBox, styles.halfRight]}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDate}
              value={date}
              placeholder="DD/MM/AAAA"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldBox, styles.halfLeft]}>
            <Text style={styles.label}>Origen</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFrom}
              value={from}
              placeholder="IATA"
            />
          </View>
          <View style={[styles.fieldBox, styles.halfRight]}>
            <Text style={styles.label}>Destino</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTo}
              value={to}
              placeholder="IATA"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldBox, styles.halfLeft]}>
            <Text style={styles.label}>Salida (hora local)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDep}
              value={dep}
              placeholder="--:--"
            />
          </View>
          <View style={[styles.fieldBox, styles.halfRight]}>
            <Text style={styles.label}>Llegada (hora local)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setArr}
              value={arr}
              placeholder="--:--"
            />
          </View>
        </View>

        <View style={styles.fieldBox}>
          <Text style={styles.label}>Avión</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAircraft}
            value={aircraft}
            placeholder="Ej: Boeing 737-800"
          />
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Ionicons name="save-outline" size={20} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Guardar vuelo</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
