import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Libro de vuelo (app/(tabs)/flight-log.tsx).
export const flightLog = StyleSheet.create({
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card2,
  },
  editButtonOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  editText: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  editTextOn: { color: colors.onAccent },

  list: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },

  // ---------- Seleccionar todos ----------
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  selectAll: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  selectAllText: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },

  // ---------- Registro ----------
  record: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  recordOn: { backgroundColor: colors.card2, borderColor: colors.cyan, borderWidth: 2 },
  recordInfo: { flex: 1, gap: spacing.xs },
  recordTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  recordNumber: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  recordDate: { color: colors.textFaint, fontSize: fontSize.sm, fontWeight: '600' },
  recordRoute: { color: colors.textDim, fontSize: fontSize.md, fontWeight: '600' },
  hours: { alignItems: 'flex-end' },
  hoursValue: { color: colors.cyan, fontSize: fontSize.xl, fontWeight: '700' },
  hoursLabel: { color: colors.textFaint, fontSize: fontSize.xs, fontWeight: '600' },
  pencil: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ---------- Barra de exportar ----------
  exportBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: spacing.lg,
    paddingVertical: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  exportLabel: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },
  exportTotal: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700' },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.cyan,
  },
  exportButtonText: { color: colors.onAccent, fontSize: fontSize.lg, fontWeight: '700' },
});
