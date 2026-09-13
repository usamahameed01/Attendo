import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isWithinInterval,
  startOfMonth,
} from 'date-fns';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function MiniCalendar({
  month,
  from,
  to,
  onSelectDay,
}: {
  month: Date;
  from: Date;
  to: Date;
  onSelectDay: (date: Date) => void;
}) {
  const { colors } = useTheme();
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });
  const leadingBlanks = (getDay(start) + 6) % 7;

  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.divider, gap: 6 }}>
      <View style={{ flexDirection: 'row' }}>
        {WEEKDAYS.map((d, i) => (
          <Text key={i} variant="caption" color="textTertiary" center style={{ flex: 1 }}>
            {d}
          </Text>
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <View key={`b${i}`} style={{ width: `${100 / 7}%`, height: 34 }} />
        ))}
        {days.map((day) => {
          const inRange = isWithinInterval(day, { start: from, end: to });
          const isFrom = isSameDay(day, from);
          const isTo = isSameDay(day, to);
          return (
            <Pressable
              key={day.toISOString()}
              onPress={() => onSelectDay(day)}
              style={{
                width: `${100 / 7}%`,
                height: 34,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: inRange ? colors.accent : 'transparent',
                borderTopLeftRadius: isFrom ? 10 : 0,
                borderBottomLeftRadius: isFrom ? 10 : 0,
                borderTopRightRadius: isTo ? 10 : 0,
                borderBottomRightRadius: isTo ? 10 : 0,
              }}>
              <Text
                variant="caption"
                weight={inRange ? 700 : 500}
                color={inRange ? 'onAccent' : 'textPrimary'}>
                {format(day, 'd')}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
