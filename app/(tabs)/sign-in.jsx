import api from "@/api";
import { useAuthContext } from "@/context/auth";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import yeslogo from "../../assets/images/yeslogo.png";
import handleBack from "@/utils/handleBack";
import { LinearGradient } from "expo-linear-gradient";
import { Alert } from "react-native";

export default function SignInScreen() {
  const { setIsSignedIn, setUser, setToken, isSignedIn } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");

  const panHandlers = handleBack("/sign-in");

  useFocusEffect(
    useCallback(() => {
      if (isSignedIn) {
        router.replace("/");
      }
    }, [isSignedIn])
  );
  const onSignIn = () => {
    setIsLoading(true);
    const userEmail = email.trim().toLowerCase();
    api
      .post("sanctum/token", { email: userEmail, password }) 
      .then(async (response) => {
        const participant = response.data.participant;
        const token = response.data.token;

        if (!token) {
          console.log("Invalid token format");
          return;
        }

        if (!token.includes("|")) {
          await AsyncStorage.setItem("token", token);
          setToken(token);
        } else {
          const [, rawToken] = token.split("|");

          const hashHex = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            rawToken
          );

          await AsyncStorage.setItem("token", hashHex);
          setToken(hashHex);
        }

        // clear the input fields
        setEmail("");
        setPassword("");
        setIsSignedIn(true);

        setUser(participant);

        if (participant.interesets && participant?.interesets?.length > 0) {
          router.push("/");
        } else {
          router.push("/onboarding");
        }
      })
      .catch((e) => {
        console.log("error signing in", e.message);
        Alert.alert("Something Went Wrong. Please try again.", "Please make sure your email and password are correct");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const onForgotPassword = () => {
    // confirm email and confirm email are equal
    if (email !== confirmEmail) {
      Alert.alert('Confirm Email First', 'Please make sure you write your email correctly.')
      return
    }

    // api call to backend and display alert if all is good
    // loading and disabled for buttons
    setIsLoading(true);
    api.post('participant/resetPassword', { email: email }).then((res) => {
      if (res?.status == 200) {
        alert(res.data?.message);
      }
    }).catch((err) => {
      console.log('error resetting password', err);
    }).finally(() => {
      setForgotPassword(false);
      setConfirmEmail('');
      setIsLoading(false)
    })
  }

  return (

    <LinearGradient
      colors={['#2e539d', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      {...panHandlers}
      style={{
        flex: 1,
        height: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, width: '100%' }}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 30
            }}

          >
            <Image
              source={yeslogo}
              style={{
                width: 320,
                resizeMode: 'contain',
              }}
            />

            <View className="w-full">
              <Text className=" text-white">Email: </Text>
              <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                <MaterialIcons name="email" size={20} color="white" />
                <TextInput
                  style={{ flex: 1, marginLeft: 10, color: "white", padding: 10 }}
                  placeholder="you@example.com"
                  placeholderTextColor="#ccc"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View className="my-4 w-full">
              {
                forgotPassword ?
                  <View className="w-full">
                    <Text className=" text-white">Confirm Email: </Text>
                    <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                      <MaterialIcons name="email" size={20} color="white" />
                      <TextInput
                        style={{ flex: 1, marginLeft: 10, color: "white", padding: 10 }}
                        placeholder="you@example.com"
                        placeholderTextColor="#ccc"
                        autoCapitalize="none"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                      />
                    </View>
                  </View>
                  :
                  <View>
                    <Text className=" text-white">Password:</Text>
                    <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                      <MaterialIcons name="lock" size={20} color="white" />
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#ccc"
                        secureTextEntry={hidePassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        style={{ flex: 1, marginLeft: 10, color: 'white', padding: 10 }}
                      />
                      <Pressable onPress={() => setHidePassword(!hidePassword)}>
                        {hidePassword ?
                          <Ionicons name="eye-off" size={20} color="white" />
                          :
                          <Ionicons name="eye" size={20} color="white" />
                        }
                      </Pressable>
                    </View>
                  </View>
              }

              <Pressable onPress={() => { setForgotPassword(!forgotPassword) }}>
                <Text className=" text-right text-sm underline text-white">
                  {forgotPassword ? ' Return to Sign In' : 'Forgot Password ?'}</Text>
              </Pressable>
            </View>

            <TouchableOpacity
              onPress={() => { forgotPassword ? onForgotPassword() : onSignIn() }}
              disabled={isLoading}
              className={`${isLoading ? 'bg-white/50' : 'bg-white'} rounded-md p-3 mt-4 w-full text-center flex-row gap-2 justify-center `}
            >
              {isLoading && <ActivityIndicator />}
              <Text className="text-alpha text-center font-bold">
                {forgotPassword ? 'Forgot Password' : 'Sign In'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30
          }}

        >
          <Image
            source={yeslogo}
            style={{
              width: 320,
              resizeMode: 'contain',
            }}
          />

          <View className="w-full">
            <Text className=" text-white">Email: </Text>
            <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
              <MaterialIcons name="email" size={20} color="white" />
              <TextInput
                style={{ flex: 1, marginLeft: 10, color: "white", padding: 10 }}
                placeholder="you@example.com"
                placeholderTextColor="#ccc"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View className="my-4 w-full">
            {
              forgotPassword ?
                <View className="w-full">
                  <Text className=" text-white">Confirm Email: </Text>
                  <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                    <MaterialIcons name="email" size={20} color="white" />
                    <TextInput
                      style={{ flex: 1, marginLeft: 10, color: "white", padding: 10 }}
                      placeholder="you@example.com"
                      placeholderTextColor="#ccc"
                      autoCapitalize="none"
                      value={confirmEmail}
                      onChangeText={setConfirmEmail}
                    />
                  </View>
                </View>
                :
                <View>
                  <Text className=" text-white">Password:</Text>
                  <View className="flex-row items-center border border-white rounded-md px-3 my-2 w-full bg-white/10">
                    <MaterialIcons name="lock" size={20} color="white" />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#ccc"
                      secureTextEntry={hidePassword}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                      style={{ flex: 1, marginLeft: 10, color: 'white', padding: 10 }}
                    />
                    <Pressable onPress={() => setHidePassword(!hidePassword)}>
                      {hidePassword ?
                        <Ionicons name="eye-off" size={20} color="white" />
                        :
                        <Ionicons name="eye" size={20} color="white" />
                      }
                    </Pressable>
                  </View>
                </View>
            }

            <Pressable onPress={() => { setForgotPassword(!forgotPassword) }}>
              <Text className=" text-right text-sm underline text-white">
                {forgotPassword ? ' Return to Sign In' : 'Forgot Password ?'}</Text>
            </Pressable>
          </View>

          <TouchableOpacity
            onPress={() => { forgotPassword ? onForgotPassword() : onSignIn() }}
            disabled={isLoading}
            className={`${isLoading ? 'bg-white/50' : 'bg-white'} rounded-md p-3 mt-4 w-full text-center flex-row gap-2 justify-center `}
          >
            {isLoading && <ActivityIndicator />}
            <Text className="text-alpha text-center font-bold">
              {forgotPassword ? 'Forgot Password' : 'Sign In'}</Text>
          </TouchableOpacity>
        </ScrollView> 
      )}
    </LinearGradient>
  );


}
