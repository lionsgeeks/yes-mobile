import { Image, Pressable, Text, View } from "react-native";
import { useAppContext } from "@/context";
import api from "@/api";
import { useFocusEffect } from "expo-router";
import React from "react";

export default function MatchesCard() {
  const { matches, fetchMatches } = useAppContext();

  useFocusEffect(
    React.useCallback(() => {
      fetchMatches();
    }, [])
  );
  return (
    <View className="flex-row flex-wrap justify-between mx-4 mt-2">
      {matches.length > 0 ? (
        matches
          .filter((user) => user?.id != 0)
          .map((item) => (
            <Pressable
              key={item.id}
              className="bg-white rounded-2xl shadow-xl shadow-alpha  overflow-hidden mb-5 px-4 pt-5 pb-3 w-[48%]"
              style={{ elevation: 3 }}
              android_ripple={{ color: "#ccc" }}
            >
              <View className="items-center mb-3">
                <Image
                  source={{ uri: api.IMAGE_URL + item?.image }}
                  className="w-20 h-20 rounded-full border border-gray-300"
                />
              </View>
              <Text className="text-center text-base font-semibold text-alpha mb-1">
                {item.name}
              </Text>
              <Text className="text-center text-xs text-gray-400 mb-2">
                {item?.role[0].toUpperCase() + item?.role.slice(1)}
              </Text>
              <View className="flex-row flex-wrap justify-center gap-x-1 gap-y-1">
                {item.interests.slice(0, 2).map((int) => (
                  <View key={int} className="bg-beta px-2 py-0.5 rounded-full">
                    <Text className="text-xs text-white">{int}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))
      ) : (
        <Text className="text-center text-gray-400 mt-12 w-full text-sm">
          No matches found
        </Text>
      )}
    </View>
  );
}
