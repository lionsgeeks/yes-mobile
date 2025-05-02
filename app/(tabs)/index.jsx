import { useAuthContext } from "@/context/auth";
import {
  View,
  Text,
} from "react-native";

export default function HomeScreen() {
  const { user } = useAuthContext();


  return (
    <View className="h-screen items-center justify-center">
      <Text className="">Hello from YES Mobile: {user ? user.name : 'no user info'}</Text>
    </View>
  );
}



