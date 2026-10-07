import { router } from 'expo-router';
import { useState } from 'react';
import { SectionList, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { OptionGroup } from '@/components/option-group';
import { LogbookForm as Form } from '@/data/logbook';
import { common } from '@/styles/common';
import { forms } from '@/styles/forms';

type Item = { key: string; label: string; placeholder?: string; options?: string[]; multiline?: boolean };

// Campos del libro de vuelo que pide ANAC, agrupados por seccion.
// Cada fila tiene 1 o 2 campos (los de 2 comparten la fila a partes iguales).
const sections: { title: string; data: Item[][] }[] = [
  {
    title: 'Aeronave',
    data: [
      [
        { key: 'plate', label: 'Matrícula', placeholder: 'Ej: LV-ABC' },
        { key: 'type', label: 'Tipo / modelo' },
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
        { key: 'blockOff', label: 'Calzos fuera', placeholder: '--:--' },
        { key: 'takeoff', label: 'Despegue', placeholder: '--:--' },
      ],
      [
        { key: 'landing', label: 'Aterrizaje', placeholder: '--:--' },
        { key: 'blockOn', label: 'Calzos puestos', placeholder: '--:--' },
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
        { key: 'copilotLicense', label: 'Licencia / N.º', placeholder: 'Tipo y N.º' },
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

// Formulario del libro de vuelo. "initial" trae los datos con los que arranca:
// vacio para cargar un vuelo, o completo para editarlo.
export function LogbookForm({ initial, buttonLabel }: { initial: Form; buttonLabel: string }) {
  const [form, setForm] = useState(initial);

  function change(key: string, text: string) {
    setForm({ ...form, [key]: text });
  }

  return (
    <View style={common.screen}>
      <SectionList
        sections={sections}
        keyExtractor={(row) => row[0].key}
        style={forms.form}
        ListHeaderComponent={<Text style={forms.info}>AR1204 · EZE → COR · 24 Ago 2026</Text>}
        renderSectionHeader={({ section }) => <Text style={forms.sectionTitle}>{section.title}</Text>}
        renderItem={({ item: row }) => (
          <View style={forms.row}>
            {row.map((item, index) => (
              <View key={item.key} style={index === 0 && row.length > 1 ? forms.halfLeft : forms.halfRight}>
                {item.options ? (
                  <OptionGroup
                    label={item.label}
                    options={item.options}
                    selected={form[item.key]}
                    onSelect={(option) => change(item.key, option)}
                  />
                ) : (
                  <Field
                    label={item.label}
                    value={form[item.key]}
                    onChangeText={(text) => change(item.key, text)}
                    placeholder={item.placeholder}
                    multiline={item.multiline}
                  />
                )}
              </View>
            ))}
          </View>
        )}
      />

      <View style={forms.bottomBar}>
        <Button label={buttonLabel} icon="save-outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
