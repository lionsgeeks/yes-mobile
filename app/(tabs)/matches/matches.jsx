import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MatchesCard from "@/components/Card/matchesCard";
import users from "@/assets/data/users";
import Navbar from "@/components/navigation/navbar";
import { Link, router } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Icon } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import TransText from "@/components/TransText";
import handleBack from "@/utils/handleBack";


export default function Matches() {
  const panHandlers = handleBack("/menu");
  return (
    <View {...panHandlers} className="flex-1 pt-10">
      <ScrollView>
        <Navbar title=<TransText en="Network" fr="réseau" ar="شبكة" />/>
        <View className="py-5 flex-row gap-3 items-center px-6">
          <Pressable onPress={()=>{router.push("/scans")}} className="w-[48%] rounded-xl flex-row text-center items-center justify-center py-3 bg-alpha">
            <Ionicons color={"white"} size={16} name="scan"/>
            <Text className="text-white ml-3">Scan Badge</Text>
          </Pressable>
          <Pressable onPress={()=>{router.push("/visitors")}} className="w-[48%] rounded-xl flex-row text-center items-center justify-center py-3 bg-beta">
            {/* <Ionicons color={"white"} size={16} name="scan"/> */}
            <Text className="text-white ml-3">Discover all visitors</Text>
          </Pressable>
        </View>
        <MatchesCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
