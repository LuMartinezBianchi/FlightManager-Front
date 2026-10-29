import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, SectionList, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';
import { agruparPorDia, coincideBusqueda, useVuelos, vuelosFuturos, type DiaVuelos } from '@/hooks/use-vuelos';
import { styles } from '@/styles/edit-flights-styles';

// Modificar vuelos: lista de vuelos programados, cada uno con su lapiz para editarlo.
export default function EditFlightsScreen() {
  const [search, setSearch] = useState('');
  const { vuelos } = useVuelos();

  // Sin busqueda solo se ven los vuelos futuros; al buscar (por numero, ruta o dia) aparecen tambien los anteriores
  const filtered: DiaVuelos[] = useMemo(() => {
    const candidatos = search.trim() ? vuelos : vuelosFuturos(vuelos);
    return agruparPorDia(candidatos.filter((v) => coincideBusqueda(v, search)));
  }, [vuelos, search]);

  return (
    <View style={styles.screen}>
      <SectionList
        sections={filtered}
        keyExtractor={(item) => `${item.number}-${item.date}`}
        style={styles.list}
        ListHeaderComponent={
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={colors.textFaint} />
            <TextInput
              style={styles.searchInput}
              onChangeText={setSearch}
              value={search}
              placeholder="Buscar por n.º, ruta o día (24/08/2026)"
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

            <Pressable
              style={styles.editButton}
              onPress={() => router.push({ pathname: '/edit-flight', params: { number: item.number, date: item.date } })}
            >
              <Ionicons name="pencil" size={16} color={colors.cyan} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
