import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import * as Animatable from 'react-native-animatable';
import Checkbox from 'expo-checkbox'
import moment from "moment";

import { Search } from "../../../use/Search";
import ApprovalsAction from "../../../use/ApprovalsAction";
import Loader from "../../../loader/Loader";
import NothingFoundNote from "../../../note/NothingFoundNote";
import ApprovalsItem from "../../../items/home/ApprovalsItem";
import { COLORS, Utils, DateTimeUtils, RequestUtils } from "../../../../constant";
import ConfirmationPrompt from "../../../prompt/approvals/ConfirmationPrompt";
import SuccessPromptPage from "../../../prompt/SuccessPrompt";

export default function ChangeOfSchedulePanel () {
    const [data, setData] = useState([
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Kel Jorge Cinco',
            date: '20231118',
            requestedSched: '8:00 AM - 5:00 PM',
            type: 'Change of Schedule',
            documentNo: 'COS22307240207',
            filedDate: '20231114',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isChecked: false, 
        },
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Henry Balani Valerio',
            date: '20231113',
            requestedSched: '8:30 AM - 5:30 PM',
            type: 'Change of Schedule',
            documentNo: 'COS22302932712',
            filedDate: '20231115',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isChecked: false, 
        },
    ])

    const [filterText, setFilterText] = useState('')
    const [sortedData, setSortedData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [checkedCount, setCheckedCount] = useState(null)

    const [isVisible, setVisible] = useState(false)
    const [isSuccessPrompt, setSuccessPrompt] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [selectAll, setSelectAll] = useState(false)
    const [isDisabled, setDisabled] = useState(true)

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    const sortByDateAsync = async (data) => {
        return new Promise((resolve) => {
            const sorted = data.sort((a, b) => {
                const dateA = moment(a.date, 'YYYYMMDD')
                const dateB = moment(b.date, 'YYYYMMDD')
                return dateB - dateA
            })
            
            resolve(sorted)
        })
    }
    
    const filterData = () => {
        const filtered = sortedData.filter((item) => {
            const formattedDate = DateTimeUtils.dateFullConvert(item.date)
        
            return (
                formattedDate.toLowerCase().includes(filterText.toLowerCase()) ||
                item.employeeName.toLowerCase().includes(filterText.toLowerCase()) ||
                item.requestedSched.toLowerCase().includes(filterText.toLowerCase())
            )
        })
    
        setFilteredData(filtered)
    }

    useEffect(() => {
        const sortData = async () => {
            setLoading(true)
            const sort = await sortByDateAsync(data)
            setSortedData(sort)
            setLoading(false)
        }
    
        sortData()
    }, [data])

    useEffect(() => {
        filterData()
    }, [sortedData, filterText])

    useEffect(() => {
        setCheckedCount(filteredData.filter(item => item.isChecked).length)
    }, [selectAll, filterData])

    const toggleSelectAll = () => {
        const updatedData = data.map(item => ({ ...item, isChecked: !selectAll }))
        setFilteredData(updatedData)
        setSelectAll(!selectAll)
    }

    const refresh = () => {
        setRefreshing(true)
        setLoading(true)
    }

    return (
        <>
            {isLoading ? ( <Loader /> ) : (
                <View style={styles.container}>
                    <Search 
                        filterText={filterText}
                        setFilterText={setFilterText}
                        onPanel={0}
                    />

                    <ApprovalsAction 
                        isDisabled={filteredData.every(item => !item.isChecked)}
                        selectAll={selectAll}
                        toggleSelectAll={toggleSelectAll}
                        isVisible={isVisible}
                        onHandleApprove={() => setVisible(true)}
                    />
                    
                    {filteredData.length > 0 ? (
                        <ScrollView
                            ref={scrollViewRef}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refresh} />
                            }
                        >
                            <Animatable.View
                                animation={'fadeIn'}
                                duration={500}
                            >
                                <View style={styles.itemView}>
                                    {filteredData
                                        .filter(item => item.status === "Reviewed")
                                        .map((item, index) => (
                                        <View 
                                            style={styles.rowView}
                                            key={index}
                                        >
                                            <Checkbox
                                                color={COLORS.orange}
                                                style={styles.checkBox}
                                                value={item.isChecked}

                                                onValueChange={(newValue) => {
                                                    const updatedData = [...data]
                                                    updatedData[index].isChecked = newValue
                                                    setFilteredData(updatedData)
                                                }}
                                            />

                                            <ApprovalsItem 
                                                item={item}
                                                onPanel={0}
                                                key={index}
                                            />
                                        </View>
                                    ))}
                                </View>
                            </Animatable.View>
                        </ScrollView>
                    ) : ( <NothingFoundNote /> )}
                </View>
            )}

            <ConfirmationPrompt 
                isVisible={isVisible}
                setVisible={setVisible}
                subTitle={`<b><u>${checkedCount} COS Request/s</u></b> are selected for <b><u>approval.</u></b>${'\n'}Continue?`}
                onHandlePress={() => {
                    setVisible(false)
                    setSuccessPrompt(true)
                }}
            />

            <SuccessPromptPage
                title={"Success!"}
                subTitle={`You have successfully approved${'\n'}<b><u>${checkedCount} COS Request/s!</u></b>`}
                buttonText={"OKAY"}
                visible={isSuccessPrompt} 
                onClose={() => setSuccessPrompt(false)} 
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        opacity: 1, 
        flex: 1, 
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 20
    },

    bodyContainer: {
        flex: 1,
    },

    itemView: {
        marginTop: 20,
    },
    
    itemStatusText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        padding: 10,
        fontSize: 18,
        marginHorizontal: 15
    },

    rowView: {
        flexDirection: 'row',
        borderBottomColor: COLORS.darkGray,
        borderBottomWidth: 1.5
    },

    checkBox: {
        marginTop: 15, 
        borderColor: COLORS.orange, 
        borderWidth: 2 
    },
})