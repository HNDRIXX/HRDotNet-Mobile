import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { COLORS, DateTimeUtils } from '../../../constant'

export default function ApprovalsItem ({ item, onPanel }) {

    return (
        <View style={styles.container}>
            <View style={styles.itemView}>
                <Text style={styles.boldText}>{item.employeeName}</Text>

                {onPanel == 0 && (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Date: </Text>
                        <Text style={styles.regularText}>{DateTimeUtils.dateFullConvert(item.date)}</Text>
                    </View>
                )}

                <View style={styles.rowSpaceView}>
                    {onPanel == 0 && (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Requested Sched: </Text>
                            <Text style={styles.regularText}>{item.requestedSched}</Text>
                        </View>
                    )}
                    
                    <TouchableOpacity>
                        <Entypo 
                            name="chevron-right" 
                            size={21} 
                            color={COLORS.darkGray} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 7,
        paddingLeft: 16,
        paddingVertical: 10,
    },

    itemView: {
    },

    rowView: {
        flexDirection: 'row',
    },

    rowSpaceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16
    },

    regularText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14
    }
})