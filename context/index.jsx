import { createContext, useContext, useEffect, useRef, useState } from "react";
import {  useColorScheme } from "react-native";
import { cleanupAbly, setupAbly } from "@/utils/ably";
import { useAuthContext } from "./auth";
import api from "@/api";

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(useColorScheme() == "dark");
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(false);
    
    
    const ablyClient = useRef(null);
    const ablyChannel = useRef(null);
    const { user } = useAuthContext()
    const [sponsors, setSponsors] = useState([]);
    const [interests, setInterests] = useState([]);
    const [speakers, setSpeakers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [allParticipants, setAllParticipants] = useState([]);


    const fetchParticipants = async () => {
        try {
            setLoading(true)
            const response = await api.get('participants/?auth=' + user?.id)
            setParticipants(response.data.participants)
        } catch (error) {
            console.error("❌ Failed to fetch participants:", error);
        } finally {
            setLoading(false)
        }
    }

    const fetchMatches = async () => {
        try {
            setLoading(true)
            const response = await api.get('participants/matches/?auth=' + user?.id)
            setMatches(response.data.matches)

        } catch (error) {
            console.error("❌ Failed to fetch matches:", error);
        } finally {
            setLoading(false)
        }
    }

    const fetchAllParticipants = () => {
        api.get('participants/all').then((res) => {
            const allParts = res.data.participants;
            if (allParts) {
                setAllParticipants(allParts);
            }
        })
    }

    const fetchSponsors = () => {
        api.get('sponsors').then((res) => {
            const receivedSponsors = res.data.sponsors;
            if (receivedSponsors) {
                setSponsors(receivedSponsors);
            }
        }).catch((err) => {
            console.log('error getting sponsors', err);
        })
    }

    const fetchSpeakers = () => {
        api.get('speakers').then((res) => {
            const receivedSpeakers = res.data.speakers;
            if (receivedSpeakers) {
                setSpeakers(receivedSpeakers);
            }
        }).catch((err) => {
            console.log('error getting speakers', err);
        })
    }

    const fetchInterests = () => {
        api.get('interests').then((res) => {
            const receivedInterests = res.data.interests;
            if (receivedInterests) {
                setInterests(receivedInterests)
            }
        }).catch((err) => {
            console.log('error getting interests', err)
        })
    }

    const initialize = async () => {
        await setupAbly(ablyClient, ablyChannel, user, { id: null }, null);
    };

    useEffect(() => {
        // add the other fetches here ?
        fetchAllParticipants();
        fetchParticipants();
        fetchMatches();
        fetchSponsors();
        fetchSpeakers();    
        fetchInterests(); 
        
        initialize();
        return () => {
            cleanupAbly(ablyClient, ablyChannel)
        };
    }, [user?.id]) 



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
        allParticipants,
    };
    return <appContext.Provider value={appValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, appContext, useAppContext };
