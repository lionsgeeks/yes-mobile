import { useState, useEffect, useRef, useCallback } from "react";
import {
    ActivityIndicator,
    TextInput,
    FlatList,
    View,
    TouchableOpacity,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Alert,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import api from "@/api";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";
import handleBack from "@/utils/handleBack";
import { setupAbly, cleanupAbly } from "@/utils/ably";

export default function ChatDetail() {
    const { darkMode } = useAppContext();
    const { user } = useAuthContext();
    const receiver = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef(null);
    const ablyClient = useRef(null);
    const ablyChannel = useRef(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await api.get(`conversation/${user.id}/${receiver.id}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error("❌ Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMessages();
            setupAbly(ablyClient, ablyChannel, user, receiver, setMessages, null);
            return () => {
                cleanupAbly(ablyClient, ablyChannel);
            };
        }, [receiver.id])
    );

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            sender: user.id,
            receiver: receiver.id,
            message: inputMessage.trim(),
        };

        setInputMessage("");
        scrollToBottom();

        try {
            const response = await api.post("message", newMessage, "token");
            setMessages(response.data.messages);
        } catch (error) {
            console.error("❌ Failed to send message:", error);
        }
    };

    const deleteMessage = async (id) => {
        try {
            await api.delete(`message/${id}`);
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const handleLongPress = (messageId) => {
        Alert.alert(
            "Delete Message",
            "Are you sure you want to delete this message?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteMessage(messageId),
                },
            ]
        );
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    useEffect(() => {
        const keyboardListener = Keyboard.addListener("keyboardDidShow", scrollToBottom);
        return () => keyboardListener.remove();
    }, []);

    const formatTime = (datetime) => {
        const now = new Date();
        const messageDate = new Date(datetime);
        const diffMs = now - messageDate;
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMinutes / 60);

        if (diffMinutes < 60) {
            return `${diffMinutes} min${diffMinutes === 1 ? "" : "s"} ago`;
        } else if (diffHours < 24) {
            const hours = messageDate.getHours().toString().padStart(2, "0");
            const minutes = messageDate.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        } else {
            const day = messageDate.getDate().toString().padStart(2, "0");
            const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
            const hours = messageDate.getHours().toString().padStart(2, "0");
            const minutes = messageDate.getMinutes().toString().padStart(2, "0");
            return `${day}/${month} - ${hours}:${minutes}`;
        }
    };

    const panHandlers = handleBack("/chat");

    const renderItem = ({ item }) => {
        const isMe = item.sender === "me" || parseInt(item.sender) === parseInt(user.id);

        return (
            <Pressable onLongPress={() => isMe && handleLongPress(item.id)}>
                <View className={`my-2 px-2 flex ${isMe ? "items-end" : "items-start"}`}>
                    <View
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isMe ? "bg-alpha" : "bg-gray-200"
                            }`}
                        style={{
                            borderTopRightRadius: isMe ? 0 : 16,
                            borderTopLeftRadius: isMe ? 16 : 0,
                        }}
                    >
                        <Text className={`text-base ${isMe ? "text-white" : "text-black"}`}>
                            {item.text}
                        </Text>

                        <View className="flex-row items-center justify-end mt-1 space-x-1">
                            <Text className={`text-xs ${isMe ? "text-gray-300" : "text-gray-500"}`}>
                                {formatTime(item.created_at)}
                            </Text>

                            {isMe && (
                                <Ionicons
                                    name={item.seen ? "checkmark-done" : "checkmark"}
                                    size={16}
                                    color={item.seen ? "#b09417" : "#ccc"} 
                                    style={{ marginLeft: 4 }}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <KeyboardAvoidingView
            {...panHandlers}
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
        >
            <View className="items-center px-6 pt-16">
                <Image
                    source={{ uri: api.IMAGE_URL + receiver.image }}
                    className="w-24 h-24 rounded-full mb-4 border-2 border-alpha"
                />
                <Text className="text-2xl font-bold text-alpha capitalize">{receiver.name}</Text>
                <Text className="text-gray-500 mt-2">{receiver.role}</Text>
            </View>

            <View className="flex-1 py-1 px-4 mt-6">
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#FFA500" />
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={scrollToBottom}
                    />
                )}
            </View>

            <View className="flex-row items-center px-4 py-3 border-t border-gray-200 bg-white">
                <TextInput
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Type your message..."
                    placeholderTextColor="#aaa"
                    className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2 text-black"
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                />
                <TouchableOpacity onPress={sendMessage} className="bg-beta p-3 rounded-full">
                    <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
