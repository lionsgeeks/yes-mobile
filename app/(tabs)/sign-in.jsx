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
import { LinearGradient } from 'expo-linear-gradient';


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

            if (!token) {
                console.log('Invalid token format');
                return;
            }

            if (!token.includes('|')) {
                await AsyncStorage.setItem('token', token);
                setToken(token);
                
            } else {
                const [, rawToken] = token.split('|');

                const hashHex = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256,
                    rawToken
                );
                
                await AsyncStorage.setItem('token', hashHex);
                setToken(hashHex);
            }




            // clear the input fields
            setEmail("");
            setPassword("");
            setIsSignedIn(true);

            setUser(participant);

            if (participant?.interesets?.length > 0) {
                router.push('/');
            } else {
                router.push("/onboarding");
                
            }
        }).catch((e) => {
            console.log('error signing in', e.message)  
            // alert("Invalid email or password. Please try again.");
        }); 
    }


    return (
        <LinearGradient
            colors={['#2e539d', '#000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-full w-full px-6 justify-center items-center"
            // {...panHandlers}
        >
            <Image
                source={yeslogo}
                style={{
                    width: 320,
                    resizeMode: 'contain'
                }}
            />

            <View className="w-full">
                <Text className=" text-white">Email: </Text>
                <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                    <MaterialIcons name="email" size={20} color="white" />
                    <TextInput
                        style={{ flex: 1, marginLeft: 10, color: 'white' }}
                        placeholder="you@example.com"
                        placeholderTextColor="#ccc"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            <View className="my-4 w-full">
                <Text className=" text-white">Password:</Text>
                <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                    <MaterialIcons name="lock" size={20} color="white" />
                    <TextInput
                        className="flex-1 ml-2"
                        placeholder="Password"
                        placeholderTextColor="#ccc"
                        secureTextEntry={hidePassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        style={{ color: 'white' }}
                    />
                    <Pressable onPress={() => setHidePassword(!hidePassword)}>
                        {hidePassword ?
                            <Ionicons name="eye-off" size={20} color="white" />
                            :
                            <Ionicons name="eye" size={20} color="white" />
                        }
                    </Pressable>
                </View>
                <Text className=" text-right text-sm underline text-white">Forgot Password ?</Text>
            </View>

            <TouchableOpacity
                onPress={onSignIn}
                className="bg-white rounded-md p-3 mt-4 w-full text-center"
            >
                <Text className="text-alpha text-center font-bold">Sign In</Text>
            </TouchableOpacity>
        </LinearGradient>
    );

}
