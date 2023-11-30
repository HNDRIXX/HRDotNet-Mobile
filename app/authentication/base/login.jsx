import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";

import { COLORS, useFonts, STYLES} from "../../../constant";
import { Account } from "../../../constant/array/Account";
import { Image } from "expo-image";

export default function LogInPage ({ navigation }) {
    const [fontsLoaded] = useFonts()
    const [userName, setUserName] = useState('')
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

    const toggleShowPassword = () => {
        setShowPassword(!isShowPassword)
    }
    
    const onHandleLogIn = () => {
        navigation.navigate('TabStack', { screen: 'UserHome' })
        // const user = Account.find(account => account.userName === userName && account.password === password)
        // const acc = Account.find(account => account.role)

        // if (user) {
        //     if (acc.role == "web-user") {
        //     } 

        //     setUserName('')
        //     setPassword('')
        // } else {
        //     alert('Invalid username or password')
        // }
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
                                onChangeText={(text) => setUserName(text)}
                                
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
