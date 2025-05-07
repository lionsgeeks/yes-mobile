import { setupAbly, cleanupAbly } from "@/utils/ably";
import { useState, useEffect, useRef, useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, TextInput, FlatList, View, TouchableOpacity, KeyboardAvoidingView, Platform, Text, Image, BackHandler, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "@/api";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";
import handleBack from "@/utils/handleBack";

export default function ChatDetail() {
    const { darkMode } = useAppContext();
    const { user } = useAuthContext();
    const receiver = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
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

        // setMessages((prev) => [ 
        //     ...prev,
        //     { ...newMessage, id: Date.now(), text: newMessage.message, sender: "me" }
        // ]);
        setInputMessage('');
        scrollToBottom();

        try {
            const response = await api.post("message", newMessage, "token");
            setMessages(response.data.messages);
        } catch (error) {
            console.error("❌ Failed to send message:", error);
        }
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



    const panHandlers = handleBack("/chat")

    const renderItem = ({ item }) => {
        const isMe = item.sender === "me" || parseInt(item.sender) === parseInt(user.id);

        return (
            <View className={`my-2 flex ${isMe ? "items-end" : "items-start"}`}>
                <View className={`max-w-[70%] p-3 rounded-2xl ${isMe ? "bg-alpha" : "bg-white"}`}>
                    <Text className={`${isMe ? "text-white" : "text-black"}`}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView  {...panHandlers} className="flex-1 pt-16" behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={80}>
            <View className="items-center px-6">
                <Image source={{ uri: receiver.image }} className="w-24 h-24 rounded-full mb-4 border-2 border-beta" />
                <Text className="text-2xl font-bold text-beta capitalize">{receiver.name}</Text>
                <Text className="text-white mt-2">{receiver.role}</Text>
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

            <View className={`flex-row items-center px-4 py-3 border-t border-white/10 ${darkMode ? "bg-black" : "bg-white"}`}>
                <TextInput
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Type your message..."
                    placeholderTextColor="#aaa"
                    className="flex-1 bg-white/10 rounded-full px-4 py-3 mr-2"
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
