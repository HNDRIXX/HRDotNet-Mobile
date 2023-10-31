import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { MaterialIcons, AntDesign } from '@expo/vector-icons/build/Icons';

import { COLORS } from '../../../constant';

export default function ForgotPasswordPage ({ navigation }) {
    const [email, setEmail] = useState('')

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
                        placeholder="Email"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.sendCodeBtn}
                    onPress={() => navigation.navigate('VerifyCode')}
                >
                    <Text style={styles.textBtn}>SEND CODE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    textInput: {
        width: '100%',
        fontFamily: 'Inter_400Regular'
    },

    forgotText: {
        fontFamily: 'Inter_700Bold',
        textAlign: 'center',
        color: COLORS.darkGray,
        fontSize: 26,
    },

    subText: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray
    },  

    sendCodeBtn: {
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        alignSelf: 'center',
        width: 170,
        marginTop: 100,
        padding: 15,
        borderRadius: 30,
    },

    textBtn: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
    }
})