import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, SectionList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { emptyLogbook, filledLogbook } from '@/data/logbook';
import { styles } from '@/styles/logbook-entry-styles';

type Item = { key: string; label: string; placeholder?: string; options?: string[]; multiline?: boolean };

// Campos del libro de vuelo que pide ANAC, agrupados por seccion.

const sections: { title: string; data: Item[][] }[] = [
  {
    title: 'Aeronave',
    data: [
      [
        { key: 'plate', label: 'Matrícula', placeholder: 'Ej: LV-ABC' },
        { key: 'type', label: 'Tipo de aeronave' },
      ],
      [{ key: 'operator', label: 'Explotador' }],
    ],
  },
  {
    title: 'Vuelo',
    data: [
      [
        { key: 'date', label: 'Fecha' },
        { key: 'number', label: 'N.º de vuelo' },
      ],
      [{ key: 'flightType', label: 'Tipo de vuelo', options: ['Regular', 'No regular', 'Ferry'] }],
      [{ key: 'rules', label: 'Reglas de vuelo', options: ['VFR', 'IFR'] }],
    ],
  },
  {
    title: 'Ruta',
    data: [
      [
        { key: 'from', label: 'Origen (OACI)' },
        { key: 'to', label: 'Destino (OACI)' },
      ],
      [{ key: 'alternate', label: 'Alternativo', placeholder: 'Código OACI' }],
    ],
  },
  {
    title: 'Horarios (UTC)',
    data: [
      [
        { key: 'blockOff', label: 'blockOff', placeholder: '--:--' },
        { key: 'takeoff', label: 'Despegue', placeholder: '--:--' },
      ],
      [
        { key: 'landing', label: 'Aterrizaje', placeholder: '--:--' },
        { key: 'blockOn', label: 'blockOn', placeholder: '--:--' },
      ],
      [
        { key: 'flightTime', label: 'Tiempo de vuelo', placeholder: 'h:mm' },
        { key: 'blockTime', label: 'Tiempo block', placeholder: 'h:mm' },
      ],
    ],
  },
  {
    title: 'Operación',
    data: [
      [{ key: 'condition', label: 'Condición', options: ['Diurno', 'Nocturno', 'Mixto'] }],
      [
        { key: 'landings', label: 'Aterrizajes', placeholder: '0' },
        { key: 'passengers', label: 'Pasajeros', placeholder: '0' },
      ],
      [{ key: 'cargo', label: 'Carga (kg)', placeholder: '0' }],
    ],
  },
  {
    title: 'Combustible (kg)',
    data: [
      [
        { key: 'fuelTakeoff', label: 'Al despegue', placeholder: '0' },
        { key: 'fuelLanding', label: 'Al aterrizar', placeholder: '0' },
      ],
      [{ key: 'fuelAdded', label: 'Combustible cargado', placeholder: '0' }],
    ],
  },
  {
    title: 'Tripulación',
    data: [
      [
        { key: 'captain', label: 'Piloto al mando' },
        { key: 'captainLicense', label: 'Licencia / N.º' },
      ],
      [
        { key: 'copilot', label: 'Copiloto' },
        { key: 'copilotLicense', label: 'Licencia / N.º', placeholder: 'N.º' },
      ],
      [{ key: 'cabin', label: 'Tripulantes de cabina' }],
    ],
  },
  {
    title: 'Novedades',
    data: [
      [
        {
          key: 'notes',
          label: 'Observaciones y discrepancias técnicas',
          placeholder: 'Describí cualquier novedad del vuelo…',
          multiline: true,
        },
      ],
      [{ key: 'signature', label: 'Firma del piloto al mando', placeholder: 'Tocá para firmar' }],
    ],
  },
];

// Formulario del libro de vuelo con los datos que pide ANAC.
// Se abre vacio para cargar un vuelo por primera vez (desde Próx. vuelo)

export default function LogbookEntryScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const editing = mode === 'edit';
  const [form, setForm] = useState(editing ? filledLogbook : emptyLogbook);

  function change(key: string, text: string) {
    setForm({ ...form, [key]: text });
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: editing ? 'Editar registro' : 'Cargar libro de vuelo' }} />

      <SectionList
        sections={sections}
        keyExtractor={(row) => row[0].key}
        style={styles.form}
        ListHeaderComponent={<Text style={styles.info}>AR1204 · EZE → COR · 24 Ago 2026</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {row.map((item, index) => (
              <View
                key={item.key}
                style={[styles.fieldBox, index === 0 && row.length > 1 ? styles.halfLeft : styles.halfRight]}
              >
                <Text style={styles.label}>{item.label}</Text>

                {item.options ? (
                  <View style={styles.options}>
                    {item.options.map((option, i, all) => (
                      <Pressable
                        key={option}
                        style={[
                          styles.option,
                          i < all.length - 1 && styles.optionSpace,
                          option === form[item.key] && styles.optionOn,
                        ]}
                        onPress={() => change(item.key, option)}
                      >
                        <Text style={[styles.optionText, option === form[item.key] && styles.optionTextOn]}>
                          {option}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                ) : (
                  <TextInput
                    style={[styles.input, item.multiline && styles.inputMultiline]}
                    onChangeText={(text) => change(item.key, text)}
                    value={form[item.key]}
                    placeholder={item.placeholder}
                    multiline={item.multiline}
                  />
                )}
              </View>
            ))}
          </View>
        )}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Ionicons name="save-outline" size={20} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>{editing ? 'Guardar cambios' : 'Guardar registro'}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
