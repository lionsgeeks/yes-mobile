import { Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAppContext } from "@/context";
import { IconSymbol } from "../ui/IconSymbol";
import { Icon } from "@/constants";
import { useAuthContext } from "@/context/auth";

export const SignOutButton = () => {
  const { language } = useAppContext();
  const { setIsSignedIn, setToken } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.setItem("token", "");
      setIsSignedIn(false);
      setToken(''); // idk just in case
      router.replace("/(tabs)/sign-in");

    } catch (err) {
      console.error('sign out error', err);
    }
  };

  return (
    <Pressable
      onPress={handleSignOut}
      className="w-[45%] h-[19%] flex flex-col items-center justify-center px-3 py-1 rounded-xl my-3 mx-2 border border-red-500"
    >
      <View
        className={` items-center gap-2 ${language == "ar" ? "flex-row-reverse" : "flex-row"
          }`}
      >
        {/* <View className="bg-[#FBFBFD] border border-[#F0F0F2] rounded-2xl p-2.5"> */}
        <IconSymbol size={28} name="key" color={"#ef4444"} />
        {/* </View> */}

        <Text className="text-red-500">Logout</Text>
      </View>

    </Pressable>
  );
};
