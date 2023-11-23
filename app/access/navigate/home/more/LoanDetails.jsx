import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { COLORS, Utils, DateTimeUtils } from "../../../../../constant";
import PageHeader from "../../../../../components/header/PagesHeader";

export default function LoanDetails ({ navigation }) {
    const loanItem = useRoute().params
    const detailsData = loanItem.details

    return (
        <>
            <PageHeader pageName={'Loan Details'} />

            <View style={styles.topContent(loanItem)}>
                    <Text style={styles.topText}>{loanItem.loanTitle}</Text>
                    
                    <View style={styles.rowWrapper}>
                        {Utils.statusIcon(loanItem.status)}

                        <Text style={styles.topText}>{loanItem.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow distance={3} style={styles.content}>
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
                            <Text style={styles.valueText}>{Utils.amountFormat(loanItem.loanAmount)}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Disbursed Amount:</Text>
                            <Text style={styles.valueText}>{Utils.amountFormat(loanItem.disbursedAmount)}</Text>
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
                            <Text style={styles.valueText}>{Utils.amountFormat(loanItem.balance)}</Text>
                        </View>
                    </Shadow>
                </View>

                <Text style={styles.detailsTitle}>Details</Text>

                <FlatList 
                    data={detailsData}
                    style={{ marginHorizontal: 20 }}
                    renderItem={({ item, index }) => {
                        if (item.documentNo === loanItem.documentNo) {
                            return (
                                <View style={styles.detailView}>
                                    <Shadow distance={3} style={styles.shadowView}>
                                        <View style={styles.topDetail}>
                                            <Text style={styles.topText}>{loanItem.loanTitle}</Text>
                                            
                                            <View style={styles.topLeftDetail}>
                                                <Text style={styles.topText}>{loanItem.balance}</Text>
                                                <Text style={[styles.topText, { fontSize: 10, fontFamily: 'Inter_500Medium' }]}>Remaining Balance</Text>
                                            </View>
                                        </View>

                                        <View style={styles.bodyDetail}>
                                            <Text style={styles.boldText}>Payment Date:
                                            <Text style={styles.bodyText}> {DateTimeUtils.dateFullConvert(item.paymentDate)}</Text></Text>
                                            <Text style={styles.boldText}>Payment Amount:
                                            <Text style={styles.bodyText}> {item.paymentAmount}</Text></Text>
                                        </View>
                                    </Shadow>
                                </View>
                            )
                        }
                    }}
                />
        </>
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
    },

    shadowView: {
        width: '100%',
        borderRadius: 20,
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