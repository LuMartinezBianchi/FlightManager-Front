import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

import { colors } from '@/constants/theme';
import { common } from '@/styles/common';
import { forms } from '@/styles/forms';

type Kind = 'primary' | 'secondary' | 'danger';

// Colores de cada tipo de boton: caja, texto e icono
const kinds = {
  primary: { box: forms.buttonPrimary, text: colors.onAccent, icon: colors.onAccent },
  secondary: { box: forms.buttonSecondary, text: colors.text, icon: colors.cyan },
  danger: { box: forms.buttonDanger, text: colors.red, icon: colors.red },
};

type Props = {
  label: string;
  kind?: Kind;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
};

export function Button({ label, kind = 'primary', icon, onPress }: Props) {
  const { box, text, icon: iconColor } = kinds[kind];

  return (
    <Pressable style={({ pressed }) => [forms.button, box, pressed && common.pressed]} onPress={onPress}>
      {icon && <Ionicons name={icon} size={20} color={iconColor} />}
      <Text style={[forms.buttonText, { color: text }]}>{label}</Text>
    </Pressable>
  );
}
