import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';
import {  Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { COLORS, DateTimeUtils } from '../../../constant';

export default function TimeClock ({ clockedValue, clockedStatus, clockedDate, clockedTime }) {
    const [time, setTime] = useState(moment())

    const navigation = useNavigation()
    const dateToday = moment().format('MMMM DD, YYYY')

    useEffect(() => {
        const timer = setInterval(() => setTime(moment()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formattedClocked = moment(clockedDate, 'MMMM DD, YYYY, dddd').format('MMMM DD, YYYY')

    return (
        <View style={styles.topBox}>
            {/* <Image 
                source={require('../../../assets/icons/hat.png')}
                style={{ width: 67, height: 60, position: 'absolute', right: -22, top: -25, 
                    transform: [{ rotate: '30deg'}],
                }}
            />

            <Image 
                source={require('../../../assets/icons/alpine.png')}
                contentFit='fill'
                style={{ width: 100, height: 25, position: 'absolute', top: -8, left: 5 }}
            /> */}
            
            <View style={styles.wrapperBox}>
                <Text style={styles.dateText}>{DateTimeUtils.momentCurrDateWithExtra()}</Text>
                <Text style={styles.timeText}>{time.format('h:mm:ss A')}</Text>
                
                <Text style={styles.clockInOutText}>
                    {clockedStatus ? `${clockedStatus}: ${dateToday === formattedClocked ? "Today" : formattedClocked} at ${clockedTime}` : `Clocked: ${dateToday}`}
                </Text>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() =>
                        navigation.navigate('ClockInOut', {
                            clockedValue: clockedValue
                        })
                    }
                >
                    <Shadow distance={3} style={clockedValue === 0 ? styles.clockOutButton : styles.clockInButton}>
                        <Ionicons
                            name='stopwatch'
                            size={clockedValue === 0 ? 25 : 23}
                            color={COLORS.clearWhite}
                        />

                        <Text style={styles.timeInOutText}>
                            {clockedValue === 0 ? 'Clock-Out' : 'Clock-In'}
                        </Text>
                    </Shadow>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        backgroundColor: COLORS.clearWhite,
        paddingVertical: 20,
        width: '87%',
        marginTop: -45,
        marginBottom: 5,
        borderRadius: 20,
        borderColor: COLORS.orange,
        borderWidth: 1.5,
    },
    
    linkButton: {
        alignSelf: 'center',
        marginTop: 10,
    },

    clockInButton: {
        backgroundColor: COLORS.orange,
        width: 170,
        borderRadius: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    clockOutButton: {
        backgroundColor: COLORS.powderBlue,
        width: 170,
        borderRadius: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    timeInOutText: {
        fontSize: 18,
        marginLeft: 5,
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
    },

    timeText: {
        fontFamily: 'Inter_700Bold', 
        fontSize: 25,
        textAlign: 'center',
        color: COLORS.black,
    },

    dateText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.black,
        textAlign: 'center',
        fontSize: 13,
    },

    clockInOutText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        fontSize: 13,
        textAlign: 'center'
    }
})