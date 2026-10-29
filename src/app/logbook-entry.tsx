import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, SectionList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';
import { SignaturePad } from '@/components/signature-pad';
import { emptyLogbook, filledLogbook } from '@/data/logbook';
import { sections, validateLogbook, type Field } from '@/logbook/logbook-form';
import { styles } from '@/styles/logbook-entry-styles';

const errorText = { color: colors.red, fontSize: 12, marginTop: 4 };

// Formulario del libro de vuelo, con los campos de la hoja en su orden.
// Se abre vacio para cargar un vuelo por primera vez (desde Próx. vuelo)

export default function LogbookEntryScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const editing = mode === 'edit';
  const [form, setForm] = useState<Record<string, string>>(editing ? filledLogbook : emptyLogbook);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Mientras se firma, la lista no debe scrollear
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const handleDrawingChange = useCallback((drawing: boolean) => setScrollEnabled(!drawing), []);

  function change(key: string, text: string) {
    setForm({ ...form, [key]: text });
    if (errors[key]) {
      const { [key]: _resuelto, ...resto } = errors;
      setErrors(resto);
    }
  }

  function save() {
    const encontrados = validateLogbook(form);
    setErrors(encontrados);
    if (Object.keys(encontrados).length === 0) {
      // Guardar en la base todavia no esta conectado: por ahora solo vuelve
      router.back();
    }
  }

  function renderField(item: Field, index: number, total: number) {
    return (
      <View key={item.key} style={[styles.fieldBox, total > 1 && index === 0 ? styles.halfLeft : styles.halfRight]}>
        <Text style={styles.label}>
          {item.label}
          {item.required ? ' *' : ''}
        </Text>
        {item.kind === 'signature' ? (
          <SignaturePad
            value={form[item.key] ?? ''}
            onChange={(dataUrl) => change(item.key, dataUrl)}
            onDrawingChange={handleDrawingChange}
          />
        ) : (
          <TextInput
            style={styles.input}
            onChangeText={(text) => change(item.key, text)}
            value={form[item.key] ?? ''}
            placeholder={item.placeholder}
            keyboardType={item.keyboardType}
            autoCapitalize={item.autoCapitalize ?? 'sentences'}
          />
        )}
        {errors[item.key] && <Text style={errorText}>{errors[item.key]}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: editing ? 'Editar registro' : 'Cargar libro de vuelo' }} />

      <SectionList
        sections={sections.map((section) => ({ title: section.title, data: section.rows }))}
        keyExtractor={(row) => row[0].key}
        style={styles.form}
        scrollEnabled={scrollEnabled}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item: row }) => (
          <View style={styles.row}>{row.map((field, index) => renderField(field, index, row.length))}</View>
        )}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <Pressable style={styles.primaryButton} onPress={save}>
          <Ionicons name="save-outline" size={20} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>{editing ? 'Guardar cambios' : 'Guardar registro'}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
