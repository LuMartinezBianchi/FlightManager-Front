import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { stackScreenOptions } from '@/styles/layout-styles';

// Mantiene la pantalla de carga hasta saber si hay una sesion guardada (evita ver el login un instante).
SplashScreen.preventAutoHideAsync();

// Layout raiz: un Stack que contiene el grupo de tabs y las pantallas
// que se abren por encima de la barra de tabs.
// Es el lugar para cosas globales, como el StatusBar y la sesion (AuthProvider).
// los <> </> son obligatorios.
export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Navegacion />
    </AuthProvider>
  );
}

// Elige que pantallas existen segun haya sesion o no.
// Stack.Protected: si el guard es false esas pantallas no se pueden abrir y la app redirige a redirectTo.
function Navegacion() {
  const { token, cargando } = useAuth();

  useEffect(() => {
    if (!cargando) SplashScreen.hide();
  }, [cargando]);

  // Todavia se esta leyendo el token guardado
  if (cargando) return null;

  return (
    <Stack screenOptions={stackScreenOptions}>
      {/* Sin sesion: solo iniciar sesion y crear cuenta */}
      <Stack.Protected guard={!token} redirectTo="/">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="registro" options={{ title: 'Crear cuenta' }} />
      </Stack.Protected>

      {/* Con sesion: toda la app. Sin sesion se redirige a /login */}
      <Stack.Protected guard={!!token} redirectTo="/login">
        <Stack.Screen name="(tabs)" options={{ headerShown: false , title: "Volver"}} />

        {/* Detalle de un vuelo (al tocar una tarjeta de vuelo) */}
        <Stack.Screen name="flight" options={{ title: 'Detalle del vuelo' }} />
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
      </Stack.Protected>
    </Stack>
  );
}
