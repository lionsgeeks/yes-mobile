import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Navbar from "@/components/navigation/navbar";
const APP_URL = process.env.EXPO_PUBLIC_APP_URL;
import TransText from "@/components/TransText"


import { router } from "expo-router"
import { useAppContext } from '@/context';
import { useNavigation } from "expo-router";


export default function Program() {
  const [searchQuery, setSearchQuery] = useState('');

  const { Programe } = useAppContext();
  const { category } = useAppContext();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log("programe : ", Programe[0].category_id);
  console.log("cat : ", category);

  const filteredSessions = Programe.filter(session => {
    const matchesSearch =
      searchQuery === '' ||
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '' || session.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-10">
      {/* Header */}

      <Navbar title=<TransText en="Program" fr="programme" ar="برنامج" /> />
      <View className="px-6 mb-4 flex-row flex-wrap gap-">
        <ScrollView

          horizontal
          showsHorizontalScrollIndicator={false}
        

        >

          <View className='flex-row  gap-2'>

            <TouchableOpacity onPress={() => setSelectedCategory('')} className={`px-4 py-2 rounded-full ${selectedCategory === '' ? 'bg-beta' : 'bg-gray-200'}`}>
              <Text className={`${selectedCategory === '' ? 'text-white' : 'text-gray-700'}`}>All</Text>
            </TouchableOpacity>

            {category?.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full ${selectedCategory === cat.id ? 'bg-beta' : 'bg-gray-200'}`}
              >
                <Text className={`${selectedCategory === cat.id ? 'text-white' : 'text-gray-700'}`}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>




        {/* Sessions */}
        <View className="px-6">
          {filteredSessions.map((session, index) => (
            <TouchableOpacity onPress={() =>
              navigation.navigate("program/[id]", { session: session })
            } key={index} className="bg-white rounded-xl p-4 mb-4 shadow-sm border-l-4 border-beta">
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




              {session.participants.length > 0 && (
                <View className='mb-3 gap-x-2'>
                  <View className="flex-row items-center mb-2">
                    <Text className="mr-2 text-gray-600">🧑‍💼</Text>
                    <Text className="text-gray-600 font-medium">Speakers:</Text>
                  </View>
                  <View className="flex-row flex-wrap pr-8">
                    {session?.participants?.map((speaker, index) => (
                      <View key={index} className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2">
                        <Text className="text-gray-700 text-sm">{speaker.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}



            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
