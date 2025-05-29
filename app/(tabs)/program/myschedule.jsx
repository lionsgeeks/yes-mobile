import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Navbar from "@/components/navigation/navbar";
import TransText from "@/components/TransText";
import { router, useNavigation } from "expo-router";
import { useAppContext } from '@/context';

const APP_URL = process.env.EXPO_PUBLIC_APP_URL;

export default function MyMyPrograme() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMycategory, setSelectedMycategory] = useState('');

    const { MyPrograme, Mycategory } = useAppContext();
    const navigation = useNavigation();

    const filteredSessions = MyPrograme.filter(session => {
        const matchesSearch =
            searchQuery === '' ||
            session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesMycategory =
            selectedMycategory === '' || session.category_id === selectedMycategory;

        return matchesSearch && matchesMycategory;
    });

    return (
        <SafeAreaView className="flex-1 bg-gray-50 pt-10">
            {/* Header */}
            <Navbar title={<TransText en="Program" fr="programme" ar="برنامج" />} />

            {/* Category Filter */}
            {/* <View className="px-6 mb-4 flex-row flex-wrap gap-2">
                <TouchableOpacity
                    onPress={() => setSelectedMycategory('')}
                    className={`px-4 py-2 rounded-full ${selectedMycategory === '' ? 'bg-beta' : 'bg-gray-200'}`}
                >
                    <Text className={`${selectedMycategory === '' ? 'text-white' : 'text-gray-700'}`}>All</Text>
                </TouchableOpacity>

                {Mycategory?.length > 0 && Mycategory.map((cat, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedMycategory(cat.id)}
                        className={`px-4 py-2 rounded-full ${selectedMycategory === cat.id ? 'bg-beta' : 'bg-gray-200'}`}
                    >
                        <Text className={`${selectedMycategory === cat.id ? 'text-white' : 'text-gray-700'}`}>
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View> */}

            {/* Search Input */}
            <View className="px-6 mb-4">
                <TextInput
                    placeholder="Search by name..."
                    placeholderTextColor="#aaa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
                />
            </View>

            {/* Sessions */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-6">
                    {filteredSessions.length > 0 ? (
                        filteredSessions.map((session, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate("program/[id]", { session })}
                                className="bg-white rounded-xl p-4 mb-4 shadow-sm border-l-4 border-beta"
                            >
                                <View className="flex-row items-center mb-3">
                                    <Text className="mr-2 text-gray-600">🗓️</Text>
                                    <Text className="text-gray-600">{session.date}</Text>
                                </View>

                                <View className="flex-row items-center justify-between mb-3">
                                    <View className="flex-row items-center">
                                        <Text className="mr-2 text-gray-600">🕒</Text>
                                        <Text className="text-gray-600">{session.start_date} - {session.end_date}</Text>
                                    </View>
                                </View>

                                <Text className="text-lg font-semibold text-gray-800 mb-2">{session.name}</Text>
                                <Text className="text-gray-600 mb-3">{session.description}</Text>

                                <View className="flex-row items-center mb-3">
                                    <Text className="mr-2 text-gray-600">📍</Text>
                                    <Text className="text-gray-600">{session.location}</Text>
                                </View>

                                {session.participants?.length > 0 && (
                                    <View className="mb-3 gap-x-2">
                                        <View className="flex-row items-center mb-2">
                                            <Text className="mr-2 text-gray-600">🧑‍💼</Text>
                                            <Text className="text-gray-600 font-medium">Speakers:</Text>
                                        </View>
                                        <View className="flex-row flex-wrap pr-8">
                                            {session.participants.map((speaker, i) => (
                                                <View key={i} className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2">
                                                    <Text className="text-gray-700 text-sm">{speaker.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View className="items-center justify-center mt-10">
                            <Text className="text-gray-600">Your have ni session enrolled at .</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
