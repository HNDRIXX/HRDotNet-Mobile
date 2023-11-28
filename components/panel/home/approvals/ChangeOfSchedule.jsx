import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import * as Animatable from 'react-native-animatable';
import Checkbox from 'expo-checkbox'
import moment from "moment";

import { COLORS, Utils, DateTimeUtils, RequestUtils } from "../../../../constant";
import { Search } from "../../../use/Search";
import RequestItem from "../../../items/request/RequestItem";
import ApprovalsAction from "../../../use/ApprovalsAction";
import Loader from "../../../loader/Loader";
import NothingFoundNote from "../../../note/NothingFoundNote";
import ApprovalsItem from "../../../items/home/ApprovalsItem";

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
            statusByName: 'Kenneth Parungao',
            statusByDate: '20231115',
            isChecked: false, 
        },
        {
            attachedFile: {"date": "20231124", "time": "13:38 PM", "uri": "file%3A%2F%2F%2Fdata%2Fuser%2F0%2Fhost.exp.exponent%2Fcache%2FExperienceData%2F%252540hndrx022%25252FHRDotNet-Mobile%2FCamera%2F596b713f-d6b4-4636-abaa-821eb3850257.jpg"},
            employeeName: 'Kel Jorge Cinco',
            date: '20231111',
            requestedSched: '8:00 AM - 5:00 PM',
            type: 'Change of Schedule',
            documentNo: 'COS22307240207',
            filedDate: '20231114',
            reason: '',
            status: 'Reviewed',
            statusByName: 'Kenneth Parungao',
            statusByDate: '20231115',
            isChecked: false, 
        },
    ])

    const [isLoading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('')
    const [selectAll, setSelectAll] = useState(false)
    const [filteredData, setFilteredData] = useState([]);

    const sortByDateAsync = async (data) => {
        return new Promise((resolve) => {
          const sorted = data.sort((a, b) => {
            const dateA = moment(a.date, 'YYYYMMDD');
            const dateB = moment(b.date, 'YYYYMMDD');
            return dateB - dateA
          });
          resolve(sorted);
        });
    };

    useEffect(() => {
        const sortData = async () => {
          const sort = await sortByDateAsync(data)
          setFilteredData(sort);
        };
    
        sortData()
    }, [data])

      
    const toggleSelectAll = () => {
        const updatedData = data.map(item => ({ ...item, isChecked: !selectAll }));
        setData(updatedData);
        setSelectAll(!selectAll);
    };

    return (
        <>
            {!isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={styles.container}
                >
                    <Search 
                        filterText={filterText}
                        setFilterText={setFilterText}
                        onPanel={0}
                    />

                    <ApprovalsAction 
                        setData={setData}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        toggleSelectAll={toggleSelectAll}
                    />

                    <FlatList 
                        data={filteredData}
                        style={styles.flatList}
                        renderItem={({ item, index }) => (
                            <View style={styles.rowView}>
                                <Checkbox
                                    color={COLORS.orange}
                                    style={styles.checkBox}
                                    value={item.isChecked}

                                    onValueChange={(newValue) => {
                                        const updatedData = [...data]
                                        updatedData[index].isChecked = newValue
                                        setData(updatedData)
                                    }}
                                />

                                <ApprovalsItem 
                                    item={item}
                                    onPanel={0}
                                    key={index}
                                />
                            </View>
                        )}
                    />
                </Animatable.View>
            )}
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

    flatList: {
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