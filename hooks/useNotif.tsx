import { useState, useEffect} from 'react';
import { Platform} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useAuthContext } from '@/context/auth';
import api from '@/api';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});


function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
    }
    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
        handleRegistrationError('Project ID not found');
    }
    try {
        const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;
        // console.log('registering push notification', pushTokenString);

        return pushTokenString;
    } catch (e: unknown) {
        handleRegistrationError(`${e}`);
    }
}

export default function useNotif() {
    const { user } = useAuthContext();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => {
                setExpoPushToken(token ?? '')
                // console.log('hey', token);
                // console.log('hoo', user?.id);
                if (token && user?.id) {
                    api.post('participant/pushToken/' + user.id, {pushToken: token}).then((res) => {
                        if (res?.status == 200) {
                            // Alert.alert('Information Updated', 'Your Account Information Has Been Updated Successfully!');
                            // console.log(res.data);
                            console.log('notif should have been updated')
                        }
                    }).catch((err) => {
                        console.log('error updating the account', err)
                    })
                }
            })
            .catch((error: any) => setExpoPushToken(`${error}`));

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, [user]);

    return {
        expoPushToken,
        notification,
    }
}
