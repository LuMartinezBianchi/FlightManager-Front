import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Agregar vuelo manual (app/add-flight-manual.tsx).
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  form: { flex: 1, padding: spacing.lg },

  // ---------- Campos ----------
  row: { flexDirection: 'row' },
  halfLeft: { flex: 1, marginRight: spacing.md },
  halfRight: { flex: 1 },
  fieldBox: { marginBottom: spacing.md },
  label: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: 'bold', marginBottom: spacing.xs },
  input: {
    color: colors.text,
    fontSize: fontSize.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },

  // ---------- Barra de abajo ----------
  bottomBar: {
    backgroundColor: colors.panel,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  primaryButtonText: { color: colors.onAccent, fontSize: fontSize.lg, fontWeight: 'bold' },
  buttonIcon: { marginRight: spacing.sm },
});
