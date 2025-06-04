import { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import africa1 from "@/assets/images/onboarding/africa1.jpg";
import africa2 from "@/assets/images/onboarding/africa2.jpg";
import africa3 from "@/assets/images/onboarding/africa3.jpg";
import africa4 from "@/assets/images/onboarding/africa4.jpg";
import { router } from "expo-router"
import handleBack from "@/utils/handleBack";


const onboardingData = [
    {
        title: "Welcome to Y.E.S Africa",
        description:
            "You're now part of a vibrant pan-African platform where civil society organizations, experts, and funders come together to amplify youth empowerment.YES Africa is where African NGOs grow stronger — by learning from each other, forging partnerships with local and regional authorities, and connecting with key development actors to access the resources they need to scale their impact across the continent.",
        image: africa1,
    },
    {
        title: "Our Mission",
        description:
            "YES Africa is committed to transforming the challenge of NEET youth into a game-changing opportunity for the continent.We bring together civil society, communities, experts, funders, and private partners to act now — and empower the millions of young people in Africa who are currently Not in Education, Employment or Training.",
        image: africa2,
    },
    {
        title: "Our Vision",
        description:
            "To turn 70 million potential NEETs into 70 million Doers — skilled, engaged, and leading the way toward a brighter African future.",
        image: africa3,
    },
    {
        title: "Together, We Move Forward",
        description:
            "As a member of the YES Africa community, you're now part of a growing movement of changemakers shaping the future of youth empowerment on the continent.Take this opportunity to connect with peers, collaborate with experts, engage with funders, and scale your impact.",
        description2:
            "Together, we say YES to action. YES to youth. YES to Africa.",
        image: africa4,
    },
];


export default function OnboardingScreen() {
      const panHandlers = handleBack("/onboarding");
    
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        if (currentSlide < onboardingData.length - 1) {
            setCurrentSlide(currentSlide + 1)
        } else {
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
        <View 
        {...panHandlers} 
        className="flex items-center justify-center">
            <View className="w-full h-full flex justify-between">
                <Image
                    source={onboardingData[currentSlide].image}
                    className="w-full h-1/2"
                />

                <View className="p-6">
                    <Text className="text-3xl font-bold text-alpha mb-2">{onboardingData[currentSlide].title}</Text>

                    <Text className="text-gray-700 mb-6">{onboardingData[currentSlide].description}</Text>
                    <Text className="text-gray-700 mb-6">{onboardingData[currentSlide].description2}</Text>
                </View>

                <View className="px-6 pb-20">
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
