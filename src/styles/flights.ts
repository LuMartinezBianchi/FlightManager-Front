import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la tab Vuelos y de las pantallas que se abren desde ella:
// agregar (.xlsx y manual), modificar y eliminar vuelos.
export const flights = StyleSheet.create({
  // ---------- Tab Vuelos ----------
  actions: { gap: spacing.sm, marginBottom: spacing.sm },

  // ---------- Agregar desde .xlsx: elegir archivo ----------
  dropzone: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.cyan,
    borderRadius: radius.xl,
  },
  dropzoneIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.cyan,
  },
  chooseButtonText: { color: colors.onAccent, fontSize: fontSize.md, fontWeight: '700' },
  template: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  templateText: { flex: 1, gap: 2 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },

  // ---------- Agregar desde .xlsx: vista previa ----------
  summary: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  summaryText: { flex: 1, gap: spacing.xs + 2 },
  chips: { flexDirection: 'row', gap: spacing.xs + 2 },
  groupLabel: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
  importRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  importRowError: { borderColor: colors.red },
  importText: { flex: 1, gap: 2 },
  moreText: { color: colors.textFaint, fontSize: fontSize.sm, fontWeight: '600', textAlign: 'center' },
  changeFile: { color: colors.cyan, fontSize: fontSize.md, fontWeight: '600', textAlign: 'center', padding: spacing.xs },

  // ---------- Agregar desde .xlsx: exito ----------
  success: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  successText: { color: colors.textDim, fontSize: fontSize.md, textAlign: 'center' },

  // ---------- Modificar vuelos ----------
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: fontSize.md, paddingVertical: spacing.md },
  editRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, marginBottom: spacing.sm },
  editRowText: { flex: 1, gap: 3 },
  editRowRoute: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },
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

  // ---------- Dialogo de eliminar vuelo ----------
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  dialog: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  dialogIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.redSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogText: { color: colors.textDim, fontSize: fontSize.md, textAlign: 'center' },
  dialogButtons: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  dialogButton: { flex: 1 },
});
