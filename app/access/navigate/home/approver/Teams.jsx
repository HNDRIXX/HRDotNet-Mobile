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
    const [formattedDateData, setFormattedDateData] = useState(false)

    const onHandleDayPress = (day) => {
        // setSelectedDate(DateTimeUtils.getDashDateReverse(day.dateString))
        setSelectedDate(day.dateString)
        setEvents(data[day.dateString] || [])

        const selectedDateObj = new Date(day.dateString)
        
        const month = selectedDateObj.toLocaleString('default', { month: 'long' })
        const year = selectedDateObj.getFullYear()
    }    

    const formatDateKeyData = async () => {
        const formattedData = {}
    
        Object.keys(data).forEach(dateKey => {
          const formattedDate = moment(dateKey, 'YYYYMMDD').format('YYYY-MM-DD')
          formattedData[formattedDate] = data[dateKey]
        })

        return formattedData
    }

    const onHandleItemPress = () => {
        navigation.navigate('TeamMember')
    }

    const handleMergeData = async () => {
        const newData = {};
      
        // Iterate over dates
        Object.keys(data).forEach(date => {
            newData[date] = [];
      
            // Iterate over IDs for each date
            data[date].forEach(employee => {
                const id = employee.id;
                const mergedInfo = {
                ...employee,
                ...calendarData[date].find(item => item.id === id),
                };
        
                // // Find the clocked information for the ID and date
                // const clockedInfo = clockedData[date].find(clocked => clocked[0].id === id);
        
                // // Merge clocked information
                // if (clockedInfo) {
                //   mergedInfo.clocked = clockedInfo[0].clocked;
                //   mergedInfo.time = clockedInfo[0].time;
                //   mergedInfo.location = clockedInfo[0].location;
                // }
        
                newData[date].push(mergedInfo);
            })
        })
        
        console.log(newData)
        setMergedData(newData)
    }

    useEffect(() => {
        const mergedData = async () => {
            const formattedData = await handleMergeData()
            setFormattedDateData(formattedData)
        }

        mergedData()

        const fetchData = async () => {
            const formattedData = await formatDateKeyData()
            setData(formattedData)
        }
        
        fetchData()  

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
                        items={data}
                        onDayPress={onHandleDayPress}
                        showOnlySelectedDayItem

                        renderList={() => (
                            <View>
                                {selectedDate == null && (
                                    <CalendarNote />
                                )}
                                    
                                { events && events.map((event, index) => (
                                    <TouchableOpacity 
                                        style={styles.itemView} key={index}
                                        onPress={onHandleItemPress}
                                        >
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

    itemView: {
        backgroundColor: COLORS.clearWhite,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold'
    },

    regularText: {
        fontFamily: 'Inter_400Regular'
    }
})