import { useAppContext } from "@/context";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "@/constants";
import TransText from "@/components/TransText";
import { Link, router, useNavigation } from "expo-router";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { useAuthContext } from "@/context/auth";
import { IconSymbol } from "@/components/ui/IconSymbol";
import yeslogo from "@/assets/images/yeslogo.png";
import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = ({ name, icon, route }) => {
  const { language } = useAppContext();
  return (
    <Pressable
      onPress={() => router.push(`/${route}`)}
      className={`justify-between items-center my-1 ${
        language == "ar" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <View
        className={` items-center gap-2 ${
          language == "ar" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <View className="bg-[#FBFBFD] border border-[#F0F0F2] rounded-2xl p-2.5">
          <IconSymbol size={28} name={icon} color={"#2e539d"} />
        </View>

        {/* <TransText className="ml-2">{tab.name}</TransText> */}
        <Text>{name}</Text>
      </View>

      <Icon.Arrow
        stroke={2}
        size={22}
        color={"#000"}
        rotate={language == "ar" ? 0 : 180}
      />
    </Pressable>
  );
};

export default function MenuScreen() {
  const { isSignedIn, setIsSignedIn, user, token, setToken, setUser } =
    useAuthContext();
  const gridTabs = [
    { name: "Account", route: "account", icon: "person" },
    { name: "Sponsors", route: "sponsors/sponsors", icon: "cash-outline" },
    { name: "Connect", route: "matches/match", icon: "link-outline" },
    { name: "Favorites", route: "matches/matches", icon: "heart" },
    { name: "Badge", route: "badge", icon: "qr-code-sharp" },
    { name: "About", route: "about", icon: "information-circle-outline" },
    { name: "Terms and Privacy", route: "terms", icon: "lock-closed" },
    // { name: "Settings", route: "settings", icon: "settings" },
  ];

  const deleteAccount = () => {
    if (token) {
      api.remove("participant/" + user.id, token).then(async (res) => {
        if (res.status == 200) {
          await AsyncStorage.removeItem("token");
          setIsSignedIn(false);
          setToken("");
          setUser(null);
          router.replace("/(tabs)/sign-in");
        }
      });
    } else {
      console.log("there should be a token here.");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteAccount(),
        },
      ]
    );
  };

  return (
    <ScrollView className="h-full bg-white px-6 relative">
      <View className="mt-16"></View>
      <View className="flex-row items-center justify-center gap-3 mb-4">
        <Image
          source={yeslogo}
          style={{
            width: 200,
            height: 75,
            resizeMode: "contain",
          }}
        />
      </View>

      <View className="flex-row flex-wrap">
        {gridTabs.map(
          (tab, index) =>
            (user ||
              (!user &&
                (tab.name === "Sponsors" ||
                  tab.name === "About" ||
                  tab.name === "Terms and Privacy"))) && (
              <TouchableOpacity
                onPress={() => router.push(`/${tab.route}`)}
                key={index}
                className={`w-[45%] ${
                  !user && "h-[45%]"
                }  items-center justify-center px-3 py-1 rounded-xl
                            my-3 mx-2 border border-alpha`}
              >
                {tab.name == "Favorites" ? (
                  <Icon.Heart size={28} color="#2e539d" />
                ) : (
                  <Ionicons size={28} name={tab.icon} color={"#2e539d"} />
                )}

                <Text className="text-alpha">{tab.name}</Text>
              </TouchableOpacity>
            )
        )}
        {isSignedIn ? (
          <>
            <TouchableOpacity
              onPress={() => {
                handleDelete();
              }}
              className="w-[45%] h-[19%] flex-col items-center justify-center px-3 py-1 rounded-xl
                                my-3 mx-2 border border-red-500 gap-2"
            >
              <Icon.User active={true} color="#ef4444" size={20} />
              <Text className="text-red-500 text-lg font-semibold">
                Delete Account
              </Text>
            </TouchableOpacity>
            <SignOutButton />
          </>
        ) : (
          <Pressable
            onPress={() => {
              router.push("/sign-in");
            }}
            className={`w-[45%] ${
              !user && "h-[45%]"
            }  items-center justify-center px-3 py-1 rounded-xl
                                my-3 mx-2 border border-green-600`}
          >
            <Text className="text-green-900">Sign In</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
