import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { router } from 'expo-router'

import { COLORS } from "../../../constant";
import SuccessPromptPage from "../../../components/prompt/SuccessPrompt";

export default function ResetPasswordPage () {
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)

    const openCustomAlert = () => {
        setIsSuccessAlertVisible(true)
    }

    const closeCustomAlert = () => {
        setIsSuccessAlertVisible(false)

        router.push(`/authentication/base/login`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.resetPassText}>Reset Password</Text>
                <Text style={styles.subText}>Enter your new password.</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                        placeholder="New Password"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        placeholder="Confirm New Password"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={openCustomAlert}
                >
                    <Text style={styles.textBtn}>UPDATE</Text>
                </TouchableOpacity>
            </View>

            <SuccessPromptPage
                title={"Password Change!"}
                subTitle={"You have successfully change your password."}
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrapper: {
        alignItems: 'center',
        margin: 40,
    },

    resetPassText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
    },

    subText: {
        fontFamily: 'Inter_400Regular',
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 30,
        marginTop: 20,

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

    updateBtn: {
        backgroundColor: COLORS.orange,
        padding: 15,
        width: 150,
        marginTop: 30,
        borderRadius: 30,
    },

    textBtn: {
        textAlign: 'center',
        fontFamily: 'Inter_800ExtraBold',
        color: COLORS.clearWhite,
    }
    
})