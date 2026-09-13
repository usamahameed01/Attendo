import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, Text as RNText, View } from 'react-native';

import { useAuthStore } from '@/stores/auth-store';

export default function ResultScreen() {
  const router = useRouter();
  const { outcome = 'success', action = 'check_in', attempt = '1' } = useLocalSearchParams<{
    outcome?: 'success' | 'failed';
    action?: 'check_in' | 'check_out';
    attempt?: string;
  }>();
  const user = useAuthStore((s) => s.user);
  const now = new Date();

  useEffect(() => {
    if (outcome === 'success') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [outcome]);

  if (outcome === 'failed') {
    return (
      <View style={{ flex: 1, backgroundColor: '#1A1113' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            paddingHorizontal: 32,
            paddingBottom: 40,
          }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: 'rgba(220,38,38,0.16)',
              borderWidth: 1.5,
              borderColor: 'rgba(248,113,113,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <X size={42} color="#F87171" strokeWidth={2.4} />
          </View>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <RNText
              style={{
                color: '#fff',
                fontFamily: 'Inter_800ExtraBold',
                fontSize: 28,
                textAlign: 'center',
              }}>
              Couldn&apos;t match your face
            </RNText>
            <RNText
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Inter_500Medium',
                fontSize: 15,
                textAlign: 'center',
                maxWidth: 280,
                lineHeight: 22,
              }}>
              Low light is the usual cause. Move somewhere brighter and remove glasses if you can.
            </RNText>
          </View>
          <View style={{ width: '100%', gap: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                padding: 14,
                borderRadius: 14,
                backgroundColor: 'rgba(255,255,255,0.06)',
              }}>
              <Badge n={1} />
              <RNText style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'Inter_500Medium', fontSize: 14 }}>
                Face a window or light source
              </RNText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                padding: 14,
                borderRadius: 14,
                backgroundColor: 'rgba(255,255,255,0.06)',
              }}>
              <Badge n={2} />
              <RNText style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'Inter_500Medium', fontSize: 14 }}>
                Attempt {attempt} of 3 · then manual only
              </RNText>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 24, paddingBottom: 46, gap: 14 }}>
          <Pressable
            onPress={() =>
              router.replace({ pathname: '/(checkin)/face-scan', params: { action, attempt } })
            }
            style={{
              height: 58,
              borderRadius: 18,
              backgroundColor: '#4F46E5',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RNText style={{ color: '#fff', fontFamily: 'Inter_600SemiBold', fontSize: 17 }}>
              Try again
            </RNText>
          </Pressable>
          <Pressable
            onPress={() => router.replace({ pathname: '/(checkin)/manual-pin', params: { action } })}
            style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <RNText style={{ color: '#A9A3FF', fontFamily: 'Inter_600SemiBold', fontSize: 16 }}>
              Use manual entry instead
            </RNText>
          </Pressable>
        </View>
      </View>
    );
  }

  const isCheckOut = action === 'check_out';

  return (
    <View style={{ flex: 1, backgroundColor: '#0E1A12' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30, paddingHorizontal: 32 }}>
        <View style={{ width: 118, height: 118, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: '#16A34A',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Check size={46} color="#fff" strokeWidth={2.6} />
          </View>
        </View>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <RNText style={{ color: '#fff', fontFamily: 'Inter_800ExtraBold', fontSize: 30 }}>
            {isCheckOut ? 'Checked out' : 'Checked in'}
          </RNText>
          <RNText style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'Inter_500Medium', fontSize: 16 }}>
            Face matched · 99.2% confidence
          </RNText>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.07)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.12)',
            borderRadius: 20,
            padding: 22,
            gap: 18,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(255,255,255,0.14)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RNText style={{ color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 16 }}>
                {user.initials}
              </RNText>
            </View>
            <View style={{ gap: 4 }}>
              <RNText style={{ color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 18 }}>
                {user.name}
              </RNText>
              <RNText style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter_500Medium', fontSize: 13 }}>
                {user.id} · {user.department}
              </RNText>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.12)' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View style={{ gap: 5 }}>
              <RNText
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 11,
                  letterSpacing: 1.1,
                  textTransform: 'uppercase',
                }}>
                Time
              </RNText>
              <RNText style={{ color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 26 }}>
                {format(now, 'hh:mm a')}
              </RNText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingVertical: 7,
                paddingHorizontal: 13,
                borderRadius: 999,
                backgroundColor: 'rgba(22,163,74,0.22)',
                borderWidth: 1,
                borderColor: 'rgba(34,197,94,0.4)',
              }}>
              <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#4ADE80' }} />
              <RNText style={{ color: '#8FEBB0', fontFamily: 'Inter_600SemiBold', fontSize: 12 }}>
                {isCheckOut ? 'Complete' : 'On time'}
              </RNText>
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 46 }}>
        <Pressable
          onPress={() => router.replace('/(app)/(tabs)')}
          style={{
            height: 58,
            borderRadius: 18,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <RNText style={{ color: '#0E1A12', fontFamily: 'Inter_600SemiBold', fontSize: 17 }}>
            Go to today
          </RNText>
        </Pressable>
      </View>
    </View>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <RNText style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_700Bold', fontSize: 11 }}>
        {n}
      </RNText>
    </View>
  );
}
