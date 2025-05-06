import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router } from "expo-router"

const SessionDetails = () => {
    const session = {
        title: "Opening Ceremony",
        date: "May 15, 2023",
        time: {
            start: "09:00",
            end: "10:30",
            duration: "1.5 hours"
        },
        description: "Welcome address and keynote speeches from event organizers.",
        location: {
            name: "Main Hall",
            details: "First floor, accessible entrance available"
        },
        speakers: [
            {
                id: 1,
                name: "Emma Johnson",
                role: "Climate Activist",
                organization: "Green Earth Initiative",
                image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=100"
            },
            {
                id: 2,
                name: "David Patel",
                role: "Tech for Good Lead",
                organization: "Digital Bridges",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
            }
        ],
        tags: ["Keynote", "Opening", "Welcome"],
        capacity: {
            registered: 423,
            remaining: 77,
            total: 500
        }
    };

    return (
        <>
            {/* Header */}
            <View className="bg-alpha p-4 pt-10 ios:pt-16 flex-row items-center">
                <TouchableOpacity  onPress={() => router.navigate("/program")}>
                    <Text className="text-white text-lg">←</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-semibold ml-3">Session Details</Text>
            </View>
            

            <ScrollView className="flex-1">
                {/* Hero Section */}
                <View className=" px-6 py-6">
                    <Text className="text-2xl font-bold text-black mb-2">{session.title}</Text>
                    <View className="flex-row items-center mb-2">
                        <Text className="text-black mr-2">📅</Text>
                        <Text className="text-black">{session.date}</Text>
                        <View className="bg-white/20 rounded-full px-3 py-1 ml-2">
                            <Text className="text-black text-sm">Day 1</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-black mr-2">⏰</Text>
                        <Text className="text-black">
                            {session.time.start} - {session.time.end}
                            <Text className="text-black/70"> ({session.time.duration})</Text>
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <View className="py-4 px-6">
                    <Text className="text-xl font-semibold text-alpha mb-4">About this Session</Text>
                    <Text className="text-gray-600 mb-6">{session.description}</Text>

                    <Text className="text-xl font-semibold text-alpha mb-4">Location</Text>
                    <View className="bg-gray-50 p-4 rounded-lg mb-6">
                        <View className="flex-row items-start">
                            <Text className="text-alpha mr-2 mt-1">📍</Text>
                            <View>
                                <Text className="font-semibold text-gray-800">{session.location.name}</Text>
                                <Text className="text-gray-600">{session.location.details}</Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-xl font-semibold text-alpha mb-4">Speakers</Text>
                    <View className="space-y-4 mb-6">
                        {session.speakers.map(speaker => (
                            <View key={speaker.id} className="flex-row items-center bg-gray-50 p-4 rounded-lg">
                                <Image
                                    source={{ uri: speaker.image }}
                                    className="w-12 h-12 rounded-full"
                                />
                                <View className="ml-3">
                                    <Text className="font-semibold text-gray-800">{speaker.name}</Text>
                                    <Text className="text-gray-600">{speaker.role}</Text>
                                    <Text className="text-gray-500">{speaker.organization}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <Text className="text-xl font-semibold text-alpha mb-4">Tags</Text>
                    <View className="flex-row flex-wrap gap-2 mb-6">
                        {session.tags.map(tag => (
                            <View key={tag} className="bg-alpha/10 px-3 py-1 rounded-full">
                                <Text className="text-alpha">{tag}</Text>
                            </View>
                        ))}
                    </View>

                    <Text className="text-xl font-semibold text-alpha mb-4">Capacity</Text>
                    <View className="bg-gray-50 p-4 rounded-lg mb-6">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-600">{session.capacity.registered} registered</Text>
                            <Text className="text-gray-600">{session.capacity.remaining} seats left</Text>
                        </View>
                        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <View
                                className="h-full bg-alpha"
                                style={{ width: `${(session.capacity.registered / session.capacity.total) * 100}%` }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View className="py-4 px-6 border-t border-gray-200">
                <TouchableOpacity className="bg-alpha py-3 rounded-lg">
                    <Text className="text-white text-center font-semibold">Register for Session</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default SessionDetails;
