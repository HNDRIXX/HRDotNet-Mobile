import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

import { COLORS, ICONS, STYLES, DateTimeUtils } from "../../../../constant";
import PageHeader from "../../../../components/header/PagesHeader";

const data = [
    {
        status: "Adjustment",
        date: "20230823",
        leaveCredit: "3.00",
        documentNo: "LA2230702003"
    },
    {
        status: "Adjustment",
        date: "20230818",
        leaveCredit: "-2.00",
        documentNo: "LA2230702003"
    },
    {
        status: "Adjustment",
        date: "20230801",
        leaveCredit: "5.00",
        documentNo: "LA2230702003"
    },
]

export default function VacationLeavePage ({ navigation }) {
    const styles = STYLES.VacationLeave
    
    return (
        <View style={styles.container}>
            <PageHeader pageName={'Vacation Leave'} />

            <View style={styles.topContainer}>
                <Image 
                    style={{ width: 70, height: 70, marginRight: 10 }}
                    uri={ICONS.vacation}
                />

                <View>
                    <Text style={styles.titleText}>Available Credits</Text>
                    <Text style={styles.yearText}>for <Text style={styles.yearValue}>{DateTimeUtils.getCurrYear()}</Text></Text>
                </View>
            </View>

            <View style={styles.creditContainer}>
                <Shadow distance={3} style={styles.creditShadow}>
                    <Text style={styles.creditsValue}>3.00</Text>
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