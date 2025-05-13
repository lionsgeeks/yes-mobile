import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IconSymbol } from "../ui/IconSymbol";
import { Link } from "expo-router";
import { Icon } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({ user, onSkip, onConnect }) {


  return (
    <>
      {user ? (
        <View style={styles.card} className="">
          <ImageBackground
            source={{
              uri: user.image,
            }}
            style={styles.image}
            className="border-r-8  border-beta"
          >
            <LinearGradient
              colors={['transparent', 'transparent', '#24427D']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-full relative w-full" 
            >

              <Text className="absolute top-2 right-3 bg-beta text-white rounded-full px-4 py-1">{user.role}</Text>
              <View className="absolute bottom-0 right-100 p-4">

                <Text className="text-2xl font-semibold text-white">{user.name}</Text>
                <View style={styles.interestContainer}>
                  {user.interests.map((int, index) => (
                    <Text key={index} className="bg-beta px-2 rounded-full py-1 text-white">
                      {int[0].toUpperCase() + int.slice(1)}
                    </Text>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>

          <View
            className="flex-row items-center justify-around my-4"
          >
            <TouchableOpacity
              className="bg-beta p-4 w-[35%] border border-gray-300 rounded-lg flex-row"
              onPress={onSkip}
            >
              <Icon.Cross color="white" size={28} />
              <Text className="text-white text-xl font-bold ml-3">Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity

              className="bg-alpha p-4 w-[65%] border border-gray-300 rounded-lg flex-row items-center justify-center"
              onPress={onConnect}
            >
              <Icon.Heart color="#fff" size={28} />
              <Text className="text-white text-xl font-bold ml-3">Connect</Text>
            </TouchableOpacity>
          </View>

          {/* <Link href="/(tabs)/matches" className="mx-4 py-3 text-lg rounded-xl mt-2 text-white bg-[#2e539d] text-center ">
            See Your Matches
          </Link> */}
        </View>
      ) : (
        <View
          className="bg-white w-[80%] h-[20%] items-center justify-center rounded-xl "
          style={styles.shadow}
        >
          <Text className="font-bold text-[15px] text-center ">
            No user share same interest as you
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "87%",
    borderRadius: 30,
    backgroundColor: "#fefefe",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",

    justifyContent: "flex-end",
  },
  cardInner: {
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 18,
    color: "#2C2929",
    lineHeight: 25,
  },
  interest: {
    backgroundColor: "#2e539d",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  interestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    gap: 8,
  },
  Button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 15,
  },
  skipButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: '50%',
    backgroundColor: "red",
  },
  connectButton: {
    paddingHorizontal: 40,
    backgroundColor: "#b09417",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  link: {
    color: "white",
    fontWeight: "bold",
  },
});
