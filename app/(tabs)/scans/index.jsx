import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from '@/components/navigation/navbar';

const ScanScreen = () => {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [cameraActive, setCameraActive] = useState(false);

    const handleScan = (data) => {
        if (data?.data) {
            Alert.alert("Scanned", data.data);
            setCameraActive(false); // stop scanning after success
        }
    };

    // Ask for permission on first mount
    useEffect(() => {
        if (!hasPermission?.granted) {
            requestPermission();
        }
    }, []);


    useFocusEffect(
        useCallback(() => {
            setCameraActive(true);

            return () => {
                setCameraActive(false);
            };
        }, [])
    );

    if (!hasPermission) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (!hasPermission.granted) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No access to camera</Text>
                <Button title="Allow Camera" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <View className="flex-1 py-8">
            <Navbar title='Connect' />
            {cameraActive && (
                <CameraView
                    className="flex-1"
                    onBarcodeScanned={handleScan}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'ean13', 'code128'],
                    }}
                >
                    <View className='h-screen items-center text-white justify-end '>
                        <Text className='text-xl mb-52 text-white font-bold'>Scann any Y.E.S Badge to connect</Text>
                    </View>
                </CameraView>
            )}
        </View>
    );
};

export default ScanScreen;
