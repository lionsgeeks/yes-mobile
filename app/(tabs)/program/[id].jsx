import React, { useState, useEffect } from 'react';
const APP_URL = process.env.EXPO_PUBLIC_APP_URL;
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native"
import Navbar from "@/components/navigation/navbar";
import { useLocalSearchParams } from 'expo-router'; ''
import { useAuthContext } from '@/context/auth';

export default function SessionDetails() {
  const Programe = {
    id: 1,
    name: "Opening Ceremony",
    date: "May 15, 2023",
    start_date: "09:00 AM",
    end_time: "10:30 AM",
    description: "Welcome address and keynote speeches from event organizers.",
    location: "Main Hall",
    edition: "2023",
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
    capacity: 50,
  }
  const { user } = useAuthContext();

  const [isSaved, setIsSaved] = useState(false);
  const { id } = useLocalSearchParams();
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [Programes, setPrograme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    const fetchProgrames = async () => {
      try {
        const response = await fetch(`${APP_URL}/api/programe/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.programe) {
          setPrograme(data.programe);
        } else {
          setError("No programe found.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrames();
  }, []);



  const handleEnroll = async (programId) => {
    try {
      const response = await fetch(`${APP_URL}/api/programe/enrolled`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programe_id: parseInt(programId),
          participant_id: user.id,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        alert(data.message); // Already enrolled
        setEnrolledPrograms(prev => [...prev, programId]);
        return;
      }

      if (response.ok) {
        alert(data.message || 'Enrolled successfully!');
        setEnrolledPrograms(prev => [...prev, programId]); // Mark this program as enrolled
      } else {
        alert(data.message || 'Failed to enroll.');
      }
    } catch (error) {
      console.error('Enrollment Error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-4">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 pt-10">
      <Navbar title="Program" />
      <ScrollView className="px-4">
        {/* Title Section */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-[#2952a3] mb-2">{Programe.name}</Text>
          {/* <Text className="text-sm text-gray-600 mb-1">{Programe.edition} Edition</Text> */}
          <Text className="text-sm text-gray-600 mb-1">{Programe.date} • Day 1</Text>
          <Text className="text-sm text-gray-600">{Programe.start_date} - {Programe.end_time}</Text>
        </View>

        {/* About this Session */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">About this Session</Text>
          <Text className="text-gray-600">{Programe.description}</Text>
        </View>

        {/* Location */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">Location</Text>
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="font-medium text-gray-900">{Programe.location}</Text>
            </View>
          </View>
        </View>

        {/* Speakers */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">Speakers</Text>
          <View className="space-y-4">
            {Programe.speakers?.map(speaker => (
              <View key={speaker.id} className="flex-row items-center space-x-4">
                <Image
                  source={{ uri: speaker.image }}
                  className="w-14 h-14 rounded-full border-2 border-[#d4af37]"
                />
                <View className="flex-1 p-2">
                  <Text className="font-medium text-[#2952a3]">{speaker.name}</Text>
                  <Text className="text-sm text-gray-600">{speaker.role}</Text>
                  <Text className="text-xs text-gray-500">{speaker.organization}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>



        {/* Register Button */}





        {enrolledPrograms.includes(Programe.id) ? (
          <View className="bg-[#2952a3] py-4 rounded-lg mt-4">
            <Text className="text-white text-center font-medium">Enrolled</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => handleEnroll(Programe.id)} className="bg-[#2952a3] py-4 rounded-lg mt-4">
            <Text className="text-center text-white text-base font-medium">Register for Session</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
