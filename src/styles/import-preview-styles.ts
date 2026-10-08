import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Agregar vuelos, paso 2: vista previa (app/import-preview.tsx).
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  list: { paddingLeft: spacing.lg, paddingRight: spacing.lg },
  
  // ---------- Resumen del archivo ----------
  summary: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fileName: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  chips: { flexDirection: 'row', marginTop: spacing.sm },
  greenChip: {
    backgroundColor: colors.greenSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
    marginRight: spacing.sm,
  },
  greenChipText: { color: colors.green, fontSize: fontSize.sm, fontWeight: '700' },
  redChip: {
    backgroundColor: colors.redSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
  },
  redChipText: { color: colors.red, fontSize: fontSize.sm, fontWeight: '700' },

  // ---------- Filas ----------
  group: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    backgroundColor: colors.deep,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowError: { borderColor: colors.red },
  mark: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  rowText: { flex: 1 },
  rowTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  rowHint: { color: colors.textFaint, fontSize: fontSize.xs, marginTop: 2 },
  rowDetail: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },
  more: { color: colors.textFaint, fontSize: fontSize.sm, textAlign: 'center', padding: spacing.md },

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
  buttonIcon: { marginRight: spacing.sm },
  changeFile: { color: colors.cyan, fontSize: fontSize.md, fontWeight: 'bold', textAlign: 'center', padding: spacing.xs },
});
