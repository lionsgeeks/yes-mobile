import { IconSymbol } from "@/components/ui/IconSymbol"
import { useAuthContext } from "@/context/auth"
import { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from "react-native"


export default function AccountScreen() {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(null)

    // Form state
    const [formData, setFormData] = useState({
        fullName: user.name,
        email: user.email,
        password: "",
        company: user.company,
        country: user.country,
        bio: user.description,
        interests: "this is still in progress",
        location: user.location,
        website: "https://example.com",
        twitter: "@johndoe",
        linkedin: "linkedin.com/in/johndoe",
        instagram: "@johndoe",
    })

    const updateField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    // TODO: Add image picker for user to update their image
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("Permission needed", "Please grant permission to access your photos")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri)
        }
    }

    const handleSave = () => {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            Alert.alert("Profile Updated", "Your profile information has been updated successfully.", [{ text: "OK" }])
        }, 1000)
    }

    const handleDelete = () => {
        Alert.alert("Delete Account", "Are you sure you want to delete your account? This action cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => console.log("Delete account") },
        ])
    }

    const renderInputField = (label, value, field, placeholder, icon, isMultiline = false) => (
        <View className="mb-2">
            <Text className="text-xl font-semibold mb-2 text-[#333]">{label}</Text>
            <View className="flex-row px-3 items-center border border-[#ddd] rounded bg-white">

                {icon && <IconSymbol size={20} name={icon} color={"#2e539d"} />}

                <TextInput
                    value={value}
                    onChangeText={(text) => updateField(field, text)}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    multiline={isMultiline}
                    numberOfLines={isMultiline ? 4 : 1}
                    secureTextEntry={field === "password"}
                    className=""
                />
            </View>
        </View>
    )




    return (
        <ScrollView>
            <View className="bg-white justify-around">
                <View className="items-center p-3 mt-5">
                    <TouchableOpacity className="mb-4">
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

                <View className="p-5">

                    <Text className="text-2xl font-bold mb-4">Account Information: </Text>
                    {renderInputField("Full Name", formData.fullName, "fullName", "John Doe", "person-outline")}
                    {renderInputField("Email", formData.email, "email", "john.doe@example.com", "mail-outline")}
                    {renderInputField("Password", formData.password, "password", "••••••••", "lock")}


                    <Text className="text-2xl font-bold my-4">General Information:</Text>
                    {renderInputField("Company", formData.company, "company", "Acme Inc.", "business")}
                    {renderInputField("Country", formData.country, "country", "United States", "")}
                    {renderInputField("Bio", formData.bio, "bio", "Tell us about yourself", "", true)}
                    {renderInputField("Location", formData.location, "location", "San Francisco, CA", "location-on")}
                    {renderInputField(
                        "Interests",
                        formData.interests,
                        "interests",
                        "Mobile development, UI/UX design, Photography",
                        "",
                        true,
                    )}

                    <Text className="text-2xl font-bold my-4">Social Information: </Text>
                    {renderInputField("Website", formData.website, "website", "https://example.com", "email")}
                    {renderInputField("Twitter", formData.twitter, "twitter", "@johndoe", "")}
                    {renderInputField("LinkedIn", formData.linkedin, "linkedin", "linkedin.com/in/johndoe", "")}
                    {renderInputField("Instagram", formData.instagram, "instagram", "@johndoe", "")}
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
            </View>
        </ScrollView>
    )
}