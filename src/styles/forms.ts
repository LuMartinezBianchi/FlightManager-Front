import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de las pantallas con formularios y de sus componentes (Field, OptionGroup, Button, Steps)
export const forms = StyleSheet.create({
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
  fieldBox: { marginBottom: spacing.md },
  label: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
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
  inputMultiline: { height: 100 },

  // Dos campos en la misma fila
  row: { flexDirection: 'row' },
  halfLeft: { flex: 1, marginRight: spacing.md },
  halfRight: { flex: 1 },

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

  // ---------- Botones ----------
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  buttonIcon: { marginRight: spacing.sm },
  buttonPrimary: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  buttonSecondary: { backgroundColor: colors.card2, borderColor: colors.border },
  buttonDanger: { backgroundColor: colors.redSoft, borderColor: colors.red },
  buttonText: { fontSize: fontSize.lg, fontWeight: 'bold' },
  buttonTextPrimary: { color: colors.onAccent },
  buttonTextSecondary: { color: colors.text },
  buttonTextDanger: { color: colors.red },

  // Barra fija de abajo con el boton principal
  bottomBar: {
    backgroundColor: colors.panel,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // ---------- Pasos de la importacion ----------
  steps: { flexDirection: 'row', marginBottom: spacing.sm },
  step: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border, marginRight: spacing.xs },
  stepOn: { backgroundColor: colors.cyan },
});
