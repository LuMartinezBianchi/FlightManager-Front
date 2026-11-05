import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

// Estilos de Iniciar sesion y Crear cuenta (app/login.tsx y app/registro.tsx),
// y del boton Cerrar sesion de Inicio.
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep, justifyContent: 'center', padding: spacing.xl },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: colors.textDim, fontSize: fontSize.md, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.xl },

  label: { color: colors.textDim, fontSize: fontSize.sm, fontWeight: 'bold', marginBottom: spacing.xs },
  input: {
    color: colors.text,
    fontSize: fontSize.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  error: { backgroundColor: colors.redSoft, borderRadius: radius.sm, padding: spacing.md, marginBottom: spacing.md },
  errorText: { color: colors.red },

  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.cyan,
    marginTop: spacing.sm,
  },
  primaryButtonText: { color: colors.onAccent, fontSize: fontSize.lg, fontWeight: 'bold' },

  linkButton: { alignItems: 'center', padding: spacing.lg },
  linkText: { color: colors.cyan, fontSize: fontSize.md },

  // Cerrar sesion (en Inicio)
  logoutButton: {
    alignItems: 'center',
    padding: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: { color: colors.textDim, fontSize: fontSize.md },
});
