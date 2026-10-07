import { Pressable, Text, View } from 'react-native';

import { forms } from '@/styles/forms';

type Props = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
};

// Se elige una sola opcion (ej: VFR / IFR)
export function OptionGroup({ label, options, selected, onSelect }: Props) {
  return (
    <View style={forms.fieldBox}>
      <Text style={forms.label}>{label}</Text>
      <View style={forms.options}>
        {options.map((option, index) => (
          <Pressable
            key={option}
            style={[
              forms.option,
              index < options.length - 1 && forms.optionSpace,
              option === selected && forms.optionOn,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={[forms.optionText, option === selected && forms.optionTextOn]}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
