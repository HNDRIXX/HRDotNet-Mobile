import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { Shadow } from "react-native-shadow-2"
import moment from "moment"
import { FontAwesome } from "@expo/vector-icons"

import { COLORS, COMPONENT_STYLES } from "../../../constant"

export default function CalendarEvent({ selectedDate, formatDate, yesterday, tomorrow, events, checkColor, previousDate, updatedValueEvents, defaultDate, nextDate } ) {
    const styles = COMPONENT_STYLES.CalendarEvent

    const dayBelowView = (date) => {
        return events.map((event, index) => {
            const valueColor = updatedValueEvents[defaultDate(date)] ? updatedValueEvents[defaultDate(date)][0].status : null
            const color = checkColor(valueColor)
    
            return (
                <View style={styles.dayBelowEventWrapper(color)} key={index}>
                    <FontAwesome
                        name="circle"
                        size={27}
                        color={color}
                        style={styles.topCircle}
                    />
    
                    <Text style={styles.dayBelowEvent}>
                        {updatedValueEvents[defaultDate(date)] ? (
                            updatedValueEvents[defaultDate(date)][0].status
                        ) : 'Empty'}
                    </Text>
                </View>
            )
        })
    }    

    return (
        <Shadow distance={20} style={styles.container}>
            <View style={styles.topView}>
                <Text style={styles.dayStatus}>{
                    (formatDate(selectedDate) == moment().format("MMMM DD, YYYY")) ? "Today" : 
                    (formatDate(selectedDate) == yesterday.format("MMMM DD, YYYY")) ? "Yesterday" :
                    (formatDate(selectedDate) == tomorrow.format("MMMM DD, YYYY")) ? "Tommorow" : "Event"
                }</Text>

                <Text style={styles.selectedDayText}>{formatDate(selectedDate)}</Text>
            </View>

            <View style={styles.selectedEvent}>
                {events.map((event, index) => {
                    const valueColor = event.status
                    const color = checkColor(valueColor)

                    return (
                        <View style={styles.selectedDayEvent(color)} key={index}>
                            <FontAwesome
                                name="circle"
                                size={40}
                                color={color}
                                style={styles.topCircle}
                            />

                            <Text style={styles.dayEventText}>{event.status}</Text>
                        </View>
                    )
                })}

                <View style={styles.dayContentWrapper}>
                    {events.length === 0 ? (
                        <Text style={styles.noEventsText}>No agenda or event</Text>
                    ) : (
                        events.map((event, index) => (
                            <Text key={index} style={styles.dayContentText}>{event.event}</Text>
                        ))
                    )}
                </View>

                <View style={styles.dayBelowWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>Previous</Text>
                        <Text style={styles.dateBelowText}>{previousDate}</Text>
                    </View>
                    
                    {dayBelowView(previousDate)}
                </View>

                <View style={styles.dayBelowWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>Upcoming</Text>
                        <Text style={styles.dateBelowText}>{nextDate}</Text>
                    </View>

                    {dayBelowView(nextDate)}
                </View>
            </View>
        </Shadow>
    )
}