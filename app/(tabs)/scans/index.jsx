import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import Navbar from "@/components/navigation/navbar";
import { useAppContext } from "@/context";
import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ScanScreen = () => {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const { setMatches } = useAppContext();
  const [isEnrolled, setIsEnrolled] = useState(null);
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const [loadingCamera, setLoadingCamera] = useState(null);
  const handleScan = (data) => {
    // console.log("Scanned data:", data);
    if (data?.data) {
      if (user.role === "admin") {
        setLoadingCamera(true);
        console.log(data?.data);
        api
          .post("participants/checkqr", {
            badge_id: data.data,
          })
          .then((response) => {
            setIsEnrolled(response.data?.isEnrolled);
          })
          .finally(() => {
            setLoadingCamera(false);
          });
      } else {
        api
          .post("participants/action", {
            currentParticipant: user?.id,
            action: "connect",
            badge_id: data.data,
          })
          .then((response) => {
            if (response?.data?.matches) {
              setMatches(response?.data?.matches);
            }
            const user = response.data?.scanned;

            // console.log(`${user.role + "s"}/${user.id}`);
            switch (user.role) {
              case "visitor":
                navigation.navigate("visitors/[id]", {
                  visitor: user,
                });
                break;
              case "speaker":
                navigation.navigate("speakers/[id]", {
                  speaker: user,
                });
                break;
              case "ngo":
                navigation.navigate("ngos/[id]", {
                  id: user.id,
                });
                break;
              case "bailleur":
                navigation.navigate("bailleurs/[id]", {
                  bailleur: user.id,
                });
                break;
              default:
                break;
            }

            //   navigation.navigate("/ngos/[id]", { id: 5 });
          });
      }
      setCameraActive(false);
      router.replace("scans");
    }
  };

  // Ask for permission on first mount
  useEffect(() => {
    if (!hasPermission?.granted) {
      requestPermission();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCameraActive(true);

      return () => {
        setCameraActive(false);
      };
    }, [])
  );

  if (!hasPermission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!hasPermission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 px-6">
        <Text className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Please Give Access To Camera To Scan A Badge.
        </Text>

        <View className="w-full">
          <TouchableOpacity
            onPress={() => {
              requestPermission();
            }}
            className="bg-alpha py-4 rounded"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Allow Camera
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 py-8">
      <Navbar title="Connect" />
      {cameraActive ? (
        <CameraView
          className="flex-1"
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "code128"],
          }}
        >
          <View className="h-screen items-center text-white justify-end ">
            <Text className="text-xl mb-52 text-white font-bold">
              Scan any Y.E.S Badge to connect
            </Text>
          </View>
        </CameraView>
      ) : (
        <View className="justify-center items-center h-screen">
          <View className=" p-5 bg-white justify-center items-center">
            {loadingCamera ? (
              <ActivityIndicator size="large" color="#b09417" />
            ) : isEnrolled === true ? (
              <View className="items-center justify-center">
                <Ionicons name="checkmark-done" size={50} color={"#22c55e"} />
                <Text className="text-center text-lg font-semibold text-green-500">
                  Participant enrolled in the Event!
                </Text>
              </View>
            ) : isEnrolled === false ? (
              <View className="items-center justify-center">
                <Ionicons name="remove-circle" size={50} color={"#ef4444"} />
                <Text className="text-center text-lg font-semibold text-red-500">
                  Participant are not enrolled in the Event.
                </Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            className="bg-alpha px-3 py-2 rounded w-fit mt-4"
            onPress={() => setCameraActive(true)}
          >
            <Text className="text-white font-bold text-2xl">Scan Qr Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ScanScreen;
