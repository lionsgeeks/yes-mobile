import { View, Text, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '@/components/navigation/navbar';
import { router } from 'expo-router';
import api from '@/api';

export default function SpeakerDetail() {
    const { params } = useRoute();
    const { speaker } = params;
    const navigation = useNavigation();



    return (
        <ScrollView className="flex-1 pt-10 bg-[#f9f9f9]">
            <Navbar title={speaker.name} />

            {/* Profile Section */}
            <View className="items-center px-4 mt-8">
                <Image
                    source={{ uri: api.IMAGE_URL + speaker.image }}
                    className="w-32 h-32 rounded-full border-4 border-[#b09417] mb-4"
                />
                <Text className="text-2xl font-bold text-[#2e539d]">{speaker.name}</Text>
                <Text className="text-base text-gray-600">{speaker.title}</Text>
                <Text className="text-sm text-gray-400 mb-3">{speaker?.role}</Text>
                <View className="">
                    <View className="flex flex-row items-center gap-2 mb-2 mt-2">
                        {speaker?.social?.linkedin && (
                            <Ionicons
                                onPress={() => Linking.openURL(speaker?.social?.linkedin)}
                                name="logo-linkedin"
                                size={26}
                                color="#0a65c0"
                            />
                        )}
                        {speaker?.social?.instagram && (
                            <Ionicons
                                onPress={() => Linking.openURL(speaker?.social?.instagram)}
                                name="logo-instagram"
                                size={26}
                                color="#0a65c0"
                            />
                        )}
                        {speaker?.social?.website && (
                            <Ionicons
                                onPress={() => Linking.openURL(speaker?.social?.website)}
                                name="globe-outline"
                                size={26}
                                color="#0a65c0"
                            />
                        )}
                        {speaker?.social?.youtube && (
                            <Ionicons
                                onPress={() => Linking.openURL(speaker?.social?.youtube)}
                                name="logo-youtube"
                                size={26}
                                color="#0a65c0"
                            />
                        )}
                    </View>
                </View>
            </View>

            {/* Info Sections */}
            <View className="px-4 py-6 space-y-4">
                {/* About */}
                <View className="bg-white p-4 rounded-xl shadow-sm">
                    <Text className="text-lg font-semibold text-[#2e539d] mb-2">About</Text>
                    <Text className="text-sm text-gray-700 leading-relaxed">
                        {speaker.description || "This speaker is a leading expert in their field, contributing to impactful initiatives and programs across the globe."}
                    </Text>
                </View>

                {/* Expertise */}
                {speaker.tags?.length > 0 && (
                    <View className="bg-white p-4 rounded-xl shadow-sm">
                        <Text className="text-lg font-semibold text-[#2e539d] mb-2">Expertise</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {speaker.tags.map((tag) => (
                                <View key={tag} className="bg-[#2e539d] px-3 py-1 rounded-full">
                                    <Text className="text-white text-xs">{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Education */}
                {speaker.education && (
                    <View className="bg-white p-4 rounded-xl shadow-sm">
                        <Text className="text-lg font-semibold text-[#2e539d] mb-2">Education</Text>
                        <Text className="text-sm text-gray-700">{speaker.education}</Text>
                    </View>
                )}

                {/* Languages */}
                {speaker.languages?.length > 0 && (
                    <View className="bg-white p-4 rounded-xl shadow-sm">
                        <Text className="text-lg font-semibold text-[#2e539d] mb-2">Languages</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {speaker.languages.map((lang) => (
                                <View key={lang} className="bg-[#b09417] px-3 py-1 rounded-full">
                                    <Text className="text-white text-xs">{lang}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Sessions */}
                {speaker.sessions?.length > 0 && (
                    <View className="bg-white p-4 rounded-xl shadow-sm">
                        <Text className="text-lg font-semibold text-[#2e539d] mb-2">Sessions</Text>
                        {speaker.sessions.map((session, index) => (
                            <View
                                key={index}
                                className="border border-[#e0e0e0] rounded-lg p-3 mb-3 bg-white shadow-sm"
                                style={{ elevation: 1 }}
                            >
                                <Text className="text-[#2e539d] font-semibold">{session.title}</Text>
                                <Text className="text-sm text-gray-600">
                                    📍 {session.room} • 🕒 {session.time}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
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
        </ScrollView>
    );
}
