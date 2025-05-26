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
  Button,
} from "react-native";
import ably, { cleanupAbly, setupAbly } from "@/utils/ably";
import Navbar from "@/components/navigation/navbar";
import useNotif from "@/hooks/useNotif";
import { useAppContext } from "@/context";
import *  as Notifications from "expo-notifications";

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Title Of the Notification",
            body: 'Messsage of The Notification',
        },
        trigger: null,
    });
}



export default function ChatScreen() {
  const { expoPushToken } = useNotif();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { user } = useAuthContext();
  const { setMesssageNotif, fetchConversations, conversations } = useAppContext();
  const ablyClient = useRef(null);
  const ablyChannel = useRef(null);



  useFocusEffect(
    useCallback(() => {
      fetchConversations();
      setMesssageNotif(false)
    }, [])
  );

  useEffect(() => {
    setupAbly(ablyClient, ablyChannel, user, { id: null }, null, fetchConversations);

    return () => {
      cleanupAbly(ablyClient, ablyChannel);
    };
  }, []);

  const filteredConversations = conversations.filter((convo) => {
    const matchRole =
      filter === "All" || convo.user?.role.toLowerCase() === filter.toLowerCase();
    const matchSearch = convo.user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchRole && matchSearch;
  });


  return (
    <View className=" bg-[#F9FAFB] flex-1">
      <View className="pt-10 pb-6">

        <Navbar title="chat" />
      </View>
      <View className="flex-1 px-6 ">

        {/* <Button
          title={expoPushToken}
          onPress={async () => {
            await schedulePushNotification();
          }}
        /> */}

        {/* Header */}
        <Text className="text-3xl font-extrabold text-alpha mb-4">Empower Chat</Text>

        {/* Search */}
        <TextInput
          className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-black mb-4 shadow-sm"
          placeholder="🔍 Search by name..."
          placeholderTextColor="#888"
          onChangeText={setSearch}
          value={search}
        />

        {/* Filters */}
        <View className="flex-row mb-4">
          {["All", "speaker", "ngo", "visitor"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type)}
              className={`px-4 py-2 rounded-full mr-2 border shadow-sm ${filter === type
                ? "bg-alpha border-black"
                : "border-gray-300 bg-white"
                }`}
            >
              <Text
                className={`text-sm capitalize font-semibold ${filter === type ? "text-white" : "text-gray-800"
                  }`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chat List */}
        <ScrollView showsVerticalScrollIndicator={false} className="pb-24">
          {filteredConversations.length === 0 && (
            <Text className="text-center text-gray-400 mt-20">😕 No conversations found.</Text>
          )}

          {filteredConversations.map((convo) => {
            const isMine = convo.last_message.sender_id === user.id;
            const isUnread = convo.last_message.seen != true && !isMine;

            return (
              <TouchableOpacity
                key={convo.user.id}
                onPress={() =>
                  router.push({
                    pathname: `chat/${convo.user.id}`,
                    params: convo.user,
                  })
                }
                className={`flex-row rounded-xl overflow-hidden mb-3  ${isUnread ? "bg-beta " : "bg-white border border-gray-200"
                  } shadow-sm`}
              >

                <View className="w-1 bg-beta" />


                {/* Chat content */}
                <View className="flex-row items-center p-4 flex-1">
                  <Image
                    source={{ uri: api.IMAGE_URL + convo.user.image }}
                    className="w-12 h-12 rounded-full mr-4 border border-gray-300"
                  />
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className={`text-base font-semibold ${isUnread ? "text-black" : "text-gray-900"
                        }`}>
                        {convo.user.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {(() => {
                          const createdAt = new Date(convo.last_message.created_at);
                          const now = new Date();
                          const diffMs = now - createdAt;
                          const diffMinutes = Math.floor(diffMs / (1000 * 60));
                          const isToday =
                            createdAt.getDate() === now.getDate() &&
                            createdAt.getMonth() === now.getMonth() &&
                            createdAt.getFullYear() === now.getFullYear();

                          if (isToday && diffMinutes < 60) {
                            if (diffMinutes < 1) return "just now";
                            if (diffMinutes === 1) return "1 min ago";
                            return `${diffMinutes} min ago`;
                          }

                          if (isToday) {
                            return createdAt.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                          }

                          return createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        })()}
                      </Text>
                    </View>

                    <Text
                      className={`text-sm ${isUnread ? "text-black font-semibold" : "text-gray-700"
                        }`}
                      numberOfLines={1}
                    >
                      {isMine ? "You: " : ""}
                      {convo.last_message.message}
                    </Text>
                  </View>

                  {/* Unread indicator dot */}
                  {isUnread && (
                    <View className="ml-2 w-2.5 h-2.5 rounded-full bg-alpha" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

        </ScrollView>
      </View>

    </View>
  );
}
