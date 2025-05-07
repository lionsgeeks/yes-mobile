import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function changePasswordScreen() {
    const { user, token } = useAuthContext();

    const [formData, setFormData] = useState({
        oldPass: '',
        newPass: '',
    })
    const [confirmPass, setConfirmPass] = useState('');


    const handleSubmit = () => {

        if (!formData.oldPass) {
            Alert.alert("Old Password", "Please Write Your Old Password");
            return;
        }

        if (formData.newPass.length < 8) {
            Alert.alert("Invalid Password", 'The Password should have at least 8 characters');
            return;
        }

        if (formData.newPass !== confirmPass) {
            Alert.alert("Confirm Password", "The new password and the confirmed password should be the same");
            return;
        }

        api.put('participant/password/' + user.id, token, formData).then((res) => {
            if (res.status == 200) {
                setFormData({
                    oldPass: '',
                    newPass: '',
                });
                setConfirmPass('');
                Alert.alert('Password Updated', 'Your Password Has Been Updated Successfully.')
            }
        }).catch((err) => {
            Alert.alert('Incorrect Password', 'Please Enter Your Old Password Correctly.');
        })
    }


    return (
        <View className="h-full bg-white py-12 px-5">
            <View>
                <Text className="text-2xl font-semibold text-beta">Update Password :</Text>
                <Text className="text-sm text-gray-600">Create a new password for your account</Text>
            </View>


            <View className="my-4">
                <Text>Current Password: </Text>
                <TextInput
                    value={formData.oldPass}
                    onChangeText={(text) => {
                        setFormData({
                            ...formData,
                            oldPass: text,
                        })
                    }}
                    className="px-2 py-3 border border-alpha rounded my-2"
                />
            </View>

            <View className="my-4">
                <Text>New Password: </Text>
                <TextInput
                    value={formData.newPass}
                    onChangeText={(text) => {
                        setFormData({
                            ...formData,
                            newPass: text,
                        })
                    }}
                    className="px-2 py-3 border border-alpha rounded my-2"
                />
                <Text className="text-sm text-gray-500">Must have at least 8 characters</Text>
            </View>

            <View className="my-4">
                <Text>Confirm New Password: </Text>
                <TextInput
                    value={confirmPass}
                    onChangeText={(text) => { setConfirmPass(text) }}
                    className="px-2 py-3 border border-alpha rounded my-2"
                />
            </View>


            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-alpha text-white p-4 rounded my-2 items-center"
            >
                <Text className="text-xl font-bold text-white">Save Changes</Text>
            </TouchableOpacity>

        </View>
    )
}