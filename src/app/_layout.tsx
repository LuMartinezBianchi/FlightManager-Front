import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { stackScreenOptions } from '@/styles/layout-styles';

// Layout raiz: un Stack que contiene el grupo de tabs y las pantallas
// que se abren por encima de la barra de tabs.
// Es el lugar para cosas globales, como el StatusBar.
// los <> </> son obligatorios.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Detalle de un vuelo (al tocar una tarjeta de vuelo) */}
        <Stack.Screen name="flight-detail" options={{ title: 'Detalle del vuelo' }} />

        {/* Agregar vuelos desde .xlsx */}
        <Stack.Screen name="add-flights" options={{ title: 'Agregar vuelos' }} />
        <Stack.Screen name="import-preview" options={{ title: 'Vista previa' }} />
        <Stack.Screen name="import-success" options={{ headerShown: false }} />
        <Stack.Screen name="add-flight-manual" options={{ title: 'Agregar vuelo' }} />

        {/* Modificar vuelos */}
        <Stack.Screen name="edit-flights" options={{ title: 'Modificar vuelos' }} />
        <Stack.Screen name="edit-flight" options={{ title: 'Editar vuelo' }} />

        {/* Libro de vuelo */}
        <Stack.Screen name="logbook-entry" />
      </Stack>
    </>
  );
}
