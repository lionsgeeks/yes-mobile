import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import yeslogo from "../../assets/images/yeslogo.png"
import handleBack from "@/utils/handleBack";


export default function SignInScreen() {
    const { setIsSignedIn, setUser, setToken } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const panHandlers = handleBack("/sign-in") 

    const onSignIn = () => {

        api.post("sanctum/token", { email, password }).then(async (response) => {
            const participant = response.data.participant;
            const token = response.data.token;


            let hashHex;
            if (!token) {
                console.warn('Invalid token format');
                return;
            }

            if (!token.includes('|')) {
                await AsyncStorage.setItem('token', token);

            } else {
                const [, rawToken] = token.split('|');

                const hashHex = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256,
                    rawToken
                );

                console.log('im in sign up screen: this is the hashhex token', hashHex);
                await AsyncStorage.setItem('token', hashHex);

            }




            // clear the input fields
            setEmail("");
            setPassword("");

            setIsSignedIn(true);

            setUser(participant);
            setToken(hashHex);

            // redirect the user to the home screen
            router.push("/onboarding");
        }).catch(() => {
            alert("Invalid email or password. Please try again.");
        });
    }


    return (
        <View {...panHandlers} className="h-full items-center justify-center bg-white px-6">

                <Image
                    source={yeslogo}
                    style={{
                        width: 320,
                        resizeMode: 'contain'
                    }}
                />

            <View className="">
                <Text className="text-beta">Email: </Text>
                <View
                    className="flex-row items-center border border-gray-300 rounded-md px-3  my-2 w-full"
                >
                    <MaterialIcons name="email" size={20} color="#2e539d" />
                    <TextInput
                        style={{ flex: 1, marginLeft: 10 }}
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            <View className="my-4">
                <Text className="text-beta">Passsword</Text>
                <View className="flex-row items-center border border-gray-300 rounded-md px-3  my-2 w-full">
                    <MaterialIcons name="lock" size={20} color="#2e539d" />
                    <TextInput
                        className="flex-1 ml-2"
                        placeholder="Password"
                        secureTextEntry={hidePassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Pressable
                        onPress={() => { setHidePassword(!hidePassword) }}
                    >
                        {
                            hidePassword ?
                                <Ionicons name="eye-off" size={20} color="#2e539d" />
                                :
                                <Ionicons name="eye" size={20} color="#2e539d" />
                        }
                    </Pressable>
                </View>

                <Text className="text-beta text-right text-sm underline">Forgot Password ?</Text>
            </View>

            <TouchableOpacity
                onPress={onSignIn}
                className="bg-alpha text-white rounded-md p-3 mt-4 w-full text-center font-bold">
                <Text className="text-white text-center">Sign In</Text>
            </TouchableOpacity>

        </View>
    );
}
