import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Agregar vuelos, paso 3: importacion exitosa (app/import-success.tsx).
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },

  success: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  mark: {
    width: 88,
    height: 88,
    borderRadius: radius.round,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  text: { color: colors.textDim, fontSize: fontSize.md, textAlign: 'center', marginTop: spacing.sm },

  // ---------- Botones de abajo ----------
  bottomBar: { padding: spacing.lg, paddingBottom: spacing.xl },
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
  secondaryButton: {
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
