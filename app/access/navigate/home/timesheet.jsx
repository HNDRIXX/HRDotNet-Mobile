// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { Agenda } from 'react-native-calendars'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import DashedLine from 'react-native-dashed-line'
import { useRoute } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'

import { COLORS, STYLES } from '../../../../constant'
import CalendarNote from '../../../../components/note/CalendarNote'
import PageHeader from '../../../../components/header/PagesHeader'
import Loader from '../../../../components/loader/Loader'

export default function TimeSheetPage ({ navigation }) {
    const route = useRoute()
    const styles = STYLES.Timesheet

    const [isLoading, setIsLoading] = useState(true)
    
    const [month, setMonth] = useState(moment().format('MMMM'))
    const [year, setYear] = useState(moment().format('YYYY'))

    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)

    const items = {
        '2023-11-05': [
            { time: '10:10:08 AM', location: '12 Cataduanes St. Quezon City' },
            { time: '06:01:02 PM', location: '12 Cataduanes St. Quezon City' }],
        
        '2023-11-06': [
            { time: '07:49:01 AM', location: '12 Cataduanes St. Quezon City' },
            { time: '06:20:05 PM', location: '12 Cataduanes St. Quezon City' }],
        
        '2023-11-12': [
            { time: '07:31:01 AM', location: '12 Cataduanes St. Quezon City' },
            { time: '08:31:01 PM', location: '12 Cataduanes St. Quezon City' }],
        
        '2023-11-13': [
            { time: '07:21:19 AM', location: '12 Cataduanes St. Quezon City' },
            { time: null, location: null }],
    }

    const newData = {
        time: route.params?.clockedTime,
        location: route.params?.clockedLocation
    }

    const formattedDate = moment(route.params?.clockedDate, 'MMMM DD, YYYY, dddd').format('YYYY-MM-DD')

    if (items[formattedDate]) {
        const existingData = items[formattedDate]

        if (existingData.length === 1) {
            existingData.push(newData)
        } else {
        }
    } else {
        items[formattedDate] = [newData]
        items[formattedDate].push({ time: null, location: null })
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 800)
    }, [])

    const dayPress = (day) => {
        setSelectedDate(day.dateString)
        setEvents(items[day.dateString] || [])

        const selectedDateObj = new Date(day.dateString)
        
        const month = selectedDateObj.toLocaleString('default', { month: 'long' })
        const year = selectedDateObj.getFullYear()
    
        setMonth(month)
        setYear(year)
    }    
    
    const renderEventItem = (event, index) => (
        <View key={index} style={index === 3 ? { paddingBottom: 500 } : {}}>
            <Text style={styles.clockInOutText}>
                {index === 0 ? "Clock-in : " : index === 1 ? "Clock-out :" : null}
            </Text>
      
            <View style={styles.itemContainer}>
                <Shadow distance={3} style={styles.shadowView}>
                    <FontAwesome
                        name={index === 1 ? "sign-out" : index === 0 ? "sign-in" : null}
                        color={ index === 1 ? COLORS.powderBlue : index === 0 ? COLORS.orange : null }
                        size={34}
                        style={{ paddingRight: 20, marginLeft: 10 }}
                    />
        
                    <View style={styles.item}>
                        {!event.time && !event.location ? (
                            <DashedLine
                                dashLength={5}
                                dashColor={COLORS.darkGray}
                                dashGap={2}
                                dashThickness={2}
                                style={{ width: 130, paddingVertical: 23 }}
                            />
                        ) : (
                            <>
                                <Text style={styles.itemText}>{event.time}</Text>
                                <Text style={styles.itemLoc}>{event.location}</Text>
                            </>
                        )}
                    </View>
                </Shadow>
            </View>
        </View>
    )
      
    return (
        <>
            <PageHeader pageName={"Timesheet"}/>

            <View style={styles.container}>
                { isLoading ? ( <Loader /> ) : (
                    <>
                        <View style={styles.agendaCalendar}>
                            <Text style={styles.monthYearText}>{month} {year}</Text>

                            <Agenda
                                items={items}
                                onDayPress={dayPress}
                                showOnlySelectedDayItem

                                renderList={() => (
                                    <View style={styles.agendaItem}>
                                        {selectedDate == null && ( <CalendarNote /> )}
                                        
                                        {selectedDate && events && events.length === 0 ? (
                                            <Text style={styles.noEventsText}>No events to display</Text>
                                        ) : ( events && events.map((event, index) => renderEventItem(event, index)) )}
                                    </View>
                                )}

                                renderEmptyData={() => ( <Text style={styles.noDisplayText}>No agenda for this day.</Text> )}
                            />
                        </View>
                    </>
                )}
            </View>
        </>
    )
}