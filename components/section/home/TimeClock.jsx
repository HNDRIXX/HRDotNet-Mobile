import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import moment from 'moment';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constant';

export default function TimeClock ({ clockedValue, clockedStatus, clockedDate, clockedTime }) {
    const [currTime, setCurrTime] = useState(new Date())
    const [time, setTime] = useState(moment())

    const navigation = useNavigation()


    useEffect(() => {
        const timer = setInterval(() => setTime(moment()), 1000);
        return () => clearInterval(timer);
      }, []);

    const currentDate = moment().format('MMMM D, YYYY, dddd')

    const formattedClocked = moment(clockedDate, 'LL, dddd').format('MMMM DD')

    return (
        <View style={styles.topBox}>
            <View style={styles.wrapperBox}>
                <Text style={styles.dateText}>{currentDate}</Text>
                <Text style={styles.timeText}>{time.format('h:mm:ss A')}</Text>

                {/* Clocked Out: September 18 at 6:18:00 PM */}
                <Text style={styles.clockInOutText}>
                    {/* { clockedStatus }
                    { clockedDate != undefined && ( " : " + formattedClocked) }
                    { clockedTime != undefined && (" at " + clockedTime)} */}
                    Clocked Out: September 18 at 6:18:00 PM
                </Text>

                { clockedValue == 0 ? (
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => 
                            navigation.navigate('ClockInOut', {
                                clockedValue: clockedValue
                            })
                        }
                    >
                        <View style={styles.clockOutButton}>
                            <Ionicons
                                name='stopwatch'
                                size={25}
                                color={COLORS.clearWhite}
                            />

                            <Text style={styles.timeInOutText}>Clock-Out</Text>
                        </View>
                    </TouchableOpacity>
                ) :  (
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => 
                            navigation.navigate('ClockInOut', {
                                clockedValue: clockedValue
                            })
                        }
                    >
                        <View style={styles.clockInButton}>
                            <Ionicons
                                name='stopwatch'
                                size={23}
                                color={COLORS.clearWhite}
                                allo
                            />

                            <Text style={styles.timeInOutText}>Clock-In</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        backgroundColor: COLORS.clearWhite,
        paddingVertical: 15,
        paddingHorizontal: 50,
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
        elevation: 2,
    },

    clockOutButton: {
        backgroundColor: COLORS.powderBlue,
        width: 170,
        borderRadius: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 2,
    },

    timeInOutText: {
        fontSize: 17,
        marginLeft: 5,
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
    },

    timeText: {
        fontFamily: 'Inter_700Bold', 
        fontSize: 23,
        textAlign: 'center',
        color: COLORS.black,
    },

    dateText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.black,
        textAlign: 'center',
        fontSize: 12,
    },

    clockInOutText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        fontSize: 12,
        textAlign: 'center'
    }
})