import React, { useEffect, useState } from "react";
import { View, Button, Alert, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useAuthContext } from "@/context/auth";
import api from "@/api";

const ShareEvent = () => {
  const { user } = useAuthContext();
  const [imagePath, setImagePath] = useState(null);
  // const imagePath = 'http://192.168.100.136:8000/assets/posts/screenshot_Hamza.png'
  useEffect(() => {
    api
      .get(`invitation/image?id=${user?.id}`)
      .then((response) => {
        console.log("image response", response.data.image_path);
        setImagePath(response.data.image_path);
      })
      .catch((error) => {
        console.log("image error", error);
      });
  }, [user]);
  const shareToLinkedIn = async () => {
    try {
      if (!imagePath) {
        Alert.alert(
          "Error",
          "Failed to load the image. Please try again later."
        );
        return;
      }

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Sharing not supported",
          "This device does not support sharing files."
        );
        return;
      }

      // Download the image to the cache directory
      const fileUri = FileSystem.cacheDirectory + "shared-event-image.png";
      const downloadRes = await FileSystem.downloadAsync(imagePath, fileUri);
      console.log("Image downloaded to:", imagePath);
      // Share the downloaded image
      await Sharing.shareAsync(downloadRes.uri, {
        mimeType: "image/png",
        dialogTitle: "Share this event",
        UTI: "image/png", // iOS-specific
      });
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert("Error", "Failed to share the image.");
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <TouchableOpacity onPress={shareToLinkedIn}>
        <Text className="text-white bg-beta p-3 rounded-xl  text-m font-semibold">Share Badge</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareEvent;
