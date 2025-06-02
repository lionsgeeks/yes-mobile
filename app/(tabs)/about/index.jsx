import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import yeslogo from "@/assets/images/yeslogo.png";
import jadara from "@/assets/images/partners/Jadaralogo.png";
import pan from "@/assets/images/partners/pan.jpeg";
import { useAppContext } from "@/context";

export default function AboutSceen() {
    const { general } = useAppContext();
    const organizres = [
        {
            name: "Jadara",
            image: jadara,
        },
        {
            name: "PAN",
            image: pan,
        },
    ];

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="px-3 py-8">
            <View className="flex-row items-center justify-center gap-3 mt-8 mb-4">
                <Image
                    source={yeslogo}
                    style={{
                        width: 200,
                        height: 75,
                        resizeMode: "contain",
                    }}
                    className="mb-6"
                />
            </View>

            <View className="bg-white rounded p-6">
                <Text className="text-2xl text-alpha font-semibold">About the Event</Text>
                <Text className="my-4 " style={{ lineHeight: 25 }}>The Youth Empowerment Summit brings together NGOs, activists, and changemakers from around Africa to collaborate, share knowledge, and build partnerships that drive positive social change.</Text>
                <Text style={{ lineHeight: 25 }}>Over two days, participants will engage in panels, workshops, and networking sessions focused on addressing the most pressing global challenges of our time.</Text>
            </View>

            <View className="bg-white rounded p-6 my-4">
                <Text className="text-2xl text-alpha font-semibold mb-6">About The Application</Text>
                <Text style={{ lineHeight: 25 }}>This app was created to enhance your experience at the Youth Empowerment Summit, providing easy access to information about speakers, NGOs, the event program, and networking opportunities. Version {general.version} • © 2025 Yes Africa</Text>
            </View>

            <View className="bg-white rounded p-6 my-4">
                <Text className="text-2xl text-alpha font-semibold mb-6">Contact Us</Text>
                <View>
                    <Text className="text-base text-gray-700">
                        We'd love to hear from you! Whether you have questions, feedback, or partnership ideas, feel free to reach out at
                        <Text className="text-alpha font-semibold"
                            onPress={() => Linking.openURL('mailto:contact@youthempowermentsummit.africa')}

                        > contact@youthempowermentsummit.africa</Text>
                    </Text>
                </View>
            </View>

            <View className="bg-white rounded p-6">
                <Text className="text-2xl text-alpha font-semibold">Organized By</Text>
                <View className="flex py-6 flex-row justify-between w-full ">
                    {organizres.map((organizre, index) => (
                        <View
                            key={index}
                            className="bg-white justify-center items-center rounded-lg p-3 m-2 "
                            style={{
                                elevation: 3,
                                width: "45%",
                            }}
                        >
                            <Image
                                source={organizre.image}
                                className="w-20 h-20 "
                                style={{ resizeMode: "contain" }}
                            />
                        </View>
                    ))}
                </View>
            </View>

        </ScrollView>
    )
}