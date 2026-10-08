import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Editar vuelo y de su dialogo para eliminar (app/edit-flight.tsx).
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
    marginBottom: spacing.sm,
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  primaryButtonText: { color: colors.onAccent, fontSize: fontSize.lg, fontWeight: 'bold' },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    backgroundColor: colors.redSoft,
    borderColor: colors.red,
  },
  dangerButtonText: { color: colors.red, fontSize: fontSize.lg, fontWeight: 'bold' },
  buttonIcon: { marginRight: spacing.sm },

  // ---------- Dialogo de eliminar ----------
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: '85%',
    padding: spacing.xl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  dialogIcon: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.redSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dialogTitle: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  dialogText: { color: colors.textDim, fontSize: fontSize.md, marginTop: spacing.sm, marginBottom: spacing.lg },
  dialogButtons: { flexDirection: 'row' },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginRight: spacing.sm,
    backgroundColor: colors.card2,
    borderColor: colors.border,
  },
  cancelButtonText: { color: colors.text, fontSize: fontSize.lg, fontWeight: 'bold' },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    backgroundColor: colors.redSoft,
    borderColor: colors.red,
  },
  deleteButtonText: { color: colors.red, fontSize: fontSize.lg, fontWeight: 'bold' },
});
