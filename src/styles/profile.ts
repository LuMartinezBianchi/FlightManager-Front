import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de la pantalla Perfil (app/(tabs)/profile/index.tsx).
export const profile = StyleSheet.create({
  // ---------- Info del usuario: avatar, nombre y botón "Editar perfil" ----------
  userInfo: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: radius.round,
    backgroundColor: colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    color: colors.onAccent,
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  role: {
    color: colors.cyan,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  faint: {
    color: colors.textFaint,
    fontSize: fontSize.sm,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card2,
  },
  editText: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  // ---------- Estadísticas ----------
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stat: {
    flex: 1, // las 3 tarjetas del mismo ancho
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  statLabel: {
    color: colors.textDim,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },

  // ---------- Lista "Cuenta" ----------
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconOn: {
    backgroundColor: colors.cyan, // notificaciones activadas
  },
  rowLabel: {
    flex: 1, // empuja el ícono de la derecha hasta el borde
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '600',
  },

  // ---------- Modal "Editar perfil" ----------
  modal: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  save: {
    color: colors.cyan,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  inputLabel: {
    color: colors.textDim,
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    color: colors.text,
    fontSize: fontSize.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
});
