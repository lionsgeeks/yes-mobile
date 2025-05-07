import { useAuthContext } from '@/context/auth';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Navbar from "@/components/navigation/navbar";
const APP_URL = process.env.EXPO_PUBLIC_APP_URL;

export default function Badge() {
    const {user} = useAuthContext();
    const [qrcode, setQrcode] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchQRCodes = async () => {
          try {
            const response = await fetch(`${APP_URL}/api/qrcodes`);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
    
            if (data.data && data.data.length > 0) {
                console.log(data.data[0]);
                
              setQrcode(data.data[0]);
            } else {
              setError('No QR codes found.');
            }
            
          } catch (err) {
            console.error('Fetch Error:', err); 
            setError(err.message);
          }
        };
    
        fetchQRCodes();
      }, []);






    return (
        <View className="flex-1 bg-white pt-10 ">
        <Navbar title="Program" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                className="px-4"
            >
                <View className="flex-1  w-full px-4 rounded-2xl bg-white shadow-lg overflow-hidden">
                    {/* Header */}
                    <View className="bg-alpha p-6 items-center justify-center">
                        <Text className="text-white text-lg font-bold">Global Impact Summit</Text>
                        <Text className="text-white text-base opacity-90 mt-1">May 15-17, 2023</Text>
                    </View>

                    {/* Profile Section */}
                    <View className="items-center py-6">
                        <View className="w-26 h-26 border-4 border-beta rounded-full items-center justify-center mb-4">
                            <View className="w-24 h-24 rounded-full bg-gray-200" />
                        </View>

                        <Text className="text-2xl font-bold text-gray-800">{qrcode.participant_name}</Text>
                        <Text className="text-lg font-semibold text-beta">{qrcode.participant_role}</Text>
                        <Text className="text-base text-gray-500 mb-5">{qrcode.participant_company}</Text>

                        <View className="flex-row justify-center mb-4">
                            <View className="px-4 py-2 bg-alpha rounded-full mx-1">
                                <Text className="text-white text-sm font-bold">ATTENDEE</Text>
                            </View>
                            <View className="px-4 py-2 bg-beta rounded-full mx-1">
                                <Text className="text-white text-sm font-bold">SPEAKER</Text>
                            </View>
                        </View>
                    </View>

                    {/* QR Section */}
                    <View className="px-6 py-5 items-center rounded-b-2xl space-y-4">
                        <SvgUri
                            // uri="http://192.168.100.100:8000/storage/qrcodes/qrcode_1746453779.svg"
                            uri={qrcode.file_url}
                            width={150}
                            height={150}
                        />
                        <Text className="text-gray-600 text-base font-semibold pt-8">Scan for verification</Text>
                        <View className="w-full border-t border-gray-300" />
                        <Text className="text-gray-800 text-base pt-5 font-semibold">Badge ID:{qrcode.badge_id}</Text>
                        <Text className="text-gray-500 text-sm text-center">
                            This badge must be worn at all times during the event.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
