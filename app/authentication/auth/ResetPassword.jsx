// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import { COLORS, STYLES } from "../../../constant";
import SuccessPromptPage from "../../../components/prompt/SuccessPrompt";

export default function ResetPasswordPage ({ navigation }) {
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)

    const styles = STYLES.ResetPassword

    const openCustomAlert = () => {
        setIsSuccessAlertVisible(true)
    }

    const closeCustomAlert = () => {
        setIsSuccessAlertVisible(false)
        navigation.navigate('LogIn')
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