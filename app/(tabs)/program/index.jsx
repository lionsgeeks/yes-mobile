import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

const mockSessions = [
  {
    id: '1',
    title: 'Opening Ceremony',
    description: 'Welcome address and keynote speeches from event organizers.',
    time: { start: '09:00', end: '10:30' },
    location: 'Main Hall',
    day: 'day1',
    speakers: [
      { id: '1', name: 'Emma Johnson' },
      { id: '2', name: 'David Patel' },
    ],
  },

];
import { router } from "expo-router"


export default function Program() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch =
      searchQuery === '' ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase());
    return  matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">

      {/* Header */}
      <View className="bg-[#334481] pt-10 pb-4 px-4">
        <View className="flex-row items-center mb-4">
          <Text className="flex-1 text-center text-white text-xl font-semibold">Daily Program</Text>
          <View className="w-10" />
        </View>

        <View className="flex-row items-center bg-white rounded-lg px-3 py-2">
          <Text className="mr-2 text-gray-400">🔍</Text>
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Search sessions..."
            placeholderTextColor="#858585"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-gray-600 mx-4 mt-4 mb-3 text-base">
          Explore the schedule of events, workshops, and panels.
        </Text>



        {/* Sessions */}
        <View className="px-4">
          {filteredSessions.map(session => (
            <View key={session.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Text className="mr-2 text-gray-600">🕒</Text>
                  <Text className="text-gray-600">{session.time.start} - {session.time.end}</Text>
                </View>
                <View className="bg-blue-50 px-3 py-1 rounded-full">

                </View>
              </View>

              <Text className="text-lg font-semibold text-gray-800 mb-2">{session.title}</Text>
              <Text className="text-gray-600 mb-3">{session.description}</Text>

              <View className="flex-row items-center mb-3">
                <Text className="mr-2 text-gray-600">📍</Text>
                <Text className="text-gray-600">{session.location}</Text>
              </View>

              {session.speakers.length > 0 && (
                <View>
                  <View className="flex-row items-center mb-2">
                    <Text className="mr-2 text-gray-600">🧑‍💼</Text>
                    <Text className="text-gray-600 font-medium">Speakers:</Text>
                  </View>
                  <View className="flex-row flex-wrap">
                    {session.speakers.map(speaker => (
                      <View key={speaker.id} className="bg-gray-100 rounded-full px-3 py-1.5 mr-2 mb-2">
                        <Text className="text-gray-700 text-sm">{speaker.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              <Button title="View Details" onPress={() => router.navigate("/program/show")} />
            </View>
          ))}
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
