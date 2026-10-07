import { Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';
import { forms } from '@/styles/forms';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export function Field({ label, value, onChangeText, placeholder, multiline }: Props) {
  return (
    <View style={forms.fieldBox}>
      <Text style={forms.label}>{label}</Text>
      <TextInput
        style={[forms.input, multiline && forms.inputMultiline]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        multiline={multiline}
      />
    </View>
  );
}
