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

export default function TeamsPage ({ navigation }) {
    const [data, setData] = useState({ 
        '20231204' : [
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist', uri: ICONS.alejandro },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist', uri: ICONS.brian },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist', uri: ICONS.christine },
        ],
        
        '20231205' : [
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist', uri: ICONS.alejandro },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist', uri: ICONS.brian },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist', uri: ICONS.christine},
        ],

        '20231206' : [
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

    const onHandleDayPress = (day) => {
        setSelectedDate(day.dateString)
        setPrevSelectedDate(DateTimeUtils.subtractDashCurrDate(day.dateString))
        setNextSelectedDate(DateTimeUtils.addDashCurrDate(day.dateString))
        setEvents(mergedData[day.dateString] || [])

        const selectedDateObj = new Date(day.dateString)
    
        const month = selectedDateObj.toLocaleString('default', { month: 'long' })
        const year = selectedDateObj.getFullYear()
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
            <PageHeader pageName={'Teams'}/>

            { isLoading ? ( <Loader /> ) : ( 
                <View style={styles.container}>
                    <Agenda
                        items={mergedData}
                        onDayPress={onHandleDayPress}
                        showOnlySelectedDayItem
                        enableSwipeMonths

                        renderList={() => (
                            <View>
                                {selectedDate == null && (
                                    <CalendarNote />
                                )}
                                    
                                { events && events.map((event, index) => (
                                    <TouchableOpacity 
                                        style={[styles.buttonView, event.status != "Work Day" && styles.disabledButton]} key={index}

                                        onPress={() => { onHandleItemPress(event)} } 
                                    >
                                        
                                        <Shadow distance={3} offset={[2,3]} style={styles.shadowView}>
                                            <CachedImage
                                                source={{ uri: event.uri }}
                                                cacheKey={`imageProfile0${index}`}
                                                style={styles.userProfile}
                                                placeholderContent={
                                                    <ActivityIndicator size={'small'} color={COLORS.powderBlue}/>
                                                }
                                            />

                                            <View>
                                                <Text style={styles.boldText}>{event.name}</Text>
                                                <Text style={styles.regularText}>{event.position}</Text>
                                            </View>
                                        </Shadow>
                                    </TouchableOpacity>
                                )) }
                            </View>
                        )}

                    />
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

    userProfile: {
        width: 50, 
        height: 50, 
        borderRadius: 90,
        marginRight: 20,
    },

    shadowView: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        padding: 15,
        borderRadius: 20,
        
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonView: {
        backgroundColor: COLORS.clearWhite,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    
    disabledButton: {
        opacity: 0.4
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold'
    },

    regularText: {
        fontFamily: 'Inter_400Regular'
    }
})