import { View, Text, Pressable, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { IconSymbol } from "../ui/IconSymbol";
import { router } from "expo-router";
import { useAuthContext } from "@/context/auth";
import api from "@/api";
import { useCameraPermissions } from "expo-camera";
import { useAppContext } from "@/context";

export default function Navbar({ title = "Screen", setIsCameraReady }) {
  const { user } = useAuthContext();
  const { messageNotif } = useAppContext()

  const imageURL = api.IMAGE_URL + user?.image;
  const [permission, requestPermission] = useCameraPermissions();
  const toggleCamera = async () => {
    if (permission.granted) {
      setScanner(true);
    } else if (permission.denied) {
      alert(
        "You have denied camera access. Please go to your device settings to enable it."
      );
    } else {
      const result = await requestPermission();
      if (result.granted) {
        setScanner(true);
      } else {
        alert("Camera permission is required to use the scanner.");
      }
    }
  };

  return (
    <View className="flex-row items-center justify-between px-6 py-4  ">
      {/* Left: Home Button */}
      <Pressable
        onPress={() => {
          router.push("/account");
        }}
      >
        <Image
          source={{ uri: imageURL }}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </Pressable>

      {/* Center: Title */}
      <Text className="text-lg font-semibold text-alpha">{title}</Text>

      {/* Right: Bell + Profile */}
      <View className="flex-row items-center gap-x-4">
        {title != "chat" && title != "Program Details" && title != "Badge" && (
          <Pressable onPress={() => router.push("/chat")} className="relative">
            {messageNotif && <View className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0 z-10"></View>}
            <IconSymbol name="message" size={22} color="#000" />
          </Pressable>
        )}
        {title === "Program Details" && user?.role == "admin" && (
          <Pressable
            onPress={() => {
              toggleCamera();
              setIsCameraReady(true);
            }}
          >
            <Ionicons name="qr-code" size={22} color="#000" />
          </Pressable>
        )}

        {title != "Notifications" &&
          <Pressable
            onPress={() => { router.push('notifications') }}
            className="relative"
          >
            <View className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0 z-10"></View>
            <Feather name="bell" size={22} color="#000" />
          </Pressable>
        }

      </View>
    </View>
  );
}
