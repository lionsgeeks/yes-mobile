import { BackHandler, Platform, PanResponder } from "react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

export default function handleBack(targetRoute) {
    const panResponder = useRef(null);

    useEffect(() => {
        if (Platform.OS === "android") {
            const onBackPress = () => {
                router.navigate(targetRoute);
                return true; 
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => {
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);
            };
        } else if (Platform.OS === "ios") {
            panResponder.current = PanResponder.create({
                onMoveShouldSetPanResponder: (evt, gestureState) => {
                    return gestureState.dx > 20; // swipe right
                },
                onPanResponderRelease: (evt, gestureState) => {
                    if (gestureState.dx > 50) {
                        router.navigate(targetRoute);
                    }
                },
            });
        }
    }, [ targetRoute]);

    return Platform.OS === "ios" ? panResponder.current?.panHandlers : {};
}
