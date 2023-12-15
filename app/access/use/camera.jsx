// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, BackHandler } from "react-native";
import { Camera } from 'expo-camera';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';

import { Ionicons,  } from '@expo/vector-icons';

import { COLORS, COMPONENT_STYLES, DateTimeUtils } from '../../../constant';
import PageHeader from '../../../components/header/PagesHeader';

export default function CameraAccess ({ navigation }) {
    const styles = COMPONENT_STYLES.Camera
    const route = useRoute()

    const [isBase, setBase] = useState(null)
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [userImage, setUserImage] = useState(null)
    const [imgPath, setImgPath] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {( async () => {     
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === 'granted')

        status != 'granted' && Linking.openSettings() 
    })}, [])

    const takePicture = async () => {
        if( cameraRef ) {
            const photo = await cameraRef.takePictureAsync()

            const newUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
            await FileSystem.copyAsync({
                from: photo.uri,
                to: newUri,
            })

            const base64Image = await convertImageToBase64(newUri)
            
            setUserImage(photo.uri)
            setBase(base64Image)
            setImgPath(photo.uri)
        }
    }

    const convertImageToBase64 = async (imageUri) => {
        const imageBase64Data = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        })
    
        return imageBase64Data
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        })
      
        if (!result.canceled) {
            const selectedAsset = result.assets[0]
            setUserImage(selectedAsset.uri)
            
            const img = selectedAsset.uri.replace(/\//g, '^')
            setImgPath(img)
            setIsLoading(true)
        }
    }

    const onRequestHandle = () => {
        const navigateToScreen = (screenName) => {
            navigation.navigate(screenName, {
                image: {
                    uri: encodeURIComponent(imgPath),
                    time: DateTimeUtils.momentCurrTime(),
                    date: DateTimeUtils.momentCurrDateFormat(),
                },
            })
        }
      
        switch (route.params?.onPanel) {
            case 0:
                navigateToScreen('COSRequest')
                break
        
            case 1:
                navigateToScreen('OBRequest')
                break
        
            case 2:
                navigateToScreen('OTRequest')
                break
        
            case 3:
                navigateToScreen('OSRequest')
                break
        
            case 4:
                navigateToScreen('LVRequest')
                break
        
            case 5:
                navigateToScreen('MLRequest')
                break
        
            default:
                break
        }
    }      

    return (
        <>
            { imgPath !== '' ? (
                <View style={styles.previewView}>
                    <PageHeader pageName={"Image Preview"} />

                    {isLoading && ( <ActivityIndicator size={'large'} /> )}
                    
                    <Image
                        source={{ uri: userImage }}
                        style={{ height: '65%', margin: 20 }}
                        contentFit="contain"
                        onLoadEnd={() => setIsLoading(false)}
                    />

                    <View style={styles.btnWrapper}>
                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => setImgPath('')}
                        >
                            <Text style={[styles.text, { color: COLORS.red }]}>DELETE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.doneBtn}
                            onPress={onRequestHandle}
                        >
                            <Text style={styles.text}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <PageHeader pageName="Camera" />
                    
                    <Camera 
                        style={{ flex: 1 }} 
                        type={type}
                        autoFocus
                        ref={(ref) => { cameraRef = ref }}   
                    >
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={pickImage}
                            >
                                <Ionicons 
                                    name="ios-images" 
                                    size={35} 
                                    color={COLORS.clearWhite}
                                />   
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.button}
                                onPress={takePicture}
                            >
                                <Image
                                    source={require('../../../assets/icons/shutter.png')}
                                    style={{ width: 100, height: 100 }}
                                    contentFit="contain"
                                    onLoadEnd={() => setIsLoading(false)}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                                    )
                                }}
                            >
                                <Ionicons 
                                    name="ios-camera-reverse" 
                                    size={40} 
                                    color={COLORS.clearWhite}
                                />   
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </>
            )}
        </>
    )
}