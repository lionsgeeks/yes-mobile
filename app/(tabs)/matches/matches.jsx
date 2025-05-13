import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MatchesCard from "@/components/Card/matchesCard";
import users from "@/assets/data/users";
import Navbar from "@/components/navigation/navbar";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Icon } from "@/constants";


export default function Matches() {
  return (
    <View className="flex-1 pt-10">
      <ScrollView>
        <Navbar title="Matches" />
        <MatchesCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
