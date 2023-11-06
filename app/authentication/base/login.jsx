import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

import { COLORS, useFonts } from "../../../constant";
import { Image } from "expo-image";

export default function LogInPage ({ navigation }) {
    const [fontsLoaded] = useFonts()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if(!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />                
            </View> 
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            <View style={styles.inputContainer}>
                <Image
                    source={require('../../../assets/logoword.png')}
                    style={styles.logo}
                    contentFit="contain"
                />

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholder="Username"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor={COLORS.tr_gray}
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

                <Text style={styles.textFooter}>Powered by{'\n'}Intellismart Technology Inc.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
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

    textInput: {
        width: '100%',
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray
    },

    loginBtn: {
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        alignSelf: 'center',
        width: 160,
        padding: 15,
        borderRadius: 50,
        marginTop: 100,

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

    textFooter: {
        textAlign: 'center',
        position: 'absolute',
        color: COLORS.darkGray,
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        bottom: 30
    }
})