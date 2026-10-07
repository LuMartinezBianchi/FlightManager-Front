import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Inicio (app/(tabs)/index.tsx).
export const home = StyleSheet.create({
  // ---------- Leyenda del calendario ----------
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  dot: { width: 8, height: 8, borderRadius: radius.round },

  // ---------- Tarjeta del proximo vuelo ----------
  nextCard: { padding: spacing.lg, gap: spacing.md, marginBottom: spacing.md },
  nextLabel: {
    color: colors.textDim,
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // ---------- Alerta del libro de vuelo ----------
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.amberSoft,
    borderWidth: 1,
    borderColor: colors.amber,
    borderRadius: radius.lg,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: { flex: 1, gap: 2 },
  alertTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  alertSubtitle: { color: colors.textDim, fontSize: fontSize.sm },

  // ---------- Metricas ----------
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1, // las 3 tarjetas del mismo ancho
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  statLabel: { color: colors.textDim, fontSize: fontSize.xs, fontWeight: '600' },
});
