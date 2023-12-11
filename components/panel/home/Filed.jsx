import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';

import { Search } from "../../use/Search";
import Loader from "../../../components/loader/Loader"
import { COLORS, DateTimeUtils, Utils } from "../../../constant";
import NothingFoundNote from "../../../components/note/NothingFoundNote"
import PendingItem from "../../items/home/PendingItem";

const data = [
    { 
        status: 'Overtime',  
        date: '20231001',
        appliedDate: '20231005',
    },
    { 
        status: 'Overtime', 
        date: '20230922',
        appliedDate: '20230925',
    },
    { 
        status: 'Overtime',
        date: '20230923',
        appliedDate: '20230927',
    },
    { 
        status: 'Overtime',
        date: '20230927',
        appliedDate: '20230930',
    },
] 

export default function FiledPanel ({ onAnimate, setFiledCount} ) {
    const [isLoading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState('')

    useEffect(() => {
        const totalItems = data.length
        setFiledCount(totalItems)

        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])

    let filteredData = []
    filteredData = data.filter((item) => {
        const formattedDate = DateTimeUtils.dateFullConvert(item.date)

        return (
            formattedDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.status.toLowerCase().includes(filterText.toLowerCase())
        )
    }) 

    return (
        <>
            { isLoading ? (<Loader />) : (
                <Animatable.View
                    animation={onAnimate ? 'fadeIn' : ''}
                    duration={600}
                    style={[styles.bodyContainer, {opacity: onAnimate ? 1 : 0,}]}
                >
                    <View style={{ marginHorizontal: 20 }}>
                        <Search 
                            filterText={filterText}
                            setFilterText={setFilterText}
                        />
                    </View>

                    { filteredData.length > 0 ? (
                        <FlatList 
                            data={filteredData}
                            renderItem={({item, index}) => {
                                const formattedDate = DateTimeUtils.dateHalfMonthConvert(item.date)
                                const appliedDate = DateTimeUtils.dateFullConvert(item.appliedDate)

                                return (
                                    <PendingItem 
                                        onPanel={0}
                                        item={item}
                                        index={index}
                                        lastIndex={data.length - 1}
                                        newItem={{ ...item, formattedDate: formattedDate, appliedDate: appliedDate }}
                                    />
                                )
                            }}
                        />
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
})