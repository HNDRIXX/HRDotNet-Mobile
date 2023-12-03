import { View, Text, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { COLORS, DateTimeUtils } from "../../../constant";

export default function TimeOffItem ({ item }) {
    return (
        <View style={styles.itemWrapper}>
            <Shadow distance={3} offset={[2,2]} style={styles.shadowView}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderText}>{item.status}</Text>
                    <Text style={styles.itemHeaderText}>{item.leaveCredit}</Text>
                </View>

                <View style={styles.itemBody}>
                    <Text style={styles.bodyText}>Date: 
                        <Text style={styles.itemText}> {DateTimeUtils.dateFullConvert(item.date)}</Text>
                    </Text>

                    <Text style={styles.bodyText}>Document No: 
                        <Text style={styles.itemText}> {item.documentNo}</Text>
                    </Text>
                </View>
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({
    shadowView: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
    },
    
    itemWrapper: {
        backgroundColor: COLORS.clearWhite,
        margin: 10,
        borderRadius: 20,
        marginHorizontal: 20,
    },

    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.tr_gray,
        padding: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    itemHeaderText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
    },

    itemBody: {
        padding: 15,
    },

    bodyText: {
        fontFamily: 'Inter_600SemiBold',
    },

    itemText: {
        fontFamily: 'Inter_400Regular'
    }
})