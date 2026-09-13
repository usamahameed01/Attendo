import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const STEPS = [
  { key: 'front', label: 'Front', headline: 'Look straight ahead' },
  { key: 'left', label: 'Left', headline: 'Turn slowly to your left' },
  { key: 'right', label: 'Right', headline: 'Turn slowly to your right' },
] as const;

export default function EnrollCaptureScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission, requestPermission]);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.linear }), -1);
  }, [rotation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < STEPS.length - 1) {
        setStep((s) => s + 1);
      } else {
        router.replace('/(enroll)/confirm');
      }
    }, 1900);
    return () => clearTimeout(timer);
  }, [step, router]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#14141A' }}>
      <View style={{ flex: 1, paddingTop: 60 }}>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RNText style={{ color: '#fff', fontFamily: 'Inter_600SemiBold', fontSize: 15 }}>
            Enroll your face
          </RNText>
          <Pressable onPress={() => router.back()}>
            <RNText
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter_600SemiBold', fontSize: 14 }}>
              Skip
            </RNText>
          </Pressable>
        </View>

        <View
          style={{
            paddingTop: 22,
            paddingHorizontal: 24,
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
          }}>
          {STEPS.map((s, i) => (
            <View
              key={s.key}
              style={{
                width: 34,
                height: 5,
                borderRadius: 3,
                backgroundColor: i <= step ? '#4F46E5' : 'rgba(255,255,255,0.22)',
              }}
            />
          ))}
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 268, height: 268 }}>
            <View
              style={[
                StyleSheet.absoluteFill,
                { borderRadius: 134, borderWidth: 2, borderColor: 'rgba(255,255,255,0.24)' },
              ]}
            />
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderRadius: 134,
                  borderWidth: 3,
                  borderColor: 'transparent',
                  borderTopColor: '#4F46E5',
                  borderRightColor: '#4F46E5',
                },
                spinStyle,
              ]}
            />
            {permission?.granted ? (
              <View style={[StyleSheet.absoluteFill, { margin: 26, borderRadius: 108, overflow: 'hidden' }]}>
                <CameraView style={StyleSheet.absoluteFill} facing="front" />
              </View>
            ) : null}
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, paddingBottom: 44, gap: 26 }}>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <RNText style={{ color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 25, textAlign: 'center' }}>
              {STEPS[step].headline}
            </RNText>
            <RNText
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter_500Medium', fontSize: 15 }}>
              Step {step + 1} of 3 · {STEPS[step].label.toLowerCase()} profile
            </RNText>
          </View>
          <View style={{ flexDirection: 'row', gap: 14, justifyContent: 'center' }}>
            {STEPS.map((s, i) => (
              <View key={s.key} style={{ width: 76, alignItems: 'center', gap: 9 }}>
                <View
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      i < step ? 'rgba(255,255,255,0.1)' : i === step ? 'rgba(79,70,229,0.24)' : 'rgba(255,255,255,0.05)',
                    borderWidth: 2,
                    borderColor: i < step ? '#16A34A' : i === step ? '#4F46E5' : 'rgba(255,255,255,0.2)',
                    borderStyle: i > step ? 'dashed' : 'solid',
                  }}>
                  {i < step ? (
                    <Check size={24} color="#4ADE80" strokeWidth={2.6} />
                  ) : i === step ? (
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#8B84FF' }} />
                  ) : null}
                </View>
                <RNText
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 11,
                    color: i === step ? '#A9A3FF' : 'rgba(255,255,255,0.5)',
                  }}>
                  {s.label}
                </RNText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
