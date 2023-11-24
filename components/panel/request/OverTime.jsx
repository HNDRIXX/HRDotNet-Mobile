import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';

import { COLORS, Utils, DateTimeUtils } from "../../../constant";
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
    const [localData, setLocalData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    const [newCount, setNewCount] = useState(0)
    const [earlierCount, setEarlierCount] = useState(0)

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    let filteredData = []

    if (localData) {
        filteredData = data.filter((newItem) => {
            const formattedDate = DateTimeUtils.dateFullConvert(newItem.overtimeDate)
            
            return (
                newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
                formattedDate.toLowerCase().includes(filterText.toLowerCase())
            )
        })
    }

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 800)

        Utils.getHalf(setFirstHalf, setSecondHalf)
    }, [])

    useEffect(() => {
        Utils.dataItemCount(filteredData, setNewCount, setEarlierCount, isFirstHalf, isSecondHalf)
    }, [filteredData])

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
                        <ScrollView>
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