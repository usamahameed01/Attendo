import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Defs>
        <LinearGradient id="attendoA" x1="8" y1="42" x2="34" y2="12" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#6D66F5" />
          <Stop offset="0.55" stopColor="#4F46E5" />
          <Stop offset="1" stopColor="#1E1B6B" />
        </LinearGradient>
        <LinearGradient
          id="attendoCheck"
          x1="15"
          y1="38"
          x2="38"
          y2="21"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#5B53EE" />
          <Stop offset="1" stopColor="#2A24B0" />
        </LinearGradient>
      </Defs>
      <Path d="M28 3.6 A12 12 0 0 1 40.9 23.8" stroke="#4F46E5" strokeWidth={3.2} strokeLinecap="round" />
      <Path
        d="M35.1 5.5 34.7 8M40 8 38.2 9.8M42.5 13.3h-2.5"
        stroke="#4F46E5"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <Path
        d="M8.5 41 18.5 10 29.5 41"
        stroke="url(#attendoA)"
        strokeWidth={6.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 30 23 38.8 39.5 18.5"
        stroke="url(#attendoCheck)"
        strokeWidth={5.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
