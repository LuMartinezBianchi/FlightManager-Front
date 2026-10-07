import { Text, View } from 'react-native';

import { calendar } from '@/styles/calendar';
import { forms } from '@/styles/forms';

// Indicador de los 3 pasos de la importacion desde .xlsx
export function Steps({ step, label }: { step: number; label: string }) {
  return (
    <View>
      <View style={forms.steps}>
        {[1, 2, 3].map((n) => (
          <View key={n} style={[forms.step, n <= step && forms.stepOn]} />
        ))}
      </View>
      <Text style={calendar.label}>
        Paso {step} de 3 · {label}
      </Text>
    </View>
  );
}
