import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';


export const calendar = StyleSheet.create({

  bigTitle: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },

  // Fila: un elemento a la izquierda y otro a la derecha
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Texto secundario (contador, horarios, avión)
  label: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },

  // Imagen del calendario (el alto sale del aspectRatio, ver index.tsx)
  calendar: {
    width: '100%',
    borderRadius: radius.xl,
    marginBottom: spacing.xl,
  },

  // "LUN · 24 AGOSTO"
  dayLabel: {
    letterSpacing: 1,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  // ---------- Tarjeta de vuelo ----------
  card: {
    padding: spacing.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  flightNumber: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
  },
  chipText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  airportCode: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '800',
  },
  alignRight: {
    alignItems: 'flex-end',
  },

  // Centro de la ruta: línea + avión + duración
  routeMiddle: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
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
  },
  duration: {
    color: colors.textFaint,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
});
