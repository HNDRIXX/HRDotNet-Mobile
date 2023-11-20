import { useState } from 'react';
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { COLORS, DateTimeUtils, Utils} from '../../../constant'
import { Shadow } from 'react-native-shadow-2';
import RecentPayItem from '../../items/profile/RecentPayItem';
import PayHistoryItem from '../../items/profile/PayHistoryitem';

const data = [{
    cutoffDate: '20231125',
    netpay: '15,378.2400',
    grosspay: '17,190.3100',
    deductions: '1,812.0600'
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
    
    const onHandleMore = (item) => {
        navigation.navigate('MorePayslip', { item: item })
    }

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
                            <RecentPayItem 
                                item={item}
                                index={index}
                                key={index} 
                                onHandleMore={onHandleMore}
                            />
                        )
                    );
                })}


                <Text style={styles.payHistoryTitle}>Pay History</Text>

                <FlatList 
                    data={data}
                    renderItem={({ item, index }) => {
                        const withinFirst = isFirstHalf && !Utils.withinFirst(item.cutoffDate);
                        const withinSecond = isSecondHalf && !Utils.withinSecond(item.cutoffDate);

                        return (
                            (withinFirst || withinSecond) ? (
                                <PayHistoryItem 
                                    item={item}
                                    index={index}
                                />
                            ) : null
                        )
                    }}
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

    payHistoryTitle: {
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 3,
        fontSize: 16,
        marginVertical: 13,
    },
})