import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { headerScreenOptions, stackScreenOptions } from '@/styles/navigation';

// Layout raiz: un Stack que contiene el grupo de tabs y las pantallas
// que se abren por encima de la barra de tabs (formularios, listas de edicion, etc.).
// Es el lugar para cosas globales, como el StatusBar.
// los <> </> son obligatorios.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="(tabs)" />

        {/* Agregar vuelos desde .xlsx: elegir archivo -> vista previa -> exito */}
        <Stack.Screen name="add-flights" options={{ ...headerScreenOptions, title: 'Agregar vuelos' }} />
        <Stack.Screen name="import-preview" options={{ ...headerScreenOptions, title: 'Vista previa' }} />
        <Stack.Screen name="import-success" options={{ gestureEnabled: false }} />
        <Stack.Screen name="add-flight-manual" options={{ ...headerScreenOptions, title: 'Agregar vuelo' }} />

        {/* Modificar vuelos: lista -> editar (con dialogo para eliminar) */}
        <Stack.Screen name="edit-flights" options={{ ...headerScreenOptions, title: 'Modificar vuelos' }} />
        <Stack.Screen name="edit-flight" options={{ ...headerScreenOptions, title: 'Editar vuelo' }} />

        {/* Formulario del libro de vuelo (cargar por primera vez o editar) */}
        <Stack.Screen name="logbook-entry" options={headerScreenOptions} />
      </Stack>
    </>
  );
}
