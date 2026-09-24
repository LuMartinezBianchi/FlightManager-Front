import { Stack } from 'expo-router';

import { innerStackScreenOptions } from '@/styles/navigation';

// Stack de la tab Perfil: la pantalla principal y las que se abren desde ella.
export default function ProfileLayout() {
  return (
    <Stack screenOptions={innerStackScreenOptions}>
      <Stack.Screen name="index" options={{ title: 'Perfil', headerShown: false }} />
      <Stack.Screen name="add-flight" options={{ title: 'Agregar vuelos' }} />
      <Stack.Screen name="edit-flights" options={{ title: 'Modificar vuelos' }} />
    </Stack>
  );
}
