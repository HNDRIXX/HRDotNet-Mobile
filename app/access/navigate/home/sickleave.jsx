import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { Image } from "react-native-expo-image-cache";

import { COLORS, ICONS, STYLES, DateTimeUtils } from "../../../../constant";
import PageHeader from "../../../../components/header/PagesHeader";

const data = [
    {
        status: "Application",
        date: "20230823",
        leaveCredit: "1.50",
        documentNo: "LA2230702003"
    },
    {
        status: "Application",
        date: "20230818",
        leaveCredit: "-2.00",
        documentNo: "LA2230702003"
    },
    {
        status: "Application",
        date: "20230801",
        leaveCredit: "3.50",
        documentNo: "LA2230702003"
    },
]

export default function SickLeavePage ({ navigation }) {
    const styles = STYLES.SickLeave
    
    return (
        <View style={styles.container}>
            <PageHeader pageName={'Sick Leave'}/>

            <View style={styles.topContainer}>
                <Image 
                    style={{ width: 60, height: 60, marginRight: 15 }}
                    uri={ICONS.medicine}
                />

                <View>
                    <Text style={styles.titleText}>Available Credits</Text>
                    <Text style={styles.yearText}>for <Text style={styles.yearValue}>{DateTimeUtils.getCurrYear()}</Text></Text>
                </View>
            </View>

            <View style={styles.creditContainer}>
                <Shadow distance={3} style={styles.creditShadow}>
                    <Text style={styles.creditsValue}>1.50</Text>
                </Shadow>
            </View>

            <Text style={styles.detailsTitle}>Details</Text>
            
            <FlatList 
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.itemWrapper}>
                            <Shadow distance={3} offset={[2,2]} style={styles.shadowView}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemHeaderText}>{item.status}</Text>
                                    <Text style={styles.itemHeaderText}>{item.leaveCredit}</Text>
                                </View>

                                <View style={styles.itemBody}>
                                    <Text style={styles.bodyText}>Date: 
                                        <Text style={styles.itemText}> {DateTimeUtils.dateFullConvert(item.date)}</Text>
                                    </Text>

                                    <Text style={styles.bodyText}>Document No: 
                                        <Text style={styles.itemText}> {item.documentNo}</Text>
                                    </Text>
                                </View>
                            </Shadow>
                        </View>
                    )
                }}
            />
        </View>
    )
}