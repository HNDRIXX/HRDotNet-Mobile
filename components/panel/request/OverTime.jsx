// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import * as Animatable from 'react-native-animatable';

import { COLORS, Utils, DateTimeUtils, COMPONENT_STYLES } from "../../../constant";
import { SearchAndNew } from "../../use/SearchAndNew";
import RequestItem from "../../items/request/RequestItem"
import Loader from "../../loader/Loader";
import NothingFoundNote from "../../note/NothingFoundNote";

const data = [
    { 
        status: 'Filed',  
        overtimeDate: '20231014',
        overtimeHours: '7:00 AM - 4:00 PM',
        reason: 'QA Testing',
        attachedFile: {date: '20231014', time: '14:12', uri: ''},
        documentNo: 'OTS22307248376',
        filedDate: '20230911',
        statusBy: '',
        statusByDate: '',
        reviewedBy: '',
        reviewedDate: '',
    },
    { 
        status: 'Filed', 
        overtimeDate: '20230922',
        overtimeHours: '7:00 AM - 4:00 PM',
        location: '2138 Roxas Blvd., Manila',   
        reason: 'QA Testing',
        attachedFile: '',
        documentNo: 'OTS22307240207',
        filedDate: '20230911',
        statusBy: '',
        statusByDate: '',
        reviewedBy: '',
        reviewedDate: '',
    },
]

export default function OverTimePanel () {
    const styles = COMPONENT_STYLES.Request
    
    const [isLoading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    const [newCount, setNewCount] = useState(0)
    const [earlierCount, setEarlierCount] = useState(0)

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    let filteredData = []

    filteredData = data.filter((newItem) => {
        const formattedDate = DateTimeUtils.dateFullConvert(newItem.overtimeDate)
        
        return (
            newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
            formattedDate.toLowerCase().includes(filterText.toLowerCase())
        )
    })

    const requestItemDisplay = ({ item, index }) => {
        return (
            <RequestItem 
                onPanel={2}
                item={item}
                index={index}
                newItem={{ ...item, 
                    formattedOvertimeDate: DateTimeUtils.dateFullConvert(item.overtimeDate), 
                    formattedFiledDate: DateTimeUtils.dateFullConvert(item.filedDate), 
                    formattedStatusByDate: DateTimeUtils.dateFullConvert(item.statusByDate),
                    formattedReviewedDate: DateTimeUtils.dateFullConvert(item.reviewedDate),
                    requestType: "Overtime"
                }}
                key={index}
            />
        )
    }

    useEffect(() => {
        setTimeout(() => {
            setRefreshing(false)
            setLoading(false)
        }, 800)

        Utils.getHalf(setFirstHalf, setSecondHalf)
    }, [isLoading])

    useEffect(() => {
        Utils.dataItemCount(filteredData, setNewCount, setEarlierCount, isFirstHalf, isSecondHalf)
    }, [filteredData])

    const refresh = () => {
        setRefreshing(true)
        setLoading(true)
    }
      
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                   <SearchAndNew 
                        onPanel={2}
                        filterText={filterText}
                        setFilterText={setFilterText}
                    />

                    { filteredData.length > 0 ? (
                        <ScrollView
                            ref={scrollViewRef}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refresh} />
                            }
                        >
                            { newCount > 0 && (<Text style={styles.itemStatusText}>New</Text>) }

                            {filteredData
                                .filter((item) => {
                                    const withinFirst = isFirstHalf && Utils.withinFirst(item.filedDate)
                                    const withinSecond = isSecondHalf && Utils.withinSecond(item.filedDate)

                                    return withinFirst || withinSecond
                                })
                                .sort((a, b) => b.documentNo.localeCompare(a.documentNo))
                                .map((item, index) => requestItemDisplay({ item, index }))
                            }
                            
                            { earlierCount > 0 && (<Text style={styles.itemStatusText}>Earlier</Text>) }

                            {filteredData
                                .filter((item) => {
                                    const withinFirst = isFirstHalf && !Utils.withinFirst(item.filedDate)
                                    const withinSecond = isSecondHalf && !Utils.withinSecond(item.filedDate)

                                    return withinFirst || withinSecond
                                })
                                .sort((a, b) => b.documentNo.localeCompare(a.documentNo))
                                .map((item, index) => requestItemDisplay({ item, index }))
                            }
                        </ScrollView>
                    ) : ( <NothingFoundNote /> )}
                </Animatable.View>
            )}
        </>
    )
}