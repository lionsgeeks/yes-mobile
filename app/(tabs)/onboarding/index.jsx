import { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import image1 from "@/assets/images/yes_patterns.png";

import africa1 from "@/assets/images/onboarding/africa1.jpg";
import africa2 from "@/assets/images/onboarding/africa2.jpg";
import africa3 from "@/assets/images/onboarding/africa3.jpg";
import africa4 from "@/assets/images/onboarding/africa4.jpg";
import { router } from "expo-router"


// will be changed to better content/images later
const onboardingData = [
    {
        title: "Welcome to Y.E.S Africa",
        description:
            "Youth Empowerment Summit Africa is dedicated to inspiring and equipping young Africans with the skills and knowledge needed to drive positive change across the continent.",
        image: africa1,
    },
    {
        title: "Our Mission",
        description:
            "We bring together young leaders, entrepreneurs, and changemakers from across Africa to connect, learn, and collaborate on solutions to the continent's most pressing challenges.",
        image: africa2,
    },
    {
        title: "What to Expect",
        description:
            "Engaging workshops, inspiring keynote speakers, networking opportunities, and hands-on projects that will help you develop your skills and expand your professional network.",
        image: africa3,
    },
    {
        title: "Join the Movement",
        description:
            "Be part of a growing community of young Africans who are passionate about creating a better future for Africa through innovation, leadership, and sustainable development.",
        image: africa4,
    },
]

export default function OnboardingScreen() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        if (currentSlide < onboardingData.length - 1) {
            setCurrentSlide(currentSlide + 1)
        } else {
            // TODO: redirect to interests 
            router.navigate("/onboarding/interest");
            setCurrentSlide(0);
        }
    }

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        }
    }


    const isLastSlide = currentSlide === onboardingData.length - 1

    return (
        <View className="flex items-center justify-center">
            <View className="w-full h-full flex justify-between">
                <Image
                    source={onboardingData[currentSlide].image}
                    className="w-full h-1/2"
                />

                <View className="p-6">
                    <Text className="text-3xl font-bold text-alpha mb-2">{onboardingData[currentSlide].title}</Text>

                    <Text className="text-gray-700 mb-6">{onboardingData[currentSlide].description}</Text>
                    <Text className="text-gray-700 mb-6">{onboardingData[currentSlide].description}</Text>
                </View>

                <View className="p-6">
                    <View className="flex flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={prevSlide}
                            disabled={currentSlide === 0}
                            className={`px-4 py-2 flex flex-row rounded-md ${currentSlide === 0 ? 'bg-alpha/40' : 'bg-alpha'} }`}
                        >
                            <Text className="text-white">Back</Text>
                        </TouchableOpacity>

                        {/* the dots */}
                        <View className="flex justify-center mb-6 flex-row gap-4">
                            {onboardingData.map((_, index) => (
                                <View
                                    key={index}
                                    className={`w-2.5 h-2.5 rounded-full mx-1 ${currentSlide === index ? "bg-alpha" : "bg-alpha/50"}`}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={nextSlide}
                            className="bg-alpha px-4 py-2 rounded-md"
                        >
                            <Text className="text-white text-center">
                                {isLastSlide ? "Get Started" : "Next"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
