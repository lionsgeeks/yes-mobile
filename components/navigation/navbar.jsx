import { View, Text, Pressable, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function Navbar({ title = "Screen" }) {



    return (
        <View className="flex-row items-center justify-between px-6 py-4  ">
            {/* Left: Home Button */}
            <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
                className="w-10 h-10 rounded-full border border-gray-300"
            />

            {/* Center: Title */}
            <Text className="text-lg font-semibold text-alpha">{title}</Text>

            {/* Right: Bell + Profile */}
            <View className="flex-row items-center gap-x-4">
     
     
                <Pressable onPress={(() => { })}>
                    <Feather name="bell" size={22} color="#000" />
                </Pressable>

            </View>
        </View>
    );
}
