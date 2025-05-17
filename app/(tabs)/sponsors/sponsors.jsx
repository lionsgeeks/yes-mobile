import React, { useState } from 'react';
import { Text, View, Pressable, Image, ScrollView, TextInput, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from "@/components/navigation/navbar";
import { Picker } from '@react-native-picker/picker';
import { useAppContext } from '@/context';
import api from '@/api';



const Sponsors = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const categories = ["All", "Finance", "Marketing", "Media", "Technology", "Association"];

  // TODO: change to sponsors from api
  const { sponsors } = useAppContext();

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false); // Close the dropdown after selection
  };

  const filteredSponsors = sponsors?.filter((item) => {
    return selectedCategory === "all" || item.type === selectedCategory.toLowerCase();
  });


  return (
    <View className="h-screen bg-white pt-10">
      <Navbar title="Sponsors" />
      <View className="px-6 mb-3">
        <TouchableOpacity
          className="bg-white border border-gray-200 rounded-xl p-3"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="text-base text-gray-800">
            {selectedCategory === "all" ? "Filter by Category" : selectedCategory}
          </Text>
        </TouchableOpacity>

        {dropdownVisible && (
          <View className="relative bg-white border border-gray-300 rounded-xl mt-2 w-full z-10">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className="py-3 px-4"
                onPress={() => handleSelectCategory(category === 'All' ? 'all' : category)}
              >
                <Text className="text-base text-gray-700">{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <ScrollView className="px-4 mb-20 mt-6">
        <View className="flex-row flex-wrap justify-between gap-4">
          {filteredSponsors.map((item) => (
            <View key={item.id} className="bg-white rounded-xl shadow-lg shadow-gray-300 w-full p-4 mb-4">
              <View className="flex-row items-center mb-4">
                <Image
                  // source={{ uri: item.image }}
                  source={{ uri: api.IMAGE_URL + item.image }}
                  style={{
                    width: 70,
                    aspectRatio: 1,
                    borderRadius: 500,
                    marginRight: 10,
                  }}
                  resizeMode="contain"
                />
                <View>
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-sm text-gray-500">{item.description}</Text>
                </View>
              </View>
              <View className='flex-row justify-between items-center'>
                {/* could be null from backend */}
                {
                  item.type ? (
                    <View className="bg-[#efcc2d38] px-4 py-1.5 rounded-full self-start mt-1">
                      <Text className="text-beta font-medium text-sm capitalize">{item.type} </Text>
                    </View>
                  )
                    :
                    <View></View>
                }

                {
                  item.website && (
                    <Pressable
                      className="bg-[#2e539d] px-4 py-2 rounded-full flex-row items-center justify-between"
                      onPress={() => Linking.openURL(item.website)}
                    >

                      <Text className="text-white font-medium">Visit site</Text>
                      <Text className="text-blue-400 ml-2">→</Text>
                    </Pressable>
                  )
                }

              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Sponsors;