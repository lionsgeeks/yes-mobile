import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import users from "@/assets/data/users";
import { Link } from "expo-router";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";
import api from "@/api";
import Navbar from "@/components/navigation/navbar";

export default function Match() {
  const { participants, fetchMatches } = useAppContext();

  const { user } = useAuthContext();

  const [userList, setUserList] = useState(participants);
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
      }).then(() => {
        fetchMatches()
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
      <Text style={ styles.title}>Selection For You</Text>
      <View style={styles.pageContainer}>
        {/* <Link href='/(tabs)/matches' style={styles.link}>See Matches</Link> */}
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

const styles = StyleSheet.create({
  pageContainer: {
    // justifyContent: "center",
    marginVertical: 15,
    alignItems: "center",
    // flex: 1,
    // height: '80%',
    // backgroundColor: 'red'
  },
  
  title: {
    marginHorizontal: 10,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    color: '#2e539d'

  }
});
