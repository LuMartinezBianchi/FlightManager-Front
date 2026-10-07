import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Field, FieldRow } from '@/components/field';
import { OptionGroup } from '@/components/option-group';
import { common } from '@/styles/common';
import { forms } from '@/styles/forms';

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <View style={forms.section}>
      <View>
        <Text style={forms.sectionTitle}>{title}</Text>
        {hint && <Text style={forms.sectionHint}>{hint}</Text>}
      </View>
      {children}
    </View>
  );
}

// Formulario del libro de vuelo con los datos que pide ANAC.
// Se abre vacio para cargar un vuelo por primera vez (desde Próx. vuelo)
// o con los datos cargados para editarlo (desde Libro de vuelo, con mode=edit).
export default function LogbookEntryScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const editing = mode === 'edit';

  // Solo en modo edicion los campos vienen con datos
  const v = (text: string) => (editing ? text : undefined);

  return (
    <View style={common.screen}>
      <Stack.Screen options={{ title: editing ? 'Editar registro' : 'Cargar libro de vuelo' }} />

      <ScrollView contentContainerStyle={[forms.content, { gap: 24 }]}>
        <Text style={forms.info}>AR1204 · EZE → COR · 24 Ago 2026</Text>

        <Section title="Aeronave">
          <FieldRow>
            <Field label="Matrícula" value={v('LV-GKM')} placeholder="Ej: LV-ABC" />
            <Field label="Tipo / modelo" value="Boeing 737-800" />
          </FieldRow>
          <Field label="Explotador" value="Aerolíneas Argentinas" />
        </Section>

        <Section title="Vuelo">
          <FieldRow>
            <Field label="Fecha" value="24/08/2026" />
            <Field label="N.º de vuelo" value="AR1204" />
          </FieldRow>
          <OptionGroup label="Tipo de vuelo" options={['Regular', 'No regular', 'Ferry']} selected="Regular" />
          <OptionGroup label="Reglas de vuelo" options={['VFR', 'IFR']} selected={v('IFR')} />
        </Section>

        <Section title="Ruta">
          <FieldRow>
            <Field label="Origen (OACI)" value="SAEZ · Ezeiza" />
            <Field label="Destino (OACI)" value="SACO · Córdoba" />
          </FieldRow>
          <Field label="Alternativo" value={v('SAMR')} placeholder="Código OACI" />
        </Section>

        <Section title="Horarios (UTC)" hint="Hora del evento en UTC">
          <FieldRow>
            <Field label="Calzos fuera (Block off)" value={v('10:05')} placeholder="--:--" />
            <Field label="Despegue" value={v('10:15')} placeholder="--:--" />
          </FieldRow>
          <FieldRow>
            <Field label="Aterrizaje" value={v('12:05')} placeholder="--:--" />
            <Field label="Calzos puestos (Block on)" value={v('12:15')} placeholder="--:--" />
          </FieldRow>
          <FieldRow>
            <Field label="Tiempo de vuelo" value={v('1:50')} placeholder="h:mm" />
            <Field label="Tiempo block" value={v('2:10')} placeholder="h:mm" />
          </FieldRow>
        </Section>

        <Section title="Operación">
          <OptionGroup label="Condición" options={['Diurno', 'Nocturno', 'Mixto']} selected={v('Diurno')} />
          <FieldRow>
            <Field label="Aterrizajes" value={v('1')} placeholder="0" />
            <Field label="Pasajeros" value={v('148')} placeholder="0" />
          </FieldRow>
          <Field label="Carga (kg)" value={v('1.250')} placeholder="0" />
        </Section>

        <Section title="Combustible (kg)">
          <FieldRow>
            <Field label="Al despegue" value={v('12.400')} placeholder="0" />
            <Field label="Al aterrizar" value={v('6.100')} placeholder="0" />
          </FieldRow>
          <Field label="Combustible cargado" value={v('8.200')} placeholder="0" />
        </Section>

        <Section title="Tripulación">
          <FieldRow>
            <Field label="Piloto al mando" value="Martín Fernández" />
            <Field label="Licencia / N.º" value="ATPL 48213" />
          </FieldRow>
          <FieldRow>
            <Field label="Copiloto" value="Laura Castillo" />
            <Field label="Licencia / N.º" value={v('CPL 51877')} placeholder="Tipo y N.º" />
          </FieldRow>
          <Field label="Tripulantes de cabina" value="Roberto Paz, Sofía García" />
        </Section>

        <Section title="Novedades">
          <Field
            label="Observaciones y discrepancias técnicas"
            value={v('Sin novedades.')}
            placeholder="Describí cualquier novedad del vuelo…"
            multiline
          />
          <Field label="Firma del piloto al mando" value={v('Martín Fernández · firmado')} placeholder="Tocá para firmar" />
        </Section>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={forms.bottomBar}>
        <Button
          label={editing ? 'Guardar cambios' : 'Guardar registro'}
          icon="save-outline"
          onPress={() => router.back()}
        />
      </SafeAreaView>
    </View>
  );
}
