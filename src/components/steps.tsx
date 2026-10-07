import { Text, View } from 'react-native';

import { calendar } from '@/styles/calendar';
import { forms } from '@/styles/forms';

// Indicador de los 3 pasos de la importacion desde .xlsx
export function Steps({ step, label }: { step: number; label: string }) {
  return (
    <View>
      <View style={forms.steps}>
        <View style={[forms.step, step >= 1 && forms.stepOn]} />
        <View style={[forms.step, step >= 2 && forms.stepOn]} />
        <View style={[forms.step, step >= 3 && forms.stepOn]} />
      </View>
      <Text style={calendar.label}>
        Paso {step} de 3 · {label}
      </Text>
    </View>
  );
}
