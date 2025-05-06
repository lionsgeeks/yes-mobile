import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

import handleBack from "@/utils/handleBack";
const NgoDetails = () => {
  const { params } = useRoute();
  console.log(params);
    const panHandlers = handleBack("/ngos") 

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
      linkedin: "https://linkedin.com/company/ngo1",
      youtube: "https://youtube.com/@ngo1",
      x: "https://x.com/ngo1",
      website: "https://www.ngo1.org",
      instagram: "https://instagram.com/ngo1",
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
      linkedin: "https://linkedin.com/company/ngo2",
      youtube: "https://youtube.com/@ngo2",
      x: "https://x.com/ngo2",
      website: "https://www.ngo2.org",
      instagram: "https://instagram.com/ngo2",
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
      linkedin: "https://linkedin.com/company/ngo3",
      youtube: "https://youtube.com/@ngo3",
      x: "https://x.com/ngo3",
      website: "https://www.ngo3.org",
      instagram: "https://instagram.com/ngo3",
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
      linkedin: "https://linkedin.com/company/ngo4",
      youtube: "https://youtube.com/@ngo4",
      x: "https://x.com/ngo4",
      website: "https://www.ngo4.org",
      instagram: "https://instagram.com/ngo4",
    },
  ];

  const ngo = ngos.find((ngo) => ngo.id == params.id);
  return (
    <View {...panHandlers} className="p-5">
      <View className="flex justify-center items-center mt-10 bg-alpha/20 p-5 rounded-lg">
        <View className="w-32 h-32 rounded-full border-4 border-[#b09417] mb-4 bg-alpha"></View>
        <Text className="text-2xl font-bold text-[#2e539d]">{ngo.name}</Text>
        <View className="flex flex-row items-center gap-2 mb-2">
          <Ionicons name="locate" color={"#000"} size={15} />
          <Text className="text-base text-gray-600">
            {ngo.city}, {ngo.country}
          </Text>
        </View>
        <View className="">
          <View className="flex flex-row items-center gap-2 mb-2 mt-2">
            <Ionicons
              onPress={() => Linking.openURL(ngo.linkedin)}
              name="logo-linkedin"
              size={26}
              color="#0a65c0"
            />
            <Ionicons
              onPress={() => Linking.openURL(ngo.instagram)}
              name="logo-instagram"
              size={26}
              color="#0a65c0"
            />
            <Ionicons
              onPress={() => Linking.openURL(ngo.website)}
              name="globe-outline"
              size={26}
              color="#0a65c0"
            />
            <Ionicons
              onPress={() => Linking.openURL(ngo.youtube)}
              name="logo-youtube"
              size={26}
              color="#0a65c0"
            />
          </View>
        </View>
      </View>
      <View className="p-5 mt-5 bg-white/50 h-full rounded-lg ">
        <View className="">
          <Text className="text-2xl font-bold">About:</Text>
          <Text className="leading-relaxed">{ngo.description}</Text>
        </View>
        <Pressable className="bg-alpha rounded-lg p-3 mt-5 mb-5">
          <Text className="text-center text-white font-bold">Send Message</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NgoDetails;
