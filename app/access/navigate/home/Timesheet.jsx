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

import { COLORS, STYLES, DateTimeUtils } from '../../../../constant'
import CalendarNote from '../../../../components/note/CalendarNote'
import PageHeader from '../../../../components/header/PagesHeader'
import Loader from '../../../../components/loader/Loader'

const data = [
    { id: 'MGL001', date: '20231204', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL001', date: '20231204', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL002', date: '20231204', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL002', date: '20231204', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL003', date: '20231204', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL003', date: '20231204', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL001', date: '20231206', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL001', date: '20231206', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL002', date: '20231206', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL002', date: '20231206', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL003', date: '20231206', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
    { id: 'MGL003', date: '20231206', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
]

export default function TimeSheetPage ({ navigation }) {
    const route = useRoute()
    const styles = STYLES.Timesheet

    const [isLoading, setIsLoading] = useState(true)
    
    const [month, setMonth] = useState(moment().format('MMMM'))
    const [year, setYear] = useState(moment().format('YYYY'))

    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)
    const [formattedDateData, setFormattedDateData] = useState(null)

    useEffect(() => {
        const transformedData = data.reduce((acc, entry) => {
            if (entry.id === "MGL002") {
                const dateKey = moment(entry.date, 'YYYYMMDD').format('YYYY-MM-DD')
                const newEntry = { id: entry.id, clocked: entry.clocked, time: entry.time, location: entry.location }

                acc[dateKey] = acc[dateKey] || []
                acc[dateKey].push(newEntry)
            }

            return acc
        }, {})

        setFormattedDateData(transformedData)

        setTimeout(() => {
            setIsLoading(false)
        }, 800)
    }, [])

    const dayPress = (day) => {
        setSelectedDate(day.dateString)
        setEvents(formattedDateData[day.dateString] || [])

        const selectedDateObj = new Date(day.dateString)
        
        const month = selectedDateObj.toLocaleString('default', { month: 'long' })
        const year = selectedDateObj.getFullYear()
    
        setMonth(month)
        setYear(year)
    }    
    
    const renderEventItem = (event, index) => {
        const isClockIn = index === 0
        const isClockOut = index === 1
        const paddingBottom = index === 3 ? 500 : 0
        const clockIconName = isClockIn ? "sign-in" : isClockOut ? "sign-out" : null
        const clockIconColor = isClockIn ? COLORS.orange : isClockOut ? COLORS.powderBlue : null
        
        const dashLine = !event.time && !event.location ? (
            <DashedLine
                dashLength={5}
                dashColor={COLORS.darkGray}
                dashGap={2}
                dashThickness={2}
                style={{ width: 130, paddingVertical: 23 }}
            />
        ) : null

        return (
            <View key={index} style={{ paddingBottom }}>
                <Text style={styles.clockInOutText}>
                    {isClockIn ? "Clock-in : " : isClockOut ? "Clock-out :" : null}
                </Text>

                <View style={styles.itemContainer}>
                    <Shadow distance={3} style={styles.shadowView}>
                        <FontAwesome
                            name={clockIconName}
                            color={clockIconColor}
                            size={34}
                            style={{ paddingRight: 20, marginLeft: 10 }}
                        />

                        <View style={styles.item}>
                            {dashLine || (
                                <>
                                    <Text style={styles.itemText}>{DateTimeUtils.timeConvert(event.time)}</Text>
                                    <Text style={styles.itemLoc}>{event.location}</Text>
                                </>
                            )}
                        </View>
                    </Shadow>
                </View>
            </View>
        )
    }
      
    return (
        <>
            <PageHeader pageName={"Timesheet"}/>

            <View style={styles.container}>
                { isLoading ? ( <Loader /> ) : (
                    <>
                        <View style={styles.agendaCalendar}>
                            <Text style={styles.monthYearText}>{month} {year}</Text>

                            <Agenda
                                items={formattedDateData}
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