import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";
import api from "@/api";
import Navbar from "@/components/navigation/navbar";
import { useFocusEffect } from "expo-router";
import TransText from "@/components/TransText";

export default function Match() {
  const { participants, fetchParticipants, setMatches } = useAppContext();
  const [userList, setUserList] = useState(participants);
  const { user } = useAuthContext();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(currentIndex);
  const handleAction = (type) => {
    const updatedUsers = participants;
    // console.log("Updated Users:", cuur);
    const relatedParticipant = updatedUsers[currentIndex]?.id;
    if (!relatedParticipant) return;
    api
      .post("participants/action", {
        currentParticipant: user?.id,
        related_participant_id: relatedParticipant,
        action: type,
      }).then((response) => {
        // console.log("Action sent successfully:", response.data.matches);
        setMatches(response?.data?.matches);
        // setUserList(participants)
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
        <Navbar title=<TransText en="Connect" fr="connecter" ar="اتصال" /> />
        {/* <Text>Selection For You</Text> */}
        <View className="items-center my-3">
          <Card
            user={userList[currentIndex]}
            onSkip={() => {setCurrentIndex((prev) => prev + 1)}}
            onConnect={() => handleAction("connect")}
          />
        </View>
      </View>
    </>
  );
}
