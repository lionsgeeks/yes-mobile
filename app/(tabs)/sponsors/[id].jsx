import api from "@/api";
import Navbar from "@/components/navigation/navbar";
import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, Text, View } from "react-native"
import handleBack from "@/utils/handleBack";

const sponsorDetails = () => {
    const panHandlers = handleBack("/sponsors/sponsors");
    const { params } = useRoute();
    const { sponsor } = params;

    return (
        <ScrollView {...panHandlers} className="flex-1 pt-10 bg-[#f9f9f9]">
            <Navbar title={sponsor.name} />

            {/* Profile Section */}
            <View className="items-center px-4 mt-8">
                <Image
                    source={{ uri: api.IMAGE_URL + sponsor.image }}
                    className="w-32 h-32 rounded-full border-4 border-[#b09417] mb-4"
                />
                <Text className="text-2xl font-bold text-[#2e539d]">{sponsor.name}</Text>
                <Text className="text-base text-gray-600">{sponsor.rank.toUpperCase()}</Text>
                <Text className="text-sm text-gray-400 mb-3">{sponsor?.type?.charAt(0).toUpperCase() + sponsor?.type?.slice(1)}</Text>

            </View>

            {/* Info Sections */}
            <View className="px-4 py-6 space-y-4">
                {/* About */}
                <View className="bg-white p-4 rounded-xl shadow-sm">
                    <Text className="text-lg font-semibold text-[#2e539d] mb- text-center">About</Text>
                    <Text className="text-sm text-gray-700 leading-relaxed">
                        {sponsor.description || "This sponsor is a leading expert in their field, contributing to impactful initiatives and programs across the globe."}
                    </Text>
                </View>

            </View>


        </ScrollView>
    )
}

export default sponsorDetails;