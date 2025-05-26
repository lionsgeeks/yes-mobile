// utils/ably.js
import * as Ably from "ably";
import * as Notifications from 'expo-notifications';



async function schedulePushNotification(msg, sender) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: sender.name.charAt(0).toUpperCase() + sender.name.slice(1) + " sent a message :",
            body: msg,
        },
        trigger: null,
    });
}

export const setupAbly = (ablyClient, ablyChannel, user, receiver, setMessages, onOtherMessage) => {
    ablyClient.current = new Ably.Realtime("lExbbw.OPqhwQ:cAV6W9IMcdzXejWqZb78-NZhDE2RisM1xKtscw7cd9s");
    const privateChannel = `private-chat:${user.id}`;
    ablyChannel.current = ablyClient.current.channels.get(privateChannel);
    // const publicChannel = `public_participants`;
    // ablyChannel.current = ablyClient.current.channels.get(publicChannel);

    ablyChannel.current.subscribe("new-message", (message) => {
        try {
            const data = message.data;

            if (parseInt(data.sender) === parseInt(receiver.id)) {
                setMessages((prev) => [...prev, data]);
            } else {
                console.log("Received message:", message);
                onOtherMessage?.(true);
                schedulePushNotification(message?.data?.text, message?.data?.sender_infos);
            }
        } catch (err) {
            console.error("Error in Ably subscription:", err);
        }
    });

    // ablyChannel.current.subscribe("participant", (participant) => {
    //     const data = participant.data;
    //     console.log(data);
    // });

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

