import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Entypo } from '@expo/vector-icons'

import { COLORS, DateTimeUtils, Utils } from '../../../constant'

export default function PayHistoryItem ({ item, index }) {
    return (
        <View style={styles.container}>
            <Shadow distance={4} style={styles.shadowItem}>
                <Text style={styles.boldText}>{DateTimeUtils.dateFullConvert(item.cutoffDate)}</Text>
                <Text style={styles.regularText}>Php {item.netpay}</Text>

                <TouchableOpacity style={styles.row}>
                    <Text style={styles.moreButtonText}>More</Text>
                    <Entypo name="chevron-small-right" size={20} color="black" />
                </TouchableOpacity>
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        marginBottom: 10,
        marginHorizontal: 4, 
        borderRadius: 10, 
        backgroundColor: COLORS.clearWhite
    },

    amountText: {
        fontStyle: 'italic',
        fontSize: 14,
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: COLORS.darkGray
    },

    regularText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },

    shadowItem: {
        width: '100%', 
        padding: 15, 
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-between'
    },

    moreButtonText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        paddingTop: 1,
    },

    row: {
        flexDirection: 'row',
    },
})