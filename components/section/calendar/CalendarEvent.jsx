import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { Shadow } from "react-native-shadow-2"
import moment from "moment"
import { FontAwesome } from "@expo/vector-icons"

import { COLORS } from "../../../constant"

export default function CalendarEvent({ selectedDate, formatDate, yesterday, tomorrow, events, checkColor, previousDate, updatedValueEvents, defaultDate, nextDate } ) {

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

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 10,
        paddingVertical: 40,
        width: '100%',
        height: 300,
        shadowColor: COLORS.darkGray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
        backgroundColor: COLORS.clearWhite,
    },

    topView: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    dayStatus: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
    },  

    selectedDayText: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    
    selectedEvent: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: COLORS.clearWhite,
    },
    
    topCircle: {
        position: 'absolute',
        zIndex: 99,
        marginLeft: -1,
    },
    
      
    dayBelowEvent: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular'
    },
    
    dayEventText: {
        textAlign: 'center',
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    
    dayContentWrapper: {
        paddingVertical: 10,
        borderBottomColor: COLORS.tr_gray,
        borderBottomWidth: 1.5,
    },
    
    dayContentText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
    
    dayBelowWrapper: {
        paddingHorizontal: 10,
        padding: 5,
    },
    
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
    boldText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.black,
        fontWeight: '700',
        fontStyle: 'italic',
    },
    
    dateBelowText: {
        marginTop: 5,
        fontFamily: 'Inter_400Regular',
        color: COLORS.black,
        fontSize: 12,
    },

    noEventsText: {
        fontSize: 13,
        textAlign: 'center',
        color: COLORS.darkGray,
        fontFamily: 'Inter_400Regular',
    },

    selectedDayEvent: (color) => ({
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 35,
        paddingLeft: 40,
        borderRadius: 50,
        borderColor: color,
        borderColor: color ? COLORS.clearWhite : null,
        backgroundColor: COLORS.clearWhite,
        elevation: 5,
        // shadowColor: COLORS.darkGray,
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // shadowOffset : { width: 1, height: 5},
    }),
  
    dayBelowEventWrapper: (color) => ({
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 25,
        paddingLeft: 40,
        borderRadius: 50,
        borderColor: color,
        borderWidth: 1,
        backgroundColor: COLORS.clearWhite,
    }),
})
