import { View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, useTheme } from '@/theme';

import { Card } from './card';
import { toneTokens, type Tone } from './pill';
import { Text } from './text';

export function StatTile({
  label,
  value,
  tone = 'neutral',
  style,
}: {
  label: string;
  value: string | number;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();

  return (
    <Card padding={18} radius={radius.tile} style={[{ gap: 8 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        <View
          style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: colors[toneTokens[tone].dot],
          }}
        />
        <Text variant="caption" weight={600} color="textSecondary">
          {label}
        </Text>
      </View>
      <Text variant="stat" tabular>
        {value}
      </Text>
    </Card>
  );
}
