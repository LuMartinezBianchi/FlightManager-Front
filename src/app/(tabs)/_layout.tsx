import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { tabBarScreenOptions } from '@/styles/tabs-layout-styles';

// Barra inferior con las 4 pantallas. Cada "name" es el nombre del archivo dentro de app/(tabs)/.
export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabBarScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flights"
        options={{
          title: 'Vuelos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="next-flight"
        options={{
          title: 'Próx. vuelo',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'airplane' : 'airplane-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flight-log"
        options={{
          title: 'Libro vuelo',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
