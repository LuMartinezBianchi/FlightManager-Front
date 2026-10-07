import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SectionList, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';
import { sections } from '@/data/flights';
import { calendar } from '@/styles/calendar';
import { common } from '@/styles/common';
import { flights as styles } from '@/styles/flights';
import { forms } from '@/styles/forms';

// Modificar vuelos: lista de vuelos programados, cada uno con su lapiz para editarlo.
export default function EditFlightsScreen() {
  const [query, setQuery] = useState('');

  // Filtra por numero de vuelo o ruta, y saca los dias que quedan sin vuelos
  const filtered = sections
    .map((section) => ({
      ...section,
      data: section.data.filter((f) =>
        `${f.number} ${f.from} ${f.to}`.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SectionList
      style={common.screen}
      sections={filtered}
      keyExtractor={(item) => item.number}
      contentContainerStyle={forms.content}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.textFaint} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por n.º de vuelo o ruta"
            placeholderTextColor={colors.textFaint}
          />
        </View>
      }
      renderSectionHeader={({ section }) => (
        <Text style={[calendar.label, calendar.dayLabel]}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <View style={[common.card, styles.editRow]}>
          <View style={styles.editRowText}>
            <Text style={calendar.flightNumber}>Vuelo {item.number}</Text>
            <Text style={styles.editRowRoute}>
              {item.from} → {item.to} · {item.dep} – {item.arr}
            </Text>
            <Text style={calendar.duration}>{item.aircraft}</Text>
          </View>

          <Pressable style={styles.pencil} onPress={() => router.push('/edit-flight')}>
            <Ionicons name="pencil" size={16} color={colors.cyan} />
          </Pressable>
        </View>
      )}
    />
  );
}
