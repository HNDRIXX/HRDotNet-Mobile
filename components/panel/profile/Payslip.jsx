// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, COMPONENT_STYLES, DateTimeUtils, Utils} from '../../../constant'
import { Shadow } from 'react-native-shadow-2';
import { Search } from '../../use/Search'
import RecentPayItem from '../../items/profile/RecentPayItem';
import PayHistoryItem from '../../items/profile/PayHistoryitem';
import NothingFoundNote from '../../../components/note/NothingFoundNote'

const data = [
{
    payOutSchedule: '20231210',
    dateTo: '20231116',
    dateFrom: '20231130',
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
    payOutSchedule: '20231125',
    dateTo: '20231101',
    dateFrom: '20231115',
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
    payOutSchedule: '20231110',
    dateTo: '20231016',
    dateFrom: '20231031',
    netPay: '10000.2400',
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
    payOutSchedule: '20231025',
    dateTo: '20231001',
    dateFrom: '20231015',
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
    payOutSchedule: '20231010',
    dateTo: '20230916',
    dateFrom: '20230931',
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
        date: '20231101',
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
        date: '20231102',
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
        date: '20231103',
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
        date: '20231104',
        dayType: 'Rest Day',
        schedule: '',
        timeIn: '',
        timeOut: '',
        regularHours: '0.00',
        overtime: '0.00',
        leave: '',
        tardy: '0.00',
    },
    {
        date: '20231105',
        dayType: 'Rest Day',
        schedule: '',
        timeIn: '',
        timeOut: '',
        regularHours: '0.00',
        overtime: '0.00',
        leave: '',
        tardy: '0.00',
    },
    {
        date: '20231106',
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
        date: '20231107',
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
        date: '20231108',
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
        date: '20231109',
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
        date: '20231110',
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
        date: '20231111',
        dayType: 'Rest Day',
        schedule: '',
        timeIn: '',
        timeOut: '',
        regularHours: '0.00',
        overtime: '0.00',
        leave: '',
        tardy: '0.00',
    },
    {
        date: '20231112',
        dayType: 'Rest Day',
        schedule: '',
        timeIn: '',
        timeOut: '',
        regularHours: '0.00',
        overtime: '0.00',
        leave: '',
        tardy: '0.00',
    },
    {
        date: '20231113',
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
        date: '20231114',
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
        date: '20231115',
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
    const styles = COMPONENT_STYLES.Payslip
    
    const [filterText, setFilterText] = useState('')

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const [tempData, setTempData] = useState(null)

    const navigation = useNavigation()

    useEffect(() => { Utils.getHalf(setFirstHalf, setSecondHalf) })
    
    const onHandleMore = (item, TKData) => { navigation.navigate('MorePayslip', {item, TKData}) }

    let filteredData = []

    filteredData = tempData?.filter((item) => {
        const formattedDate = DateTimeUtils.dateFullConvert(item.DatePayoutSchedule)

        return ( formattedDate.toLowerCase().includes(filterText.toLowerCase()) )
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userIDCompany = await AsyncStorage.getItem('userIDCompany')

                const response = await fetch('http://10.0.1.82:3000/api/payslip', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ IDCompany: userIDCompany }),
                })
    
                const data = await response.json()

                if (userIDCompany !== null) {
                    if (response.ok) {
                        console.log(data)
                        setTempData(data)
                    } else { alert(data.message) }
                } else { console.log('userID not found in AsyncStorage') }
            } catch (error) { console.error(error) }
        }

        fetchUserData()
    }, [])
    
    return (
        <>
            <Animatable.View
                animation={'fadeIn'}
                duration={900}
                style={styles.animatedView}
            >
                <Search 
                    filterText={filterText}
                    setFilterText={setFilterText}
                />

                {/* {filteredData.map((item, index) => {
                    const withinFirst = isFirstHalf && Utils.withinFirst(item.payOutSchedule)
                    const withinSecond = isSecondHalf && Utils.withinSecond(item.payOutSchedule)

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
                })} */}

                <Text style={styles.payHistoryTitle}>Pay History</Text>

                {filteredData?.length <= 0 && <NothingFoundNote /> }

                <FlatList 
                    data={filteredData}
                    renderItem={({ item, index }) => {
                        const withinFirst = isFirstHalf && !Utils.withinFirst(item.DatePayoutSchedule)
                        const withinSecond = isSecondHalf && !Utils.withinSecond(item.DatePayoutSchedule)

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