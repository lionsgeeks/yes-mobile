

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, Linking, Modal, Animated, Platform, StatusBar, SafeAreaView, } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Navbar from "@/components/navigation/navbar";

const allFunders = [
    {
        id: 1,
        name: "UNESCO",
        category: "Institution Internationale",
        description: "Organisation des Nations unies pour l'éducation, la science et la culture.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCsF1n_YOWcAHZkZSFc0bzsdpfaXNBdFEP3Q&s",
        url: "https://unesco.org",
        projects: 42,
    },
    {
        id: 2,
        name: "Banque Mondiale",
        category: "Institution Internationale",
        description: "Fournit des financements et une assistance aux pays en développement.",
        image: "https://www.umoatitres.org/wp-content/uploads/2018/03/logo_worldbank.jpg",
        url: "https://worldbank.org",
        projects: 78,
    },
    {
        id: 3,
        name: "Ministère de l'Économie",
        category: "Gouvernement",
        description: "Partenaire stratégique pour les projets de développement économique.",
        image:
            "https://www.dreamjob.ma/wp-content/uploads/2020/09/Ministere-Economie-Finance-Concours-Emploi-Recrutement.jpg",
        url: "https://www.economie.gouv.fr",
        projects: 23,
    },
    {
        id: 4,
        name: "Fondation OCP",
        category: "NGO",
        description: "Acteur de la transformation durable en Afrique et ailleurs.",
        image: "https://aujourdhui.ma/wp-content/uploads/2020/12/Fondation-OCP.jpg",
        url: "https://www.fondationocp.org",
        projects: 35,
    },
]

const categories = ["Tous", "NGO", "Gouvernement", "Institution Internationale"]

const getCategoryColor = (category) => {
    switch (category) {
        case "NGO":
            return { bg: "#e6f7ef", text: "#0d8a5f" }
        case "Gouvernement":
            return { bg: "#e6f0f9", text: "#0d5c8a" }
        case "Institution Internationale":
            return { bg: "#f0e6f9", text: "#6b0d8a" }
        default:
            return { bg: "#f1f1f1", text: "#666666" }
    }
}

const getCategoryIcon = (category) => {
    switch (category) {
        case "NGO":
            return "business"
        case "Gouvernement":
            return "business"
        case "Institution Internationale":
            return "globe"
        default:
            return "document"
    }
}

const Bailleur = () => {
    const [selectedCategory, setSelectedCategory] = useState("Tous")
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [fadeAnim] = useState(new Animated.Value(0))
    const [translateY] = useState(new Animated.Value(20))

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
        const matchesCategory = selectedCategory === "Tous" || funder.category === selectedCategory
        const matchesSearch =
            funder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            funder.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const renderFunderCard = (funder) => {
        const categoryColor = getCategoryColor(funder.category)
        const categoryIcon = getCategoryIcon(funder.category)

        return (
            <View key={funder.id} className="bg-white rounded-lg mb-10 shadow-lg overflow-hidden">
                <View className="absolute left-0 top-0 bottom-0 w-1 bg-beta z-10"></View>
                <View className="p-5">
                    <View className="flex-row mb-3">
                        <View className="w-[5.5rem] h-[5.5rem] rounded-lg overflow-hidden items-center justify-center" >
                            <Image source={{ uri: funder.image }} className="w-[90%] h-[90%]" resizeMode="contain" />
                        </View>
                        <View className="ml-3 flex-1 justify-center">
                            <Text className="font-semibold text-lg text-[#333] m-1">{funder.name}</Text>
                            <View className="flex-row items-center px-2.5 py-1 rounded-full self-start" style={{ backgroundColor: categoryColor.bg }}>
                                <Ionicons name={categoryIcon} size={12} color={categoryColor.text} className="mr-2" />
                                <Text style={[{ color: categoryColor.text }]} className="text-sm font-medium">{funder.category}</Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-gray-500 mb-4 leading-[20px]">{funder.description}</Text>
                    <Text className="text-[13px] text-gray-500">
                        <Text className="font-semibold text-[#333]">{funder.projects}</Text> projets financés
                    </Text>
                </View>

                <View className="flex-row justify-between items-center px-4 py-3 border-t border-t-[#eee] bg-[#f8f9fa]">
                    <View className="flex-row items-center bg-[#f1f3f5] px-[10px] py-[6px] rounded-[12px] gap-[4px]"          >
                        <Ionicons name="globe-outline" size={12} color="#666" />
                        <Text className="text-[12px] text-[#666]"
                        >Partenaire</Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center gap-1 " onPress={() => Linking.openURL(funder.url)}>
                        <Text className="text-[13px] text-alpha font-medium" >Visiter le site</Text>
                        <Ionicons name="open-outline" size={14} color="#2e539d" />
                    </TouchableOpacity>
                </View>
            </View>
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

            <Navbar title="Sponsors" />

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

                <TouchableOpacity className="flex-row items-center bg-[#f1f3f5] rounded-lg px-2 gap-2" onPress={() => setModalVisible(true)}>
                    <Ionicons name="filter" size={18} color="#333" />
                    <Text >{selectedCategory === "Tous" ? "Filtrer" : selectedCategory}</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="p-5"
                showsVerticalScrollIndicator={false}
            >
                {isLoading
                    ? renderSkeletonLoader()
                    : filteredFunders.length > 0
                        ? filteredFunders.map(renderFunderCard)
                        : renderEmptyState()}
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
