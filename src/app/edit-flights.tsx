import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SectionList, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';
import { sections } from '@/data/flights';
import { styles } from '@/styles/edit-flights-styles';

// Modificar vuelos: lista de vuelos programados, cada uno con su lapiz para editarlo.
export default function EditFlightsScreen() {
  const [search, setSearch] = useState('');

  // Se queda con los vuelos que contienen lo buscado, y con los dias que tengan alguno
  const filtered: typeof sections = [];
  for (const section of sections) {
    const data = section.data.filter((f) =>
      (f.number + f.from + f.to).toLowerCase().includes(search.toLowerCase()),
    );
    if (data.length > 0) {
      filtered.push({ title: section.title, data: data });
    }
  }

  return (
    <View style={styles.screen}>
      <SectionList
        sections={filtered}
        keyExtractor={(item) => item.number}
        style={styles.list}
        ListHeaderComponent={
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={colors.textFaint} />
            <TextInput
              style={styles.searchInput}
              onChangeText={setSearch}
              value={search}
              placeholder="Buscar por n.º de vuelo o ruta"
            />
          </View>
        }
        renderSectionHeader={({ section }) => <Text style={styles.day}>{section.title}</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.flightNumber}>Vuelo {item.number}</Text>
              <Text style={styles.route}>
                {item.from} → {item.to} · {item.dep} – {item.arr}
              </Text>
              <Text style={styles.aircraft}>{item.aircraft}</Text>
            </View>

            <Pressable style={styles.editButton} onPress={() => router.push('/edit-flight')}>
              <Ionicons name="pencil" size={16} color={colors.cyan} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
