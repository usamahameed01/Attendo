import { Tabs } from 'expo-router';

import { TabBar, type TabKey } from '@/components/tab-bar';

const routeToKey: Record<string, TabKey> = {
  index: 'home',
  history: 'history',
  requests: 'requests',
  profile: 'profile',
};

const keyToRoute: Record<TabKey, string> = {
  home: 'index',
  history: 'history',
  requests: 'requests',
  profile: 'profile',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <TabBar
          active={routeToKey[state.routes[state.index].name] ?? 'home'}
          onSelect={(key) => navigation.navigate(keyToRoute[key])}
        />
      )}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="requests" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
