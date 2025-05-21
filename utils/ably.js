// utils/ably.js
import * as Ably from "ably";
import { Alert } from "react-native";




export const setupAbly = (ablyClient, ablyChannel, user, receiver, setMessages, onOtherMessage) => {
    ablyClient.current = new Ably.Realtime("lExbbw.OPqhwQ:cAV6W9IMcdzXejWqZb78-NZhDE2RisM1xKtscw7cd9s");
    const privateChannel = `private-chat:${user.id}`;
    ablyChannel.current = ablyClient.current.channels.get(privateChannel);
    const publicChannel = `public_participants`;
    ablyChannel.current = ablyClient.current.channels.get(publicChannel);

    ablyChannel.current.subscribe("new-message", (message) => {
        Alert.alert("jg")  
        const data = message.data;


        if (parseInt(data.sender) === parseInt(receiver.id)) {
            setMessages((prev) => [...prev, data]);
        } else {
            onOtherMessage?.();
        }
    });
    ablyChannel.current.subscribe("participant", (participant) => {
        const data = participant.data;
        console.log(data);
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

