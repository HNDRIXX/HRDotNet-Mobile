import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import moment from "moment";
import DashedLine from "react-native-dashed-line";
import { Image, CacheManager } from "react-native-expo-image-cache";
import { useNavigation } from "@react-navigation/native";

import { COLORS, ICONS } from "../../../../constant";
import PageHeader from "../../../../components/header/PagesHeader";
import NotificationsItem from "../../../../components/items/home/NotificationsItem";

const data = [
    {
        name: "Request Update",
        date: "20231020",
        message: "Your Emergency Leave Doc. No, LV2230922165 has a new status. Please check the Requests pages for more details.",
        isReaded: 0
    },
    {
        name: "Advisory",
        date: "20231018",
        message: "Intellismart, Stork, Supersam, and Opulence, which were under Intellismart Technology Inc., now have Tiktok accounts!",
        isReaded: 0 
    },
]

export default function NotificationPage () {
    const navigation = useNavigation()
    const [listData, setListData] = useState(data)

    const formattedDate = (date) => {
        return moment(date, "YYYYMMDD").format("MMM DD YYYY")
    }

    const handleNotificationPress = (index, item) => {
        const newData = [...listData]
        newData[index].isReaded = 9999
        setListData(newData)

        navigation.navigate(
            'NotificationDetails', {
                name: item.name,
                date: formattedDate(item.date),
                message: item.message,
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader pageName="Notifications" />

            <View style={styles.wrapper}> 
                <FlatList 
                    data={listData}
                    renderItem={({item, index}) => (
                        <NotificationsItem 
                            item={item}
                            index={index}
                            formattedDate={formattedDate}
                            onPress={handleNotificationPress}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {
        flex: 1,
        margin: 20,
        padding: 30,
        borderRadius: 20,
        backgroundColor: COLORS.clearWhite,
        elevation: 6,
    },
})