import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos del formulario del libro de vuelo (app/logbook-entry.tsx).
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  form: { padding: spacing.lg },
  info: { color: colors.textDim, fontSize: fontSize.sm, marginBottom: spacing.md },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    backgroundColor: colors.deep,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },

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
  inputMultiline: { height: 100 },

  // ---------- Opciones (Regular / No regular, VFR / IFR, etc.) ----------
  options: { flexDirection: 'row' },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  optionSpace: { marginRight: spacing.sm },
  optionOn: { backgroundColor: colors.cyanSoft, borderColor: colors.cyan },
  optionText: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: 'bold' },
  optionTextOn: { color: colors.cyan },

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
