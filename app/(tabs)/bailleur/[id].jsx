import { View, Text, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '@/components/navigation/navbar';
import { router } from 'expo-router';
import api from '@/api';

export default function bailleurDetail() {
    const { params } = useRoute();
    const { bailleur } = params;
    const navigation = useNavigation();



    return (
        <ScrollView className="flex-1 pt-10 bg-[#f9f9f9]">
            <Navbar title={bailleur.name} />

            {/* Profile Section */}
            <View className="items-center px-4 mt-8">
                <Image
                    source={{ uri: api.IMAGE_URL + bailleur.image }}
                    className="w-32 h-32 rounded-full border-4 border-[#b09417] mb-4"
                />
                <Text className="text-2xl font-bold text-[#2e539d]">{bailleur.name}</Text>
                <Text className="text-base text-gray-600">{bailleur.email}</Text>
                <Text className="text-sm text-gray-400 mb-3">{bailleur?.role}</Text>
            
            </View>

            {/* Info Sections */}
            <View className="px-4 py-6 space-y-4">
                {/* About */}
                <View className="bg-white p-4 rounded-xl shadow-sm">
                    <Text className="text-lg font-semibold text-[#2e539d] mb- text-center">About</Text>
                    <Text className="text-sm text-gray-700 leading-relaxed">
                        {bailleur.bio || "This bailleur is a leading expert in their field, contributing to impactful initiatives and programs across the globe."}
                    </Text>
                </View>


              
                          {/* Contact Button */}
                          <View className="px-6 mb-10 mt-4">
                              <Pressable
                                  onPress={() => router.push({
                                      pathname: `chat/${speaker.id}`,
                                      params: speaker
                                  })}
                                  className="bg-[#2e539d] py-3 rounded-lg  items-center shadow-md"
                                  android_ripple={{ color: "#1c3e7b" }}
              
                              >
                                  <Text className="text-white font-semibold text-base">Send a Message</Text>
                              </Pressable>
                          </View>

              
            </View>

            
        </ScrollView>
    );
}
