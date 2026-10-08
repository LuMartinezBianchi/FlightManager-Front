import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Libro de vuelo (app/(tabs)/flight-log.tsx) y de todo lo que se dibuja en ella.
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  gutter: { paddingHorizontal: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  subtitle: { color: colors.textDim, fontSize: fontSize.sm, marginTop: 2 },

  editToggle: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card2,
  },
  editToggleOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  editToggleText: { color: colors.text, fontSize: fontSize.md, fontWeight: 'bold' },
  editToggleTextOn: { color: colors.onAccent },

  list: { paddingLeft: spacing.lg, paddingRight: spacing.lg },

  // ---------- Seleccionar todos ----------
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  selectAll: { flexDirection: 'row', alignItems: 'center' },
  selectAllText: { color: colors.text, fontSize: fontSize.md, fontWeight: 'bold', marginLeft: spacing.md },
  chip: {
    backgroundColor: colors.cyanSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
  },
  chipText: { color: colors.cyan, fontSize: fontSize.sm, fontWeight: '700' },
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
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recordOn: { backgroundColor: colors.card2, borderColor: colors.cyan, borderWidth: 2 },
  recordInfo: { flex: 1, marginLeft: spacing.md },
  recordTop: { flexDirection: 'row', alignItems: 'center' },
  recordNumber: { color: colors.text, fontSize: fontSize.md, fontWeight: 'bold', marginRight: spacing.sm },
  recordDate: { color: colors.textFaint, fontSize: fontSize.sm },
  recordRoute: { color: colors.textDim, fontSize: fontSize.md, marginTop: spacing.xs },
  hours: { alignItems: 'flex-end' },
  hoursValue: { color: colors.cyan, fontSize: fontSize.xl, fontWeight: 'bold' },
  hoursLabel: { color: colors.textFaint, fontSize: fontSize.xs },
  pencil: {
    padding: spacing.sm,
    marginLeft: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // ---------- Barra de exportar ----------
  exportBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  exportLabel: { color: colors.textDim, fontSize: fontSize.sm },
  exportTotal: { color: colors.text, fontSize: fontSize.lg, fontWeight: 'bold' },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.cyan,
  },
  exportIcon: { marginRight: spacing.sm },
  exportButtonText: { color: colors.onAccent, fontSize: fontSize.lg, fontWeight: 'bold' },
});
