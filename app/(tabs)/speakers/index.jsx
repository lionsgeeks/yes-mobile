import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "expo-router";
import Navbar from "@/components/navigation/navbar";
import { useAppContext } from "@/context";
import api from "@/api";
import TransText from "@/components/TransText"

const categories = [
  "All Speakers",
  "Climate",
  "Education",
  "Healthcare",
  "Technology",
  "Human Rights",
];

export default function SpeakersScreen() {
  const { speakers, interests } = useAppContext();

  const [activeCategory, setActiveCategory] = useState("All Speakers");
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleSelectYear = (value) => {
    setSelectedYear(value === "all" ? null : value);
    setDropdownVisible(false); // Close dropdown after selecting a year
  };
  const filteredSpeakers = speakers.filter((speaker) => {
    const matchesSearch = speaker.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All Speakers" ||
      speaker.interesets?.some(
        (interest) =>
          interest.name.toLowerCase() === activeCategory.toLowerCase()
      );
    return matchesSearch && matchesCategory;
  });

  return (
    <View className="h-screen bg-white pt-10">
      {/* Header */}

      <Navbar title= <TransText en="Speakers" fr="Conférenciers" ar="المتحدثون" /> />

      {/* Search */}
      <View className="px-6 mb-4">
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
        />
      </View>


      {/* Speaker Cards */}
      <ScrollView className="h-full px-2 mb-4">
        <View className="flex-row flex-wrap justify-between">
          {filteredSpeakers.length > 0 ? (
            filteredSpeakers.map((item) => (
              <Pressable
                key={item.id}
                className="bg-white rounded-2xl shadow-sm shadow-alpha  overflow-hidden mb-5 px-4 pt-5 pb-3 w-[48%]"
                style={{ elevation: 3 }}
                android_ripple={{ color: "#ccc" }}
                onPress={() =>
                  navigation.navigate("speakers/[id]", { speaker: item })
                }
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
                {/* <Text className="text-center text-sm text-gray-600 mb-0.5">
                  {item.title}
                </Text> */}
                <Text className="text-center text-xs text-gray-400 mb-2">
                  {item?.role[0].toUpperCase() + item?.role.slice(1)}
                </Text>
                {/* <View className="flex-row flex-wrap justify-center gap-x-1 gap-y-1">
                                    {item.tags.slice(0, 2).map((tag) => (
                                        <View
                                            key={tag}
                                            className="bg-beta px-2 py-0.5 rounded-full"
                                        >
                                            <Text className="text-xs text-white">{tag}</Text>
                                        </View>
                                    ))}
                                </View> */}
              </Pressable>
            ))
          ) : (
            <Text className="text-center text-gray-400 mt-12 w-full text-sm">
              No speakers match your filters.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
