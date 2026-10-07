import { Text, View } from 'react-native';

import { Tone, tones } from '@/constants/theme';
import { calendar as styles } from '@/styles/calendar';

// Etiqueta redondeada del color de un estado (cyan, amber, green o red)
export function Chip({ label, tone }: { label: string; tone: Tone }) {
  return (
    <View style={[styles.chip, { backgroundColor: tones[tone].soft }]}>
      <Text style={[styles.chipText, { color: tones[tone].color }]}>{label}</Text>
    </View>
  );
}
