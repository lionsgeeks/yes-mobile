// components/AuthLoader.js
import React, { useMemo } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

const facts = [
    "Over 90,000 NGOs operate across Africa.",
    "NGOs play a key role in improving education in rural African communities.",
    "Many African NGOs focus on empowering women and girls through education.",
    "NGOs helped reduce malaria cases in several African countries by 60%.",
    "African NGOs are major players in promoting clean water access.",
    "Some NGOs in Africa provide legal aid to victims of injustice.",
    "African-based NGOs often collaborate with international partners for funding.",
    "Mobile health clinics are commonly run by NGOs in Africa.",
    "NGOs have planted millions of trees in Africa to combat deforestation.",
    "Local NGOs are vital in managing natural disaster response efforts.",
    "Youth empowerment is a top focus for many African organizations.",
    "NGOs are key in preserving African cultural heritage and languages.",
    "Some NGOs support local farmers with tools and training for sustainability.",
    "Education-focused NGOs distribute free books and digital learning tools.",
    "NGOs help refugees and internally displaced people across African regions.",
    "Many African NGOs teach coding and entrepreneurship to young people.",
    "NGOs help build bridges between rural communities and tech solutions.",
    "Health NGOs often provide free maternal and child care services.",
    "NGOs support anti-corruption efforts through education and transparency tools.",
    "African conservation NGOs protect endangered species and biodiversity.",
    "NGOs often fill healthcare gaps where government services are limited.",
    "Some NGOs fund scholarships for students in underserved African communities.",
    "Community radio projects by NGOs help spread awareness and education.",
    "NGOs support victims of gender-based violence with resources and shelters.",
];

const AuthLoader = () => {
    const randomFact = useMemo(() => {
        const index = Math.floor(Math.random() * facts.length);
        return facts[index];
    }, []);

    return (
        <View className="flex-1 bg-[#2e539d] justify-center items-center p-6">
            {/* Logo */}
            <Image
                source={require("@/assets/images/yeslogo.png")}
                className="w-24 h-24 mb-8 rounded-xl bg-white"
                resizeMode="contain"
            />

            {/* Spinner */}
            <ActivityIndicator size="large" color="#b09417" />

            {/* Loading Message */}
            <Text className="mt-5 text-white text-xl font-bold text-center">
                Loading...
            </Text>

            {/* Random Fact */}
            <Text className="mt-2 text-gray-300 text-sm text-center">
                Did you know  that : {randomFact}
            </Text>
        </View>
    );
};

export default AuthLoader;
