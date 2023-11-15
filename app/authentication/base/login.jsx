import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";

import { COLORS, useFonts } from "../../../constant";
import { Image } from "expo-image";

export default function LogInPage ({ navigation }) {
    const [fontsLoaded] = useFonts()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setShowPassword] = useState(false)

    const paddingIOS = Platform.OS === "ios" 

    if(!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />                
            </View> 
        )
    }

    const toggleShowPassword = () => { 
        setShowPassword(!isShowPassword)
    }

    return (
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