import { addDays, differenceInCalendarDays, format } from 'date-fns';
import { useRouter } from 'expo-router';
import { ChevronDown, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Button, Screen, Text } from '@/components/ui';
import { seedUser } from '@/data/seed';
import { MiniCalendar } from '@/features/requests/mini-calendar';
import { useRequestsStore } from '@/stores/requests-store';
import { radius, space, useTheme } from '@/theme';

const LEAVE_TYPES = ['Casual leave', 'Sick leave', 'Earned leave'];

export default function NewRequestScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const addRequest = useRequestsStore((s) => s.addRequest);

  const [typeIndex, setTypeIndex] = useState(0);
  const [from, setFrom] = useState(() => new Date());
  const [to, setTo] = useState(() => addDays(new Date(), 1));
  const [reason, setReason] = useState('');

  function selectDay(day: Date) {
    if (day < from || (day > from && day < to)) {
      setFrom(day);
      setTo(day);
    } else {
      setTo(day);
    }
  }

  function submit() {
    addRequest({
      kind: 'leave',
      type: LEAVE_TYPES[typeIndex],
      from: format(from, 'yyyy-MM-dd'),
      to: format(to, 'yyyy-MM-dd'),
      days: differenceInCalendarDays(to, from) + 1,
      reason: reason.trim() || undefined,
      managerName: seedUser.managerName,
    });
    router.back();
  }

  return (
    <Screen padded={false} scroll contentContainerStyle={{ paddingHorizontal: space.screen, gap: space.lg }}>
      <View
        style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.sheetHandle, alignSelf: 'center', marginTop: 6 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="h1" style={{ fontSize: 22 }}>
          New request
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <X size={16} color={colors.textSecondary} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant="overline" color="textSecondary" uppercase>
          Type
        </Text>
        <Pressable
          onPress={() => setTypeIndex((i) => (i + 1) % LEAVE_TYPES.length)}
          style={{
            height: 52,
            borderRadius: radius.input,
            backgroundColor: colors.surface,
            borderWidth: 1.5,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <Text variant="bodyLg" weight={600}>
            {LEAVE_TYPES[typeIndex]}
          </Text>
          <ChevronDown size={16} color={colors.textSecondary} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant="overline" color="textSecondary" uppercase>
          Dates
        </Text>
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <View
            style={{
              flex: 1,
              height: 52,
              borderRadius: radius.input,
              backgroundColor: colors.surface,
              borderWidth: 1.5,
              borderColor: colors.accent,
              justifyContent: 'center',
              paddingHorizontal: 14,
              gap: 2,
            }}>
            <Text variant="caption" color="textTertiary">
              From
            </Text>
            <Text variant="body" weight={700} tabular>
              {format(from, 'EEE, d MMM')}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 52,
              borderRadius: radius.input,
              backgroundColor: colors.surface,
              borderWidth: 1.5,
              borderColor: colors.border,
              justifyContent: 'center',
              paddingHorizontal: 14,
              gap: 2,
            }}>
            <Text variant="caption" color="textTertiary">
              To
            </Text>
            <Text variant="body" weight={700} tabular>
              {format(to, 'EEE, d MMM')}
            </Text>
          </View>
        </View>
        <MiniCalendar month={from} from={from} to={to} onSelectDay={selectDay} />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant="overline" color="textSecondary" uppercase>
          Reason
        </Text>
        <TextInput
          value={reason}
          onChangeText={setReason}
          multiline
          placeholder="Add a short note for your manager…"
          placeholderTextColor={colors.textTertiary}
          style={{
            height: 84,
            borderRadius: radius.input,
            backgroundColor: colors.surface,
            borderWidth: 1.5,
            borderColor: colors.border,
            padding: 14,
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            color: colors.textPrimary,
            textAlignVertical: 'top',
          }}
        />
      </View>

      <Button label="Submit request" onPress={submit} style={{ marginTop: 4, marginBottom: space.xxl }} />
    </Screen>
  );
}
