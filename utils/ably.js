// utils/ably.js
import * as Ably from "ably";
import { Alert } from "react-native";




export const setupAbly = (ablyClient, ablyChannel, user, receiver, setMessages, onOtherMessage) => {
    ablyClient.current = new Ably.Realtime(process.env.EXPO_PUBLIC_ABLY_KEY);
    const channelName = `private-chat:${user.id}`;
    ablyChannel.current = ablyClient.current.channels.get(channelName);

    ablyChannel.current.subscribe("new-message", (message) => {
        const data = message.data;

        
        if (parseInt(data.sender) === parseInt(receiver.id)) {
            setMessages((prev) => [...prev, data]);
        } else {
            onOtherMessage?.();
            // Alert.alert("jg")
        }
    });

    ablyClient.current.connection.on("connected", () => {
        console.log("✅ Connected to Ably");
    });

    ablyClient.current.connection.on("failed", () => {
        console.log("❌ Ably connection failed");
    });
};


export const cleanupAbly = (ablyClient, ablyChannel) => {
    if (ablyChannel.current) {
        ablyChannel.current.unsubscribe();
    }
    if (ablyClient.current) {
        ablyClient.current.close();
    }
};

