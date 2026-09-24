import { StyleSheet } from 'react-native';
import { colors, fontSize } from '@/constants/theme';

// Opciones visuales del Stack raíz.
export const stackScreenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.deep },
};

// Opciones visuales de los Stacks dentro de una tab (ej: Perfil): header oscuro con flecha de volver.
export const innerStackScreenOptions = {
  headerStyle: { backgroundColor: colors.deep },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.deep },
};

// StyleSheet.create conserva los tipos literales (fontWeight, etc.) que <Tabs> necesita;
// un objeto suelto los generaliza a `string` y ya no matchea.
const tabBarStyles = StyleSheet.create({
  bar: { backgroundColor: colors.panel, borderTopColor: colors.border, borderTopWidth: 1 },
  label: { fontSize: fontSize.xs, fontWeight: '600' },
});

// Opciones visuales de la barra de tabs inferior.
export const tabBarScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.cyan,
  tabBarInactiveTintColor: colors.textFaint,
  tabBarStyle: tabBarStyles.bar,
  tabBarLabelStyle: tabBarStyles.label,
};
