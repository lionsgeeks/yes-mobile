import api from "@/api";
import { useAppContext } from "@/context";
import { useAuthContext } from "@/context/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function InterestScreen() {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const { interests } = useAppContext();
    const { user } = useAuthContext();

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) => {
            if (prev.includes(interest)) {
                // If already selected, remove it
                return prev.filter((item) => item !== interest);
            } else if (prev.length < 3) {
                // If not selected and limit not reached, add it
                return [...prev, interest];
            } else {
                // Limit reached, do nothing
                return prev;
            }
        });
    };



    const handleContinue = () => {
        // api call to connect the participant to the interests
        api.post('interest/participant/' + user.id, { selectedInterests: selectedInterests }).then((res) => {
            if (res.status == 200) {
                setSelectedInterests([])
                router.push('/')
            };
        }).catch((err) => {
            console.log('error sending interests to backend', err);
        });

    }
    return (
        <View className="h-full bg-white p-6 justify-between">
            <View>
                <View className="mt-12">
                    <Text className="text-center text-xl font-semibold text-alpha">Choose Your Main Interests for The Event</Text>
                    <Text className="text-sm my-2 text-gray-500 text-center">select <Text className="text-alpha font-semibold">3</Text> major causes you care about</Text>
                </View>


                <View className="flex-row flex-wrap mt-4">
                    {
                        interests.map((interest, index) => {
                            const isSelected = selectedInterests.includes(interest.id)

                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => { toggleInterest(interest.id) }}
                                    className="w-[45%]  flex flex-col items-center justify-center px-3 py-4 rounded-xl
                                my-3 mx-2  "
                                    style={{
                                        backgroundColor: isSelected ? '#b0941780' : '#2e539d30',
                                    }}
                                >
                                    <Text className="text-center">{interest.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

            {
                selectedInterests.length >= 3 && (

                    <TouchableOpacity
                        onPress={() => { handleContinue() }}
                        className="items-center justify-center"
                    >
                        <Text
                            className="rounded-xl p-3 w-[94%] text-center text-white bg-alpha"
                        >Continue</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
} 