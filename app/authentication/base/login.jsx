import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

import { COLORS, useFonts } from "../../../constant";
import MessagePrompt from "../../../components/prompt/MessagePrompt";
import { Image } from "expo-image";

const NOTIFICATION_TASK = 'notification-task'

TaskManager.defineTask(NOTIFICATION_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Error in background task:', error)
        return
    }
  
    if (data) {
        const { content } = data
  
        await Notifications.scheduleNotificationAsync({
            content: {
                ...content,
                sound: 'default', 
            },
            trigger: null,
            ios: {
                sound: true,
                badge: 1, 
            },
            android: {
                sound: true,
                vibrate: true,
                priority: 'high',
            },
        })
    }
})

export default function LogInPage ({ navigation }) {
    const [fontsLoaded] = useFonts()
    const [isMessage, setMessage] = useState(false)
    const [showMessagePrompt, setShowMessagePrompt] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setShowPassword] = useState(false)

    const paddingIOS = Platform.OS === 'ios'

    const scheduleNotificationInBackground = async () => {
        const notificationTime = moment('2023-12-07 22:00', 'YYYY-MM-DD HH:mm')

        const secondsUntilNotification = notificationTime.diff(moment(), 'seconds')

        console.log(secondsUntilNotification)
        if (secondsUntilNotification > 0) {        
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'ALERT MESSAGE FOR YOU, ALEX',
                    body: 'OPEN THIS MESSAGE!',
                },
                trigger: {
                    seconds: secondsUntilNotification,
                    channelId: 'default', 
                },
            })
        } else { }

        if (secondsUntilNotification < 0) { setMessage(true) } else { setMessage(false) }
    }

    useEffect(() => {
        const setupNotifications = async () => {
            const { status } = await Notifications.requestPermissionsAsync()

            if (status !== 'granted') {
                console.error('Notification permission not granted')
                return
            }

            await Notifications.setNotificationChannelAsync('default', {
                name: 'Default',
                importance: Notifications.AndroidImportance.DEFAULT,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            })

            scheduleNotificationInBackground()
        }

        setupNotifications()
    }, [])

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
            </View>
        )
    }

    const toggleShowPassword = () => {
        setShowPassword(!isShowPassword)
    }
    
    const alertHandle = () => {
        setMessage(false)
        setShowMessagePrompt(true)
    }

    const onClose = () => {
        setShowMessagePrompt(false)
    }

    return (
        <>
            { isMessage == true && (
                Alert.alert(
                    'MESSAGE FOR YOU',
                    'Message for you',
                    [
                        {text: 'OKAYYY', onPress: () => alertHandle()},
                        {text: 'OKAY', onPress: () => alertHandle()},
                    ]
                )
            )}

            { showMessagePrompt && <MessagePrompt onClose={onClose} /> }

            <View style={{ flex: 1, backgroundColor: COLORS.clearWhite }}>
                <View style={styles.container}>
                    <StatusBar style='dark' />

                    <View style={styles.inputContainer}>
                        <Image
                            source={require('../../../assets/logoword.png')}
                            style={styles.logo}
                            onLoadStart={() => (
                                <ActivityIndicator size={'large'} />
                            )}
                            contentFit="contain"
                        />

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.textInput(paddingIOS)}
                                onChangeText={(text) => setUsername(text)}
                                value={username}
                                placeholder="Username"
                                placeholderTextColor={COLORS.tr_gray}
                            />
                        </View>

                        <View style={[styles.inputWrapper, { marginHorizontal: 10 }]}>
                            <TextInput
                                style={styles.textInput(paddingIOS)}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry={!isShowPassword}
                                placeholder="Password"
                                placeholderTextColor={COLORS.tr_gray}
                            />

                            <Entypo 
                                name={isShowPassword ? 'eye' : 'eye-with-line'} 
                                size={24} color={COLORS.darkGray} 
                                onPress={toggleShowPassword}
                                />
                        </View>

                        <TouchableOpacity
                            style={styles.forgotBtn}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.loginBtn}
                            onPress={() => navigation.navigate('TabStack', { screen: 'Home' })}
                        >
                            <Text style={styles.loginText}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.textFooter(paddingIOS)}>Powered by{'\n'}Intellismart Technology Inc.</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    logo: {
        width: 230, height: 100,
        marginBottom: 20,
    },

    inputContainer: {
        margin: 10,
        padding: 20,
        flex: 1,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 30,
        marginBottom: 15,

        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    textInput: (paddingIOS) => ({
        width: '100%',
        fontFamily: 'Inter_400Regular',
        paddingVertical: paddingIOS ? 10 : 0, 
        color: COLORS.darkGray
    }),

    loginBtn: {
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        alignSelf: 'center',
        width: 160,
        padding: 15,
        borderRadius: 50,
        marginTop: 70,

        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    loginText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        fontFamily: 'Inter_800ExtraBold'
    },

    forgotBtn: {
        alignSelf: 'center',
    },

    forgotText: {
        fontFamily: 'Inter_400Regular'
    },

    textFooter: (paddingIOS) => ({
        textAlign: 'center',
        color: COLORS.darkGray,
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        marginTop: 30,
        marginBottom: paddingIOS ? 30 : 10,
    })
})