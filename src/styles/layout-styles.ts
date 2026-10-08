import { colors } from '@/constants/theme';

// Opciones visuales del Stack raiz (app/_layout.tsx): header oscuro con flecha de volver
// para las pantallas que se abren por encima de las tabs.
export const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.deep },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.deep },
};
