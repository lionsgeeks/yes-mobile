import { View, Text, Image, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, BackHandler } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useRef, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import api from "@/api";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";

export default function ChatDetail() {
    const { darkMode } = useAppContext();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const flatListRef = useRef(null);
    const receiver = useLocalSearchParams();
    const { user } = useAuthContext();


    // kanfetchi  messages

    const getMessages = async () => {
        try {
            if (!receiver.id) return;

            const response = await api.get(`conversation/${user.id}/${receiver.id}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error(error);
        }
    };


    useFocusEffect(
        useCallback(() => {
            getMessages()
        }, [])
    );

    // kansift message
    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        try {
            const newMessage = {
                sender: user.id,
                receiver: receiver.id,
                message: inputMessage,
            };

            const response = await api.post("message", newMessage, "token");

            setMessages(response.data.messages);
            setInputMessage('');

            scrollToBottom();
        } catch (error) {
            console.error(error);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom);

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);



    useEffect(() => {
        const backAction = () => {

            router.push('/chat');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [receiver.id]);

    const renderItem = ({ item }) => (
        <View className={`my-2 flex ${item.sender === "me" ? "items-end" : "items-start"}`}>
            <View className={`max-w-[70%] p-3 rounded-2xl ${item.sender === "me" ? "bg-beta" : "bg-white"}`}>
                <Text className={`${item.sender === "me" ? "text-white" : "text-black"}`}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            className="flex-1 pt-16"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
        >
            <View className="items-center px-6">
                <Image
                    source={{ uri: receiver.image }}
                    className="w-24 h-24 rounded-full mb-4 border-2 border-beta"
                />
                <Text className="text-2xl font-bold text-beta capitalize">{receiver.name}</Text>
                <Text className="text-white mt-2">{receiver.role}</Text>
            </View>

            <View className="flex-1 py-1 px-4 mt-6">
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={scrollToBottom}
                />
            </View>

            <View className={`flex-row items-center px-4 py-3 border-t border-white/10 ${darkMode ? "bg-black" : "bg-white"}`}>
                <TextInput
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Type your message..."
                    placeholderTextColor="#aaa"
                    className="flex-1 bg-white/10 rounded-full px-4 py-3 mr-2 "
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
