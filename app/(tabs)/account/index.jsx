import api from "@/api";
import { IconSymbol } from "@/components/ui/IconSymbol"
import { useAuthContext } from "@/context/auth"
import { useEffect, useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    Pressable,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";



export default function AccountScreen() {
    const { user, token, setIsSignedIn, fetchUserInfo, socials } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(api.IMAGE_URL + user.image);

    // Form state
    const [formData, setFormData] = useState({
        fullName: user.name,
        email: user.email,
        company: user.company,
        city: user.city,
        country: user.country,
        bio: user.description,
        location: user.location,
        website: socials?.website,
        youtube: socials?.youtube,
        linkedin: socials?.linkedin,
        instagram: socials?.instagram,
    });

    useEffect(() => {
        // the formdata kept the old logged user
        // this is a fix for that
        setFormData({
            fullName: user.name,
            email: user.email,
            company: user.company,
            city: user.city,
            country: user.country,
            bio: user.description,
            location: user.location,
            website: socials?.website,
            youtube: socials?.youtube,
            linkedin: socials?.linkedin,
            instagram: socials?.instagram,
        })
        setProfileImage(api.IMAGE_URL + user.image)
    }, [user])

    const updateField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    const uploadPhoto = async (uri) => {
        const formData = new FormData();
        const fileName = uri.split("/").pop();

        formData.append("photo", {
            uri: uri,
            name: fileName,
            type: "image/jpeg",
        });

        const APP_URL = process.env.EXPO_PUBLIC_APP_URL;

        try {
            console.log("Form is sending now");
            const response = await axios.post(APP_URL + "/api/participant/image/" + user.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status == 200) {
                fetchUserInfo();
            }

        } catch (error) {
            console.error("Error uploading photo:", error.response?.data || error.message);
        }
    };



    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("Permission needed", "Please grant permission to access your photos")
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri)
            uploadPhoto(result.assets[0].uri)
        }
    }



    const handleSave = () => {
        if (!formData.fullName || !formData.email) {
            Alert.alert("Invalid Information", 'Please Fill In the Name AND Email')
        }

        setIsLoading(true)

        api.put('participant/' + user.id, token, formData).then((res) => {
            if (res.status == 200) {
                fetchUserInfo();
                Alert.alert('Information Updated', 'Your Account Information Has Been Updated Successfully!');
            }
        }).catch((err) => {
            console.log('error updating the account', err)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const deleteAccount = () => {
        if (token) {
            api.remove('participant/' + user.id, token).then(async (res) => {

                if (res.status == 200) {
                    await AsyncStorage.setItem("token", "");
                    setIsSignedIn(false);
                    router.replace("/(tabs)/sign-in");

                }
            })
        } else {
            console.log('there should be a token here.')
        }
    }

    const handleDelete = () => {
        Alert.alert("Delete Account", "Are you sure you want to delete your account? This action cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteAccount() },
        ])
    }

    const renderInputField = (label, value, field, placeholder, icon, isMultiline = false) => (
        <View className="mb-2">
            <Text className="text-xl capitalize font-semibold mb-2 text-[#333]">{label}</Text>
            <View className="flex-row px-3 items-center border border-[#ddd] rounded bg-white">

                {icon && <Ionicons size={20} name={icon} color={"#2e539d"} />}

                <TextInput
                    value={value}
                    onChangeText={(text) => updateField(field, text)}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    multiline={isMultiline}
                    numberOfLines={isMultiline ? 4 : 1}
                    className=" w-full"
                />
            </View>
        </View>
    )



    return (
        <View>
            <View className="bg-white justify-around">
                <View className="items-center py-10 mt-5">
                    <TouchableOpacity
                        onPress={() => { pickImage() }}
                        className="mb-4">
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} className="w-20 h-20 rounded-full" />
                        ) : (
                            <View className="w-24 h-24 rounded-full bg-gray-200 justify-center items-center">
                                <Text className="text-4xl font-bold text-[#777]">JD</Text>
                            </View>
                        )}
                        <View className="absolute bottom-0 right-0 bg-alpha w-8 h-8 rounded-full justify-center items-center border-2 border-white">
                            <IconSymbol size={20} name={"camera"} color={"#fff"} />
                        </View>
                    </TouchableOpacity>

                    <Text className="text-2xl mb-2">Account Settings</Text>
                    <Text className="text-[#666]">Update your personal information and account settings.</Text>
                </View>


                <ScrollView className="h-[70vh] mb-12">
                    <View className="p-5">

                        <Text className="text-2xl font-bold mb-4 text-beta">Account Information: </Text>
                        {renderInputField("Full Name", formData.fullName, "fullName", "John Doe", "person-outline")}
                        {renderInputField("Email", formData.email, "email", "john.doe@example.com", "mail-outline")}

                        <Pressable
                            onPress={() => { router.push('/account/changePassword') }}
                            className="border px-2 py-3 mt-2 rounded border-alpha flex-row justify-between">
                            <Text className="text-lg">Change Password:</Text>

                            <IconSymbol size={24} name={"arrow-right"} color={"#000"} />
                        </Pressable>


                        <Text className="text-2xl font-bold my-4 text-beta">General Information:</Text>
                        {renderInputField("Company", formData.company, "company", "Acme Inc.", "business")}
                        {renderInputField("Country", formData.country, "country", "United States", "")}
                        {renderInputField("City", formData.city, "city", "United States", "")}
                        {renderInputField("Location", formData.location, "location", "San Francisco, CA", "location")}
                        {renderInputField("Bio", formData.bio, "bio", "Tell us about yourself", "", true)}


                        <Text className="text-2xl font-bold my-4 text-beta">Social Information: </Text>
                        {renderInputField("linkedIn", formData.linkedin, "linkedin", "linkedin.com/in/johndoe", "logo-linkedin")}
                        {renderInputField("instagram", formData.instagram, "instagram", "@johndoe", "logo-instagram")}
                        {renderInputField("website", formData.website, "website", "https://example.com", "globe")}
                        {renderInputField("youtube", formData.youtube, "youtube", "@johndoe", "logo-youtube")}
                    </View>

                    <View className="p-5">
                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={isLoading}
                            className="bg-alpha text-white p-4 rounded my-2 items-center"
                        >
                            <Text className="text-xl font-bold text-white">{isLoading ? "Saving..." : "Save Changes"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-red-500 text-white p-4 rounded mt-2 items-center" onPress={handleDelete}>
                            <Text className="text-white font-bold">Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}