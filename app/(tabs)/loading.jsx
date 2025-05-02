import { useAuthContext } from "@/context/auth";
import { View } from "react-native";
import { Text } from "react-native-svg";

export default function LoadingScreen() {
    const { isLoading } = useAuthContext();
    return (
        <View className="h-screen items-center justify-center">
            <Text className="text-2xl">Loading......</Text>
            <Text className="text-2xl">Loading......</Text>
            <Text className="text-2xl">Loading......</Text>
            <Text className="text-2xl">Loading......</Text>
            <Text className="text-2xl">Loading......</Text>
            <Text className="text-2xl">Loading......</Text>
            <Text className="text-2xl">Loading......</Text>
        </View>
    );
}

