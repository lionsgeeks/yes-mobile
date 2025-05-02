import { Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export const SignOutButton = () => {

    const handleSignOut = async () => {
        try {
            await AsyncStorage.setItem('token', '');
            router.push('/(tabs)/sign-in');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <TouchableOpacity onPress={handleSignOut}>
            <Text
                style={{
                    backgroundColor: '#ef4444',
                }}
                className='text-white  w-72 p-2 my-2 rounded-md text-center'
            >Sign out</Text>
        </TouchableOpacity>
    )
}