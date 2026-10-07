import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la tab Vuelos y de las pantallas que se abren desde ella:
// agregar (.xlsx y manual), modificar y eliminar vuelos.
export const flights = StyleSheet.create({
  list: { paddingLeft: spacing.lg, paddingRight: spacing.lg },
  screenBody: { padding: spacing.lg },
  day: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    backgroundColor: colors.deep,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },

  // ---------- Agregar desde .xlsx: elegir archivo ----------
  dropzoneIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dropzone: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cyan,
    borderRadius: radius.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
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
  template: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, marginBottom: spacing.lg },
  templateText: { flex: 1, marginRight: spacing.md },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginLeft: spacing.md, marginRight: spacing.md },

  // ---------- Agregar desde .xlsx: vista previa ----------
  summary: { padding: spacing.md },
  chips: { flexDirection: 'row', marginTop: spacing.sm },
  chipSpace: { marginRight: spacing.sm },
  importRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, marginBottom: spacing.sm },
  importRowError: { borderColor: colors.red },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  importMark: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  importText: { flex: 1 },
  moreText: { color: colors.textFaint, fontSize: fontSize.sm, textAlign: 'center', padding: spacing.md },
  changeFile: { color: colors.cyan, fontSize: fontSize.md, fontWeight: 'bold', textAlign: 'center', padding: spacing.xs },

  // ---------- Agregar desde .xlsx: exito ----------
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  successMark: {
    width: 88,
    height: 88,
    borderRadius: radius.round,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  successText: { color: colors.textDim, fontSize: fontSize.md, textAlign: 'center', marginTop: spacing.sm },

  // ---------- Modificar vuelos ----------
  searchInput: { flex: 1, color: colors.text, fontSize: fontSize.md, padding: spacing.md },
  editRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, marginBottom: spacing.sm },
  editRowText: { flex: 1 },
  editRowRoute: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: 'bold', marginTop: 3 },
  editButton: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // ---------- Dialogo de eliminar vuelo ----------
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
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.redSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dialogText: { color: colors.textDim, fontSize: fontSize.md, marginTop: spacing.sm, marginBottom: spacing.lg },
  dialogButtons: { flexDirection: 'row' },
  dialogButtonLeft: { flex: 1, marginRight: spacing.sm },
  dialogButtonRight: { flex: 1 },
});
