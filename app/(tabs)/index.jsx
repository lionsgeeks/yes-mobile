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
import logo from "../../assets/images/yeslogo.png";
import hero from "../../assets/images/yes_patterns.png";
import partner1 from "../../assets/images/partners/Africa_50.jpg";
import partner2 from "../../assets/images/partners/cnuced.jpeg";
import partner3 from "../../assets/images/partners/iecd.png";
import partner4 from "../../assets/images/partners/iom.jpeg";
import partner5 from "../../assets/images/partners/kamlin.jpeg";
import partner6 from "../../assets/images/partners/lionsgeek.png";
import partner7 from "../../assets/images/partners/oit.jpeg";
import partner8 from "../../assets/images/partners/onusida.jpeg";
import partner10 from "../../assets/images/partners/unfpa.jpeg";
import jadara from "../../assets/images/partners/Jadaralogo.png";
import pan from "../../assets/images/partners/pan.jpeg";
import { useNavigation } from "expo-router";
import ShareEvent from "@/components/ShareEvent";
export default function HomeScreen() {
  const { user, imagePath } = useAuthContext();
  const navigation = useNavigation();
  const items = [
    {
      icon: "qr-code-sharp",
      label: "Badge",
    },
    {
      icon: "person-outline",
      label: "Speaker",
    },
    {
      icon: "calendar-outline",
      label: "Program",
    },
    {
      icon: "globe-outline",
      label: "Networking",
    },
  ];
  const allSpeakers = [
    {
      id: 1,
      name: "Emma Johnson",
      title: "Climate Architect",
      role: "Green Earth Initiative",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      description:
        "Leading advocate for sustainable practices with over 10 years...",
      tags: ["Climate Policy", "Sustainability", "Community Engagement"],
      education: "MSc Environmental Science, University of Oxford",
      languages: ["English", "French", "Spanish"],
      sessions: [
        { title: "Opening Ceremony", time: "09:00 – 10:30", room: "Room 1" },
        {
          title: "Climate Action Panel",
          time: "11:00 – 12:00",
          room: "Main Hall",
        },
      ],
    },
    {
      id: "2",
      name: "Lucas Rivera",
      role: "Digital Future Lab",
      title: "Tech Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      tags: ["Technology", "Innovation"],
      year: 2024,
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Global Learning Foundation",
      title: "Education Director",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      tags: ["Education", "Development", "Youth"],
      year: 2024,
    },
    {
      id: "4",
      name: "Fatima Al-Mansour",
      role: "Health For All",
      title: "Public Health Advocate",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      tags: ["Healthcare", "Wellness"],
      year: 2025,
    },
    {
      id: "5",
      name: "Emma Johnson",
      role: "Green Earth Initiative",
      title: "Climate Activist",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      tags: ["Climate", "Policy", "Sustainability"],
      year: 2025,
    },
    {
      id: "6",
      name: "Lucas Rivera",
      role: "Digital Future Lab",
      title: "Tech Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      tags: ["Technology", "Innovation"],
      year: 2024,
    },
  ];
  const partners = [
    {
      name: "Lionsgeek",
      image: partner6,
    },
    {
      name: "Africa 50",
      image: partner1,
    },
    {
      name: "CNUCED",
      image: partner2,
    },
    {
      name: "IECD",
      image: partner3,
    },
    {
      name: "IOM",
      image: partner4,
    },
    {
      name: "Kamlin",
      image: partner5,
    },
    {
      name: "OIT",
      image: partner7,
    },
    {
      name: "ONUSIDA",
      image: partner8,
    },
    {
      name: "UNFPA",
      image: partner10,
    },
  ];
  const sessions = [
    {
      title: "SOURCES OF FUNDING: BRINGING YOUR PROJECT TO LIFE",
      time: {
        start: "09:00",
        end: "10:30",
        duration: "1.5 hours",
      },
      location: {
        name: "Main Hall",
        details: "First floor, accessible entrance available",
      },
    },
    {
      title: "BUILDING AN EFFECTIVE FORECAST BUDGET",
      time: {
        start: "09:00",
        end: "10:30",
        duration: "1.5 hours",
      },
      location: {
        name: "Main Hall",
        details: "First floor, accessible entrance available",
      },
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
  return (
    <ScrollView className="">
      <View className="items-center justify-center flex-col w-full overflow-hidden h-[30vh] bg-[#ddcfaa] realtive">
        <Image
          source={hero}
          // className=" h-full w-full absolute"
          style={{ width:'100%', height: '100%', position:'absolute', resizeMode: "cover" ,  }}
        />
        <Image
          source={logo}
          style={{ width: 700, height: 100, resizeMode: "contain" }}
          className=""
        />
      </View>
      <View className="flex-row justify-around py-5 bg-beta rounded-b-3xl">
        {items.map((item, index) => (
          <View key={index} className="justify-center items-center">
            <View className="bg-alpha w-16 aspect-square rounded-full flex justify-center items-center">
              <Ionicons name={item.icon} color="#ffffff" size={26} />
            </View>
            <Text className="text-white/90 text-md font-bold">{item.label}</Text>
          </View>
        ))}
      </View>
      {/* <ShareEvent imagePath={imagePath}/> */}
      {/* speakers */}
      <View className="px-6 py-6">
        <Text className="text-xl font-bold text-alpha">Featured Speakers</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-6 "
          contentContainerStyle={{ paddingRight: 80 }}
        >
          {allSpeakers.map((item, index) => (
            <Pressable
              key={index}
              className="bg-white rounded-2xl shadow-xl shadow-alpha overflow-hidden px-4 pt-5"
              style={{ elevation: 3, marginRight: 16, width: "20%" }}
              android_ripple={{ color: "#ccc" }}
              onPress={() =>
                navigation.navigate("speakers/[id]", { speaker: item })
              }
            >
              <View className="items-center mb-3">
                <Image
                  source={{ uri: item.image }}
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
      {/* highlights */}
      <View className="px-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-alpha">Today's Highlights</Text>
          <TouchableOpacity>
            <Text
              className="text-alpha"
              style={{ textDecorationLine: "underline" }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>
        <View className="py-4">
          {sessions.map((session, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-lg p-3 m-2 mb-4 "
            >
              <View className="bg-beta w-2 absolute left-0 rounded-l-lg top-0 bottom-0"></View>
              <View className="flex flex-row items-center gap-4 mb-2">
                <View className="px-2 py-1">
                  <View className="flex-row items-center ">
                    <Text className="text-black mr-2">⏰</Text>
                    <Text className="text-black">
                      {session.time.start} - {session.time.end}
                    </Text>
                  </View>
                  <Text className="text-md pt-3 font-bold ">{session.title}</Text>
                </View>
              </View>
              <View className="flex-row items-start">
                <Text className="text-alpha mr-2 mt-1">📍</Text>
                <View>
                  <Text className="font-semibold text-gray-800">
                    {session.location.name}
                  </Text>
                  <Text className="text-gray-600">
                    {session.location.details}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* orgnazires */}
      <View className="px-6 py-6">
        <Text className="text-xl font-bold text-alpha">Organizers</Text>
        <View className="flex py-6 flex-row justify-between w-full ">
          {organizres.map((organizre, index) => (
            <View
              key={index}
              className="bg-white justify-center items-center rounded-lg p-3 m-2 "
              style={{
                elevation: 3,
                width: "48%",
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
      {/* partners */}
      <View className="px-6">
        <Text className="text-xl font-bold text-alpha">Our Partners</Text>
        <View className="flex flex-row py-6 flex-wrap w-full ">
          {partners.map((partner, index) => (
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
                source={partner.image}
                style={{ width: 80, height: 60, resizeMode: "contain" }}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
