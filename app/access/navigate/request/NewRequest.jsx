import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import PageHeader from "../../../../components/header/PagesHeader";
import { COLORS } from "../../../../constant";

export default function COSNewRequest () {
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [shiftSched, setShiftSched] = useState(null)

    const showDatepicker = () => {
        setShowDatePicker(true)
    }

    const onDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            setShowDatePicker(Platform.OS === 'ios')
            setDate(selectedDate)
        } else {
            setShowDatePicker(false)
        }
    }

    return (
        <>
            <PageHeader pageName={"New Request"} />

            <View style={styles.container}>
                <View>
                    <Text>Start Date</Text>

                    <View style={styles.dateView}>
                        <Text>{moment(date).format('MMM DD, YYYY')}</Text>
                        
                        <FontAwesome 
                            name="calendar"
                            size={20}
                            color={COLORS.darkGray}
                            onPress={showDatepicker}
                        />
                    </View>
                </View>

                <View>
                    <Text>End Date</Text>

                    <View style={styles.dateView}>
                        <Text>{moment(date).format('MMM DD, YYYY')}</Text>
                        
                        <FontAwesome 
                            name="calendar"
                            size={20}
                            color={COLORS.darkGray}
                            onPress={showDatepicker}
                        />
                    </View>
                </View>

                <View>
                    <Text>Shift Schedule</Text>

                    <Picker
                        shiftSched={shiftSched}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setShiftSched(itemValue)}
                    >
                        <Picker.Item label="Select an option" value={null} enabled={false} />
                        <Picker.Item label="Option 1" value="" enabled={false} />
                    </Picker>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },

    dateView: {
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
    
})