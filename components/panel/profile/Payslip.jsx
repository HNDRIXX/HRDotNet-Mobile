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
    netPay: '15378.2400',
    grossPay: '17190.3100',
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
    netPay: '8016.2900',
    grossPay: '17190.3100',
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
    netPay: '10941.0300',
    grossPay: '17190.3100',
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

const TKData = [
{
    date: '20231014',
    dayType: 'Regular Day',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '08:12',
    timeOut: '18:00',
    regularHours: '9.00',
    overtime: '0.00',
    leave: '0.00',
    tardy: '0.12',

},
{
    date: '20231015',
    dayType: 'Regular Day',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '08:12',
    timeOut: '18:00',
    regularHours: '9.00',
    overtime: '0.00',
    leave: '0.00',
    tardy: '0.12',
},
{
    date: '20231016',
    dayType: 'Regular Day',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '08:00',
    timeOut: '18:00',
    regularHours: '9.00',
    overtime: '0.00',
    leave: '',
    tardy: '0.00',
},
{
    date: '20231017',
    dayType: 'Regular Day',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '00:00',
    timeOut: '00:00',
    regularHours: '9.00',
    overtime: '0.00',
    leave: 'Vacation Leave',
    tardy: '0.00',
},
{
    date: '20231018',
    dayType: 'Regular Day',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '08:00',
    timeOut: '18:00',
    regularHours: '9.00',
    overtime: '0.00',
    leave: '',
    tardy: '0.00',
},
{
    date: '20231019',
    dayType: 'Rest Day',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '0.00',
    timeOut: '0.00',
    regularHours: '0.00',
    overtime: '0.00',
    leave: '',
    tardy: '0.00',
},
{
    date: '20231020',
    dayType: 'Special Holiday',
    schedule: '8:00 AM to 6:00 PM',
    timeIn: '0.00',
    timeOut: '0.00',
    regularHours: '0.00',
    overtime: '0.00',
    leave: '',
    tardy: '0.00',
},
]

export default function PayslipPanel () {
    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const navigation = useNavigation()

    useEffect(() => { Utils.getHalf(setFirstHalf, setSecondHalf) })
    
    const onHandleMore = (item, TKData) => { navigation.navigate('MorePayslip', {item, TKData}) }

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
                                TKData={TKData}
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
                                    TKData={TKData}
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
        backgroundColor: COLORS.clearWhite,
        opacity: 1, 
        flex: 1, 
        paddingHorizontal: 20,
    },

    payHistoryTitle: {
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 3,
        fontSize: 16,
        marginVertical: 13,
    },
})