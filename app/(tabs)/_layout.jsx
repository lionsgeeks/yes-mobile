import { Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuthContext } from '@/context/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const { isSignedIn } = useAuthContext();

  // if (isSignedIn) {
  //   return <View className="h-screen items-center justify-center">
  //     <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
  //   </View>;
  // }

  const tabScreen = [
    { route: "index", name: "Home", icon: "house", showTab: true },
    { route: "speakers/index", name: "Speakers", icon: "person", showTab: true },
    { route: "ngos/index", name: "NGOs", icon: "business", showTab: true },
    { route: "program/index", name: "program", icon: "calendar-month", showTab: true },
    { route: "bailleur/bailleur", name: "Funders", icon: "handshake", showTab: true },
    
  ]
  
  const hiddenScreens = [
    { route: "menu", name: "Menu", icon: "settings", showTab: true },
    { route: "chat/index", name: "Chat", icon: "message", showTab: true },
    { route: "chat/[id]", name: "ChatDetail", icon: "message", },
    { route: "badge", name: "Badge", icon: "award", showTab: true },
    { route: "matches/match", name: "Connect", icon: "flame", showTab: true},
    { route: "matches/matches", name: "Match", icon: "flame", showTab: true},
    { route: "sign-in", name: "Sign In", icon: "settings", showTab: false },
    { route: "loading", name: "Loading", icon: "settings", showTab: false },
    { route: "speakers/[id]", name: "ChatDetail", icon: "message", showTab: true },
    { route: "onboarding/index", name: "Onboarding", icon: "settings", showTab: false },
    { route: "onboarding/interest", name: "Interest", icon: "settings", showTab: true },
    { route: "account/index", name: "Account", icon: "settings", showTab: true },
    { route: "account/changePassword", name: "Change Password", icon: "settings", showTab: true },
    { route: "program/[id]", name: "program", icon: "settings", showTab: true },

    { route: "ngos/[id]", name: "NgoDetails", icon: "business", showTab: true },
    { route: "sponsors/sponsors", name: "Sponsors", icon: "money", showTab: true },

  ]


  // sidenote: can also put ternary operator here to check if the user is logged in or not and show different screens based on that
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>


      {/* screen inside the navigation bar */}
      {tabScreen.map((screen, idx) => (
        <Tabs.Screen
          key={idx}
          name={screen.route}
          options={{
            headerShown: false,
            title: screen.name,
            tabBarIcon: ({ focused }) => (
              <IconSymbol
                size={28}
                name={screen.icon}
                color={focused ? '#b09417' : '#2e539d'}
              />
            ),
            tabBarActiveTintColor: '#b09417',
            tabBarInactiveTintColor: '#2e539d',
            tabBarStyle: screen.showTab ? undefined : { display: 'none' },
          }}
        />
      ))}





      {/* screen hidden from nav tab */}
      {hiddenScreens.map((screen, idx) => (
        <Tabs.Screen
          key={idx}
          name={screen.route}
          options={{
            headerShown: false,
            title: screen.name,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name={screen.icon} color={color} />
            ),
            tabBarStyle: screen.showTab ? undefined : { display: 'none' },
            href: null,
          }}
        />
      ))}

    </Tabs>
  );
}
