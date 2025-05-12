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

export default function Card({ user, onSkip, onConnect }) {
  // #0f2c6435
  // bg-[#e0be25af]
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
            <View className="bg-[#0f2c6435] w-[90%] mb-[10px] rounded-xl">
              <View style={styles.cardInner}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio}>{user.description}</Text>
              </View>
              <View style={styles.interestContainer}>
                {user.interests.map((ing, index) => (
                  <Text key={index} style={styles.interest}>
                    {ing}
                  </Text>
                ))}
              </View>
            </View>
          </ImageBackground>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={[styles.Button, styles.skipButton]}
              onPress={onSkip}
            >
              <IconSymbol size={28} name="star" color={"white"} />
              {/* <Text className="text-white  text-[18px]">Skip</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.Button, styles.connectButton]}
              onPress={onConnect}
            >
              <IconSymbol size={28} name="star" color={"#fff"} />
              <Text className="text-white text-[18px] font-bold">Connect</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-4 py-3 rounded-xl mt-2 justify-center bg-[#2e539d] items-center ">
            <Link href="/(tabs)/matches" style={styles.link}>
              See Matches
            </Link>
          </View>
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
    height: "80%",
    borderRadius: 30,
    backgroundColor: "#fefefe",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    // justifyContent: 'center',
    alignItems: "center",

    justifyContent: "flex-end",
  },
  cardInner: {
    padding: 10,
  },
  name: {
    fontSize: 30,
    // color: "white",
    fontWeight: "bold",
  },
  bio: {
    fontSize: 18,
    color: "#2C2929",
    //  color: '#002d553f',
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
    // width: 60,
    // height: 60,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: "red",
  },
  connectButton: {
    paddingHorizontal: 40,
    backgroundColor: "#b09417",
    // borderColor: 'black'
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
