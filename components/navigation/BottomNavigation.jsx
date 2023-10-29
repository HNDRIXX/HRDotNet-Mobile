import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import { COLORS } from '../../constant'
import { Shadow } from 'react-native-shadow-2';

export default function BottomNavigation () {
    const navigation = useNavigation()
    const [screen, setScreen] = useState('HomeScreen')
    
    const handleButtonPressed = (screenName) => () => {
        setScreen(screenName);
        navigation.navigate(screenName)
    }

    return (
        <Shadow distance={5} style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPressed('HomeScreen')}>
                    <Ionicons 
                        name={ screen == 'HomeScreen' ? 'md-home' : 'md-home-outline' }
                        size={24} 
                        color={ screen == 'HomeScreen' ? COLORS.orange : COLORS.tr_gray } />

                    <Text style={[styles.textButton, screen == 'HomeScreen' && styles.active ]}>
                        Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPressed('CalendarScreen')}>
                     <Ionicons 
                        name={ screen == 'CalendarScreen' ? 'md-calendar' : 'md-calendar-outline' }
                        size={24} 
                        color={ screen == 'CalendarScreen' ? COLORS.orange : COLORS.tr_gray } />

                    <Text style={[styles.textButton, screen == 'CalendarScreen' && styles.active ]}>
                        Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPressed('RequestScreen')}>
                    <Ionicons 
                        name={ screen == 'RequestScreen' ? 'folder-open' : 'folder-open-outline' }
                        size={24} 
                        color={ screen == 'RequestScreen' ? COLORS.orange : COLORS.tr_gray } />

                    <Text style={[styles.textButton, screen == 'RequestScreen' && styles.active ]}>
                        Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPressed('ProfileScreen')}>
                    <Ionicons 
                        name={ screen == 'ProfileScreen' ? 'person-circle' : 'person-circle-outline' }
                        size={26} 
                        color={ screen == 'ProfileScreen' ? COLORS.orange : COLORS.tr_gray } />

                    <Text style={[styles.textButton, screen == 'ProfileScreen' && styles.active ]}>
                        Profile</Text>
            </TouchableOpacity>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.clearWhite,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },

    button: {
        margin: 10,
        alignItems: 'center',
    },

    textButton: {
        color: COLORS.tr_gray,
        fontSize: 12,
        fontFamily: 'Inter_500Medium'
    },
    
    active: {
        color: COLORS.orange,
    },
})