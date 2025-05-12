import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import Navbar from "@/components/navigation/navbar";

const allSpeakers = [
    {
        id: 1,
        name: "Emma Johnson",
        title: "Climate Architect",
        role: "Green Earth Initiative",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        description: "Leading advocate for sustainable practices with over 10 years...",
        tags: ["Climate Policy", "Sustainability", "Community Engagement"],
        education: "MSc Environmental Science, University of Oxford",
        languages: ["English", "French", "Spanish"],
        sessions: [
            { title: "Opening Ceremony", time: "09:00 – 10:30", room: "Room 1" },
            { title: "Climate Action Panel", time: "11:00 – 12:00", room: "Main Hall" }
        ]
    },
    {
        id: "2",
        name: "Lucas Rivera",
        role: "Digital Future Lab",
        title: "Tech Entrepreneur",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        tags: ["Technology", "Innovation"],
        year: 2024,
    },
    {
        id: "3",
        name: "Michael Chen",
        role: "Global Learning Foundation",
        title: "Education Director",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["Education", "Development", "Youth"],
        year: 2024,
    },
    {
        id: "4",
        name: "Fatima Al-Mansour",
        role: "Health For All",
        title: "Public Health Advocate",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        tags: ["Healthcare", "Wellness"],
        year: 2025,
    },
    {
        id: "5",
        name: "Emma Johnson",
        role: "Green Earth Initiative",
        title: "Climate Activist",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        tags: ["Climate", "Policy", "Sustainability"],
        year: 2025,
    },
    {
        id: "6",
        name: "Lucas Rivera",
        role: "Digital Future Lab",
        title: "Tech Entrepreneur",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        tags: ["Technology", "Innovation"],
        year: 2024,
    },
    {
        id: "7",
        name: "Michael Chen",
        role: "Global Learning Foundation",
        title: "Education Director",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["Education", "Development", "Youth"],
        year: 2024,
    },
    {
        id: "8",
        name: "Fatima Al-Mansour",
        role: "Health For All",
        title: "Public Health Advocate",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        tags: ["Healthcare", "Wellness"],
        year: 2025,
    },
    {
        id: "9",
        name: "Emma Johnson",
        role: "Green Earth Initiative",
        title: "Climate Activist",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        tags: ["Climate", "Policy", "Sustainability"],
        year: 2025,
    },
    {
        id: "10",
        name: "Lucas Rivera",
        role: "Digital Future Lab",
        title: "Tech Entrepreneur",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        tags: ["Technology", "Innovation"],
        year: 2024,
    },
    {
        id: "11",
        name: "Michael Chen",
        role: "Global Learning Foundation",
        title: "Education Director",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["Education", "Development", "Youth"],
        year: 2024,
    },
    {
        id: "12",
        name: "Fatima Al-Mansour",
        role: "Health For All",
        title: "Public Health Advocate",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        tags: ["Healthcare", "Wellness"],
        year: 2025,
    },

];

const categories = [
    "All Speakers",
    "Climate",
    "Education",
    "Healthcare",
    "Technology",
    "Human Rights",
];

export default function SpeakersScreen() {
    const [activeCategory, setActiveCategory] = useState("All Speakers");
    const [selectedYear, setSelectedYear] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const years = [
        { label: 'Filter by Year', value: 'all' },
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 },
    ];

    const handleSelectYear = (value) => {
        setSelectedYear(value === 'all' ? null : value);
        setDropdownVisible(false); // Close dropdown after selecting a year
    };
    const filteredSpeakers = allSpeakers.filter((speaker) => {
        const matchesSearch = speaker.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear ? speaker.year === selectedYear : true;
        const matchesCategory =
            activeCategory === "All Speakers" || speaker.tags.includes(activeCategory);
        return matchesSearch && matchesYear && matchesCategory;
    });

    return (
        <View

            className="h-screen bg-white pt-10"
        >
            {/* Header */}

            <Navbar title="Speakers" />

            {/* Search */}
            <View className="px-6 mb-4">
                <TextInput
                    placeholder="Search by name..."
                    placeholderTextColor="#aaa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
                />
            </View>

            {/* Year Dropdown */}
            {/* <View className="px-6 mb-3 ">
                <TouchableOpacity
                    className="bg-white border border-gray-300 rounded-xl p-3"
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text className="text-base text-gray-800">
                        {selectedYear || 'Filter by Year'}
                    </Text>
                </TouchableOpacity>

                {dropdownVisible && (
                    <View className=" bg-white border border-gray-300 rounded-xl mt-2 w-full z-10 relative">
                        {years.map((year) => (
                            <TouchableOpacity
                                key={year.value}
                                className="py-3 px-4"
                                onPress={() => handleSelectYear(year.value)}
                            >
                                <Text className="text-base text-gray-700">{year.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View> */}


            {/* Tag Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className={`m-0 px-6 ${activeCategory == "All Speakers" && "pb-20"}`}
            >
                {categories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                        <Pressable
                            key={category}
                            onPress={() => setActiveCategory(category)}
                            className={`px-4 py-2 h-8 rounded-full mr-2 ${isActive ? "bg-beta" : "bg-alpha"
                                }`}
                        >
                            <Text
                                className={`text-sm text-white`}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            {/* Speaker Cards */}
            <ScrollView className="px-2 mb-4">
                <View className="flex-row flex-wrap justify-between">
                    {filteredSpeakers.length > 0 ? (
                        filteredSpeakers.map((item) => (
                            <Pressable
                                key={item.id}
                                className="bg-white rounded-2xl shadow-xl shadow-alpha  overflow-hidden mb-5 px-4 pt-5 pb-3 w-[48%]"
                                style={{ elevation: 3 }}
                                android_ripple={{ color: "#ccc" }}
                                onPress={() => navigation.navigate('speakers/[id]', { speaker: item })}

                            >
                                <View className="items-center mb-3">
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-20 h-20 rounded-full border border-gray-300"
                                    />
                                </View>
                                <Text className="text-center text-base font-semibold text-alpha mb-1">
                                    {item.name}
                                </Text>
                                <Text className="text-center text-sm text-gray-600 mb-0.5">
                                    {item.title}
                                </Text>
                                <Text className="text-center text-xs text-gray-400 mb-2">
                                    {item.role}
                                </Text>
                                {/* <View className="flex-row flex-wrap justify-center gap-x-1 gap-y-1">
                                    {item.tags.slice(0, 2).map((tag) => (
                                        <View
                                            key={tag}
                                            className="bg-beta px-2 py-0.5 rounded-full"
                                        >
                                            <Text className="text-xs text-white">{tag}</Text>
                                        </View>
                                    ))}
                                </View> */}
                            </Pressable>
                        ))
                    ) : (
                        <Text className="text-center text-gray-400 mt-12 w-full text-sm">
                            No speakers match your filters.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
