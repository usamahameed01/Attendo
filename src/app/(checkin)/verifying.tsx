import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Text as RNText, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { useAttendanceStore } from '@/stores/attendance-store';

export default function VerifyingScreen() {
  const router = useRouter();
  const { action = 'check_in', attempt = '1' } = useLocalSearchParams<{
    action?: 'check_in' | 'check_out';
    attempt?: string;
  }>();
  const checkIn = useAttendanceStore((s) => s.checkIn);
  const checkOut = useAttendanceStore((s) => s.checkOut);
  const rotation = useSharedValue(0);
  const ran = useRef(false);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(1, { duration: 800, easing: Easing.linear }), -1);
  }, [rotation]);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const attemptNum = Number(attempt);
    const timer = setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        if (action === 'check_out') checkOut('face');
        else checkIn('face');
        router.replace({ pathname: '/(checkin)/result', params: { outcome: 'success', action } });
      } else if (attemptNum >= 3) {
        router.replace({ pathname: '/(checkin)/manual-pin', params: { action, forced: '1' } });
      } else {
        router.replace({
          pathname: '/(checkin)/result',
          params: { outcome: 'failed', action, attempt: String(attemptNum + 1) },
        });
      }
    }, 1600);
    return () => clearTimeout(timer);
  }, [action, attempt, checkIn, checkOut, router]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#14141A' }}>
      <View style={{ flex: 1, paddingTop: 60 }}>
        <RNText
          style={{ color: '#fff', textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontSize: 15 }}>
          {action === 'check_out' ? 'Check out' : 'Check in'}
        </RNText>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 }}>
          <View
            style={{
              width: 262,
              height: 262,
              borderRadius: 36,
              borderWidth: 2,
              borderColor: 'rgba(139,132,255,0.5)',
              backgroundColor: 'rgba(79,70,229,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.View
              style={[
                {
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 3,
                  borderColor: 'rgba(255,255,255,0.18)',
                  borderTopColor: '#8B84FF',
                },
                spinStyle,
              ]}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 32, paddingBottom: 46, alignItems: 'center', gap: 22 }}>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <RNText style={{ color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 24 }}>
              Verifying…
            </RNText>
            <RNText style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter_500Medium', fontSize: 15 }}>
              Matching against your enrolled face
            </RNText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}>
            <MapPin size={15} color="#7CE0A5" strokeWidth={2} />
            <RNText
              style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter_600SemiBold', fontSize: 13 }}>
              Inside HQ · Bengaluru
            </RNText>
          </View>
        </View>
      </View>
    </View>
  );
}
