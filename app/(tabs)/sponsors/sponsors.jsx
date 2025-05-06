import React from 'react';
import { Text, View, Pressable, Image, ScrollView, TextInput, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from "@/components/navigation/navbar";
import { Picker } from '@react-native-picker/picker';

const allSponsors = [{
  id: 1,
  name: "Lionsgeek",
  tier: "Association",
  description: "Leading technology company providing software, hardware, and cloud services.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFkbeAL5Awr6mwkecJV2mP5MVdedqFq7Oaqg&s",
  url: "https://microsoft.com"
},
{
  id: "2",
  name: "2m",
  tier: "Media",
  description: "Leading technology company providing software, hardware, and cloud services.",
  image: "https://upload.wikimedia.org/wikipedia/fr/thumb/a/ac/2M_Logo.svg/1280px-2M_Logo.svg.png",
  url: "https://microsoft.com"
},
{
  id: "3",
  name: "Jadara",
  tier: "Association",
  description: "Leading technology company providing software, hardware, and cloud services.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQur9cHxmm6RW6cOtQeRF2FXbJS0M8fo897BA&s",
  url: "https://microsoft.com"
},
{
  id: "4",
  name: "Yes Africa",
  tier: "Finance",
  description: "Leading technology company providing software, hardware, and cloud services.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVp9SrShiyf0Zxu6O5C7CWT3t4AMZTiT5U7w&s",
  url: "https://microsoft.com"
}, {
  id: "5",
  name: "Microsoft",
  tier: "Technology",
  description: "Leading technology company providing software, hardware, and cloud services.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/1200px-Microsoft_icon.svg.png",
  url: "https://microsoft.com"
}];

const Sponsors = () => {
  const navigation = useNavigation();
  return (
    <View className="h-screen bg-white pt-10">
      <Navbar title="Sponsors" />
      <View className="px-6 mb-3">
        <View className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <Picker
          >
            <Picker.Item label="Filter by Category" value="all" />
            <Picker.Item label="Finance" value="Finance" />
            <Picker.Item label="Marketing" value="Marketing"/>
          </Picker>
        </View> 
      </View>
      <ScrollView className="px-4 mb-4 mt-6">
        <View className="flex-row flex-wrap justify-between gap-4">
          {allSponsors.map((item) => (
            <View key={item.id} className="bg-white rounded-xl shadow-lg shadow-gray-300 w-full p-4 mb-4">
              <View className="flex-row items-center mb-4">
                <Image
                  source={{ uri: item.image }}
                  className="w-16 h-16 rounded-lg mr-4"
                  resizeMode="contain"
                />
                <View>
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-sm text-gray-500">{item.description}</Text>
                </View>
              </View>
              <View className='flex-row justify-between items-center'>
                <View className="bg-[#efcc2d38] px-4 py-1.5 rounded-full self-start mt-1">
                  <Text className="text-beta font-medium text-sm">{item.tier}</Text>
                </View>

                <Pressable
                  className="bg-[#2e539d] px-4 py-2 rounded-full flex-row items-center justify-between"
                  onPress={() => Linking.openURL(item.url)}
                >

                <Text className="text-white font-medium">Visit site</Text>
                <Text className="text-blue-400 ml-2">→</Text>
                </Pressable>

              </View>

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Sponsors;