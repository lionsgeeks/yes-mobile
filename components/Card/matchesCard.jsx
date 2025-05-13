import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useAppContext } from "@/context";

export default function MatchesCard() {
  const { matches } = useAppContext()
  console.log(matches);
  
  const dummySpeakers = [
    {
      id: 1,
      name: 'Jane Doe',
      title: 'Frontend Developer',
      role: 'Speaker',
      image: 'https://via.placeholder.com/150',
      tags: ['React', 'JavaScript'],
    },
    {
      id: 2,
      name: 'John Smith',
      title: 'UX Designer',
      role: 'Speaker',
      image: 'https://via.placeholder.com/150',
      tags: ['Design', 'Figma'],
    },
    {
      id: 3,
      name: 'Sara Lee',
      title: 'Product Manager',
      role: 'Speaker',
      image: 'https://via.placeholder.com/150',
      tags: ['Agile', 'Leadership'],
    },
  ];
  
  return (
     <View className="flex-row flex-wrap justify-between mx-4 mt-2">
                        {matches.length > 0 ? (
                            matches.map((item) => (
                                <Pressable
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-xl shadow-alpha  overflow-hidden mb-5 px-4 pt-5 pb-3 w-[48%]"
                                    style={{ elevation: 3 }}
                                    android_ripple={{ color: "#ccc" }}
                                    // onPress={() => navigation.navigate('speakers/[id]', { speaker: item })}
    
                                >
                                    <View className="items-center mb-3">
                                        <Image
                                            source={{ uri: item.image }}
                                            className="w-20 h-20 rounded-full border border-gray-300"
                                        />
                                    </View>
                                    <Text className="text-center text-base font-semibold text-alpha mb-1">
                                        {item.name}
                                    </Text>
                                    <Text className="text-center text-xs text-gray-400 mb-2">
                                        {item.role[0].toUpperCase() + item.role.slice(1)}
                                    </Text>
                                    <View className="flex-row flex-wrap justify-center gap-x-1 gap-y-1">
                                        {item.interests.slice(0, 2).map((int) => (
                                            <View
                                                key={int}
                                                className="bg-beta px-2 py-0.5 rounded-full"
                                            >
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

const styles = StyleSheet.create({
  image: {
    width: "100px",
    height: "500px",
  },
  imageContainer: {
    flex: 1,
    height: "100%",
  },
});
