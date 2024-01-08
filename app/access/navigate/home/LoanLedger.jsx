// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Search } from '../../../../components/use/Search'
import { COLORS, STYLES, DateTimeUtils, Utils} from '../../../../constant'
import LoanLedgerItem from '../../../../components/items/home/LoanLedgerItem'
import PageHeader from '../../../../components/header/PagesHeader'
import NothingFoundNote from '../../../../components/note/NothingFoundNote'
import Loader from '../../../../components/loader/Loader';

export default function LoanLedgerPage () {
    const styles = STYLES.LoanLedger
    const [isLoading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('')
    const [data, setData] = useState([])
    const [details, setDetails] = useState([])

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    let filteredData = []

    filteredData = data?.filter((item) => {
        return (
            item.Name_LoanType.toLowerCase().includes(filterText.toLowerCase()) ||
            item.DocStatus.toLowerCase().includes(filterText.toLowerCase()) ||
            item.DocumentNo.toLowerCase().includes(filterText.toLowerCase()) || 
            Utils.amountFormat(item.Balance).toLowerCase().includes(filterText.toLowerCase())
        )
    })

    const refresh = () => {
        setRefreshing(true)
        setLoading(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID')
                const connValue = await AsyncStorage.getItem('conn')
                const portValue = await AsyncStorage.getItem('port')
      
                const response = await fetch(`http://${connValue}:${portValue}/api/loanLedger`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ IDEmployee: userID }),
                })
      
                const data = await response.json();
      
                // 2 - Approved
                //Name_LoanType, ID_DocStatus, Balance, DocumentNo,
        
                userID !== null ? 
                    response.ok ? setData(data) : alert(data.message)  
                : console.log('Not Found (userID)')

                setRefreshing(false)
                setLoading(false)
            } catch (error) {
                console.error(error)
            
                setRefreshing(false)
                setLoading(false)
            }
        }

        fetchData()
    }, [isLoading])
      

    useEffect(() => {
        const fetchDataDetails = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID')
                const connValue = await AsyncStorage.getItem('conn')
                const portValue = await AsyncStorage.getItem('port')

                const setPortValue = portValue !== null ? ':' + portValue : ''
      
                const response = await fetch(`http://${connValue}:${setPortValue}/api/loanLedgerDetails`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ IDEmployee: userID }),
                })
    
                const data = await response.json()
                
                userID !== null ? 
                    response.ok ? setDetails(data) : alert(data.message)  
                : console.log('Not Found (userID)')

                setRefreshing(false)
                setLoading(false)
            } catch (error) { 
                console.error(error)
                setRefreshing(false)
                setLoading(false)
            }
        }

        fetchDataDetails()
    }, [isLoading])

    return (
        <View style={styles.container}>
            <PageHeader pageName={"Loan Ledger"} />

            { isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                    <View style={{ marginHorizontal: 20 }}>
                        <Search 
                            filterText={filterText}
                            setFilterText={setFilterText}
                        />

                        { filteredData.length > 0 ? (
                            <>
                                <FlatList 
                                    ref={scrollViewRef}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={refresh} />
                                    }
                                    data={filteredData}

                                    renderItem={({ item, index}) => 
                                        <LoanLedgerItem 
                                            key={index}
                                            item={{ 
                                                ...item,
                                                details: details,
                                                formattedTransactionDate: DateTimeUtils.dateFullConvert(item.DateTransaction), 
                                                formattedApprovedDate:  DateTimeUtils.dateFullConvert(item.DateApproved),
                                                formattedGrantedDate: DateTimeUtils.dateFullConvert(item.DateGranted),
                                                formattedFirstDueDate: DateTimeUtils.dateFullConvert(item.DateFirstDue),
                                            }}
                                        />
                                    }
                                />
                            </>
                        ) : ( <NothingFoundNote /> )}
                    </View>
                </Animatable.View>
            )}
        </View>
    )
}