// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, COMPONENT_STYLES, DateTimeUtils, Utils} from '../../../constant'
import { Shadow } from 'react-native-shadow-2';
import { Search } from '../../use/Search'
import RecentPayItem from '../../items/profile/RecentPayItem';
import PayHistoryItem from '../../items/profile/PayHistoryitem';
import NothingFoundNote from '../../../components/note/NothingFoundNote'
import Loader from '../../loader/Loader';

export default function PayslipPanel () {
    const styles = COMPONENT_STYLES.Payslip
    
    const [filterText, setFilterText] = useState('')

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)
    const [recentPayData, setRecentPayData] = useState(null)
    const [tempData, setTempData] = useState(null)
    const [deductionsData, setDeductionsData] = useState(null)

    const [isLoading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    const navigation = useNavigation()

    useEffect(() => { Utils.getHalf(setFirstHalf, setSecondHalf) })
    
    const onHandleMore = (item, totalDeductions, currDeductions) => { navigation.navigate('MorePayslip', {item, totalDeductions, currDeductions}) }

    let filteredData = []

    filteredData = tempData?.filter((item) => {
        const formattedDate = DateTimeUtils.dateFullConvert(item.DatePayoutSchedule)

        return ( formattedDate.toLowerCase().includes(filterText.toLowerCase()) )
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)

                const userID = await AsyncStorage.getItem('userID')
                const connValue = await AsyncStorage.getItem('conn')
                const portValue = await AsyncStorage.getItem('port')

                const setPortValue = portValue !== null ? ':' + portValue : ''
      
                const response = await fetch(`http://${connValue}${setPortValue}/api/payslip`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ IDEmployee: userID }),
                })
    
                const data = await response.json()

                if (response.ok) {
                    const sortedData = data.detail.sort((a, b) => moment(b.DatePayoutSchedule, 'YYYYMMDD').diff(moment(a.DatePayoutSchedule, 'YYYYMMDD')))

                    const recentSlip = sortedData.length > 0 ? sortedData[0] : {}
                    const previousSlip = sortedData.slice(1)
                    
                    setRecentPayData(recentSlip)
                    setDeductionsData(data.deductions)
                    setTempData(previousSlip)
                    setLoading(false)
                    setRefreshing(false)
                } else { 
                    setLoading(false)
                    setRefreshing(false)
                    alert(data.message) 
                }
            } catch (error) { 
                setLoading(false)
                setRefreshing(false)
            }
        }

        fetchUserData()
    }, [refreshing])
    
    return (
        <>
            {isLoading ? <Loader /> : (
                <Animatable.View
                    animation={'fadeIn'}
                    style={styles.animatedView}
                    duration={900}
                >
                    <Search 
                        filterText={filterText}
                        setFilterText={setFilterText}
                    />

                    {recentPayData != null && (
                        <RecentPayItem
                            item={recentPayData}
                            currDeductions={deductionsData?.filter(item => item?.ID_Payroll === tempData?.ID_Payroll)}
                            onHandleMore={onHandleMore}
                        />
                    )}

                    <Text style={styles.payHistoryTitle}>Pay History</Text>

                    {filteredData?.length <= 0 && <NothingFoundNote /> }

                    <FlatList 
                        data={filteredData}
                        ref={scrollViewRef}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => setRefreshing(true)} />
                        }

                        renderItem={({ item, index }) => {
                            const withinFirst = isFirstHalf && !Utils.withinFirst(item.DatePayoutSchedule)
                            const withinSecond = isSecondHalf && !Utils.withinSecond(item.DatePayoutSchedule)

                            return (
                                (withinFirst || withinSecond) ? (
                                    <PayHistoryItem 
                                        item={item}
                                        currDeductions={deductionsData?.filter(itemFilter => itemFilter?.ID_Payroll === item?.ID_Payroll)}
                                        index={index}
                                        onHandleMore={onHandleMore}
                                    />
                                ) : null 
                            )
                        }}
                    />
                </Animatable.View>
            )}
        </>
    )
}