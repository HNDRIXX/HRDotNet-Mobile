import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment/moment";

import { COLORS, DateTimeUtils, Utils } from "../../../constant";
import PendingItem from "../../items/home/PendingItem";

const data = [
    { 
        status: 'Overtime',  
        date: '2023101',
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
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [filterText, setFilterText] = useState('')

    const currentDate = moment()
    const dateThreshold = currentDate.clone().subtract(7, 'days')

    useEffect(() => {
        const totalItems = data.length
        setFiledCount(totalItems)
    })

    const filteredData = data.filter((newItem) => {
            const formattedDate = formattedDateString(newItem.date)

            return (
                formattedDate.toLowerCase().includes(filterText.toLowerCase())
            )
        }
    )

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }    

    return (
        <Animatable.View
            animation={onAnimate ? 'fadeIn' : ''}
            duration={600}
            style={[styles.bodyContainer, {opacity: onAnimate ? 1 : 0,}]}
        >
            {/* <SearchAndNewRequest 
                filterText={filterText}
                setFilterText={setFilterText}
                toggleModal={toggleModal}
            /> */}

            { filteredData.length > 0 ? (
                <FlatList 
                    data={filteredData}
                    style={{ marginTop: 20 }}
                    renderItem={({item, index}) => {
                        const formattedDate = DateTimeUtils.dateHalfMonthConvert(item.date)
                        const appliedDate = DateTimeUtils.dateFullConvert(item.appliedDate)
                        const itemDate = moment(formattedDate, 'MMMM DD YYYY')

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
    )
}

const formattedDateString = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);

    return moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MMMM DD YYYY');
}

const styles = StyleSheet.create({
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