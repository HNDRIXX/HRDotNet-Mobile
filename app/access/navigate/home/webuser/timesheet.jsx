import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { Agenda } from 'react-native-calendars'
import { Calendar } from 'react-native-big-calendar'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import DashedLine from 'react-native-dashed-line'

import { COLORS } from '../../../../../constant'
import CalendarNote from '../../../../../components/note/CalendarNote'

export default function TimeSheetPage ({ navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    
    const [month, setMonth] = useState('October')
    const [year, setYear] = useState('2023')

    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)

    const items = {
        '2023-10-10': [
            { time: '10:10:08 AM', location: '12 Cataduanes St. Quezon City' },
            { time: '06:01:02 PM', location: '12 Cataduanes St. Quezon City' }],
        
        '2023-10-11': [
            { time: '07:49:01 AM', location: '12 Cataduanes St. Quezon City' },
            { time: '06:20:05 PM', location: '12 Cataduanes St. Quezon City' }],
        
        '2023-10-12': [
            { time: '07:31:01 AM', location: '12 Cataduanes St. Quezon City' },
            { time: '08:31:01 PM', location: '12 Cataduanes St. Quezon City' }],
        
        '2023-10-13': [
            { time: '07:21:19 AM', location: '12 Cataduanes St. Quezon City' },
            { time: null, location: null }],
    }
    
    const currentDate = new Date()
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
    const currentYear = currentDate.getFullYear()

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const dayPress = (day) => {
        setSelectedDate(day.dateString);
        setEvents(items[day.dateString] || []);
    
        // Convert the selected date string to a JavaScript Date object
        const selectedDateObj = new Date(day.dateString);
        
        // Get the month and year
        const month = selectedDateObj.toLocaleString('default', { month: 'long' });
        const year = selectedDateObj.getFullYear();
    
        setMonth(month)
        setYear(year)
    }    
    
    return (
        <View style={styles.container}>
            { isLoading ? ( <ActivityIndicator size='large' color={COLORS.orange} style={styles.loading}/> ) : (
                <>
                    <View style={styles.topHeader}>
                        <TouchableOpacity 
                            style={styles.backButton} 
                            onPress={() => navigation.navigate('Home')}
                        >
                            <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                        </TouchableOpacity>

                        <Text style={styles.textHeader}>Timesheet</Text>
                    </View>

                    <View style={styles.agendaCalendar}>
                        <Text style={styles.monthYearText}>{month} {year}</Text>
                        <Agenda
                            items={items}
                            onDayPress={dayPress}
                            showOnlySelectedDayItem

                            renderList={() => (
                                <View style={styles.agendaItem}>
                                    {selectedDate == null && (
                                        <CalendarNote />
                                    )}
                                    
                                    {selectedDate && events && events.length === 0 ? (
                                        <Text style={styles.noEventsText}>No events to display</Text>
                                    ) : (
                                        events && events.map((event, index) => (
                                            <View
                                                key={ index }
                                                style={ index === 3 ? { paddingBottom: 500 } : {}}
                                            >
                                                <Text style={styles.clockInOutText}>
                                                    { index === 0 ? "Clock-in : "
                                                    : index === 1 ? "Clock-out :" : null}
                                                </Text>

                                                <View style={styles.itemContainer}>
                                                    <FontAwesome 
                                                        name={ 
                                                            index === 1 ? "sign-in" : 
                                                            index === 0 ? "sign-out" : null
                                                        }
                                                        size={34} 
                                                        color={
                                                            index === 1 ? COLORS.orange : 
                                                            index === 0 ? COLORS.powderBlue : null
                                                        }
                                                        style={{ paddingRight: 20 }}
                                                    />

                                                    <View style={styles.item}>
                                                        {!event.time && !event.location ? 
                                                            ( 
                                                                <DashedLine 
                                                                    dashLength={5}
                                                                    dashColor={COLORS.darkGray}
                                                                    dashGap={2}
                                                                    dashThickness={2}
                                                                    style={{ width: 130, }}
                                                                />
                                                            )
                                                        : (
                                                            <>
                                                                <Text style={styles.itemText}>{event.time}</Text>
                                                                <Text style={styles.itemLoc}>{event.location}</Text>
                                                            </>
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                    )}
                                </View>
                            )}

                            renderEmptyData={() => (
                                <Text style={styles.noDisplayText}>No agenda for this day.</Text>
                            )}
                        />
                    </View>


                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },

    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    backButton: {
        paddingHorizontal: 10,
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.powderBlue,
    },
    
    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
    },

    agendaCalendar: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    monthYearText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.darkGray,
        padding: 15,
        fontSize: 18,
    },

    agendaItem: {
        paddingBottom: 20,
    },

    clockInOutText: {
        padding: 10,
        fontFamily: 'Inter_500Medium',
    },

    itemContainer: {
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
    
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    itemText: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
    },

    itemLoc: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },

    noEventsText: {
        color: COLORS.tr_gray,
        textAlign: 'center',
        padding: 20,
        fontFamily: 'Inter_500Medium'
    },
})