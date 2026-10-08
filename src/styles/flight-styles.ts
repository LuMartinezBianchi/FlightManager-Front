import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';


// Estilos de la pantalla vuelo (app/flight.tsx) y de todo lo que se dibuja en ella.
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.deep },
  gutter: { paddingHorizontal: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  subtitle: { color: colors.textDim, fontSize: fontSize.sm, marginTop: 2 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  scrollContent: { gap: spacing.lg, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },

  next_flight_title: { flex: 1, alignItems: 'center' },
 
  flightCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  iata:       { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', letterSpacing: 1 },
  airportName: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  crewmateName: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  crewmateRole: { color: colors.textDim, fontSize: fontSize.sm },
  sep: { height: 1, backgroundColor: colors.border, marginHorizontal: spacing.lg },

  slides: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: spacing.xs
  },

  statusTAG_confirmed: {
	backgroundColor: colors.greenSoft,
	borderRadius: radius.round,
	paddingHorizontal: spacing.md,
	paddingVertical: spacing.xs
  },
  statusTAGText_confirmed: {
	color: colors.green,
	fontSize: fontSize.sm,
	fontWeight: '600'
  },

  statusTAG_caution: {
	backgroundColor: colors.amberSoft,
	borderRadius: radius.round,
	paddingHorizontal: spacing.md,
	paddingVertical: spacing.xs
  },
  statusTAGText_caution: {
	color: colors.amber,
	fontSize: fontSize.sm,
	fontWeight: '600'
  },

  planeIcon: {color: colors.cyan, fontSize: 20},
  temperature: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700', marginBottom: spacing.xs },
  weatherInfo: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xs },
  metar: { color: colors.textFaint, fontSize: fontSize.xs },

  sectionLabel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  sectionLabelTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700' },
  sectionLabelSubtitle: { color: colors.textDim, fontSize: fontSize.sm },

  mapPlaceholder: {
    height: 180,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },

  pairList: { gap: spacing.sm },
  pairItem: { width: 170, padding: spacing.md },

  logbookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.cyanSoft,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.cyan,
    paddingVertical: spacing.lg,
  },
  logbookBtnText: { color: colors.text, fontSize: fontSize.lg, fontWeight: '600' },

  crewRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md },
});
