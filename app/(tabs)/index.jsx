import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useWindowDimensions, Animated } from "react-native";
import logo from "../../assets/images/yeslogo.png";
import hero from "../../assets/images/yes_patterns.png";
import jadara from "../../assets/images/partners/Jadaralogo.png";
import pan from "../../assets/images/partners/pan.jpeg";
import { router, useNavigation } from "expo-router";
import ShareEvent from "@/components/ShareEvent";
import Navbar from "@/components/navigation/navbar";
import { useAppContext } from "@/context";
import api from "@/api";
import AuthLoader from "@/components/loading";
export default function HomeScreen() {
  const { user, imagePath, isAuthLoading } = useAuthContext();
  const { sponsors, speakers } = useAppContext();
  const navigation = useNavigation();
  const items = [
    {
      icon: "id-card-outline",
      label: "Badge",
      href: "/badge",
    },
    {
      icon: "calendar-outline",
      label: "Program",
      href: "/program",
    },
    {
      icon: "scan",
      label: "Scan",
      href: "/speakers",
    },
    {
      icon: "globe-outline",
      label: "Networking",
      href: "matches/match",
    },
  ];


  
  const organizres = [
    {
      name: "Jadara",
      image: jadara,
    },
    {
      name: "PAN",
      image: pan,
    },
  ];

  const [scrollY] = useState(new Animated.Value(0));
  const screenHeight = useWindowDimensions().height;

  const bgColor = scrollY.interpolate({
    inputRange: [0, screenHeight * 0.5],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });
  // console.log("home screen", isAuthLoading);
  return isAuthLoading ? (
    <AuthLoader />
  ) : (
    <View>
      <Animated.View
        style={{
          paddingTop: 22,
          position: "absolute",
          zIndex: 20,
          width: "100%",
          backgroundColor: bgColor,
        }}
      >
        <Navbar title="" />
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        className=""
      >
        <View className="items-center justify-center flex-col w-full overflow-hidden h-[30vh] bg-[#ddcfaa] realtive">
          <Image
            source={hero}
            // className=" h-full w-full absolute"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              resizeMode: "cover",
            }}
          />
          <Image
            source={logo}
            style={{ width: 700, height: 100, resizeMode: "contain" }}
            className=""
          />
        </View>
        {/* quick actions */}
        <View className="flex-row flex-wrap justify-around py-5 bg-beta h-fit rounded-b-3xl">
          {items.map((item, index) => (
            <TouchableOpacity
              onPress={() => router.push(item.href)}
              key={index}
              className="justify-center items-center "
            >
              <View className="bg-alpha w-20 aspect-square rounded-full flex justify-center items-center">
                <Ionicons name={item.icon} color="#ffffff" size={30} />
              </View>
              <Text className="text-white/90 mt-3 text-md font-bold">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* <View className="flex-row justify-around py-5 bg-beta rounded-b-3xl">
            {items.map((item, index) => (
              <View key={index} className="justify-center items-center">
                <View className="bg-alpha w-16 aspect-square rounded-full flex justify-center items-center">
                  <Ionicons name={item.icon} color="#ffffff" size={26} />
                </View>
                <Text className="text-white/90 text-md font-bold">{item.label}</Text>
              </View>
            ))}
          </View> */}

        {/* orgnazires */}
        <View className="px-6 pt-6">
          <Text className="text-xl font-bold text-alpha">Organizers</Text>
          <View className="flex py-6 flex-row justify-between w-full ">
            {organizres.map((organizre, index) => (
              <View
                key={index}
                className="bg-white justify-center items-center rounded-lg p-3 m-2 "
                style={{
                  elevation: 3,
                  width: "45%",
                  // marginLeft: index % 2 ? 16 : 0,
                  marginBottom: 16,
                }}
              >
                <Image
                  source={organizre.image}
                  className="w-32 h-32 "
                  style={{ resizeMode: "contain" }}
                />
              </View>
            ))}
          </View>
        </View>
        {/* <ShareEvent imagePath={imagePath}/> */}
        {/* speakers */}
        {speakers?.length > 0 && (
          <View className="px-6 pb-6">
            <Text className="text-xl font-bold text-alpha">
              Featured Speakers
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="py-6 "
              contentContainerStyle={{ paddingRight: 80 }}
            >
              {speakers?.map((item, index) => (
                <Pressable
                  key={index}
                  className="bg-white rounded-2xl  shadow-xl shadow-alpha overflow-hidden px-4 pt-5"
                  style={{ elevation: 3, marginRight: 16, width: 180 }}
                  android_ripple={{ color: "#ccc" }}
                  onPress={() =>
                    navigation.navigate("speakers/[id]", { speaker: item })
                  }
                >
                  <View className="items-center mb-3">
                    <Image
                      source={{ uri: api.IMAGE_URL + item.image }}
                      className="w-20 h-20 rounded-full border border-gray-300"
                    />
                  </View>
                  <Text className="text-center text-base font-semibold text-alpha mb-1">
                    {item.name}
                  </Text>
                  <Text className="text-center text-sm text-gray-600 mb-0.5">
                    {item.title}
                  </Text>
                  <Text className="text-center text-xs text-gray-400 mb-2">
                    {item.role}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* partners */}
        {sponsors?.length > 0 && (
          <Pressable
            onPress={() => {
              router.push("/sponsors/sponsors");
            }}
            className="px-6"
          >
            <Text className="text-xl font-bold text-alpha">Our Partners</Text>
            <View className="flex flex-row py-6 flex-wrap w-full ">
              {sponsors.reverse().map((partner, index) => (
                <View
                  key={index}
                  className="bg-white rounded-lg p-3 "
                  style={{
                    elevation: 3,
                    width: "30%",
                    marginLeft: index % 3 ? 16 : 0,
                    marginBottom: 16,
                  }}
                >
                  <Image
                    source={{ uri: api.IMAGE_URL + partner.image }}
                    style={{ width: 80, height: 60, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </View>
          </Pressable>
        )}
      </Animated.ScrollView>
    </View>
  );
}
