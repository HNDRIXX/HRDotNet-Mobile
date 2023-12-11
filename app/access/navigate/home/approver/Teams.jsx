import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Agenda } from 'react-native-calendars';
import CachedImage from 'expo-cached-image';
import { Shadow } from 'react-native-shadow-2';
import moment from 'moment';

import Loader from '../../../../../components/loader/Loader';
import { COLORS, ICONS, DateTimeUtils } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader'
import CalendarNote from '../../../../../components/note/CalendarNote';
import TeamsContactsItem from '../../../../../components/items/home/TeamsContactsItem';

export default function TeamsPage ({ navigation }) {
    const [data, setData] = useState({ 
        '20231204' : [
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist', uri: ICONS.alejandro },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist', uri: ICONS.brian },
            { id: 'MGL004', name: 'Dave Andrew Carandang', position: 'Messenger', uri: ICONS.dave },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist', uri: ICONS.christine },
        ],
        
        '20231205' : [
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist', uri: ICONS.alejandro },
            { id: 'MGL004', name: 'Dave Andrew Carandang', position: 'Messenger', uri: ICONS.dave },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist', uri: ICONS.brian },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist', uri: ICONS.christine},
        ],

        '20231206' : [
            { id: 'MGL004', name: 'Dave Andrew Carandang', position: 'Messenger', uri: ICONS.dave },
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist', uri: ICONS.alejandro },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist', uri: ICONS.brian },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist', uri: ICONS.christine},
        ],

        '20231207' : [
            { id: 'MGL004', name: 'Dave Andrew Carandang', position: 'Messenger', uri: ICONS.dave },
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist', uri: ICONS.alejandro },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist', uri: ICONS.brian },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist', uri: ICONS.christine},
        ],
    })

    const [calendarData, setCalendarData] = useState({
        '20231204' : [
            { id: 'MGL001', event: '8:00 AM to 6:00 PM', status: 'Work Day' },
            { id: 'MGL002', event: '', status: 'Leave' },
            { id: 'MGL003', event: '8:00 AM to 5:00 PM', status: 'Work Day'},
        ],
        
        '20231205' : [
            { id: 'MGL001', event: '', status: 'Holiday' },
            { id: 'MGL002', event: '', status: 'Holiday' },
            { id: 'MGL003', event: '', status: 'Holiday'},
        ],

        '20231206' : [
            { id: 'MGL001', event: '8:00 AM to 6:00 PM', status: 'Work Day' },
            { id: 'MGL002', event: '8:00 AM to 6:00 PM', status: 'Work Day' },
            { id: 'MGL003', event: '8:00 AM to 6:00 PM', status: 'Work Day'},
        ],

        '20231207' : [
            { id: 'MGL001', event: '8:00 AM to 6:00 PM', status: 'Work Day' },
            { id: 'MGL002', event: '8:00 AM to 6:00 PM', status: 'Work Day' },
            { id: 'MGL003', event: '8:00 AM to 6:00 PM', status: 'Work Day'},
        ],
    })

    const [clockedData, setClockedData] = useState([
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
    ])

    const [isLoading, setIsLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)
    const [prevSelectedDate, setPrevSelectedDate] = useState(null)
    const [nextSelectedDate, setNextSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)
    const [mergedData, setMergedData] = useState(null)
    const [organizedClockedData, setOrganizedClockedData] = useState(null)

    const [month, setMonth] = useState(DateTimeUtils.getCurrMonth)
    const [year, setYear] = useState(DateTimeUtils.getCurrYear)

    const onHandleDayPress = (day) => {
        setSelectedDate(day.dateString)
        setPrevSelectedDate(DateTimeUtils.subtractDashCurrDate(day.dateString))
        setNextSelectedDate(DateTimeUtils.addDashCurrDate(day.dateString))
        setEvents(mergedData[day.dateString] || [])

        const dateValue = new Date(day.dateString)

        setMonth(dateValue.toLocaleString('default', { month: 'long' }))
        setYear(dateValue.getFullYear())
    }    

    // const formatDateKeyData = async () => {
    //     const formattedData = {}

    //     Object.keys(mergedData).forEach(dateKey => {
    //         console.log(dateKey)
    //     })
    
    //     Object.keys(data).forEach(dateKey => {
    //       const formattedDate = moment(dateKey, 'YYYYMMDD').format('YYYY-MM-DD')
    //       formattedData[formattedDate] = data[dateKey]
    //     })

    //     return formattedData
    // }
    
    const fortmatDateString = dateString => {
        return moment(dateString, 'YYYYMMDD').format('YYYY-MM-DD')
    }

    const onHandleItemPress = (event) => {
        const id = event?.id

        const currClocked = onGetOrganizedClocked(selectedDate, id)
        const prevEvent = onGetMergedData(prevSelectedDate, id)
        const nextEvent = onGetMergedData(nextSelectedDate, id)

        navigation.navigate('TeamMember', { 
            selectedDate,  
            prevSelectedDate,
            nextSelectedDate,
            prevEvent,
            nextEvent,
            event, 
            currClocked
        })
    }

    const handleMergeData = async () => {
        const newData = {}
      
        Object.keys(data).forEach(date => {
            const formattedDate = fortmatDateString(date)
            newData[formattedDate] = []

            data[date].forEach(employee => {
                const id = employee.id
                const mergedInfo = {
                    ...employee,
                    ...calendarData[date].find(item => item.id === id),
                }
            
                newData[formattedDate].push(mergedInfo)
            })
      
            newData[formattedDate].sort((a, b) => a.name.localeCompare(b.name))
        })

        return newData
    }
      

    const onGetOrganizedClocked = (date, id) => {
        const entries = organizedClockedData[moment(date, 'YYYY-MM-DD').format('YYYYMMDD')]

        if (entries) {
        const specificEntries = entries
            .filter((entry) => entry.id === id)
            .map(({ clocked, id, location, time }) => ({ clocked, id, location, time }))

            if (specificEntries.length > 0) {
                return specificEntries
            }
        }
    }

    const onGetMergedData = (date, id) => {
        const entries = mergedData[date]

        if (entries) {
            const specificEntry = entries.find((entry) => entry.id === id)
            if (specificEntry) {
                return specificEntry
            }
        }
    }

    useEffect(() => {
        const tempDate = DateTimeUtils.defaultDateFormat()
        const formattedTempDate = DateTimeUtils.addDashCurrDate(tempDate)

        const transformedData = clockedData.reduce((acc, entry) => {
            const dateKey = entry.date
            const newEntry = { id: entry.id, clocked: entry.clocked, time: entry.time, location: entry.location }
    
            acc[dateKey] = acc[dateKey] || []
            acc[dateKey].push(newEntry)
    
            return acc
        }, {})

        setOrganizedClockedData(transformedData)
    }, [])

    useEffect(() => {
        const onMergeData = async () => {
            const merged = await handleMergeData()
            setMergedData(merged)
        }

        onMergeData()

        setTimeout(() => {
            setIsLoading(false)
        }, 800)
    }, [])
    
    return (
        <>
            <PageHeader pageName={'Teams'} />

            { isLoading ? ( <Loader /> ) : ( 
                <View style={styles.container}>
                    <Text style={styles.monthYearText}>{month} {year}</Text>

                    <Agenda
                        items={mergedData}
                        onDayPress={onHandleDayPress}
                        showOnlySelectedDayItem

                        renderList={() => (
                            <View>
                                {selectedDate == null && (
                                    <CalendarNote />
                                )}
                                    
                                { events && events.map((event, index) => (
                                    <View key={index} style={styles.paddingSides}>
                                        <TeamsContactsItem 
                                            event={event}
                                            isActive={false}
                                            onHandlePress={() => onHandleItemPress(event)}
                                        />
                                    </View>
                                )) }
                            </View>
                        )}
                    />
                    
                    {events && events.length <= 0 && (
                        <View style={{ position: 'absolute', top: '20%', left: '26%'}}>
                            <Text style={styles.noEventsText}>No agenda for this day.</Text>
                        </View>
                    )}
                </View>
            )}
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    monthYearText: {
        fontFamily: 'Inter_600SemiBold',
        padding: 15,
        fontSize: 18,
    },

    paddingSides: {
        paddingHorizontal: 15,
    },

    noEventsText: {
        color: COLORS.tr_gray,
        textAlign: 'center',
        padding: 20,
        fontFamily: 'Inter_500Medium'
    },
})