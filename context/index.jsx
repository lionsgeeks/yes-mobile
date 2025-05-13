import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { cleanupAbly, connectAbly, setupAbly } from "@/utils/ably";
import { useAuthContext } from "./auth";
import api from "@/api";
import { useFocusEffect } from "@react-navigation/native";

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(useColorScheme() == "dark");
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    

    const ablyClient = useRef(null);
    const ablyChannel = useRef(null);
    const { user } = useAuthContext()
    const [sponsors, setSponsors] = useState([]);
    const [interests, setInterests] = useState([]);

    //* get participamts from the backend
    const [participants, setParticipants] = useState([])
    // console.log(user.id);
    
    const fetchParticipants = async () => {
        try {
            setLoading(true)
            const response = await  api.get('participants/?auth=' + user?.id)
            setParticipants(response.data.participants)
        } catch (error) {
            console.error("❌ Failed to fetch participants:", error);
        } finally{
            setLoading(false)  
        }
    }
    
    const fetchMatches = async () => {
        try {
            setLoading(true)
            const response = await  api.get('participants/matches/?auth=' + user?.id)
            setMatches(response.data.matches)
            // console.log(response.data);
            
        } catch (error) {
            console.error("❌ Failed to fetch matches:", error);
        } finally{
            setLoading(false)
        }
    }
    
    useFocusEffect(
        useCallback(() => {
            fetchParticipants();
            fetchMatches();
        }, [user?.id])
    )
    // useEffect(() => {
    //     api.get('participants/?auth=' + user?.id)
    //     .then(response => {
    //         let participants = response.data.participants
    //         // console.log(response.data);
            
    //         // console.log(participants.length);
            
    //         // participants = participants.filter(e => e.id !== user?.id)
    //         console.log(response.data.participants);   
            
            
    //         setParticipants(participants);
        
    //     })
    //     .catch(error => {
    //       console.error('Error fetching participants:', error);
    //     });
    //   }, [user?.id]);
    

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

    useEffect(() => {
        // add the other fetches here ?
        fetchSponsors();
        fetchInterests();     
    }, []) 

      
    useEffect(() => {

        const initialize = async () => {
            await setupAbly(ablyClient, ablyChannel, user, { id: null }, null);
        };

        initialize();

        return () => {

            cleanupAbly(ablyClient, ablyChannel)
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
        interests
    };
    return <appContext.Provider value={appValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, appContext, useAppContext };
