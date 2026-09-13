import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { useTheme } from '@/theme';

import { IconButton } from './ui';

export function NavBackButton({ onPress, dark }: { onPress?: () => void; dark?: boolean }) {
  const { colors } = useTheme();
  const router = useRouter();
  const iconColor = dark ? '#F4F4F7' : colors.textPrimary;

  return (
    <IconButton
      onPress={onPress ?? (() => router.back())}
      style={
        dark
          ? { backgroundColor: '#16161C', borderColor: '#24242C' }
          : { backgroundColor: colors.surface, borderColor: colors.borderSoft }
      }>
      <ChevronLeft size={20} color={iconColor} strokeWidth={2.2} />
    </IconButton>
  );
}
