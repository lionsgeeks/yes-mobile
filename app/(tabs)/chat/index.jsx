import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";



export default function ChatScreen({ navigation }) {
  const [conversations, setConversations] = useState([])
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { user } = useAuthContext()



  const filteredConversations = conversations.filter((convo) => {
    const matchRole = filter === "All" || convo.role === filter;
    const matchSearch = convo.name.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });


  const getConversations = async () => {
    try {

      let response = await api.get("chats/" + user.id)

      let data = response.data

      setConversations(data.conversations)

    } catch (error) {
      console.log(error);

    }
  }


  useFocusEffect(
    useCallback(() => {
      getConversations()
    }, [])
  );


  return (
    <View className="flex-1  pt-20 px-6">
      <Text className="text-2xl font-bold text-beta mb-4">Empower Chat</Text>

      {/* Search Bar */}
      <TextInput
        className="bg-white/10  border border-beta rounded-xl px-4 py-2 text-white mb-4"
        placeholder="Search by name..."
        placeholderTextColor="#b09417aa"
        onChangeText={setSearch}
        value={search}
      />

      {/* Filter Tabs */}
      <View className="flex-row mb-4">
        {["All", "ngo", "speaker"].map((type) => (
          <TouchableOpacity
            key={type}
            className={`px-4 py-1 rounded-full border mr-2 ${filter === type ? "bg-alpha border-alpha" : "border-beta"
              }`}
            onPress={() => setFilter(type)}
          >
            <Text className={`text-sm ${filter === type ? "text-white" : "text-beta"}`}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredConversations.map((convo) => (
          <TouchableOpacity
            key={convo.id}
            onPress={() => router.push({
              pathname: `chat/${convo.id}`,
              params: convo
            })}
            className="flex-row items-center gap-4 bg-white/5 border border-alpha p-4 rounded-xl mb-4"
          >
            <Image
              source={{ uri: convo.image }}
              className="w-12 h-12 rounded-full border border-beta"
            />
            <View className="flex-1">
              <Text className="text-lg text-beta font-semibold">{convo.name}</Text>
              <Text className="text-white text-sm opacity-80">{convo.message}</Text>
              <Text className="text-xs text-white opacity-40 mt-1">{convo.role}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredConversations.length === 0 && (
          <Text className="text-center text-white opacity-50 mt-10">
            No conversations found.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
