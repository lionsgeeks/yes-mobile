import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import 'react-native-reanimated';
import "../index.css";
import { LogBox } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AppProvider } from "@/context";
import { AuthProvider } from "@/context/auth";
import ErrorBoundary from "react-native-error-boundary";
import { Button, Pressable, Text, View } from "react-native";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const errorHandler = (error: Error, stackTrace: string) => {
    console.log("Error:", error);
    console.log("Stack Trace:", stackTrace);
  }
  const CustomFallback = (props: { error: Error, resetError: Function }) => (
    <View>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
      {/* <Pressable onPress={props.resetError}><Text>Try again</Text></Pressable> */}
    </View>
  )

// LogBox.ignoreAllLogs(); // Optional: hide redbox for testing

// ErrorUtils.setGlobalHandler((error, isFatal) => {
//   console.log("Global Error:", error);
//   // you could navigate to a custom screen or show a modal
// });
  return (
    <ErrorBoundary FallbackComponent={CustomFallback} onError={errorHandler}>
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
    </ErrorBoundary>
  );
}
