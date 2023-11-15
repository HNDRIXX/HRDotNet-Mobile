import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign } from "@expo/vector-icons";
import moment from "moment/moment";

import { COLORS, Utils, DateTimeUtils } from "../../../constant";
import { SearchAndNew } from "../../use/SearchAndNew";
import RequestItem from "../../items/request/RequestItem"

const data = [
    { 
        status: 'Approved',  
        officialWorkDate: '20231014',
        officialWorkTime: '7:00 AM - 4:00 PM',
        location: 'Sofitel Philippine Plaza, Manila',
        reason: 'Client Meeting',
        attachedFile: '-----',
        documentNo: 'OBS22307248376',
        filedDate: '20230916',
        statusBy: 'Kenneth Parungao',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
    { 
        status: 'Cancelled', 
        officialWorkDate: '20230922',
        officialWorkTime: '7:00 AM - 4:00 PM',
        location: '2138 Roxas Blvd., Manila',   
        reason: 'Client Meeting',
        attachedFile: '-----',
        documentNo: 'OBS22307240207',
        filedDate: '20230916',
        statusBy: 'Kenneth Parungao',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
]

export default function OfficialWorkPanel ( onAnimate ) {
    const [isLoading, setIsLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    const [newCount, setNewCount] = useState(0)
    const [earlierCount, setEarlierCount] = useState(0)

    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const filteredData = data.filter((newItem) => {
        const formattedDate = DateTimeUtils.dateFullConvert(newItem.appliedDate)
        
        return (
            newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
            formattedDate.toLowerCase().includes(filterText.toLowerCase())
        )
    })

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
                onPanel={1}
                item={item}
                index={index}
                newItem={{ ...item, 
                    formattedOfficialWorkDate: formattedDateString(item.officialWorkDate), 
                    formattedFiledDate: formattedDateString(item.filedDate), 
                    formattedStatusByDate: formattedDateString(item.statusByDate),
                    formattedReviewedDate: formattedDateString(item.reviewedDate),
                    requestType: "Official Work"
                }}
                key={index}
            />
        )
    }
      
    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.powderBlue} style={styles.loader} />
            ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1 }}
                >
                   <SearchAndNew 
                        filterText={filterText}
                        setFilterText={setFilterText}
                        onPanel={1}
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
                    ) : ( 
                        <View style={styles.noSearchWrapper}>
                            <AntDesign
                                name="search1"
                                size={55}
                                color={COLORS.darkGray}
                                style={{ padding: 20 }}
                            />
                            <Text>No Search Found.</Text>
                        </View>
                    )}
                </Animatable.View>
            )}
        </>
    )
}

const formattedDateString = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6);

    return moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MMMM DD YYYY');
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    bodyContainer: {
        flex: 1,
    },

    titleText: {
        fontSize: 25,
        fontFamily: 'Inter_600SemiBold',
        margin: 10,
    },

    moreText: {
        fontSize: 12,
        color: COLORS.tr_gray,
        paddingTop: 10,
    },

    itemStatusText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        padding: 10,
        fontSize: 18,
        marginHorizontal: 15
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
      
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },

    closeBtn: {
        padding: 10,
        width: 100,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
    },

    closeText: {
        color: COLORS.white,
        fontFamily: 'Inter_500Medium',
    },

    noSearchWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})