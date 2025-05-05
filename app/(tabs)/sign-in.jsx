import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';


export default function SignInScreen() {
    const { setIsSignedIn, setUser, setToken } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
        <View className="h-screen items-center justify-center">
            <Text className="text-2xl font-bold">Sign In</Text>
            <Text className="text-gray-500">Please enter your email and password</Text>
            <TextInput
                className="border border-gray-300 rounded-md p-2 mt-4 w-80"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="border border-gray-300 rounded-md p-2 mt-4 w-80"
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                onPress={onSignIn}
                className="bg-alpha text-white rounded-md p-2 mt-4 w-80 text-center">
                <Text className="text-white text-center">Sign In</Text>
            </TouchableOpacity>

        </View>
    );
}
