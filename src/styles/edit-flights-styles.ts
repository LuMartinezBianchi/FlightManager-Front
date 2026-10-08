import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Modificar vuelos: lista editable (app/edit-flights.tsx).
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  list: { paddingLeft: spacing.lg, paddingRight: spacing.lg },

  // ---------- Buscador ----------
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: fontSize.md, padding: spacing.md },

  day: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    backgroundColor: colors.deep,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },

  // ---------- Fila de un vuelo ----------
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowText: { flex: 1 },
  flightNumber: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  route: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: 'bold', marginTop: 3 },
  aircraft: { color: colors.textFaint, fontSize: fontSize.xs, marginTop: 2 },
  editButton: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
