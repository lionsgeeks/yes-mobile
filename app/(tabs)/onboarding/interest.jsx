import { router } from "expo-router";
import { useState } from "react";
import {  Pressable, Text, TouchableOpacity, View } from "react-native";

export default function InterestScreen() {
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = [
        "Education Access",
        "Clean Water",
        "Healthcare",
        "Climate Action",
        "Poverty Reduction",
        "Gender Equality",
        "Community Building",
        "Sustainable Agriculture",
        "Disaster Relief",
        "Human Rights",
        "Digital Inclusion",
        "Youth Empowerment",
        "Refugee Support",
        "Economic Development",
        "Environmental Conservation",
    ];

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
        )
    }


    const handleContinue = () => {
        router.push('/')
    }
    return (
        <View className="h-full bg-white p-6 justify-between">
            <View className="mt-4">
                <Text className="text-3xl font-semibold text-alpha">Choose Your Main Interests for The Event:</Text>
                <Text className="text-sm my-2 text-gray-500">select causes you care about</Text>
                <View className="flex-row justify-between">
                    <Text>Chosen Interests: {selectedInterests.length}</Text>
                    <Pressable onPress={() => { setSelectedInterests([]) }}>
                        <Text className="underline text-alpha">Clear All</Text>
                    </Pressable>
                </View>
            </View>


            <View className="flex-row flex-wrap mt-4">
                {
                    interests.map((interest, index) => {
                        const isSelected = selectedInterests.includes(interest)

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => { toggleInterest(interest) }}
                                className=" flex flex-col items-center justify-center px-3 py-1 rounded-xl
                                my-3 mx-2  "
                                style={{
                                    backgroundColor: isSelected ? '#b0941780' : '#2e539d30',
                                }}
                            >
                                <Text className="text-center">{interest}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <TouchableOpacity
                onPress={() => { handleContinue() }}
            >
                <Text
                    className="bg-alpha rounded py-2 text-center text-white"
                >Continue</Text>
            </TouchableOpacity>
        </View>
    )
} 