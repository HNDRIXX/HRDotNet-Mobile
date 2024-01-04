// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useRef, Validator } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity, ActivityIndicator, Platform, Alert, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import GifImage from '@lowkey/react-native-gif';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, useFonts, STYLES} from "../../../constant";
import { Account } from "../../../constant/array/Account";
import Configuration from "../../../components/modal/Configuration";
import Loader from "../../../components/loader/Loader";

export default function LogInPage ({ navigation }) {
    const styles = STYLES.LogIn
    const [fontsLoaded] = useFonts()
    const [conn, setConn] = useState(null)
    const [port, setPort] = useState(null)
    const [userName, setUsername] = useState('MGL6998')
    const [password, setPassword] = useState('sql123$%^')
    const [isShowPassword, setShowPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [isModal, setModal] = useState(false)

    const toggleShowPassword = () => { setShowPassword(!isShowPassword) }

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
            </View>
        )
    }

    const toggleModal = () => {
        setModal(!isModal)
    }

    const onConnHandle = async () => {

        conn !== null && await AsyncStorage.setItem('conn', conn) 
        port !== null && await AsyncStorage.setItem('port', port)

        alert('Configuration Saved')
        setConn(null)
        setPort(null)
        setModal(!isModal)
    }
    
    const onHandleLogIn = async () => {
        try {
            Keyboard.dismiss()
            setShowPassword(false)
            
            const connValue = await AsyncStorage.getItem('conn')
            const portValue = await AsyncStorage.getItem('port')

            if (connValue === null && portValue === null) {
                setModal(!isModal)
                return
            }

            setLoading(true)

            const setPortValue = portValue !== null ? ':' + portValue : ''
      
            const response = await fetch(`http://${connValue}${setPortValue}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ username: userName, password: password }),
            })

            const data = await response.json()
        
            if (response.ok) {
                setUsername('')
                setLoading(false)

                navigation.navigate('TabStack', { screen: 'Home', params: { user: data } })
            } else { 
                setLoading(false) 
                alert(data.message) 
            }
        } catch (error) { console.error(error) }
    }
      
    return (
        <>
            {isLoading ? (<Loader />) : (
                <>
                    <View style={{ flex: 1, backgroundColor: COLORS.clearWhite }}>
                        <View style={styles.container}>
                            <StatusBar style='dark' />

                            <TouchableOpacity
                                style={{ position: 'absolute', right: 20, top: 40 }}
                                onPress={toggleModal}
                            >
                                <FontAwesome name="cogs" size={24} color={COLORS.darkGray} />
                            </TouchableOpacity>

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
                                        style={styles.textInput}
                                        onChangeText={(text) => setUsername(text)}
                                        value={userName}
                                        placeholder="Username"
                                        placeholderTextColor={COLORS.tr_gray}
                                    />
                                </View>

                                <View style={[styles.inputWrapper, { marginHorizontal: 10 }]}>
                                    <TextInput
                                        style={styles.textInput}
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

                                {/* <TouchableOpacity
                                    style={styles.forgotBtn}
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                >
                                    <Text style={styles.forgotText}>Forgot Password?</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity 
                                    style={styles.loginBtn}
                                    onPress={() => onHandleLogIn()}
                                >
                                    <Text style={styles.loginText}>LOG IN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.textFooter}>Powered by{'\n'}Intellismart Technology Inc.</Text>
                    </View>

                    <Configuration 
                        toggleModal={toggleModal}
                        setConn={setConn}
                        isModal={isModal}
                        port={port}
                        setPort={setPort}
                        conn={conn}
                        onConnHandle={onConnHandle}
                    />
                </>
            )}
        </>
    )
}
