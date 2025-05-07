import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "@/api";
import { router } from "expo-router";


const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const fetchUserInfo = async () => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            // get user data from the server
            setToken(token);
            api.post('getuser/token', { token }).then((response) => {
                
                setUser(response.data.user);
                setIsSignedIn(true);
            });

        } else {
            // redirect to sign in screen
            setIsSignedIn(false)
            router.replace('/sign-in');
        }
    }


    useEffect(() => {
        fetchUserInfo();
    }, [token]);

    const appValue = {
        isSignedIn,
        setIsSignedIn,
        user,
        setUser,
        token,
        setToken,
        fetchUserInfo,
    };


    return <authContext.Provider value={appValue}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);

export { AuthProvider, authContext, useAuthContext };
