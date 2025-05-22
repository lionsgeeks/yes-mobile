import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAppContext } from "@/context";
import { IconSymbol } from "../ui/IconSymbol";
import { useAuthContext } from "@/context/auth";

export const SignOutButton = () => {
  const { language } = useAppContext();
  const { setIsSignedIn, setToken, setUser } = useAuthContext();

  const handleSignOut = async () => { 
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/(tabs)/sign-in");
      setIsSignedIn(false);
      setToken(''); // idk just in case
      setUser(null);

    } catch (err) {
      console.error('sign out error', err);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="w-[45%] h-[25%] flex flex-col items-center justify-center px-3 py-1 rounded-xl my-3 mx-2 border border-red-500"
    >
      <View
        className={` items-center gap-2 ${language == "ar" ? "flex-row-reverse" : "flex-row"
          }`}
      >
        <IconSymbol size={28} name="key" color={"#ef4444"} />

        <Text className="text-red-500">Logout</Text>
      </View>

    </TouchableOpacity>
  );
};
