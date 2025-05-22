import api from "@/api";
import Navbar from "@/components/navigation/navbar";
import TruncateText from "@/components/TruncateText";
import { Location } from "@/constants/icons";
import { useAppContext } from "@/context";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function NgosScreen() {
  const { ngos } = useAppContext();


  return (
    <View className="mb-2 pt-10 ">
      <Navbar title="Ngo's" />
      <ScrollView className="">
        <View className="flex px-6 flex-col gap-4 mt-4 mb-20">
          {ngos?.map((ngo) => (
            <Pressable
              key={ngo.id}
              onPress={() => router.push(`ngos/${ngo.id}`)}
              className="border bg-white/40 border-gray-300 flex flex-col gap-3 rounded-lg p-5"
            >
              <View className="bg-beta w-1 absolute left-0 rounded-l-lg top-0 bottom-0"></View>
              <View className="flex flex-row items-center gap-4 mb-2">
                <View className="w-18 h-18 rounded-full">
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                      resizeMode: "cover",
                    }}
                    source={{ uri: api.IMAGE_URL + ngo.image }}
                  />
                </View>
                <View>
                  <Text className="text-lg font-bold">{ngo.name}</Text>
                  {
                    (ngo?.city || ngo?.country) && (
                      <View className="flex flex-row items-center gap-2 mb-2">
                        <Location color={"#000"} size={15} />
                        <Text className="text-gray-500">
                          {ngo.city}, {ngo.country}
                        </Text>
                      </View>
                    )
                  }
                </View>
              </View>
              {ngo?.description && (
                <Text className="text-gray-700">
                  <TruncateText length={70} text={ngo.description} />
                </Text>
              )}
              <Text className="text-gray-500">Email: {ngo.email}</Text>
              <View className="flex flex-row flex-wrap items-center gap-3 mb-2">
                {ngo.interesets?.map(
                  (interest, index) =>
                    index < 4 && (
                      <View
                        className="bg-alpha/20 rounded-full px-3 py-1"
                        key={index}
                      >
                        <Text className="text-alpha font-medium">
                          {interest.name}
                        </Text>
                      </View>
                    )
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
