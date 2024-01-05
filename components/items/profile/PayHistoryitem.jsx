// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Entypo } from '@expo/vector-icons'

import { COLORS, COMPONENT_STYLES, DateTimeUtils, Utils } from '../../../constant'

export default function PayHistoryItem ({ item, deductions, TKData, index, onHandleMore }) {
    const styles = COMPONENT_STYLES.PayHistoryItem

    const totalAmount = deductions?.reduce((accumulator, currentItem) => accumulator + currentItem.Amount, 0)

    return (
        <View style={styles.container}>
            <Shadow distance={4} offset={[2, 2]} style={styles.shadowItem}>
                <Text style={styles.boldText}>{DateTimeUtils.dateHalfMonthConvert(item.DatePayoutSchedule)}</Text>
                <Text style={styles.regularText}>Php {Utils.amountFormat(item.NetPay)}</Text>

                <TouchableOpacity 
                    style={styles.row}
                    onPress={() => onHandleMore(item, deductions, TKData)}
                >
                    <Text style={styles.moreButtonText}>More</Text>
                    <Entypo name="chevron-small-right" size={17} color="black" />
                </TouchableOpacity>
            </Shadow>
        </View>
    )
}