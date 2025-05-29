import Navbar from "@/components/navigation/navbar";
import TransText from "@/components/TransText";
import { useAppContext } from "@/context";
import { ScrollView, Text, View } from "react-native";

export default function NotificationScreen() {
    const { notifications } = useAppContext();

    return (
        <View className="px-6 pb-12">
            <View className="mt-12"></View>
            <Navbar title=<TransText en="Notifications" fr="Notifications" ar="إشعارات" /> />
            {/* {notifications?.length > 0 && <Text className="text-alpha text-2xl font-semibold">Recent Notifications</Text>} */}
            {
                (notifications && notifications.length > 0) ?
                    <ScrollView contentContainerStyle={{paddingBottom: 80, marginBottom: 20}}>
                        {
                            notifications.map((notif, ind) => (
                                <View key={ind} className="bg-white my-3 px-5 border-l-4 rounded  border-alpha">
                                    {/* <Text className="p-1 rounded">{new Date(notif.created_at)
                                        .toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </Text> */}
                                    <View className="px-2 py-4 ">
                                        <Text className="font-semibold">{notif.title}</Text>
                                        <Text className="mt-2 text-sm">{notif.body}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    :
                    <View className="items-center justify-center h-[45%]">
                        <Text className="text-2xl">No Notifications Yet.</Text>
                        <Text className="text-sm text-gray-500">Stay tuned for the latest updates.</Text>
                    </View>
            }
        </View>
    )
}