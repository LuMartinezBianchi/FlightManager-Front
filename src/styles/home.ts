import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Inicio (app/(tabs)/index.tsx).
export const home = StyleSheet.create({
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
  alertIcon: { marginRight: spacing.md },
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
  },
  statLabel: { color: colors.textDim, fontSize: fontSize.xs, fontWeight: 'bold', marginTop: spacing.xs },
});
