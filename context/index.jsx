import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { cleanupAbly, connectAbly, setupAbly } from "@/utils/ably";
import { useAuthContext } from "./auth";

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(useColorScheme() == "dark");
    const [language, setLanguage] = useState("en");
    const ablyClient = useRef(null);
    const ablyChannel = useRef(null);
    const { user } = useAuthContext()



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
    };
    return <appContext.Provider value={appValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, appContext, useAppContext };
