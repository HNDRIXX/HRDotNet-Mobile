import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Shadow } from "react-native-shadow-2";

import { COLORS } from "../../../../../constant";

export default function LoanDetails () {
    const params = useGlobalSearchParams()
    const loanItem = JSON.parse(params.newItem || '{}')
    // const detailsItem = JSON.parse(params.details || '{}')
    const details = loanItem.details

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.back()}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Loan Details</Text>
            </View>

            <Animatable.View
                animation={'fadeIn'}
                duration={800}
                easing={'ease-in-out'}
                style={{ opacity: 1, flex: 1 }}
            >
                <View style={styles.topContent(loanItem)}>
                    <Text style={styles.topText}>{loanItem.loanTitle}</Text>
                    
                    <View style={styles.rowWrapper}>
                        { loanItem.status == "Filed" ? (
                            <FontAwesome5 
                                name="file-import" 
                                size={17} 
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            />
                        ) : loanItem.status == "Reviewed" ? (
                            <MaterialCommunityIcons 
                                name="file-find" 
                                size={20} 
                                color={COLORS.clearWhite} 
                                style={{ marginRight: 10 }}
                            />
                        ) : loanItem.status == "Approved" ? (
                            <AntDesign
                                name="checkcircle"
                                size={17}
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            />
                        ) : loanItem.status == "Cancelled" ? (
                            <Entypo
                                name="circle-with-cross"
                                size={19}
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            /> 
                        ) : ( null )}

                        <Text style={styles.topText}>{loanItem.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow style={styles.content}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Source:</Text>
                            <Text style={styles.valueText}>{loanItem.source}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Loan Code LN:</Text>
                            <Text style={styles.valueText}>{loanItem.loanCode}</Text>
                        </View>

                        <View style={[styles.rowWrapper, {marginTop: 20}]}>
                            <Text style={styles.titleText}>Document No:</Text>
                            <Text style={styles.valueText}>{loanItem.documentNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Transaction Date:</Text>
                            <Text style={styles.valueText}>{loanItem.formattedTransactionDate}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Approved Date:</Text>
                            <Text style={styles.valueText}>{loanItem.formattedApprovedDate}</Text>
                        </View>

                        <View style={[styles.rowWrapper, {marginTop: 20}]}>
                            <Text style={styles.titleText}>Date Granted:</Text>
                            <Text style={styles.valueText}>{loanItem.formattedGrantedDate}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>First Due Date:</Text>
                            <Text style={styles.valueText}>{loanItem.formattedFirstDueDate}</Text>
                        </View>

                        <View style={[styles.rowWrapper, {marginTop: 20}]}>
                            <Text style={styles.titleText}>Reference No:</Text>
                            <Text style={styles.valueText}>{loanItem.referenceNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Loan Amount:</Text>
                            <Text style={styles.valueText}>{loanItem.loanAmount}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Disbursed Amount:</Text>
                            <Text style={styles.valueText}>{loanItem.disbursedAmount}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Cycle:</Text>
                            <Text style={styles.valueText}>{loanItem.cycle}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Installment Amount Per Month:</Text>
                            <Text style={styles.valueText}>{loanItem.installmentAmountPerMonth}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Total Installment Amount:</Text>
                            <Text style={styles.valueText}>{loanItem.totalInstallmentAmount}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Balance:</Text>
                            <Text style={styles.valueText}>{loanItem.balance}</Text>
                        </View>
                    </Shadow>
                </View>

                <Text style={styles.detailsTitle}>Details</Text>

                <FlatList 
                    data={details}
                    style={{ marginHorizontal: 20 }}
                    renderItem={({ item, index }) => {
                        if (item.documentNo === loanItem.documentNo) {
                            return (
                                <View style={styles.detailView}>
                                    <View style={styles.topDetail}>
                                        <Text style={styles.topText}>{loanItem.loanTitle}</Text>
                                        
                                        <View style={styles.topLeftDetail}>
                                            <Text style={styles.topText}>{loanItem.balance}</Text>
                                            <Text style={[styles.topText, { fontSize: 10, fontFamily: 'Inter_500Medium' }]}>Remaining Balance</Text>
                                        </View>
                                    </View>

                                    <View style={styles.bodyDetail}>
                                        <Text style={styles.boldText}>Payment Date:
                                        <Text style={styles.bodyText}> {item.paymentDate}</Text></Text>
                                        <Text style={styles.boldText}>Payment Amount:
                                        <Text style={styles.bodyText}> {item.paymentAmount}</Text></Text>
                                    </View>
                                </View>
                            )
                        }
                    }}
                />

            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        paddingHorizontal: 10,
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 40,
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
        marginRight: 50,
    },

    topContent: (item) => ({
        backgroundColor: 
            item.status == "Filed" ?
                COLORS.filed :
            item.status == "Reviewed" ?
                COLORS.purple :
            item.status == "Approved" ?
                COLORS.green :
            item.status == "Cancelled" ?
                COLORS.red
            : COLORS.tr_gray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
    }),

    topText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
    },

    container: {
        marginHorizontal: 30,
        marginVertical: 20,
    },

    content: {
        padding: 20,
        width: '100%',
        borderRadius: 20,
    },

    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 10,
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.black,
    },

    statusWrapper: {
        width: '80%',
    },
    
    detailsTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        marginHorizontal: 30,
    },

    detailView: {
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
        margin: 10,
        // elevation: 2
    },

    topDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.tr_gray,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    bodyDetail: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    topLeftDetail: {
        alignItems: 'center'
    },

    boldText: {
        fontFamily: 'Inter_700Bold'
    },

    bodyText: {
        fontFamily: 'Inter_500Medium'
    },

})