import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Inicio (app/(tabs)/index.tsx) y de todo lo que se dibuja en ella.
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },

  bigTitle: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  // ---------- Calendario ----------
  calendar: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  arrow: { padding: spacing.sm },
  month: { color: colors.text, fontSize: fontSize.lg, fontWeight: 'bold' },
  week: { flexDirection: 'row' },
  weekDay: {
    width: '14.28%',
    textAlign: 'center',
    color: colors.textFaint,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  days: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: '14.28%', alignItems: 'center', marginBottom: spacing.xs },
  day: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
  dot: { width: 8, height: 8, borderRadius: radius.round, marginRight: spacing.xs },

  // ---------- Proximo vuelo: una View con fondo que agrupa titulo, estado y tarjeta ----------
  nextBox: {
    backgroundColor: colors.panel,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  nextLabel: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: 'bold' },

  // ---------- Tarjeta de vuelo ----------
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
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

  // ---------- Alerta del libro de vuelo ----------
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.amberSoft,
    borderWidth: 1,
    borderColor: colors.amber,
    borderRadius: radius.lg,
  },
  alertIcon: { marginRight: spacing.md, color:colors.amber },
  alertText: { flex: 1 },
  alertTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: 'bold' },
  alertSubtitle: { color: colors.textDim, fontSize: fontSize.sm, marginTop: spacing.xs },

  // ---------- Metricas ----------
  stats: { flexDirection: 'row' },
  stat: {
    flex: 1, // las 3 tarjetas del mismo ancho
    alignItems: 'center',
    padding: spacing.lg,
    marginLeft: spacing.xs,
    marginRight: spacing.xs,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  statLabel: { color: colors.textDim, fontSize: fontSize.xs, fontWeight: 'bold', marginTop: spacing.xs },
});
