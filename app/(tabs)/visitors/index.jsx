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
import TransText from "@/components/TransText";

const categories = [
  "All visitors",
  "Climate",
  "Education",
  "Healthcare",
  "Technology",
  "Human Rights",
];

import handleBack from "@/utils/handleBack";
export default function visitorsScreen() {
  const panHandlers = handleBack("/menu");

  const { visitors, interests } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("All visitors");
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleSelectYear = (value) => {
    setSelectedYear(value === "all" ? null : value);
    setDropdownVisible(false); // Close dropdown after selecting a year
  };
  //   const filteredvisitors = visitors.filter((speaker) => {
  //     const matchesSearch = speaker.name
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());
  //     const matchesCategory =
  //       activeCategory === "All visitors" ||
  //       speaker.interesets?.some(
  //         (interest) =>
  //           interest.name.toLowerCase() === activeCategory.toLowerCase()
  //       );
  //     return matchesSearch && matchesCategory;
  //   });

  return (
    <View {...panHandlers} className="h-screen bg-white pt-10">
      {/* Header */}

      <Navbar title={<TransText en="Visitors" fr="Visiteurs" ar="الزوار" />} />


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

      {/* Year Dropdown */}
      {/* <View className="px-6 mb-3 ">
                <TouchableOpacity
                    className="bg-white border border-gray-300 rounded-xl p-3"
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text className="text-base text-gray-800">
                        {selectedYear || 'Filter by Year'}
                    </Text>
                </TouchableOpacity>

                {dropdownVisible && (
                    <View className=" bg-white border border-gray-300 rounded-xl mt-2 w-full z-10 relative">
                        {years.map((year) => (
                            <TouchableOpacity
                                key={year.value}
                                className="py-3 px-4"
                                onPress={() => handleSelectYear(year.value)}
                            >
                                <Text className="text-base text-gray-700">{year.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View> */}

      {/* Tag Filter */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 80 }}
        className={`m-0 px-6 pb-20`}
      >
        <Pressable
          onPress={() => setActiveCategory("All visitors")}
          className={`px-4 py-2 h-8 rounded-full mr-2 ${
            activeCategory === "All visitors" ? "bg-beta" : "bg-alpha"
          }`}
        >
          <Text className={`text-sm text-white`}>All visitors</Text>
        </Pressable>
        {interests?.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <Pressable
              key={category.id}
              onPress={() => setActiveCategory(category.name)}
              className={`px-4 py-2 h-8 rounded-full mr-2 ${
                isActive ? "bg-beta" : "bg-alpha"
              }`}
            >
              <Text className={`text-sm text-white`}>{category.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView> */}

      {/* Speaker Cards */}
      <ScrollView className="h-full px-2 mb-4">
        <View className="flex-row flex-wrap justify-between">
          {visitors.length > 0 ? (
            visitors.map((item) => (
              <Pressable
                key={item.id}
                className="bg-white rounded-2xl shadow-xl shadow-alpha  overflow-hidden mb-5 px-4 pt-5 pb-3 w-[48%]"
                style={{ elevation: 3 }}
                android_ripple={{ color: "#ccc" }}
                onPress={() =>
                  navigation.navigate("visitors/[id]", { visitor: item })
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
                  {item?.role.charAt(0).toUpperCase() + item?.role.slice(1)}
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
              No visitors match your filters.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
