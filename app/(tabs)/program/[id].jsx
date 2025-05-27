import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
} from "react-native";
import Navbar from "@/components/navigation/navbar";
import { useCameraPermissions, CameraView } from "expo-camera";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
("");
import { useAuthContext } from "@/context/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "@/api";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context";

export default function SessionDetails() {
  const { user } = useAuthContext();
  const { Programe } = useAppContext();
  const { params } = useRoute();
  const { session } = params;

  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  // const [session, setPrograme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [isScanned, setIsScanned] = useState(null);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [badgeId, setBadgeId] = useState(null);
  const handleEnroll = async (programId) => {
    console.log("Enrolling in program:", programId);

    try {
      const response = await fetch(`${api.APP_URL}/api/enrolled`, {
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
        Alert.alert(data.message, 'user already enrolled'); // Already enrolled
        setEnrolledPrograms((prev) => [...prev, programId]);
        return;
      }

      if (response.ok) {
        Alert.alert(data.message || "Enrolled successfully!", 'You have been succesfully enrolled');
        setEnrolledPrograms((prev) => [...prev, programId]); // Mark this program as enrolled
      } else {
        Alert.alert(data.message || "Failed to enroll.", 'Something went wrong');
      }
    } catch (error) {
      console.error("Enrollment Error:", error);
      Alert.alert("something went wrong. Try again.");
    }
  };

  const handlcancelEnroll = async (programId) => {
    try {
      const response = await fetch(`${api.APP_URL}/api/enrolleddelete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programe_id: programId,
          participant_id: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(data.message || "Enrollment cancelled successfully!", 'Your Cancellation was succesfull');
        setEnrolledPrograms((prev) => prev.filter((id) => id !== programId)); // Remove this program from enrolled list
      } else {
        Alert.alert(data.message || "Failed to cancel enrollment.", 'Something went wrong');
      }
    } catch (error) {
      console.error("Cancellation Error:", error);
      Alert.alert("Something went wrong. Try again.");
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
    setBadgeId(badgeId);
    if (hasChecked) {
      return;
    }
    setIsScanned(true);
    try {
      setLoadingCamera(true);
      const response = await api.post("participants/enrolled", {
        badge_id: badgeId,
        programe_id: session.id,
      });
      console.log("🚨🚨🚨 response : ", response);
      if (response?.status === 200) {
        setIsEnrolled(response?.data.isRegistered);
      } else {
        Alert.alert("Error: " + response?.data?.message);
      }
    } catch (error) {
      console.log("🚨Error checking participant:", error);
    } finally {
      setLoadingCamera(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIsCameraReady(false);
        setIsScanned(false);
        setHasChecked(false);
        setModalVisible(true);
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
            {session.name}
          </Text>
          {/* <Text className="text-sm text-gray-600 mb-1">{id} Edition</Text> */}
          <Text className="text-sm text-gray-600 mb-1">
            {session.date} • Day 1
          </Text>
          <Text className="text-sm text-gray-600">
            {session.start_date} - {session.end_date}
          </Text>
        </View>

        {/* About this Session */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">
            About this Session
          </Text>
          <Text className="text-gray-600">{session.description}</Text>
        </View>

        {/* Location */}
        <View className="bg-white rounded-lg p-5 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-[#2952a3] mb-3">
            Location
          </Text>
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="font-medium text-gray-900">
                {session.location}
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
            {session.participants?.map((speaker, index) => (
              <View key={index} className="flex-row items-center space-x-4">
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

        {enrolledPrograms.includes(session.id) ? (
          <TouchableOpacity
            onPress={() => handlcancelEnroll(session.id)}
            className="bg-[#2952a3] py-4 rounded-lg mt-4"
          >
            <Text className="text-white text-center font-medium">
              Cancel your register
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleEnroll(session.id)}
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
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <TouchableOpacity
                    className="flex-1 bg-[rgba(0,0,0,0.5)] justify-end"
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                  >
                    <View
                      className="bg-white rounded-t-2xl"
                      style={{ paddingBottom: Platform.OS === "ios" ? 30 : 16 }}
                    >
                      <View className="flex-row justify-between items-center p-4 border-b border-[#eee]">
                        <Text className="text-base font-semibold text-[#333]">
                          Sessions where the user enrolled
                        </Text>
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}
                        >
                          <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                      </View>

                      {Programe?.map(
                        (program, index) =>
                          program?.participantes.some((participant) =>
                            participant.qr_codes?.some(
                              (qr) => qr.badge_id === badgeId
                            )
                          ) && (
                            <View
                              key={index}
                              className="flex-row relative justify-between items-center p-4 border-b  border-l-4 border-beta"
                              onPress={() => {
                                // setSelectedCategory(category);
                                setModalVisible(false);
                              }}
                            >
                              <View className="flex-col ">
                                <Text
                                  className={`text-sm text-[#333]
                          "text-[#0288d1] font-medium"
                          `}
                                >
                                  {program.name}
                                </Text>
                                <Text className="text-sm text-gray-600 my-3">
                                  🕘 {program.start_date} - {program.end_date}
                                </Text>
                                <Text className="text-sm text-gray-600">
                                  📍​ {program.location}
                                </Text>
                              </View>
                              {/* <Ionicons name="checkmark" size={20} color="#0288d1" /> */}
                            </View>
                          )
                      )}
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
            ) : null}
            <Pressable
              onPress={() => {
                setIsCameraReady(false);
                setIsScanned(false);
                setHasChecked(false);
                setIsEnrolled(null);
                setModalVisible(true);
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
