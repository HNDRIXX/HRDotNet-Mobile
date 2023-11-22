import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";

import { COLORS, DateTimeUtils, Utils } from "../../../constant";

export default function RecentPayItem ({ item, TKData, index, onHandleMore }) {
    return (
        <View key={index} style={styles.topView}>
            <Shadow distance={4} offset={[2, 2]} style={styles.shadowView}>
                <View style={styles.rowView}>
                    <Image
                        source={require('../../../assets/icons/pay.png')}
                        style={{ width: 55, height: 55 }}
                    />

                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.recentPayText}>Recent Pay</Text>
                        <Text>{DateTimeUtils.dateFullConvert(item.cutOffDate)}</Text>
                    </View>
                </View>

                <View style={[styles.rowView, { marginTop: 10 }]}>
                    <View>
                        <View style={styles.netpayView}>
                            <Text style={styles.netpayText}>Net Pay</Text>
                            <Text style={styles.netpayValue}>Php {Utils.amountFormat(item.netPay)}</Text>
                        </View>

                        <View style={styles.grosspayView}>
                            <Text style={styles.grosspayText}>Gross Pay</Text>
                            <Text style={styles.amountText}>{Utils.amountFormat(item.grossPay)}</Text>
                        </View>

                        <View style={styles.deductionsView}>
                            <Text style={styles.deductionsText}>Deductions</Text>
                            <Text style={styles.amountText}>{Utils.amountFormat(item.deductions)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.topMoreButton}
                        onPress={() => onHandleMore(item, TKData)}
                    >
                        <View style={styles.row}>
                            <Text style={styles.moreText}>More</Text>
                            <Entypo name="chevron-small-right" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
    },

    shadowView: {
        backgroundColor: COLORS.clearWhite,
        width: '100%',
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 20,
        paddingTop: 15,
        borderRadius: 20,
    },

    row: {
        flexDirection: 'row',
    },
    
    rowView: {
        flexDirection: 'row', 
        alignItems: 'center'
    },

    recentPayText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
    },

    netpayView: {
        flexDirection: 'row',
        marginLeft: 20,
    },

    netpayText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 62,
    },

    netpayValue: {
        fontFamily: 'Inter_600SemiBold'
    },

    grosspayView: {
        flexDirection: 'row',
        marginLeft: 35,
    },

    grosspayText: {
        marginRight: 75,
        fontStyle: 'italic',
        fontSize: 14,
    },

    amountText: {
        fontStyle: 'italic',
    },

    deductionsText: {
        marginRight: 75,
        fontStyle: 'italic',
        fontSize: 14,
    },

    deductionsView: {
        flexDirection: 'row',
        marginLeft: 36,
    },

    moreText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        paddingTop: 1,
    },

    topMoreButton: {
        alignItems: 'baseline',
        alignSelf: 'baseline',
        position: 'absolute',
        bottom: -3,
        right: 0,
    },
})