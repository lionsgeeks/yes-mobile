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
  const [visitors, setvisitors] = useState([]);
  const [badge, setBadge] = useState([]);
  const [Programe, setPrograme] = useState([]);
  const networkState = Network.getNetworkStateAsync();
  const [notifications, setNotifications] = useState([]);
  const [general, setGeneral] = useState();
  const[messageNotif , setMesssageNotif] = useState(null)

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
      if (user?.id) {
        setLoading(true);
        const response = await api.get("participants/matches/?auth=" + user?.id);
        setMatches(response.data.matches);
      }
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
            (part) => part?.role == "speaker"
          );
          const allVisitors = otherParts?.filter(
            (part) => part?.role == "visitor"
          );
          const allNgos = otherParts?.filter((part) => part?.role == "ngo");
          setSpeakers(allSpeakers)
          setvisitors(allVisitors);
          setNgos(allNgos);
          setAllParticipants(otherParts);
          // console.log("🚨 interests", interests);
          // console.log("🚨 allVistors", visitors);


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
    api.get(`qrcodes/show/${user?.id}`).then((res) => {
      const receivedBadge = res?.data.data[0];
      // console.log(`qrcodes/show/${user?.id}`);


      if (receivedBadge) {
        // console.log(receivedBadge);
        setBadge(receivedBadge);
      }
    }).catch((err) => {
      console.log('error getting badge', err);
    })
  }



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
      setGeneral(res.data?.general);
      if (res.data.general.version != Constants.expoConfig.version) {
        Alert.alert(
          "Update Required",
          `A new version of the app is available. Please update to continue. Current version ${res.data.general.version} and your version ${Constants.expoConfig.version}`,
          [
            {
              text: "Update Now",
              onPress: () => {
                const storeUrl = Platform.select({
                  ios: res.data.general.appstore,
                  android: res.data.general.playstore,
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


  const fetchNotification = () => {
    api.get('getNotifications').then((res) => {
      if (res.data?.notifications) {
        setNotifications(res.data.notifications);
      }
    }).catch((err) => {
      console.error('error getting notifcations', err);
    })
  }

  useEffect(() => {
    fetchGeneral();
    fetchAllParticipants();
    fetchParticipants();
    fetchMatches();
    fetchSponsors();
    fetchInterests();
    fetchBadge();
    fetchPrograme();
    fetchNotification();
  }, [user]);

  useEffect(() => {
    const initialize = async () => {
      await setupAbly(ablyClient, ablyChannel, user, { id: null }, null , setMesssageNotif);
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
    visitors,
    badge,
    Programe,
    allParticipants,
    ngos,
    notifications,
    general,
    messageNotif,
    setMesssageNotif
  };

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
    const screen = stackTrace?.split("at ")[1]?.split(" ")[0];
    const screenName = screen?.split("(")[0];
    console.log("Error occurred: 🚒🚒🚑🚑");
    const errorData = {
      name: error.message ?? "Unknown Error",
      participant_id: user?.id ?? 0,
      time: Date.now() ?? 0,
      operator_system: osName + " " + osVersion,
      screen_name: screenName ?? "Unknown Screen",
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
    // console.error("Error package:", error.message);
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
