import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";

import handleBack from "@/utils/handleBack";
import { useAppContext } from "@/context";
import api from "@/api";
import Navbar from "@/components/navigation/navbar";
import TruncateText from "@/components/TruncateText";

const NgoDetails = () => {
  const { params } = useRoute();
  const panHandlers = handleBack("/ngos");
  const { ngos } = useAppContext();
  const ngo = ngos.find((ngo) => ngo.id == params.id);

  return (
    <View {...panHandlers} className="p-5">
      <Navbar title={<TruncateText text={ngo.name} length={9} />} />
      <View className="flex justify-center items-center mt-10 bg-alpha/20 p-5 rounded-lg">
        <View className="w-32 h-32 rounded-full border-4 border-[#b09417] mb-4 bg-alpha">
          <Image
            source={{ uri: api.IMAGE_URL + ngo.image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
              resizeMode: "cover",
            }}
          />
        </View>
        <Text className="text-2xl font-bold text-[#2e539d]">{ngo?.name}</Text>
        {
          (ngo?.city || ngo?.country) && (
            <View className="flex flex-row items-center gap-2 mb-2">
              <Ionicons name="locate" color={"#000"} size={15} />
              <Text className="text-base text-gray-600">
                {ngo?.city}, {ngo?.country}
              </Text>
            </View>
          )
        } 
        {
          ngo?.social && (
            <View>
              <View className="flex flex-row items-center gap-2 mb-2 mt-2">
                {ngo?.social?.linkedin && (
                  <Ionicons
                    onPress={() => Linking.openURL(ngo?.social?.linkedin)}
                    name="logo-linkedin"
                    size={26}
                    color="#0a65c0"
                  />
                )}
                {ngo?.social?.instagram && (
                  <Ionicons
                    onPress={() => Linking.openURL(ngo?.social?.instagram)}
                    name="logo-instagram"
                    size={26}
                    color="#0a65c0"
                  />
                )}
                {ngo?.social?.website && (
                  <Ionicons
                    onPress={() => Linking.openURL(ngo?.social?.website)}
                    name="globe-outline"
                    size={26}
                    color="#0a65c0"
                  />
                )}
                {ngo?.social?.youtube && (
                  <Ionicons
                    onPress={() => Linking.openURL(ngo?.social?.youtube)}
                    name="logo-youtube"
                    size={26}
                    color="#0a65c0"
                  />
                )}
              </View>
            </View>
          )
        }
      </View>
      <View className="p-5 mt-5 bg-white/50 h-full rounded-lg ">
        <View className="mb-2">
          <Text className="text-2xl font-bold">Email:</Text>
          <Text className="leading-relaxed">{ngo?.email}</Text>
        </View>
        {
          ngo?.description && (
            <View className="">
              <Text className="text-2xl font-bold">About:</Text>
              <Text className="leading-relaxed">{ngo?.description}</Text>
            </View>
          )
        }
        {
          ngo?.interesets?.length > 0 && (
            <View className="flex flex-row items-center gap-3 my-2 flex-wrap">
              {ngo.interesets?.map((interest, index) => (
                <View className="bg-alpha/20 rounded-full px-3 py-1" key={index}>
                  <Text className="text-alpha font-medium">{interest.name}</Text>
                </View>
              ))}
            </View>
          )
        }
        <Pressable
          onPress={() =>
            router.push({
              pathname: `chat/${ngo.id}`,
              params: ngo,
            })
          }
          android_ripple={{ color: "#1c3e7b" }}
          className="bg-alpha rounded-lg p-3 mt-5 mb-5"
        >
          <Text className="text-center text-white font-bold">Send Message</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NgoDetails;
