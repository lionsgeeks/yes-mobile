import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../index.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context/auth";
import { AppProvider } from "@/context";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }  


  return (
      <AuthProvider>
        <AppProvider>
          {/* <ThemeProvider value={colorScheme !== 'dark' ? DarkTheme : DefaultTheme}> */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="dark" />
          {/* </ThemeProvider> */}
        </AppProvider>
      </AuthProvider>
  );
}
