import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MatchesCard from "@/components/Card/matchesCard";
import users from "@/assets/data/users";
import Navbar from "@/components/navigation/navbar";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";


export default function Matches() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Navbar title="Matches" />

        <View className="mx-8 flex-row items-center justify-between">
          <Link href="/(tabs)/match" className="">
            <IconSymbol name="return" size={30} color='#0d317b'/>
          </Link>
          <Text className="text-[30px] font-semibold text-[#2e539d]">Connected with you</Text>
        </View>
        <MatchesCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
