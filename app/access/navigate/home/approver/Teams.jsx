import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from "react-native-calendars";
import { Image } from 'expo-image';
import { Agenda } from 'react-native-calendars'

import { COLORS, DateTimeUtils } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader'
import { Shadow } from 'react-native-shadow-2';

export default function TeamsPage () {
    const [data, setData] = useState({ 
        '2023-12-01' : [
            { name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],
        
        '2023-12-02' : [
            { name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],

        '2023-12-03' : [
            { name: 'Alejandro Alcanar', position: 'Customer Service Specialist' },
            { name: 'Brian Noel Cruz', position: 'Training Specialist' },
            { name: 'Christine Joy Reyes', position: 'Quality Assurance Specialist'},
        ],
    })
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState(null)
    

    const onHandleDayPress = (day) => {
        // setSelectedDate(DateTimeUtils.getDashDateReverse(day.dateString))
        setSelectedDate(day.dateString)
        setEvents(data[day.dateString] || [])

        const selectedDateObj = new Date(day.dateString)
        
        const month = selectedDateObj.toLocaleString('default', { month: 'long' })
        const year = selectedDateObj.getFullYear()
    }    
    
    
    return (
        <>
            <PageHeader pageName={'Teams'}/>

            <View style={styles.container}>
                <Agenda
                    items={data}
                    onDayPress={onHandleDayPress}
                    showOnlySelectedDayItem

                    renderList={() => (
                        <View>
                            { events && events.map((event, index) => (
                                <View style={styles.itemView} key={index}>
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
                                </View>
                            )) }
                        </View>
                    )}
                />
            </View>
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