import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScanFace, X } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';
import { ScanFrame } from '@/features/checkin/scan-frame';
import { useSettingsStore } from '@/stores/settings-store';

export default function FaceScanScreen() {
  const router = useRouter();
  const { action = 'check_in' } = useLocalSearchParams<{ action?: 'check_in' | 'check_out' }>();
  const [permission, requestPermission] = useCameraPermissions();
  const devForceOffline = useSettingsStore((s) => s.devForceOffline);
  const devForceOutsideGeofence = useSettingsStore((s) => s.devForceOutsideGeofence);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission, requestPermission]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (devForceOutsideGeofence) {
        router.replace({ pathname: '/modal/geofence', params: { action, method: 'face' } });
        return;
      }
      if (devForceOffline) {
        router.replace({ pathname: '/modal/offline', params: { action, method: 'face' } });
        return;
      }
      router.replace({ pathname: '/(checkin)/verifying', params: { action, attempt: '1' } });
    }, 1700);
    return () => clearTimeout(timer);
  }, [action, devForceOffline, devForceOutsideGeofence, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#14141A' }}>
      {permission?.granted ? <CameraView style={StyleSheet.absoluteFill} facing="front" /> : null}
      <View style={{ flex: 1, paddingTop: 60 }}>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <X size={20} color="#fff" strokeWidth={2.2} />
          </Pressable>
          <Text weight={600} style={{ color: '#fff', fontSize: 15 }}>
            {action === 'check_out' ? 'Check out' : 'Check in'}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 }}>
          <ScanFrame>
            {!permission?.granted ? (
              <View
                style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
                <ScanFace size={48} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
              </View>
            ) : null}
          </ScanFrame>
        </View>

        <View style={{ paddingHorizontal: 32, paddingBottom: 46, alignItems: 'center', gap: 22 }}>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Text weight={700} style={{ color: '#fff', fontSize: 24 }}>
              Align your face
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
              Hold steady inside the frame
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={{
                  width: 28,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: i === 0 ? '#4F46E5' : 'rgba(255,255,255,0.22)',
                }}
              />
            ))}
          </View>
          <Pressable
            onPress={() => router.replace({ pathname: '/(checkin)/manual-pin', params: { action } })}>
            <Text weight={600} style={{ color: '#A9A3FF', fontSize: 15 }}>
              Use manual entry instead
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
