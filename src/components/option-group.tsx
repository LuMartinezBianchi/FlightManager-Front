import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { forms } from '@/styles/forms';

type Props = {
  label: string;
  options: string[];
  selected?: string;
};

// Grupo de opciones donde se elige una sola (ej: VFR / IFR)
export function OptionGroup({ label, options, selected: initial }: Props) {
  const [selected, setSelected] = useState(initial);

  return (
    <View>
      <Text style={forms.label}>{label}</Text>
      <View style={forms.options}>
        {options.map((option) => {
          const on = option === selected;
          return (
            <Pressable
              key={option}
              style={[forms.option, on && forms.optionOn]}
              onPress={() => setSelected(option)}
            >
              <Text style={[forms.optionText, on && forms.optionTextOn]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
