import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { stackScreenOptions } from '@/styles/navigation';

// Layout raíz: un Stack que contiene el grupo de tabs.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={stackScreenOptions} />
    </>
  );
}
