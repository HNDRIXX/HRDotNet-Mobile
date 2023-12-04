import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, STYLES, DateTimeUtils } from "../../../../constant";
import PageHeader from "../../../../components/header/PagesHeader";
import NotificationsItem from "../../../../components/items/home/NotificationsItem";
import { Shadow } from "react-native-shadow-2";
import Loader from "../../../../components/loader/Loader";

const data = [
    {
        name: "Request Update",
        date: "20231120",
        message: "Your Emergency Leave Doc. No, LV2230922165 has a new status. Please check the Requests pages for more details.",
        isReaded: 0
    },
    {
        name: "Advisory",
        date: "20231120",
        message: "Intellismart, Stock, Supersam, and Opulence, which were under Intellismart.",
        isReaded: 0
    },
    {
        name: "Approvals Update",
        date: "20231020",
        message: "You have new pending applications for approvals.",
        isReaded: 0
    },
]

export default function NotificationPage () {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(true)
    const [listData, setListData] = useState(data)

    const styles = STYLES.Notifications

    const handleNotificationPress = (index, item) => {
        const newData = [...listData]
        newData[index].isReaded = 1
        setListData(newData)

        navigation.navigate(
            'NotificationDetails', {
                name: item.name,
                message: item.message,
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [])

    return (
        <View style={styles.container}>
            <PageHeader pageName="Notifications" />

            { isLoading ? (<Loader />) : (
                <View style={styles.wrapper}> 
                    <Shadow distance={4} style={styles.shadowView}>
                        <FlatList 
                            style={styles.listView}
                            data={listData}
                            renderItem={({item, index}) => (
                                <NotificationsItem 
                                    item={item}
                                    index={index}
                                    formattedDate={DateTimeUtils.dateHalfMonthConvert(item.date)}
                                    onPress={handleNotificationPress}
                                />
                            )}
                        />
                    </Shadow>
                </View>
            )}
        </View>
    )
}