import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { colors } from '@/constants/theme';
import { forms } from '@/styles/forms';

type Props = {
  label: string;
  kind?: 'primary' | 'secondary' | 'danger';
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  href?: Href; // si tiene href, el boton navega a esa ruta
  onPress?: () => void;
};

export function Button({ label, kind = 'primary', icon, href, onPress }: Props) {
  let box = forms.buttonPrimary;
  let text = forms.buttonTextPrimary;
  let iconColor = colors.onAccent;
  if (kind === 'secondary') {
    box = forms.buttonSecondary;
    text = forms.buttonTextSecondary;
    iconColor = colors.cyan;
  }
  if (kind === 'danger') {
    box = forms.buttonDanger;
    text = forms.buttonTextDanger;
    iconColor = colors.red;
  }

  function press() {
    if (href) {
      router.push(href);
    }
    if (onPress) {
      onPress();
    }
  }

  return (
    <Pressable style={[forms.button, box]} onPress={press}>
      {icon && <Ionicons name={icon} size={20} color={iconColor} style={forms.buttonIcon} />}
      <Text style={[forms.buttonText, text]}>{label}</Text>
    </Pressable>
  );
}
