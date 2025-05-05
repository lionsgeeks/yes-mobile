import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import ably, { cleanupAbly, setupAbly } from "@/utils/ably";

export default function ChatScreen() {
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { user } = useAuthContext();
  const ablyClient = useRef(null);
  const ablyChannel = useRef(null);

  const getConversations = async () => {
    try {
      const response = await api.get("chats/" + user.id);
      setConversations(response.data.conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // Fetch on initial focus
  useFocusEffect(
    useCallback(() => {
      getConversations();
    }, [])
  );

   // 🔌 Setup Ably on mount
   useEffect(() => {
    setupAbly(ablyClient, ablyChannel, user, { id: null }, null, getConversations);

    return () => {
      cleanupAbly(ablyClient, ablyChannel);
    };
  }, []);



  const filteredConversations = conversations.filter((convo) => {
    const matchRole =
      filter === "All" || convo.user.role.toLowerCase() === filter.toLowerCase();
    const matchSearch = convo.user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  

  return (
    <View className="flex-1 bg-[#F9FAFB] pt-16 px-5">
      <Text className="text-3xl font-bold text-yellow-600 mb-4">Empower Chat</Text>

      {/* Search Bar */}
      <TextInput
        className="bg-yellow-100 border border-yellow-400 rounded-xl px-4 py-2 text-black mb-4"
        placeholder="🔍 Search by name..."
        placeholderTextColor="#9B870C"
        onChangeText={setSearch}
        value={search}
      />

      {/* Filter Tabs */}
      <View className="flex-row mb-4">
        {["All", "alpha", "beta"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full border mr-2 ${
              filter === type
                ? "bg-yellow-500 border-yellow-500"
                : "border-yellow-400"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                filter === type ? "text-white" : "text-yellow-700"
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat List */}
      <ScrollView showsVerticalScrollIndicator={false} className="pb-12">
        {filteredConversations.length === 0 && (
          <Text className="text-center text-gray-500 mt-12">
            😕 No conversations found.
          </Text>
        )}

        {filteredConversations.map((convo) => (
          <TouchableOpacity
            key={convo.user.id}
            onPress={() =>
              router.push({
                pathname: `chat/${convo.user.id}`,
                params: convo.user,
              })
            }
            className="flex-row items-center gap-4 bg-yellow-50 border border-yellow-200 p-4 rounded-2xl mb-4 shadow-sm"
          >
            <Image
              source={{ uri: convo.user.image }}
              className="w-14 h-14 rounded-full border border-yellow-400"
            />
            <View className="flex-1">
              <Text className="text-lg text-yellow-800 font-bold mb-1">
                {convo.user.name}
              </Text>
              <Text className="text-gray-800 text-sm" numberOfLines={1}>
                {convo.last_message.sender_id === user.id ? "You: " : ""}
                {convo.last_message.message}
              </Text>
              {/* <Text className="text-xs text-yellow-600 mt-1 capitalize">
                {convo.user.role}
              </Text> */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
