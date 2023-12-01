// HRDotNet-Mobile
// Designed by : Alex
// Developed by: Patrick 

import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import * as Animatable from 'react-native-animatable';
import Checkbox from 'expo-checkbox'
import moment from "moment";

import { Search } from "../../../use/Search";
import ApprovalsAction from "../../../use/ApprovalsAction";
import Loader from "../../../loader/Loader";
import NothingFoundNote from "../../../note/NothingFoundNote";
import ApprovalsItem from "../../../items/home/ApprovalsItem";
import { COLORS, STRINGS, Utils, DateTimeUtils, COMPONENT_STYLES } from "../../../../constant";
import ConfirmationPrompt from "../../../prompt/approvals/ConfirmationPrompt";
import SuccessPromptPage from "../../../prompt/SuccessPrompt";

export default function OSApprovals () {
    const styles = COMPONENT_STYLES.PanelApprovals

    const [data, setData] = useState([
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Kel Jorge Cinco',
            COSDate: '20231118',
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
            COSDate: '20231113',
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
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Jessa Pana Galvez',
            COSDate: '20231115',
            requestedSched: '9:00 AM - 6:00 PM',
            type: 'Change of Schedule',
            documentNo: 'COS22302932712',
            filedDate: '20231115',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isChecked: false, 
        },
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Mary Grace Manalo',
            COSDate: '20231112',
            requestedSched: '1:00 AM - 10:00 PM',
            type: 'Change of Schedule',
            documentNo: 'COS22302932712',
            filedDate: '20231113',
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
    const [checkCount, setCheckCount] = useState(null)
    const [prevCount, setPrevCount] = useState(null)

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
            const formattedDate = DateTimeUtils.dateFullConvert(item.COSDate)
        
            return (
                formattedDate.toLowerCase().includes(filterText.toLowerCase()) ||
                item.employeeName.toLowerCase().includes(filterText.toLowerCase()) ||
                item.requestedSched.toLowerCase().includes(filterText.toLowerCase())
            )
        })
    
        setFilteredData(filtered)
    }

    const toggleSelectAll = () => {
        const updatedData = data.map(item => ({ ...item, isChecked: !selectAll }))
        setFilteredData(updatedData)
        setSelectAll(!selectAll)
    }

    const onRefresh = useCallback(() => {
        setLoading(true)
        setRefreshing(true)
    
        setTimeout(() => {
            setLoading(false)
            setRefreshing(false)
        }, 3000)
    }, []) 

    const onHandleConfirmApprove = () => {
        setSelectAll(false)
        setVisible(false)
        
        const dataSet = [...filteredData]
    
        for (let i = 0; i < dataSet.length; i++) {
            if (dataSet[i].isChecked && dataSet[i].status !== 'Approve') {
                dataSet[i].status = 'Approve'
            }
        }

        const updatedData = dataSet.filter(item => item.status !== 'Approve')
        
        setData(updatedData)
        setFilteredData(updatedData)
        setSuccessPrompt(true)
    }

    const onCheckboxValueChange = (value) => {
        setSelectAll(false)
        const updatedData = [...filteredData]
        updatedData[index].isChecked = value
        setFilteredData(updatedData)
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
        setPrevCount(checkCount)
    }, [isVisible])

    useEffect(() => {
        filterData()
    }, [sortedData, filterText])

    useEffect(() => {
        setCheckCount(filteredData.filter(item => item.isChecked).length)
    }, [selectAll, filterData])

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
                                    onRefresh={onRefresh} />
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

                                                onValueChange={(value) => onCheckboxValueChange(value)}
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
                subTitle={STRINGS.approvalsConfirmation(checkCount)}
                onHandlePress={onHandleConfirmApprove}
            />

            <SuccessPromptPage
                title={"Success!"}
                subTitle={STRINGS.approvalSuccess(prevCount)}
                buttonText={"OKAY"}
                visible={isSuccessPrompt} 
                onClose={() => setSuccessPrompt(false)} 
            />
        </>
    )
}