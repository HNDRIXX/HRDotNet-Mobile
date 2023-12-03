import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Agenda } from 'react-native-calendars';
import { Shadow } from 'react-native-shadow-2';
import moment from 'moment';

import Loader from '../../../../../components/loader/Loader';
import { COLORS, DateTimeUtils } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader'
import CalendarNote from '../../../../../components/note/CalendarNote';

export default function TeamsPage () {
    const [data, setData] = useState({ 
        '20231201' : [
            { name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],
        
        '20231202' : [
            { name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],

        '20231203' : [
            { name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],
    })
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)
    const [formatted, setFormatted] = useState(false)
    

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


    useEffect(() => {
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
                                    <TouchableOpacity style={styles.itemView} key={index}>
                                        <Shadow distance={3} style={styles.shadowView}>
                                            <Image 
                                                source={require('../../../../../assets/user/juan.svg')}
                                                style={styles.userProfile}
                                            />

                                            <View>
                                                <Text>{event.name}</Text>
                                                <Text>{event.position}</Text>
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
        marginRight: 20,
    },

    shadowView: {
        width: '100%',
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
    }
})