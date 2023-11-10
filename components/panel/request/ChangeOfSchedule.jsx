import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign } from "@expo/vector-icons";
import moment from "moment/moment";

import { COLORS } from "../../../constant";
import { SearchAndNew } from "../../use/SearchAndNew";
import RequestItem from "../../items/request/RequestItem"

const data = [
    { 
        status: 'Approved',  
        appliedDate: '20231103',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        attachedFile: '-----',
        documentNo: 'COS22307248376',
        filedDate: '20231101',
        statusBy: 'Mark Sasama',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
    { 
        status: 'Approved',  
        appliedDate: '20231014',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        attachedFile: '-----',
        documentNo: 'COS22307248376',
        filedDate: '20230916',
        statusBy: 'Mark Sasama',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
    { 
        status: 'Cancelled',  
        appliedDate: '20231014',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        attachedFile: '-----',
        documentNo: 'COS22307248376',
        filedDate: '20231116',
        statusBy: 'Mark Sasama',
        statusByDate: '20230913',
        reviewedBy: 'Benjamin Peralta',
        reviewedDate: '20230916',
    },
]

export default function ChangeOfSchedulePanel ( onAnimate ) {
    const [isLoading, setIsLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    const dateToday =  moment("2023-11-16").format("YYYYMM")

    const dateThreshold = moment().clone().subtract(7, 'days')

    const [newCount1, setNewCount1] = useState(0)
    const [newCount2, setNewCount2] = useState(0)

    const filteredData = data.filter((newItem) => {
            const formattedDate = formattedDateString(newItem.appliedDate)
            const itemAppliedDate = moment(formattedDate, 'MMMM DD YYYY')
            
            return (
                newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
                formattedDate.toLowerCase().includes(filterText.toLowerCase())
            )
        }
    )


    useEffect(() => {
        let count1 = 0
        let count2 = 0

    
        filteredData.forEach((item) => {
        //   const formattedDate = formattedDateString(item.appliedDate)
        //   const itemAppliedDate = moment(formattedDate, 'MMMM DD YYYY')
    
        //   if (!itemAppliedDate.isBefore(dateThreshold)) {
        //     count1++
        //   }
    
        //   if (itemAppliedDate.isBefore(dateThreshold)) {
        //     count2++
        //   }
        
            if(moment(item.filedDate, "YYYYMMDD").format("YYYYMM") == dateToday){
                if (moment(item.filedDate, "YYYYMMDD").format("DD") <= 15){
                    count1++ 
                } else { count2++ }
                
            } else if (moment(item.filedDate, "YYYYMMDD").format("YYYYMM") > dateToday) {
                count2++
            } else { count2++ }        
        })
    
        setNewCount1(count1)
        setNewCount2(count2)
    }, [filteredData, dateThreshold])

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
    }, [])

    const requestItemDisplay = ({ item, index }) => {
        return (
            <RequestItem 
                onPanel={0}
                item={item}
                index={index}
                newItem={{ ...item, 
                    formattedAppliedDate: formattedDateString(item.appliedDate), 
                    formattedFiledDate: formattedDateString(item.filedDate), 
                    formattedStatusByDate: formattedDateString(item.statusByDate),
                    formattedReviewedDate: formattedDateString(item.reviewedDate),
                    requestType: "Change of Schedule"
                }}
                key={index}
            />
        )
    }
    
    // const date = moment().format("YYYYMM")

    // const dateFiled = "20231115"

    // const year = moment().format("YYYY")
    // const month = moment().format("MM")

    // const yearMonth = "202311"

    // if(moment(dateFiled, "YYYYMMDD").format("YYYYMM") == yearMonth){
    //     if (moment(dateFiled, "YYYYMMDD").format("DD") <= 15){
    //         console.log("FIRST HALF")
    //     } else ( console.log("SECOND HALF") )
        
    // } else if (moment(dateFiled, "YYYYMMDD").format("YYYYMM") > yearMonth) {
    //     console.log("WALANG GANUN TOL")
    // } else { console.log("LUMA")}

    useEffect(() => {

    })

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
                        onPanel={0}
                    />

                    { filteredData.length > 0 ? (
                        <ScrollView>
                            { newCount1 > 0 && (<Text style={styles.itemStatusText}>New</Text>) }

                            { filteredData.map((item, index) => {
                                {/* const itemDateFiled = moment(formattedDateString(item.itemDateFiled), 'MMMM DD YYYY') */}

                                {/* if (!itemAppliedDate.isBefore(dateThreshold)) {
                                    return (
                                        requestItemDisplay({ item, index })
                                    )
                                } */}

                                if (moment(item.filedDate, "YYYYMMDD").format("YYYYMM") == dateToday) {
                                    if (moment(item.filedDate, "YYYYMMDD").format("DD") <= 15) {
                                        return (requestItemDisplay({ item, index }))
                                    } 
                                }
                            })}

                            { newCount2 > 0 && (<Text style={styles.itemStatusText}>Earlier</Text>) }

                            { filteredData.map((item, index) => {
                                {/* const itemAppliedDate = moment(formattedDateString(item.appliedDate), 'MMMM DD YYYY') */}

                                if(moment(item.filedDate, "YYYYMMDD").format("YYYYMM") == dateToday){
                                    if (moment(item.filedDate, "YYYYMMDD").format("DD") <= 15){
                                        
                                    } else if (moment(item.filedDate, "YYYYMMDD").format("DD") >= 16) { return (requestItemDisplay({ item, index })) }
                                    
                                } else if (moment(item.filedDate, "YYYYMMDD").format("YYYYMM") > dateToday) {
                                    return (requestItemDisplay({ item, index }))
                                } else { return (requestItemDisplay({ item, index })) }  

                                {/* if (itemAppliedDate.isBefore(dateThreshold)) {
                                    return (
                                        requestItemDisplay({ item, index })
                                    )
                                } */}
                            })}
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