import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import * as Animatable from 'react-native-animatable';

import { COLORS, Utils, DateTimeUtils } from "../../../constant";
import { SearchAndNew } from "../../use/SearchAndNew";
import RequestItem from "../../items/request/RequestItem"
import Loader from "../../loader/Loader";
import NothingFoundNote from "../../note/NothingFoundNote";

const data = [
    { 
        status: 'Cancelled',  
        overtimeDate: '20231014',
        overtimeHours: '7:00 AM - 4:00 PM',
        reason: '',
        attachedFile: '',
        documentNo: 'OFF22307248376',
        filedDate: '20230916',
        statusBy: 'Kenneth Parungao',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
]

export default function OffSetPanel () {
    const [isLoading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    const [newCount, setNewCount] = useState(0)
    const [earlierCount, setEarlierCount] = useState(0)

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    let filteredData = []

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    filteredData = data.filter((newItem) => {
        const formattedDate = DateTimeUtils.dateFullConvert(newItem.overtimeDate)
        
        return (
            newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
            formattedDate.toLowerCase().includes(filterText.toLowerCase()) 
        )
    })

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

    const requestItemDisplay = ({ item, index }) => {
        return (
            <RequestItem 
                onPanel={3}
                item={item}
                index={index}
                newItem={{ ...item, 
                    formattedOvertimeDate: DateTimeUtils.dateFullConvert(item.overtimeDate), 
                    formattedFiledDate: DateTimeUtils.dateFullConvert(item.filedDate), 
                    formattedStatusByDate: DateTimeUtils.dateFullConvert(item.statusByDate),
                    formattedReviewedDate: DateTimeUtils.dateFullConvert(item.reviewedDate),
                    requestType: "Offset"
                }}
                key={index}
            />
        )
    }
      
    return (
        <>
            {isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                    <SearchAndNew 
                        onPanel={3}
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

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
    },

    itemStatusText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        padding: 10,
        fontSize: 18,
        marginHorizontal: 15
    },
})