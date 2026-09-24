import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '@/constants/theme';

// Estilos que se repiten en varias pantallas.
export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  gutter: { paddingHorizontal: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  subtitle: { color: colors.textDim, fontSize: fontSize.sm, marginTop: 2 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.7 },
});
