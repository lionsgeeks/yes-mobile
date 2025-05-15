import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, Linking, Platform, useColorScheme } from "react-native";
import { cleanupAbly, setupAbly } from "@/utils/ably";
import { useAuthContext } from "./auth";
import api from "@/api";
import { useFocusEffect } from "expo-router";
import Constants from "expo-constants";
import * as Network from "expo-network";
import ErrorBoundary from "react-native-error-boundary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appContext = createContext();

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(useColorScheme() == "dark");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [ngos, setNgos] = useState([]);
  const ablyClient = useRef(null);
  const ablyChannel = useRef(null);
  const { user } = useAuthContext();
  const [sponsors, setSponsors] = useState([]);
  const [interests, setInterests] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [badge, setBadge] = useState([]);
  const [Programe, setPrograme] = useState([]);
  const networkState = Network.getNetworkStateAsync();

  //* get participamts from the backend
  const [participants, setParticipants] = useState([]);
  // console.log(user.id);
  const [allParticipants, setAllParticipants] = useState([]);
  const osName = Platform.OS;
  const osVersion = Platform.Version;
  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await api.get("participants/?auth=" + user?.id);
      setParticipants(response.data.participants);
    } catch (error) {
      console.error("❌ Failed to fetch participants:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await api.get("participants/matches/?auth=" + user?.id);
      setMatches(response.data.matches);
    } catch (error) {
      console.error("❌ Failed to fetch matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllParticipants = () => {
    api
      .get("participants/all")
      .then((res) => {
        const allParts = res?.data.participants;
        if (allParts) {
          const otherParts = allParts?.filter((part) => part.id != user?.id);
          const allSpeakers = otherParts?.filter(
            (part) => part.role == "speaker"
          );
          const allNgos = otherParts?.filter((part) => part.role == "ngo");
          setSpeakers(allSpeakers);
          setNgos(allNgos);
          setAllParticipants(otherParts);
        }
      })
      .catch((err) => {
        console.log("err getting participants", err);
      });
  };

  const fetchSponsors = () => {
    api
      .get("sponsors")
      .then((res) => {
        const receivedSponsors = res?.data.sponsors;
        if (receivedSponsors) {
          setSponsors(receivedSponsors);
        }
      })
      .catch((err) => {
        console.log("error getting sponsors", err);
      });
  };

  const fetchBadge = () => {
    api
      .get(`qrcodes/${user?.id}`)
      .then((res) => {
        const receivedBadge = res.data.badge;
        console.log(receivedBadge);

        if (receivedBadge) {
          setBadge(receivedBadge);
        }
      })
      .catch((err) => {
        console.log("error getting badge", err);
      });
  };

  const fetchPrograme = () => {
    api
      .get("programe/create")
      .then((res) => {
        const receivedPrograme = res?.data.programes;
        if (receivedPrograme) {
          setPrograme(receivedPrograme);
        }
      })
      .catch((err) => {
        console.log("error getting programe", err);
      });
  };

  const fetchInterests = () => {
    api
      .get("interests")
      .then((res) => {
        const receivedInterests = res?.data.interests;
        if (receivedInterests) {
          setInterests(receivedInterests);
        }
      })
      .catch((err) => {
        console.log("error getting interests", err);
      });
  };

  const fetchGeneral = () => {
    api.get("general").then((res) => {
      // TODO* ask Mehdi if we should add the app links to general table instead of hard code just in case
      if (res.data.general.version != Constants.expoConfig.version) {
        Alert.alert(
          "Update Required",
          "A new version of the app is available. Please update to continue.",
          [
            {
              text: "Update Now",
              onPress: () => {
                const storeUrl = Platform.select({
                  ios: "itms-apps://apps.apple.com/app/idYOUR_APP_ID", // Replace with your iOS app ID
                  android: "market://details?id=YOUR_PACKAGE_NAME", // Replace with your Android package name
                });

                if (storeUrl) {
                  Linking.openURL(storeUrl);
                }
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    });
  };

  useEffect(() => {
    // add the other fetches here ?
    fetchGeneral();
    fetchAllParticipants();
    fetchParticipants();
    fetchMatches();
    fetchSponsors();
    fetchInterests();
    fetchBadge();
    fetchPrograme();
  }, [user]);

  useEffect(() => {
    const initialize = async () => {
      await setupAbly(ablyClient, ablyChannel, user, { id: null }, null);
    };

    initialize();
    return () => {
      cleanupAbly(ablyClient, ablyChannel);
    };
  }, [user?.id]);

  const appValue = {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    sponsors,
    participants,
    matches,
    fetchMatches,
    interests,
    speakers,
    badge,
    Programe,
    allParticipants,
    ngos,
  };
  // const CustomFallback = (props: { error: Error; resetError: Function }) => (
  //   <View>
  //     <Text>Something happened!</Text>
  //     <Text>{props.error.toString()}</Text>
  //     <Pressable onPress={props.resetError}>
  //       <Text>Try again</Text>
  //     </Pressable>
  //     <Pressable onPress={router.navigate("/")}>
  //       <Text>Back Home</Text>
  //     </Pressable>
  //   </View>
  // );
  const sendStorageRepport = async () => {
    if ((await networkState).isInternetReachable) {
      const errorData = await AsyncStorage.getItem("errorData");
      if (errorData) {
        const parsedErrorData = JSON.parse(errorData);
        console.log("Sending stored error data:", parsedErrorData);
        api
          .post("reports", parsedErrorData)
          .then((response) => {
            console.log("Stored error data sent successfully:", response.data);
            AsyncStorage.removeItem("errorData");
          })
          .catch((error) => {
            console.error("Failed to send stored error data:", error);
          });
      }
    }
  };
  useEffect(() => {
    sendStorageRepport();
  }, [networkState]);

  const errorHandler = async (error, stackTrace) => {
    console.log("Error occurred: 🚒🚒🚑🚑");
    const screen = stackTrace?.split("at ")[1]?.split(" ")[0];
    const screenName = screen?.split("(")[0];
    const errorData = {
      name: error.message,
      participant_id: user.id,
      time: Date.now(),
      operator_system: osName + " " + osVersion,
      screen_name: screenName,
    };
    console.log("Screen name:", errorData);
    if ((await networkState).isInternetReachable) {
      console.log("Network is reachable");
      api.post("reports", errorData).then((response) => {
        console.log("Error reported successfully:", response.data);
      });
    } else {
      await AsyncStorage.setItem("errorData", JSON.stringify(errorData));
      console.log("Network is not reachable");
    }
    console.error("Error package:", error.message);
    // console.log("Stack Trace:", stackTrace);
  };
  return (
    <ErrorBoundary onError={errorHandler}>
      <appContext.Provider value={appValue}>{children}</appContext.Provider>
    </ErrorBoundary>
  );
};

const useAppContext = () => useContext(appContext);

export { AppProvider, appContext, useAppContext };
