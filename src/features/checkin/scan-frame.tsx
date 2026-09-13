import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 262;
const CORNER = 46;

export function ScanFrame({ children }: { children?: React.ReactNode }) {
  const scanY = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    scanY.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.ease) }), -1);
    pulse.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.out(Easing.ease) }), -1);
  }, [pulse, scanY]);

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanY.value * (SIZE - 36) }],
    opacity: scanY.value < 0.06 || scanY.value > 0.94 ? 0 : 1,
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.12 }],
    opacity: 0.55 * (1 - pulse.value),
  }));

  return (
    <View style={{ width: SIZE, height: SIZE }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: -10,
            left: -10,
            right: -10,
            bottom: -10,
            borderRadius: 44,
            borderWidth: 1.5,
            borderColor: '#4F46E5',
          },
          pulseStyle,
        ]}
      />
      <View
        style={{
          flex: 1,
          borderRadius: 36,
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.28)',
          overflow: 'hidden',
        }}>
        {children}
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 2,
              backgroundColor: '#8B84FF',
              shadowColor: '#8B84FF',
              shadowOpacity: 0.7,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 0 },
            },
            lineStyle,
          ]}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: -3,
          top: -3,
          width: CORNER,
          height: CORNER,
          borderTopWidth: 4,
          borderLeftWidth: 4,
          borderColor: '#4F46E5',
          borderTopLeftRadius: 36,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: -3,
          top: -3,
          width: CORNER,
          height: CORNER,
          borderTopWidth: 4,
          borderRightWidth: 4,
          borderColor: '#4F46E5',
          borderTopRightRadius: 36,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: -3,
          bottom: -3,
          width: CORNER,
          height: CORNER,
          borderBottomWidth: 4,
          borderLeftWidth: 4,
          borderColor: '#4F46E5',
          borderBottomLeftRadius: 36,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: -3,
          bottom: -3,
          width: CORNER,
          height: CORNER,
          borderBottomWidth: 4,
          borderRightWidth: 4,
          borderColor: '#4F46E5',
          borderBottomRightRadius: 36,
        }}
      />
    </View>
  );
}
