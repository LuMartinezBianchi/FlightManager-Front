import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de las pantallas con formularios y de sus componentes (Field, OptionGroup, Button, Steps)
export const forms = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
  section: { gap: spacing.md },
  sectionTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700' },
  sectionHint: { color: colors.textFaint, fontSize: fontSize.sm, marginTop: 2 },
  info: { color: colors.textDim, fontSize: fontSize.sm },

  // ---------- Campos ----------
  label: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    color: colors.text,
    fontSize: fontSize.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  inputMultiline: { minHeight: 96, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: spacing.md },
  col: { flex: 1 },

  // ---------- Opciones (Regular / No regular, VFR / IFR, etc.) ----------
  options: { flexDirection: 'row', gap: spacing.sm },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  optionOn: { backgroundColor: colors.cyanSoft, borderColor: colors.cyan },
  optionText: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },
  optionTextOn: { color: colors.cyan, fontWeight: '700' },

  // ---------- Botones ----------
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  buttonPrimary: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  buttonSecondary: { backgroundColor: colors.card2, borderColor: colors.border },
  buttonDanger: { backgroundColor: colors.redSoft, borderColor: colors.red },
  buttonText: { fontSize: fontSize.lg, fontWeight: '700' },

  // Barra fija de abajo con el boton principal
  bottomBar: {
    backgroundColor: colors.panel,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },

  // ---------- Pasos de la importacion ----------
  steps: { flexDirection: 'row', gap: spacing.xs + 2, marginBottom: spacing.sm },
  step: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  stepOn: { backgroundColor: colors.cyan },
});
