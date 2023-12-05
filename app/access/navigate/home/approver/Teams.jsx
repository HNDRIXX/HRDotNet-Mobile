import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],
        
        '20231205' : [
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],

        '20231206' : [
            { id: 'MGL001', name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { id: 'MGL002', name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { id: 'MGL003', name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
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

    const [clockedData, setClockedData] = useState({
        '20231204' : [
            [
                { id: 'MGL001', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL001', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
            [
                { id: 'MGL002', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL002', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
            [
                { id: 'MGL003', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL003', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
        ],
        '20231205' : [
            [
                { id: 'MGL001', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL001', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
            [
                { id: 'MGL002', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL002', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
            [
                { id: 'MGL003', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL003', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
        ],
        '20231206' : [
            [
                { id: 'MGL001', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL001', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
            [
                { id: 'MGL002', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL002', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
            [
                { id: 'MGL003', clocked: 'In', time: '08:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
                { id: 'MGL003', clocked: 'Out', time: '18:00:00', location: '12 Catanduanes St. Quezon City, NCR' },
            ],
        ],
    })

    const [isLoading, setIsLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)
    const [mergedData, setMergedData] = useState(null)

    const onHandleDayPress = (day) => {
        // setSelectedDate(DateTimeUtils.getDashDateReverse(day.dateString))
        setSelectedDate(day.dateString)
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
        return moment(dateString, 'YYYYMMDD').format('YYYY-MM-DD');
    }

    const onHandleItemPress = (event) => {
        navigation.navigate('TeamMember', event)
    }

    const handleMergeData = async () => {
        const newData = {};
      
        // Iterate over dates
        Object.keys(data).forEach(date => {
            const formattedDate = fortmatDateString(date)
            newData[formattedDate] = []

            // Iterate over IDs for each date
            data[date].forEach(employee => {
                const id = employee.id
                const mergedInfo = {
                ...employee,
                ...calendarData[date].find(item => item.id === id),
                };

                // // Find the clocked information for the ID and date
                // const clockedInfo = clockedData[date].find(clocked => clocked[0].id === id);

                // // Merge clocked information
                // if (clockedInfo) {
                // mergedInfo.clocked = clockedInfo[0].clocked;
                // mergedInfo.time = clockedInfo[0].time;
                // mergedInfo.location = clockedInfo[0].location;
                // } else {
                // // Set default values if clocked information is not found
                // mergedInfo.clocked = null;
                // mergedInfo.time = null;
                // mergedInfo.location = null;
                // }

                newData[formattedDate].push(mergedInfo);
            });
            });
        
        return newData
    }


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
                                        onPress={() => onHandleItemPress(event)}

                                        disabled={
                                            event.status == 'Work Day' ? false : true
                                        }>
                                        
                                        <Shadow distance={3} offset={[2,3]} style={styles.shadowView}>
                                            <CachedImage
                                                source={{ uri: ICONS.juan }}
                                                cacheKey={`juan`}
                                                style={styles.userProfile}
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