import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAppContext } from "@/context";
import { IconSymbol } from "../ui/IconSymbol";
import { Icon } from "@/constants";

export const SignOutButton = () => {
  const { language } = useAppContext();
  const handleSignOut = async () => {
    try {
      await AsyncStorage.setItem("token", "");
      router.push("/(tabs)/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <TouchableOpacity onPress={handleSignOut}>
    //     <Text
    //         style={{
    //             backgroundColor: '#ef4444',
    //         }}
    //         className='text-white  w-72 p-2 my-2 rounded-md text-center'
    //     >Sign out</Text>
    // </TouchableOpacity>
    <Pressable
      onPress={handleSignOut}
      className={`justify-between items-center my-1 ${
        language == "ar" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <View
        className={` items-center gap-2 ${
          language == "ar" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <View className="bg-[#FBFBFD] border border-[#F0F0F2] rounded-2xl p-2.5">
          <IconSymbol size={28} name="key" color={"#ef4444"} />
        </View>

        {/* <TransText className="ml-2">{tab.name}</TransText> */}
        <Text className="text-red-500">Logout</Text>
      </View>

      <Icon.Arrow
        stroke={2}
        size={22}
        color={"dark"}
        rotate={language == "ar" ? 0 : 180}
      />
    </Pressable>
  );
};
