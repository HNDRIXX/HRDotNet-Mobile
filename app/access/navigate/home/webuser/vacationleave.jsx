import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

import { COLORS, ICONS, DateTimeUtils } from "../../../../../constant";

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
    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Vacation Leave</Text>
            </View>

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
                <Shadow distance={5} style={styles.creditShadow}>
                    <Text style={styles.creditsValue}>3.00</Text>
                </Shadow>
            </View>

            <Text style={styles.detailsTitle}>Details</Text>

            <FlatList 
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.itemWrapper}>
                            <Shadow distance={4} style={styles.shadowView}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite
    },

    backButton: {
        paddingHorizontal: 10,
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.powderBlue,
    },
    
    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 40,
    },

    button: {
        padding: 20,
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
    },

    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },

    shadowView: {
        width: '100%',
        borderRadius: 20,
    },

    titleText: {
        fontFamily: 'Inter_700Bold',
        color: COLORS.darkGray,  
        fontSize: 22,
    },

    yearText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.darkGray,
        fontSize: 18
    },

    yearValue: {
        color: COLORS.orange,
    },

    creditContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.clearWhite,
    },

    creditShadow: {
        borderRadius: 15,
    },

    creditsValue: {
        padding: 18,
        fontSize: 25,
        color: COLORS.orange,
        fontFamily: 'Inter_600SemiBold',
    },

    detailsTitle: {
        fontSize: 15,
        marginHorizontal: 20,
        marginTop: 20,
        fontFamily: 'Inter_600SemiBold',
    },

    itemWrapper: {
        backgroundColor: COLORS.clearWhite,
        margin: 10,
        borderRadius: 20,
        marginHorizontal: 20,
        elevation: 2,
    },

    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.tr_gray,
        padding: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    itemHeaderText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
    },

    itemBody: {
        padding: 15,
    },

    bodyText: {
        fontFamily: 'Inter_600SemiBold',
    },

    itemText: {
        fontFamily: 'Inter_400Regular'
    }
})