import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import StyledText from 'react-native-styled-text';

import { COLORS } from '../../constant';

export default function LocationPrompt ({ permissionLocation, navigation }) {
    return (
        <View style={styles.locWrapper}>
            <View style={styles.locationPrompt}>
                <View style={styles.locationPromptWrapper}>
                    <Image 
                        source={require('../../assets/icons/maps.png')}
                        style={{ width: 60, height: 60 }}
                    />
                    <Text style={styles.promptText}>Enable Location Service</Text>
                </View>

                <StyledText 
                    style={styles.subPromptText}
                    textStyles={textStyles}
                >{"This app needs <b>access to your location</b> to enable the clock-in and clock out feature"}</StyledText>

                <View style={styles.rowView}>
                    <TouchableOpacity 
                        style={[styles.locationPromptBtn]} 
                        onPress={() => navigation.goBack()} >
                        <Text style={[styles.locationPromptBtnText, { color: COLORS.orange }]}>DON'T ALLOW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.locationPromptBtn, styles.allowButton]} 
                        onPress={permissionLocation}>
                        <Text style={styles.locationPromptBtnText}>ALLOW</Text>
                    </TouchableOpacity>
               </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locWrapper: {
        flex: 1,
        zIndex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tr_gray,
    },

    locationPromptWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    locationPrompt: {
        backgroundColor: COLORS.clearWhite,
        elevation: 9,
        marginHorizontal: 20,
        borderRadius: 20, 
        padding: 20,
        paddingVertical: 30,

        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4, 
        shadowRadius: 3, 
    },

    promptText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
    },

    subPromptText: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginVertical: 20,
    },  

    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
  
    locationPromptBtn: {
        alignItems: 'center',
        padding: 5,
        width: '45%',
        borderRadius: 20,

        borderWidth: 1.5,
        borderColor: COLORS.orange,
    },

    locationPromptBtnText: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
    },

    allowButton: {
        backgroundColor: COLORS.orange,
    }
})

const textStyles = StyleSheet.create({
    b: {
      fontFamily: 'Inter_600SemiBold'
    }
})