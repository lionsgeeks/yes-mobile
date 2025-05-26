

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Linking, Modal, Animated, Platform, StatusBar, SafeAreaView, } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Navbar from "@/components/navigation/navbar";
import { useAppContext } from "@/context";
import api from "@/api";
import { useNavigation } from "expo-router";

const categories = ["Tous", "NGO", "Gouvernement", "Institution Internationale"]


const Bailleur = () => {
    const [selectedCategory, setSelectedCategory] = useState("Tous")
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [fadeAnim] = useState(new Animated.Value(0))
    const [translateY] = useState(new Animated.Value(20))
    const navigation = useNavigation();

    const { allParticipants, sponsors } = useAppContext();

    const allFunders = allParticipants?.filter((part) => part?.role == 'funder');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start()
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const filteredFunders = allFunders.filter((funder) => {
        const matchesSearch =
            funder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            funder.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    const renderFunderCard = (funder) => {
        return (
            <TouchableOpacity
                key={funder.id}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("bailleurs/[id]", { bailleur: funder })}
            >
                <View key={funder.id} className="bg-white rounded-lg mb-10 shadow-lg overflow-hidden">
                    <View className="absolute left-0 top-0 bottom-0 w-1 bg-beta z-10"></View>
                    <View className="p-5">
                        <View className="flex-row mb-3">
                            <View className="w-[8rem] h-[5.5rem] rounded-lg overflow-hidden items-center justify-center" >
                                <Image source={{ uri: api.IMAGE_URL + funder.image }}
                                    style={{
                                        width: 100,
                                        height: 75,
                                        // borderRadius: 400,
                                    }}
                                    resizeMode="contain" />
                            </View>

                            <View className="ml-3 flex-1 justify-center">
                                <Text className="font-semibold text-lg text-[#333] m-1">{funder.name}</Text>

                                {
                                    funder.interesets && funder.interesets.length > 1 && (
                                        <View className="flex-row items-center px-2.5 py-1 rounded-full self-start" style={{ backgroundColor: "#f0e6f9", borderRadius: 500 }}>
                                            <Ionicons name="globe" size={12} color="#6b0d8a" className="mr-2" />
                                            <Text className="text-sm font-medium text-[#6b0d8a]">
                                                {funder?.interesets[0]?.name[0].toUpperCase() + funder?.interesets[0]?.name?.slice(1)}
                                            </Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                        {funder.description && (
                            <Text className="text-gray-500 mb-4 leading-[20px]">{funder.description}</Text>

                        )}
                    </View>

                    {
                        (sponsors.some((sp) => sp.name == funder.name) || funder.social.website) && (

                            <View className="flex-row justify-between items-center px-4 py-3 border-t border-t-[#eee] bg-[#f8f9fa]">
                                <View>
                                    {
                                        sponsors.some((sp) => sp.name == funder.name) && (

                                            <View className="flex-row items-center bg-[#f1f3f5] px-[10px] py-[6px] rounded-[12px] gap-[4px]">
                                                <Ionicons name="globe-outline" size={12} color="#666" />
                                                <Text className="text-[12px] text-[#666]"
                                                >Partenaire</Text>
                                            </View>
                                        )
                                    }
                                </View>

                                {
                                    funder.social.website && (
                                        <TouchableOpacity className="flex-row items-center gap-1 " onPress={() => Linking.openURL(funder.url)}>
                                            <Text className="text-[13px] text-alpha font-medium" >Visiter le site</Text>
                                            <Ionicons name="open-outline" size={14} color="#2e539d" />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        )
                    }
                </View>
            </TouchableOpacity>
        )
    }

    const renderSkeletonLoader = () => {
        return Array(3)
            .fill(0)
            .map((_, index) => (
                <View key={`skeleton-${index}`} className="bg-white rounded-lg mb-10 shadow-lg overflow-hidden">
                    <View>
                        <View className="flex-row mb-3">
                            <View className="w-[5.5rem] h-[5.5rem] rounded-lg overflow-hidden items-center justify-center" />
                            <View>
                                <View style={[{ width: "70%", height: 18 }]} />
                                <View style={[{ width: "50%", height: 14, marginTop: 8 }]} />
                            </View>
                        </View>
                        <View style={[{ width: "100%", height: 14, marginTop: 12 }]} />
                        <View style={[{ width: "90%", height: 14, marginTop: 6 }]} />
                        <View style={[{ width: "40%", height: 14, marginTop: 12 }]} />
                    </View>
                    <View>
                        <View style={[{ width: "30%", height: 14 }]} />
                        <View style={[{ width: "30%", height: 14 }]} />
                    </View>
                </View>
            ))
    }


    return (

        <SafeAreaView className="flex-1 bg-[#f8f9fa] pt-10">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Navbar title="Funders" />

            <View className="flex-row px-5 py-2 gap-5">
                <View className="flex-1 flex-row items-center bg-[#f1f3f5] rounded-lg px-2">
                    <Ionicons name="search" size={20} color="#999" className="mr-2" />
                    <TextInput
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                    {searchQuery ? (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={18} color="#999" />
                        </TouchableOpacity>
                    ) : null}
                </View>

                {/* <TouchableOpacity className="flex-row items-center bg-[#f1f3f5] rounded-lg px-2 gap-2" onPress={() => setModalVisible(true)}>
                    <Ionicons name="filter" size={18} color="#333" />
                    <Text >{selectedCategory === "Tous" ? "Filtrer" : selectedCategory}</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity> */}
            </View>

            <ScrollView
                className="p-5"
                showsVerticalScrollIndicator={false}
            >
                {isLoading
                    ? renderSkeletonLoader()
                    : filteredFunders?.length > 0
                        ? filteredFunders.map(renderFunderCard)
                        : renderSkeletonLoader()}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity className="flex-1 bg-[rgba(0,0,0,0.5)] justify-end" activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View className="bg-white rounded-t-2xl" style={{ paddingBottom: Platform.OS === "ios" ? 30 : 16 }}>
                        <View className="flex-row justify-between items-center p-4 border-b border-[#eee]">
                            <Text className="text-base font-semibold text-[#333]">Filtrer par catégorie</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                className={`flex-row justify-between items-center p-4 border-b border-[#f1f1f1] ${selectedCategory === category ? 'bg-[#f0f7ff]' : ''
                                    }`}
                                onPress={() => {
                                    setSelectedCategory(category)
                                    setModalVisible(false)
                                }}
                            >
                                <Text
                                    className={`text-sm text-[#333] ${selectedCategory === category ? 'text-[#0288d1] font-medium' : ''}`}
                                >
                                    {category === "Tous" ? "Toutes les catégories" : category}
                                </Text>
                                {selectedCategory === category && <Ionicons name="checkmark" size={20} color="#0288d1" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    )
}



export default Bailleur
