import { useAppContext } from "@/context";
import { Pressable, Text, View } from "react-native";
import { Icon } from "@/constants";
import TransText from "@/components/TransText";
import { Link, router } from "expo-router";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { useAuthContext } from "@/context/auth";
import { IconSymbol } from "@/components/ui/IconSymbol";


const MenuItem = ({ name, icon, route }) => {
    const { language } = useAppContext();
    return (
        <Pressable
            onPress={() => router.push(`/${route}`)}
            className={`justify-between items-center my-1 ${language == "ar" ? "flex-row-reverse" : "flex-row"
                }`}
        >
            <View className={` items-center  ${language == "ar" ? "flex-row-reverse" : "flex-row"
                }`}>

                <View className="bg-[#FBFBFD] border border-[#F0F0F2] rounded-2xl p-2.5">
                    <IconSymbol size={28} name={icon} color={"#2e539d"} />
                </View>

                {/* <TransText className="ml-2">{tab.name}</TransText> */}
                <Text>{name}</Text>
            </View>

            <Icon.Arrow
                stroke={2}
                size={22}
                color={'dark'}
                rotate={language == "ar" ? 0 : 180}
            />
        </Pressable>
    )
}

export default function MenuScreen() {
    const { isSignedIn } = useAuthContext();

    const topTabs = [
        { name: "Home", route: "", icon: "house" },
        { name: "Speakers", route: "speakers", icon: "speaker" },
        { name: "NGOs", route: "ngos", icon: "business" },
        { name: "Sponsors", route: "sponsors", icon: "money" },
        { name: "Program", route: "program", icon: "timer" },
    ]

    const middleTabs = [
        { name: "Badge", route: "badge", icon: "badge" },
        { name: "Chat", route: "chat", icon: "message" },
    ];

    const lastTabs = [
        { name: "About", route: "about", icon: "info" },
        { name: "Settings", route: "settings", icon: "settings" },
    ]

    return (
        <View className="h-full bg-white dark:bg-dark px-6 relative">
            <View className="mt-16"></View>
            <View className="flex flex-row items-center gap-3 mb-4">
                {/* TODO: change this for the app logo when available */}
                <IconSymbol size={50} name="settings" color={"#2e539d"} />
                <Text className="text-2xl font-bold">Y.E.S Mobile</Text>
            </View>

            {
                topTabs.map(({ name, route, icon }, index) => (
                    <MenuItem key={index} name={name} icon={icon} route={route} />
                ))
            }

            <View className="h-[1px] bg-[#F0F0F2] my-4" />

            {
                middleTabs.map(({ name, route, icon }, index) => (
                    <MenuItem key={index} name={name} icon={icon} route={route} />
                ))
            }

            <View className="h-[1px] bg-[#F0F0F2] my-4" />

            {
                lastTabs.map(({ name, route, icon }, index) => (
                    <MenuItem key={index} name={name} icon={icon} route={route} />
                ))
            }

            <View className="absolute bottom-[10px] left-[25px] mx-auto w-full">
                {
                    isSignedIn ?
                        <SignOutButton />
                        :
                        <View className='flex-row items-center gap-2 mt-4'>
                            <Link href="/sign-in" className='bg-alpha p-2 rounded-md text-white'>
                                <Text>Create an Account</Text>
                            </Link>
                        </View>
                }
            </View>
        </View>
    );
}