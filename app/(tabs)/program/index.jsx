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

// const Programes = [
//   {
//     id: 1,
//     name: 'Opening Ceremony',
//     description: 'Welcome address and keynote speeches from event organizers.',
//     start_date: '09:00',
//     end_date: '10:30',
//     location: 'Main Hall',
//     day: 'day1',
//     speakers: [
//       { id: '1', name: 'Emma Johnson' },
//       { id: '2', name: 'David Patel' },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Opening Ceremony',
//     description: 'Welcome address and keynote speeches from event organizers.',
//     start_date: '09:00',
//     end_date: '10:30',
//     location: 'Main Hall',
//     day: 'day1',
//     speakers: [
//       { id: '1', name: 'Emma Johnson' },
//       { id: '2', name: 'David Patel' },
//     ],
//   },

// ];
import { router } from "expo-router"
import { useAppContext } from '@/context';


export default function Program() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [Programe, setProgrames] = useState([]);
  // const [error, setError] = useState(null);
  const { Programe } = useAppContext();

  // useEffect(() => {
  //   const fetchProgrames = async () => {
  //     try {
  //       const response = await fetch(`${APP_URL}/api/programe/create`);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();

  //       if (data.programes) {
  //         console.log(data.programes);
  //         // console.log(data.data);

  //         setProgrames(data.programes);
  //       } else {
  //         setError('No programe found.');
  //       }

  //     } catch (err) {
  //       console.error('Fetch Error:', err);
  //       setError(err.message);
  //     }
  //   };

  //   fetchProgrames();
  // }, []);





  const filteredSessions = Programe.filter(session => {
    const matchesSearch =
      searchQuery === '' ||
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });




  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-10">
      {/* Header */}

      <Navbar title="Program" />

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
          {filteredSessions.map(session => (
            <TouchableOpacity onPress={() => router.navigate(`/program/${session.id}`)} key={session.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm border-l-4 border-beta">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Text className="mr-2 text-gray-600">🕒</Text>
                  <Text className="text-gray-600">{session.start_date} - {session.end_date}</Text>
                </View>
                <View className="bg-blue-50 px-3 py-1 rounded-full">

                </View>
              </View>

              <Text className="text-lg font-semibold text-gray-800 mb-2">{session.name}</Text>
              <Text className="text-gray-600 mb-3">{session.description}</Text>

              <View className="flex-row items-center mb-3">
                <Text className="mr-2 text-gray-600">📍</Text>
                <Text className="text-gray-600">{session.location}</Text>
              </View>




              {/* {session.speakers.length > 0 && (
                <View className='flex-row items-center mb-3 gap-x-2'>
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
              )} */}



            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}
