import { Children, ReactNode, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';
import { forms } from '@/styles/forms';

type Props = {
  label: string;
  value?: string;
  placeholder?: string;
  multiline?: boolean;
};

// Campo de formulario: etiqueta + input. "value" es el valor inicial;
// si no hay, se ve el placeholder. Lo que se escribe queda en el estado del campo.
export function Field({ label, value = '', placeholder, multiline }: Props) {
  const [text, setText] = useState(value);

  return (
    <View>
      <Text style={forms.label}>{label}</Text>
      <TextInput
        style={[forms.input, multiline && forms.inputMultiline]}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        multiline={multiline}
      />
    </View>
  );
}

// Pone varios campos en una misma fila, todos del mismo ancho
export function FieldRow({ children }: { children: ReactNode }) {
  return (
    <View style={forms.row}>
      {Children.map(children, (child) => (
        <View style={forms.col}>{child}</View>
      ))}
    </View>
  );
}
