import { useState } from 'react';
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { COLORS, DateTimeUtils, Utils} from '../../../constant'
import { Shadow } from 'react-native-shadow-2';

const data = [{
    cutoffDate: '20231125',
    netpay: '15,378.24',
    grosspay: '17,190.31',
    deductions: '1,812.06'
},
{
    cutoffDate: '20231025',
    netpay: '8,016.29',
    grosspay: '17,190.31',
    deductions: '1,812.06'
},
{
    cutoffDate: '20231010',
    netpay: '10,941.03',
    grosspay: '17,190.31',
    deductions: '1,812.06'
},]

export default function PayslipPanel () {
    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const navigation = useNavigation()

    useEffect(() => {
        Utils.getHalf(setFirstHalf, setSecondHalf)

    })
    
    return (
        <>
            <Animatable.View
                animation={'fadeIn'}
                duration={900}
                style={styles.animatedView}
            >
                {data.map((item, index) => {
                    const withinFirst = isFirstHalf && Utils.withinFirst(item.cutoffDate)
                    const withinSecond = isSecondHalf && Utils.withinSecond(item.cutoffDate)

                    return (
                        (withinFirst || withinSecond) && (
                            <View key={index} style={styles.topView}>
                                <Shadow distance={5} style={styles.shadowView}>
                                    <View style={styles.rowView}>
                                        <Image
                                            source={require('../../../assets/icons/pay.png')}
                                            style={{ width: 60, height: 60 }}
                                        />

                                        <View style={{ marginLeft: 20 }}>
                                            <Text style={styles.recentPayText}>Recent Pay</Text>
                                            <Text>{item.cutoffDate}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.rowView}>
                                        <View>
                                            <View style={styles.netpayView}>
                                                <Text style={styles.netpayText}>Net Pay</Text>
                                                <Text style={styles.netpayValue}>Php {item.netPay}</Text>
                                            </View>

                                            <View style={styles.grosspayView}>
                                                <Text style={styles.grosspayText}>Gross Pay</Text>
                                                <Text style={styles.amountText}>{item.grossPay}</Text>
                                            </View>

                                            <View style={styles.deductionsView}>
                                                <Text style={styles.deductionsText}>Deductions</Text>
                                                <Text style={styles.amountText}>{item.deductions}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.topMoreButton}
                                            onPress={() =>
                                                navigation.navigate('MorePayslip', { item: item })
                                            }
                                        >
                                            <Text>More {'>'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Shadow>
                            </View>
                        )
                    );
                })}


                <Text style={styles.payHistoryTitle}>Pay History</Text>

                <FlatList 
                    data={data}
                    renderItem={({item}) => (
                        <View style={{ marginVertical: 10, marginHorizontal: 4, borderRadius: 20 }}>
                            <Shadow distance={4} style={styles.shadowItem}>
                                <Text style={styles.boldText}>{DateTimeUtils.dateFullConvert(item.cutoffDate)}</Text>
                                <Text style={styles.regularText}>Php {item.netpay}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.moreButtonText}>More {'>'}</Text>
                                </TouchableOpacity>
                            </Shadow>
                        </View>
                    )}
                />
            </Animatable.View>
        </>
    )
}

const styles = StyleSheet.create({
    animatedView: {
        opacity: 1, 
        flex: 1, 
        marginHorizontal: 20,
        marginVertical: 20
    },

    topView: {
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
    },

    shadowView: {
        width: '100%',
        paddingRight: 20,
        paddingLeft: 15,
        paddingBottom: 20,
        paddingTop: 15,
        borderRadius: 20,
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
        marginLeft: 30,
    },

    netpayText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 70,
    },

    netpayValue: {
        fontFamily: 'Inter_600SemiBold'
    },

    grosspayView: {
        flexDirection: 'row',
        marginLeft: 50,
    },

    grosspayText: {
        marginRight: 75,
        fontStyle: 'italic',
        fontSize: 14,
    },

    deductionsText: {
        marginRight: 75,
        fontStyle: 'italic',
        fontSize: 14,
    },

    deductionsView: {
        flexDirection: 'row',
        marginLeft: 50,
    },

    payHistoryTitle: {
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 3,
        fontSize: 16,
        marginVertical: 13,
    },

    amountText: {
        fontStyle: 'italic',
        fontSize: 14,
    },

    topMoreButton: {
        alignItems: 'baseline',
        alignSelf: 'baseline',
        position: 'absolute',
        bottom: 0,
        right: 0,
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
        fontSize: 12,
        fontFamily: 'Inter_500Medium'
    }

})