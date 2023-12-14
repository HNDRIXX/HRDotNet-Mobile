// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useRef, Validator } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, useFonts, STYLES} from "../../../constant";
import { Account } from "../../../constant/array/Account";

export default function LogInPage ({ navigation }) {
    const [fontsLoaded] = useFonts()
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setShowPassword] = useState(false)

    const styles = STYLES.LogIn

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
            </View>
        )
    }

    const toggleShowPassword = () => { setShowPassword(!isShowPassword) }
    
    const onHandleLogIn = () => {
        // const user = Account.find(account => account.userName === userName && account.password === password)
        const user = Account.find(account => account.userName === 'MGL01' && account.password === 'sql123')

        if (user) {
            const userData = {
                id: user.id,
                accNumber: user.accNumber,
                role: user.role,
                name: user.name,
                position: user.position,
                company: user.company,
                branch: user.branch,
                division: user.division,
                department: user.department,
                section: user.section,
                phoneNumber: user.phoneNumber,
                emailAddress: user.emailAddress,
                uri: user.uri
            }
        
            const jsonData = JSON.stringify(userData)
        
            AsyncStorage.setItem('userAcc', jsonData)
                .then(() => {
                    setUsername('')
                    setPassword('')

                    navigation.navigate('TabStack', { screen: 'UserHome' })
                })
                .catch((error) => {
                    // console.error('Error saving data:', error)
                })
        } else { alert('Invalid username or password') }
    }

    return (
        <>
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

                        <TouchableOpacity
                            style={styles.forgotBtn}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.loginBtn}
                            onPress={onHandleLogIn}
                        >
                            <Text style={styles.loginText}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.textFooter}>Powered by{'\n'}Intellismart Technology Inc.</Text>
            </View>
        </>
    )
}
