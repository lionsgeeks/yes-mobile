import Navbar from "@/components/navigation/navbar";
import TruncateText from "@/components/TruncateText";
import { Location } from "@/constants/icons";
import { router, useNavigation } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function NgosScreen() {
  const navigation = useNavigation();
  // example data
  const ngos = [
    {
      id: 1,
      name: "NGO 1",
      email: "ngo1@gmail.com",
      country: "Nigerira",
      city: "Abuja",
      location: "ain sebaa",
      description:
        "NGO 1 is dedicated to empowering underserved communities in Abuja through education, health services, and sustainable environmental initiatives. We aim to create long-term impact by focusing on youth education, access to clean water, and public health awareness.",
      interests: ["education", "health", "environment"],
    },
    {
      id: 2,
      name: "NGO 2",
      email: "ngo2@gmail.com",
      country: "Maroc",
      city: "Casablaca",
      location: "ain sebaa",
      description:
        "NGO 2 works to promote accessible healthcare and environmental protection across Casablanca. Our programs range from medical outreach in rural areas to waste reduction campaigns and community health education.",
      interests: ["health", "environment"],
    },
    {
      id: 3,
      name: "NGO 3",
      email: "ngo3@gmail.com",
      country: "Egypte",
      city: "Cairo",
      location: "ain sebaa",
      description:
        "Based in Cairo, NGO 3 is committed to enhancing educational opportunities and raising environmental awareness among youth. Through school partnerships and green community projects, we build a foundation for a better future.",
      interests: ["education", "environment"],
    },
    {
      id: 4,
      name: "NGO 4",
      email: "ngo4@gmail.com",
      country: "maroc",
      city: "casablaca",
      location: "ain sebaa",
      description:
        "NGO 4 operates at the heart of Casablanca with a strong focus on quality education and primary healthcare services. Our mission is to uplift communities through learning, medical assistance, and strategic development initiatives.",
      interests: ["education", "health"],
    },
  ];

  return (
    <View className="mb-2 pt-10 ">
      <Navbar title="Ngo's" />
    <ScrollView className="">
      <View className="flex px-6 flex-col gap-4 mt-4 mb-20">
        {ngos.map((ngo) => (
          <Pressable
            key={ngo.id}
            onPress={() => router.push(`ngos/${ngo.id}`)}
            className="border bg-white/40 border-gray-300 flex flex-col gap-3 rounded-lg p-5"
          >
            <View className="bg-beta w-1 absolute left-0 rounded-l-lg top-0 bottom-0"></View>
            <View className="flex flex-row items-center gap-4 mb-2">
              <View>
                <View className="w-20 aspect-square rounded-full bg-alpha"></View>
              </View>
              <View>
                <Text className="text-lg font-bold">{ngo.name}</Text>
                <View className="flex flex-row items-center gap-2 mb-2">
                  <Location color={"#000"} size={15} />
                  <Text className="text-gray-500">
                    {ngo.city}, {ngo.country}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="text-gray-700">
              <TruncateText length={70} text={ngo.description} />
            </Text>
            <Text className="text-gray-500">Email: {ngo.email}</Text>
            <View className="flex flex-row items-center gap-2 mb-2">
              {ngo.interests.map((interest, index) => (
                <View
                  className="bg-alpha/20 rounded-full px-3 py-1"
                  key={index}
                >
                  <Text className="text-alpha font-medium">{interest}</Text>
                </View>
              ))}
            </View>
            {/* <Text className="text-gray-500">Phone: {ngo.phone}</Text> */}
          </Pressable>
        ))}
      </View>
    </ScrollView>
    </View>

  );
}
