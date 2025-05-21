import React, { useState, useEffect } from "react";
const APP_URL = process.env.EXPO_PUBLIC_APP_URL;
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Navbar from "@/components/navigation/navbar";
import { useCameraPermissions, CameraView } from "expo-camera";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
("");
import { useAuthContext } from "@/context/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "@/api";
import { Ionicons } from "@expo/vector-icons";

export default function SessionDetails() {
  const { user } = useAuthContext();
  const { params } = useRoute();
  const { Programe } = params;
  const navigation = useNavigation();
  console.log("🚨🚨🚨🚨🚨🚨", Programe);
  const { id } = useLocalSearchParams();
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  // const [Programe, setPrograme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [isScanned, setIsScanned] = useState(null);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const handleEnroll = async (programId) => {
    console.log("Enrolling in program:", programId);
    
    try {
      const response = await fetch(`${APP_URL}/api/enrolled`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programe_id: parseInt(programId),
          participant_id: user.id,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        alert(data.message); // Already enrolled
        setEnrolledPrograms((prev) => [...prev, programId]);
        return;
      }

      if (response.ok) {
        alert(data.message || "Enrolled successfully!");
        setEnrolledPrograms((prev) => [...prev, programId]); // Mark this program as enrolled
      } else {
        alert(data.message || "Failed to enroll.");
      }
    } catch (error) {
      console.error("Enrollment Error:", error);
      alert("something went wrong. Try again.");
    }
  };

  const handlcancelEnroll = async (programId) => {
    try {
      const response = await fetch(`${APP_URL}/api/enrolleddelete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programe_id: (programId),
          participant_id: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Enrollment cancelled successfully!");
        setEnrolledPrograms((prev) => prev.filter((id) => id !== programId)); // Remove this program from enrolled list
      } else {
        alert(data.message || "Failed to cancel enrollment.");
      }
    } catch (error) {
      console.error("Cancellation Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  // if (loading) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-gray-50">
  //       <Text className="text-lg text-gray-600">Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-gray-50 px-4">
  //       <Text className="text-lg text-red-500">{error}</Text>
  //     </View>
  //   );
  // }
  const checkParticipant = async (badgeId) => {
    // console.log(typeof badgeId);
    if (hasChecked) {
      return;
    }
    setIsScanned(true);
    try {
      setLoadingCamera(true);
      const response = await api.post("participants/enrolled", {
        badge_id: badgeId,
        programe_id: Programe.id,
      });
      console.log("🚨🚨🚨 response : ", response);
      if (response?.status === 200) {
        // console.log("🚨🚨🚨🚨🚨🚨", response?.data.isRegistered);
        setIsEnrolled(response?.data.isRegistered);
      } else {
        alert("Error: " + response?.data?.message);
      }
    } catch (error) {
      console.log("🚨Error checking participant:", error);
    } finally {
      setLoadingCamera(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        setIsCameraReady(false);
        setIsScanned(false);
        setHasChecked(false);
      };
    }, [])
  );
  return !isCameraReady ? (
    <View className="flex-1 bg-gray-50 pt-10">
      <Navbar title="Program Details" setIsCameraReady={setIsCameraReady} />
      <ScrollView className="px-4">
        {/* Title Section */}
        <View className="items- p-5 mb-6 bg-white">
          <Text className="text-2xl font-bold text-[#2952a3] mb-2">
            {Programe.name}
          </Text>
          {/* <Text className="text-sm text-gray-600 mb-1">{id} Edition</Text> */}
          <Text className="text-sm text-gray-600 mb-1">
            {Programe.date} • Day 1
          </Text>
          <Text className="text-sm text-gray-600">
            {Programe.start_date} - {Programe.end_date}
          </Text>
        </View>

        {/* About this Session */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">
            About this Session
          </Text>
          <Text className="text-gray-600">{Programe.description}</Text>
        </View>

        {/* Location */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">
            Location
          </Text>
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="font-medium text-gray-900">
                {Programe.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Speakers */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">
            Speakers
          </Text>
          <View className="space-y-4">
            {Programe.participants?.map((speaker) => (
              <View
                key={speaker.id}
                className="flex-row items-center space-x-4"
              >
                <Image
                  source={{ uri: api.IMAGE_URL + speaker?.image }}
                  className="w-14 h-14 rounded-full border-2 border-[#d4af37]"
                />
                <View className="flex-1 p-2">
                  <Text className="font-medium text-[#2952a3]">
                    {speaker?.name}
                  </Text>
                  <Text className="text-sm text-gray-600">{speaker?.role}</Text>
                  <Text className="text-xs text-gray-500">
                    {speaker?.organization}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Register Button */}

        {enrolledPrograms.includes(Programe.id) ? (
          <TouchableOpacity
            onPress={() => handlcancelEnroll(Programe.id)}
            className="bg-[#2952a3] py-4 rounded-lg mt-4"
          >
            <Text className="text-white text-center font-medium">
              Cancel your register
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleEnroll(Programe.id)}
            className="bg-[#2952a3] py-4 rounded-lg mt-4"
          >
            <Text className="text-center text-white text-base font-medium">
              Register for Session
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  ) : (
    <View className=" items-center justify-center h-screen ">
      {/* <Text>Scan</Text>
      <Pressable
        onPress={() => {
          setHasChecked(false);
          setIsCameraReady(false);
        }}
        className="bg-white px-4 py-2 rounded-lg"
      >
        <Text className="text-[#2952a3] font-semibold">Close</Text>
      </Pressable> */}
      <View className="w-96 h-96 border border-white rounded-lg">
        <CameraView
          facing="back"
          onBarcodeScanned={(text) => {
            // console.log("Scanned data:", text.data);
            setHasChecked(true);
            checkParticipant(text.data);
          }}
        >
          <View className="w-full h-full "></View>
        </CameraView>
        {isScanned && (
          <View className="absolute inset-0 p-5 bg-white justify-center items-center">
            {loadingCamera ? (
              <ActivityIndicator size="large" color="#b09417" />
            ) : isEnrolled === true ? (
              <View className="items-center justify-center">
                <Ionicons name="checkmark-done" size={50} color={"#22c55e"} />
                <Text className="text-center text-lg font-semibold text-green-500">
                  You are enrolled in this session!
                </Text>
              </View>
            ) : isEnrolled === false ? (
              <View className="items-center justify-center">
                <Ionicons name="remove-circle" size={50} color={"#ef4444"} />
                <Text className="text-center text-lg font-semibold text-red-500">
                  You are not enrolled in this session.
                </Text>
              </View>
            ) : null}
            <Pressable
              onPress={() => {
                setIsCameraReady(false);
                setIsScanned(false);
                setHasChecked(false);
                setIsEnrolled(null); // Reset for next scan
              }}
              className="bg-alpha w-fit px-4 py-3 rounded-lg mt-4"
            >
              <Text className="text-white font-bold text-center">Close</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
