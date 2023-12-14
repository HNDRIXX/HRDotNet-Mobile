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

import { COLORS, DateTimeUtils } from '../../../constant';
import PageHeader from '../../../components/header/PagesHeader';

export default function CameraAccess ({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [userImage, setUserImage] = useState("")
    const [imgPath, setImgPath] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const [isBase, setBase] = useState(null)

    const route = useRoute()

    useEffect(() => {
        (async () => {     
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')

            if(status != 'granted'){ Linking.openSettings() }
        })()
    }, [])

    const takePicture = async () => {
        if(cameraRef) {
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
        switch ( route.params?.onPanel ) {
            case 0:
                navigation.navigate('COSRequest', {
                    image: {
                        uri: encodeURIComponent(imgPath),
                        time: DateTimeUtils.momentCurrTime(),
                        date: DateTimeUtils.momentCurrDateFormat()
                    }
                })
                break
            
            case 1:
                navigation.navigate('OBRequest', { 
                    image: {
                        uri: encodeURIComponent(imgPath),
                        time: DateTimeUtils.momentCurrTime(),
                        date: DateTimeUtils.momentCurrDateFormat()
                    }
                })
                break
            
            case 2: 
                navigation.navigate('OTRequest', { 
                    image: {
                        uri: encodeURIComponent(imgPath),
                        time: DateTimeUtils.momentCurrTime(),
                        date: DateTimeUtils.momentCurrDateFormat()
                    }
                }) 
                break
            
            case 3:
                navigation.navigate('OSRequest', { 
                    image: {
                        uri: encodeURIComponent(imgPath),
                        time: DateTimeUtils.momentCurrTime(),
                        date: DateTimeUtils.momentCurrDateFormat()
                    }
                })
                break

            case 4:
                navigation.navigate('LVRequest', { 
                    image: {
                        uri: encodeURIComponent(imgPath),
                        time: DateTimeUtils.momentCurrTime(),
                        date: DateTimeUtils.momentCurrDateFormat()
                    }
                })
                break
            
            case 5:
                navigation.navigate('MLRequest', { 
                    image: {
                        uri: encodeURIComponent(imgPath),
                        time: DateTimeUtils.momentCurrTime(),
                        date: DateTimeUtils.momentCurrDateFormat()
                    }
                })
                break

            default:
                alert("No onPanel found")
                break
        }
    }

    return (
        <>
            { imgPath !== '' ? (
                <View style={styles.previewView}>
                    <PageHeader pageName={"Image Preview"} />

                    {isLoading && (
                        <ActivityIndicator size={'large'} />
                    )}
                    
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
                        ref={(ref) => {
                            cameraRef = ref
                        }}   
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    topHeader: {
        padding: 20,
        paddingTop: 45,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: COLORS.powderBlue,
    },

    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
    },

    camera: {
        flex: 1,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.black,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 30,
    },

    button: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        verticalAlign: 'middle',
    },

    text: {
        fontSize: 16,
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        padding: 6,
    },

    previewView: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    btnWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },

    doneBtn: {
        width: 170,
        margin: 10,
        backgroundColor: COLORS.green,
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderRadius: 50,
    },

    deleteBtn: {
        width: 170,
        margin: 10,
        borderColor: COLORS.red,
        borderWidth: 2,
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderRadius: 50,
    },

    textBtn: {
        width: 200,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
        fontSize: 17,
    },
})