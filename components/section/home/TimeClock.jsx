// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { COLORS, COMPONENT_STYLES, DateTimeUtils } from '../../../constant';

export default function TimeClock ({ clockedValue, clockedStatus, clockedDate, clockedTime }) {
    const styles = COMPONENT_STYLES.TimeClock
    const navigation = useNavigation()
    const dateToday = moment().format('MMMM DD, YYYY')

    const [time, setTime] = useState(moment())

    useEffect(() => {
        const timer = setInterval(() => setTime(moment()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formattedClocked = moment(clockedDate, 'MMMM DD, YYYY, dddd').format('MMMM DD, YYYY')

    return (
        <View style={styles.topBox}>
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