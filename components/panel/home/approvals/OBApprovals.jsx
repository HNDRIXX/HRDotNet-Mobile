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
import { COLORS, STRINGS, Utils, ApprovalsUtils, DateTimeUtils, COMPONENT_STYLES } from "../../../../constant";
import ConfirmationPrompt from "../../../prompt/approvals/ConfirmationPrompt";
import SuccessPromptPage from "../../../prompt/SuccessPrompt";

export default function OBApprovals () {
    const styles = COMPONENT_STYLES.PanelApprovals
    
    const [data, setData] = useState([
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Kel Jorge Cinco',
            type: 'Official Work',
            documentNo: 'OB22307240207',
            filedDate: '20231120',
            officialWorkDate: '20231118',
            officialWorkTime: '8:00 AM to 6:00 PM',
            location: 'Sofitel Philippine Plaza, Manila',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isCOS: 1,
            isChecked: false, 
        },
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Henry Balani Valerio',
            type: 'Official Work',
            documentNo: 'OB22307240207',
            filedDate: '20231120',
            officialWorkDate: '20231118',
            officialWorkTime: '8:00 AM to 6:00 PM',
            location: 'Sofitel Philippine Plaza, Manila',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isCOS: 1,
            isChecked: false,
        },
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Jessa Pana Galvez',
            type: 'Official Work',
            documentNo: 'OB22307240207',
            filedDate: '20231120',
            officialWorkDate: '20231118',
            officialWorkTime: '8:00 AM to 6:00 PM',
            location: 'Sofitel Philippine Plaza, Manila',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isCOS: 0,
            isChecked: false, 
        },
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Mary Grace Manalo',
            type: 'Official Work',
            documentNo: 'OB22307240207',
            filedDate: '20231120',
            officialWorkDate: '20231118',
            officialWorkTime: '8:00 AM to 6:00 PM',
            location: 'Sofitel Philippine Plaza, Manila',
            reason: '',
            status: 'Reviewed',
            reviewedBy: 'Kenneth Parungao',
            reviewedDate: '20231115',
            isCOS: 0,
            isChecked: false,
        },
    ])

    const [filterText, setFilterText] = useState('')
    const [sortedData, setSortedData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [checkCount, setCheckCount] = useState(null)
    const [pendingCount, setPendingCount] = useState(null)
    const [prevCount, setPrevCount] = useState(0)

    const [isVisible, setVisible] = useState(false)
    const [isConfirmSelection, setConfirmSelection] = useState(false)
    const [isSuccessPrompt, setSuccessPrompt] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [selectAll, setSelectAll] = useState(false)

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    const onRefresh = useCallback(() => {
        setLoading(true)
        setRefreshing(true)
    
        setTimeout(() => {
            setLoading(false)
            setRefreshing(false)
        }, 3000)
    }, []) 

    const onHandleApprove = () => {
        setVisible(true)

        if (pendingCount > 0) {
            setConfirmSelection(true)
        } else {
            setConfirmSelection(false)
        }
    }

    const onHandleConfirmApprove = () => {
        setSelectAll(false)
        setVisible(false)
        setPrevCount(0)
        let count = 1

        const dataSet = [...filteredData]
    
        for (let i = 0; i < dataSet.length; i++) {
            if (dataSet[i].isChecked && dataSet[i].isCOS == 1 && dataSet[i].status !== 'Approve') {
                dataSet[i].status = 'Approve'
                setPrevCount(count++)
            }
            dataSet[i].isChecked = false
        }

        const updatedData = dataSet.filter(item => item.status !== 'Approve')
        
        setData(updatedData)
        setFilteredData(updatedData)
        setSuccessPrompt(true)
    }

    useEffect(() => {
        const sortData = async () => {
            setLoading(true)
            const sort = await ApprovalsUtils.sortByDateAsync(data)
            setSortedData(sort)
            setFilteredData(sort)
            setLoading(false)
        }

        sortData()
    }, [data])

    useEffect(() => {
        ApprovalsUtils.onFilterData(1, sortedData, filterText, setFilteredData)
    }, [filterText])    

    useEffect(() => {
        setCheckCount(filteredData.filter(item => item.isChecked).length)
        setPendingCount(filteredData.filter(item => item.isChecked && item.isCOS === 0).length)
    }, [selectAll, filteredData])

    useEffect(() => {
        setPrevCount(checkCount)
    }, [isVisible])

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
                        
                        toggleSelectAll={() => ApprovalsUtils.toggleSelectAll(filteredData, setFilteredData, 
                        selectAll, setSelectAll, setSortedData)}

                        isVisible={isVisible}
                        onHandleApprove={onHandleApprove}
                    />
                    
                    {filteredData.length > 0 ? (
                        <ScrollView
                            ref={scrollViewRef}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[COLORS.powderBlue]}/>
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

                                                onValueChange={(value) => ApprovalsUtils.onCheckboxValueChange(filteredData, value, index, setSelectAll, setFilteredData)}
                                            />

                                            <ApprovalsItem 
                                                item={item}
                                                onPanel={1}
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
                subTitle={
                    isConfirmSelection ? STRINGS.pendingCOSConfirmation(pendingCount, checkCount) : STRINGS.approvalsConfirmation(checkCount)
                }
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