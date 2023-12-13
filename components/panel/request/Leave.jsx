import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import * as Animatable from 'react-native-animatable';

import { COLORS, Utils, DateTimeUtils, RequestUtils } from "../../../constant";
import { SearchAndNew } from "../../use/SearchAndNew";
import RequestItem from "../../items/request/RequestItem"
import Loader from "../../loader/Loader";
import NothingFoundNote from "../../note/NothingFoundNote";

const data = [
    { 
        status: 'Reviewed',  
        filedDate: '20231014',
        leaveType: 'Vacation Leave',
        reason: 'Family Vacation',
        attachedFile: '',
        documentNo: 'LV22307248376',
        startDate: '20230925',
        endDate: '20230925',
        statusBy: 'Kenneth Parungao',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
    { 
        status: 'Approved',  
        filedDate: '20231014',
        leaveType: 'Sick Leave',
        reason: 'Flu',
        attachedFile: '',
        documentNo: 'LV22307248376',
        startDate: '20230925',
        endDate: '20230927',
        filedDate: '20230916',
        statusBy: 'Kenneth Parungao',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
]

export default function LeavePanel () {
    const [isLoading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    const [newCount, setNewCount] = useState(0)
    const [earlierCount, setEarlierCount] = useState(0)

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)    

    const requestItemDisplay = ({ item, index }) => {
        return (
            <RequestItem 
                onPanel={4}
                item={item}
                index={index}
                newItem={{ ...item, 
                    formattedAppliedDate: RequestUtils.requestDateApplied(item), 
                    formattedFiledDate: DateTimeUtils.dateFullConvert(item.filedDate), 
                    formattedStatusByDate: DateTimeUtils.dateFullConvert(item.statusByDate),
                    formattedReviewedDate: DateTimeUtils.dateFullConvert(item.reviewedDate),
                    requestType: "Leave"
                }}
                key={index}
            />
        )
    }
    
    let filteredData = []

    filteredData = data.filter((newItem) => {
        const formattedStartDate = DateTimeUtils.dateFullConvert(newItem.startDate)
        const formattedEndDate = DateTimeUtils.dateFullConvert(newItem.endDate)
        
        return (
            newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
            formattedStartDate.toLowerCase().includes(filterText.toLowerCase()) || 
            formattedEndDate.toLowerCase().includes(filterText.toLowerCase())
        )
    })

    const refresh = () => {
        setRefreshing(true)
        setLoading(true)
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
      
    return (
        <>
            {isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                    <SearchAndNew 
                        onPanel={4}
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