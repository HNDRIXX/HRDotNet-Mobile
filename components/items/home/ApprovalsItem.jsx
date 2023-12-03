import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { COLORS, DateTimeUtils } from '../../../constant'

export default function ApprovalsItem ({ item, onPanel }) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.itemView}>
                <Text style={styles.boldText}>{item.employeeName}</Text>

                {onPanel == 0 ? (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Date: </Text>
                        <Text style={styles.regularText}>{DateTimeUtils.dateFullConvert(item.COSDate)}</Text>

                    </View>
                ) : onPanel == 1 ? (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Date: </Text>
                        <Text style={styles.regularText}>{DateTimeUtils.dateFullConvert(item.officialWorkDate)}</Text>

                    </View>
                ) : onPanel == 2 ? (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Date: </Text>
                        <Text style={styles.regularText}>{DateTimeUtils.dateFullConvert(item.overtimeDate)}</Text>

                    </View>
                ) : onPanel == 3 ? (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Date: </Text>
                        <Text style={styles.regularText}>{DateTimeUtils.dateFullConvert(item.overtimeDate)}</Text>

                    </View>
                ) : onPanel == 4 ? (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Type: </Text>
                        <Text style={styles.regularText}>{item.reason}</Text>

                    </View>
                ) : onPanel == 5 ? (
                    <View style={styles.rowView}>
                        <Text style={styles.regularText}>Date: </Text>
                        <Text style={styles.regularText}>{DateTimeUtils.dateFullConvert(item.missedLogDate)}</Text>

                    </View>
                )
                : null }

                <View style={styles.rowSpaceView}>
                    { onPanel == 0 ? (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Requested Sched: </Text>
                            <Text style={styles.regularText}>{item.requestedSched}</Text>
                        </View>
                    ) : onPanel == 1 ? (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Location: </Text>
                            <Text style={styles.regularText}>{item.location}</Text>
                        </View>
                    ) : onPanel == 2 ? (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Time: </Text>
                            <Text style={styles.regularText}>{item.overtimeHours}</Text>
                        </View>
                    ) : onPanel == 3 ? (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Offset Hours: </Text>
                            <Text style={styles.regularText}>{item.overtimeHours}</Text>
                        </View>
                    ) : onPanel == 4 ? (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Applied Date/s: </Text>
                            <Text style={styles.regularText}>
                                {DateTimeUtils.dateFullConvert(item.startDate)}
                                { item.endDate ? DateTimeUtils.dateFullConvert(item.endDate) : null }
                            </Text>
                        </View>
                    ) : onPanel == 5 ? (
                        <View style={styles.rowView}>
                            <Text style={styles.regularText}>Log Type: </Text>
                            <Text style={styles.regularText}>{item.logType}</Text>
                        </View>
                    )
                    : null }
                    
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ApprovalsDetails', item)}
                    >
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