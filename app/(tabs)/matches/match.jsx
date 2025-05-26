import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";
import api from "@/api";
import Navbar from "@/components/navigation/navbar";
import { useFocusEffect } from "expo-router";

export default function Match() {
  const { participants, fetchParticipants } = useAppContext();
  const [userList, setUserList] = useState(participants);
  const { user } = useAuthContext();
  useFocusEffect(
    React.useCallback(() => {
      fetchParticipants();
    }, [])
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = (type) => {
    const updatedUsers = participants;
    const relatedParticipant = updatedUsers[currentIndex]?.id;
    if (!relatedParticipant) return;

    api
      .post("participants/action", {
        currentParticipant: user?.id,
        related_participant_id: relatedParticipant,
        action: type,
      })
      .catch((error) => {
        console.error(
          "Failed to send action:",
          error.response?.data || error.message
        );
      });

    setCurrentIndex((prev) => prev + 1);
  };
  useEffect(() => {
    if (user) {
      setCurrentIndex(0);
    }
  }, [user?.id]);

  return (
    <>
      <View className="h-screen bg-white pt-10">
        <Navbar title="Connect" />
        {/* <Text>Selection For You</Text> */}
        <View className="items-center my-3">
          <Card
            user={userList[currentIndex]}
            onSkip={() => handleAction("skip")}
            onConnect={() => handleAction("connect")}
          />
        </View>
      </View>
    </>
  );
}
