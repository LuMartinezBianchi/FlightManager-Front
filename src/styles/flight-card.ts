import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const flightCard = StyleSheet.create({
	card: {
		padding: spacing.lg,
		marginBottom: spacing.sm,
		gap: spacing.md,
		backgroundColor: colors.card,
    	borderRadius: radius.lg,
    	borderWidth: 1,
    	borderColor: colors.border
	},
	flightNumber: {
		color: colors.text,
		fontSize: fontSize.md,
		fontWeight: '700',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	}
});