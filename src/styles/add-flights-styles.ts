import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Agregar vuelos, paso 1: elegir archivo (app/add-flights.tsx).
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep, padding: spacing.lg },

  // ---------- Zona para elegir el archivo ----------
  dropzone: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cyan,
    borderRadius: radius.xl,
    marginBottom: spacing.lg,
  },
  dropzoneIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dropzoneTitle: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  dropzoneText: { color: colors.textDim, fontSize: fontSize.sm, marginTop: spacing.xs, marginBottom: spacing.lg },
  chooseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.cyan,
  },
  chooseIcon: { marginRight: spacing.sm },
  chooseButtonText: { color: colors.onAccent, fontSize: fontSize.md, fontWeight: 'bold' },

  // ---------- Plantilla ----------
  template: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  templateText: { flex: 1, marginRight: spacing.md },
  templateTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  templateColumns: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },

  // ---------- Separador "o" ----------
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },

  // ---------- Boton secundario ----------
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.sm,
    backgroundColor: colors.card2,
    borderColor: colors.border,
  },
  secondaryButtonText: { color: colors.text, fontSize: fontSize.lg, fontWeight: 'bold' },
  buttonIcon: { marginRight: spacing.sm },
});
