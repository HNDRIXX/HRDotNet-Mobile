import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons/build/Icons';

import { COLORS, STYLES } from '../../../constant';
import SuccessPromptPage from '../../../components/prompt/SuccessPrompt';

export default function ForgotPasswordPage ({ navigation }) {
    const [email, setEmail] = useState('')
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)

    const styles = STYLES.ForgotPassword

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
                        style={styles.textInput}
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