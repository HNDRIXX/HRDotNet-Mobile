import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { MaterialIcons, AntDesign } from '@expo/vector-icons/build/Icons';

import { COLORS } from '../../../constant';
import SuccessPromptPage from '../../../components/prompt/SuccessPrompt';

export default function ForgotPasswordPage ({ navigation }) {
    const [email, setEmail] = useState('')
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)

    const paddingIOS = Platform.OS === "ios" 

    const openCustomAlert = () => {
        setIsSuccessAlertVisible(true)
    }

    const closeCustomAlert = () => {
        setIsSuccessAlertVisible(false)
        navigation.navigate('LogIn')
    }

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
                <AntDesign 
                    name='arrowleft' 
                    size={28} 
                    color={COLORS.orange} 
                />
            </TouchableOpacity>
            
            <View style={styles.wrapper}>
                <Text style={styles.forgotText}>Forgot Password</Text>
                <Text style={styles.subText}>Please enter your email below.</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput(paddingIOS)}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email Address"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={openCustomAlert}
                    >
                        <Text style={styles.textBtn}>SEND PASSWORD</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.buttonOutline]}
                        onPress={() => navigation.navigate('LogIn')}
                    >
                        <Text style={[styles.textBtn, styles.textOutline]}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SuccessPromptPage
                title={"Password Sent!"}
                subTitle={"The password has been sent to the email address you provided"}
                buttonText={"OKAY"}
                visible={isSuccessAlertVisible} 
                onClose={closeCustomAlert} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    backBtn: {
        width: 60,
        height: 60,
        alignItems: 'center',
        marginTop: 60,
    },

    wrapper: {
        flex: 1,
        margin: 30,
        marginTop: 0,
        justifyContent: 'center',
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 30,
        marginTop: 50,

        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    textInput:  (paddingIOS) => ({
        width: '100%',
        padding: 10,
        paddingVertical: paddingIOS ? 10 : 0, 
        fontFamily: 'Inter_400Regular'
    }),

    forgotText: {
        fontFamily: 'Inter_700Bold',
        textAlign: 'center',
        fontSize: 26,
    },

    subText: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    }, 
    
    buttonView: {
        marginTop: 100,
    },

    button: {
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        width: 170,
        padding: 10,
        borderRadius: 30,
    },

    textBtn: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
    },

    buttonOutline: {
        backgroundColor: COLORS.clearWhite,
        borderWidth: 2,
        borderColor: COLORS.orange,
    },

    textOutline: {
        color: COLORS.orange
    }
})