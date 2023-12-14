// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import * as Animatable from 'react-native-animatable';

import { COLORS, Utils, DateTimeUtils, RequestUtils, COMPONENT_STYLES } from "../../../constant";
import { SearchAndNew } from "../../use/SearchAndNew";
import RequestItem from "../../items/request/RequestItem"
import Loader from "../../loader/Loader";
import NothingFoundNote from "../../note/NothingFoundNote";

const data = [
    {
        status: 'Approved',  
        startDate: '20231103',
        endDate: '20231103',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '',
        attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
        documentNo: 'COS0001',
        filedDate: '20231102',
        statusBy: 'Mark Sasama',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
    { 
        status: 'Approved',  
        startDate: '20231014',
        endDate: '20231018',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '',
        attachedFile: '',
        documentNo: 'COS0002',
        filedDate: '20231115',
        statusBy: 'Mark Sasama',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
]

export default function ChangeOfSchedulePanel () {
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

    filteredData = data.filter((item) => {
        const formattedStartDate = DateTimeUtils.dateFullConvert(item.startDate)
        const formattedEndDate = DateTimeUtils.dateFullConvert(item.endDate)

        return (
            formattedStartDate.toLowerCase().includes(filterText.toLowerCase()) ||
            formattedEndDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.status.toLowerCase().includes(filterText.toLowerCase())
        )
    })
    
    const requestItemDisplay = ({ item, index }) => {
        return (
            <RequestItem 
                onPanel={0}
                item={item}
                index={index}
                newItem={{ ...item, 
                    formattedAppliedDate: RequestUtils.requestDateApplied(item), 
                    formattedFiledDate:  DateTimeUtils.dateFullConvert(item.filedDate), 
                    formattedStatusByDate:  DateTimeUtils.dateFullConvert(item.statusByDate),
                    formattedReviewedDate:  DateTimeUtils.dateFullConvert(item.reviewedDate),
                    requestType: "Change of Schedule"
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
            {isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                    <SearchAndNew 
                        filterText={filterText}
                        setFilterText={setFilterText}
                        onPanel={0}
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