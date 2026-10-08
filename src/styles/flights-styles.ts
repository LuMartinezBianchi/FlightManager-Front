import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Vuelos (app/(tabs)/flights.tsx) y de todo lo que se dibuja en ella.
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  list: { paddingLeft: spacing.lg, paddingRight: spacing.lg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  count: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },

  // ---------- Botones ----------
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

  day: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    backgroundColor: colors.deep,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },

  // ---------- Tarjeta de vuelo ----------
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  pressed: { opacity: 0.7 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flightNumber: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  airportCode: { color: colors.text, fontSize: fontSize.xl, fontWeight: '800' },
  label: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: '600' },
  alignRight: { alignItems: 'flex-end' },
  routeMiddle: { flex: 1, alignItems: 'center', marginHorizontal: spacing.md },
  routeLine: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
  },
  planeIcon: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.xs,
    color: colors.cyan,
  },
  duration: { color: colors.textFaint, fontSize: fontSize.xs, marginTop: 2 },
});
