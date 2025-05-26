import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import Navbar from "@/components/navigation/navbar";
import { useAppContext } from "@/context";
import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { router, useNavigation } from "expo-router";

const ScanScreen = () => {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const { visitors, speakers, ngos, participants } = useAppContext();
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const handleScan = (data) => {
    console.log("Scanned data:", data);
    if (data?.data) {
      api
        .post("participants/action", {
          currentParticipant: user?.id,
          action: "connect",
          badge_id: data.data,
        })
        .then((response) => {
            // console.log("Action sent successfully🚗🚗🚗:", response.data.scanned);
          const user =
            response.data?.scanned;

          console.log(`${user.role + "s"}/${user.id}`);
          switch (user.role) {
            case "visitor":
              navigation.navigate(`${user.role + "s"}/[id]`, {
                visitor: user,
              });
              break;
            case "speaker":
              navigation.navigate(`${user.role + "s"}/[id]`, {
                speaker: user,
              });
              break;
            case "ngo":
              navigation.navigate(`${user.role + "s"}/[id]`, {
                id: user.id,
              });
              break;
              case "bailleur":
              navigation.navigate(`${user.role + "s"}/[id]`, {
                id: user.id,
              });
              break;
            default:
              break;
          }

          //   navigation.navigate("/ngos/[id]", { id: 5 });
        });
      setCameraActive(false); // stop scanning after success
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
      <View className="flex-1 justify-center items-center">
        <Text>No access to camera</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View className="flex-1 py-8">
      <Navbar title="Connect" />
      {cameraActive && (
        <CameraView
          className="flex-1"
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "code128"],
          }}
        >
          <View className="h-screen items-center text-white justify-end ">
            <Text className="text-xl mb-52 text-white font-bold">
              Scann any Y.E.S Badge to connect
            </Text>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default ScanScreen;
