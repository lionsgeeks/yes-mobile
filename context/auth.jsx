import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/api";
import { router } from "expo-router";
import AuthLoader from "@/components/loading";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [socials, setSocials] = useState(null);
  const [token, setToken] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const fetchUserInfo = async () => {
    setIsAuthLoading(true);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      // get user data from the server
      setToken(token);
      api.post("getuser/token", { token }).then((response) => {
        setUser(response?.data?.user);
        setSocials(response?.data?.socials);
        setIsSignedIn(true);
        setIsAuthLoading(false);
        // console.log("response 🚑", user);
      });
    } else {
      // redirect to sign in screen
      setIsSignedIn(false);
      setIsAuthLoading(false);
      router.replace("/sign-in");
    }
  };

  useEffect(() => {
    fetchUserInfo();
    setLoading(false);
  }, [token, isSignedIn]);

  // useEffect(() => {
  //   api
  //     .get(`invitation/image?id=${user?.id}`)
  //     .then((response) => {
  //       console.log("image response", response.data.image_path);
  //       setImagePath(response.data.image_path);
  //     })
  //     .catch((error) => {
  //       console.log("image error", error);
  //     });
  // }, [user]);
  // useEffect(() => {
  //   api.post('participant/logged', {
  //    currentParticipant: user?.id
  //   }).catch(error => {
  //    console.error('Failed to send user:',error);
  //  });

  //  }, [user])

  const appValue = {
    isSignedIn,
    setIsSignedIn,
    user,
    setUser,
    socials,
    setSocials,
    token,
    setToken,
    fetchUserInfo,
    imagePath,
    isAuthLoading,
    setIsAuthLoading,
  };

  return (
    <authContext.Provider value={appValue}>
      {loading ? <AuthLoader /> : children}
    </authContext.Provider>
  );
};

const useAuthContext = () => useContext(authContext);

export { AuthProvider, authContext, useAuthContext };
