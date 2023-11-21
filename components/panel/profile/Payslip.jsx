import { useState } from 'react';
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { COLORS, DateTimeUtils, Utils} from '../../../constant'
import { Shadow } from 'react-native-shadow-2';
import { Search } from '../../use/Search'
import RecentPayItem from '../../items/profile/RecentPayItem';
import PayHistoryItem from '../../items/profile/PayHistoryitem';

const data = [{
    cutOffDate: '20231125',
    netpay: '15378.2400',
    grosspay: '17190.3100',
    deductions: '1812.0600',    

    documentNo: 'PP001',
    employeeName: 'Juan dela Cruz',
    employeeCode: '5985',
    department: 'Quality Assurance',
    
    regularDayTotal: '15075.3600',
    totalWorkingHours: '84.6200',
    mealAllowanceTotal: '736.1000',
    complexityAllowance: '1321.8400',

    SSSShare: '675.0000',
    philHealthShare: '301.5100',
    HDMFShare: '100.0000',
    withHoldingTax: '735.0000',
},
{
    cutOffDate: '20231025',
    netpay: '8016.2900',
    grosspay: '17190.3100',
    deductions: '1812.0600',

    documentNo: 'PP002',
    employeeName: 'Juan dela Cruz',
    employeeCode: '5988',
    department: 'Quality Assurance',

    regularDayTotal: '15075.3600',
    totalWorkingHours: '84.6200',
    mealAllowanceTotal: '736.1000',
    complexityAllowance: '1321.8400',

    SSSShare: '675.0000',
    philHealthShare: '301.5100',
    HDMFShare: '100.0000',
    withHoldingTax: '735.0000',

},
{
    cutOffDate: '2023101000',
    netpay: '10941.0300',
    grosspay: '17190.3100',
    deductions: '1812.0600',

    documentNo: 'PP003',
    employeeName: 'Juan dela Cruz',
    employeeCode: '5989',
    department: 'Quality Assurance',

    regularDayTotal: '15075.3600',
    totalWorkingHours: '84.6200',
    mealAllowanceTotal: '736.1000',
    complexityAllowance: '1321.8400',

    SSSShare: '675.0000',
    philHealthShare: '301.5100',
    HDMFShare: '100.0000',
    withHoldingTax: '735.0000',
}]



export default function PayslipPanel () {
    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const navigation = useNavigation()

    useEffect(() => { Utils.getHalf(setFirstHalf, setSecondHalf) })
    
    const onHandleMore = (item) => { navigation.navigate('MorePayslip', item ) }

    return (
        <>
            <Animatable.View
                animation={'fadeIn'}
                duration={900}
                style={styles.animatedView}
            >
                <Search />

                {data.map((item, index) => {
                    const withinFirst = isFirstHalf && Utils.withinFirst(item.cutOffDate)
                    const withinSecond = isSecondHalf && Utils.withinSecond(item.cutOffDate)

                    return (
                        (withinFirst || withinSecond) && (
                            <RecentPayItem
                                item={item}
                                index={index}
                                key={index}
                                onHandleMore={onHandleMore}
                            />
                        )
                    )
                })}

                <Text style={styles.payHistoryTitle}>Pay History</Text>

                <FlatList 
                    data={data}
                    renderItem={({ item, index }) => {
                        const withinFirst = isFirstHalf && !Utils.withinFirst(item.cutOffDate)
                        const withinSecond = isSecondHalf && !Utils.withinSecond(item.cutOffDate)

                        return (
                            (withinFirst || withinSecond) ? (
                                <PayHistoryItem 
                                    item={item}
                                    index={index}
                                    onHandleMore={onHandleMore}
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
    },

    payHistoryTitle: {
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 3,
        fontSize: 16,
        marginVertical: 13,
    },
})