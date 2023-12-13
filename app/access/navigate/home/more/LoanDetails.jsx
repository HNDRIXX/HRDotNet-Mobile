// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

import { COLORS, STYLES, Utils, DateTimeUtils } from "../../../../../constant";
import PageHeader from "../../../../../components/header/PagesHeader";

export default function LoanDetails ({ navigation }) {
    const params = useRoute().params
    const detailsData = params.details
    const styles = STYLES.LoanDetails(params)

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.clearWhite }}>
            <PageHeader pageName={'Loan Details'} />

            <View style={styles.topContent}>
                    <Text style={styles.topText}>{params.loanTitle}</Text>
                    
                    <View style={styles.rowWrapper}>
                        {Utils.statusIcon(params.status)}

                        <Text style={styles.topText}>{params.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow distance={3} style={styles.content}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Source:</Text>
                            <Text style={styles.valueText}>{params.source}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Loan Code LN:</Text>
                            <Text style={styles.valueText}>{params.loanCode}</Text>
                        </View>

                        <View style={[styles.rowWrapper, {marginTop: 20}]}>
                            <Text style={styles.titleText}>Document No:</Text>
                            <Text style={styles.valueText}>{params.documentNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Transaction Date:</Text>
                            <Text style={styles.valueText}>{params.formattedTransactionDate}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Approved Date:</Text>
                            <Text style={styles.valueText}>{params.formattedApprovedDate}</Text>
                        </View>

                        <View style={[styles.rowWrapper, {marginTop: 20}]}>
                            <Text style={styles.titleText}>Date Granted:</Text>
                            <Text style={styles.valueText}>{params.formattedGrantedDate}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>First Due Date:</Text>
                            <Text style={styles.valueText}>{params.formattedFirstDueDate}</Text>
                        </View>

                        <View style={[styles.rowWrapper, {marginTop: 20}]}>
                            <Text style={styles.titleText}>Reference No:</Text>
                            <Text style={styles.valueText}>{params.referenceNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Loan Amount:</Text>
                            <Text style={styles.valueText}>{Utils.amountFormat(params.loanAmount)}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Disbursed Amount:</Text>
                            <Text style={styles.valueText}>{Utils.amountFormat(params.disbursedAmount)}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Cycle:</Text>
                            <Text style={styles.valueText}>{params.cycle}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Installment Amount Per Month:</Text>
                            <Text style={styles.valueText}>{params.installmentAmountPerMonth}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Total Installment Amount:</Text>
                            <Text style={styles.valueText}>{params.totalInstallmentAmount}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Balance:</Text>
                            <Text style={styles.valueText}>{Utils.amountFormat(params.balance)}</Text>
                        </View>
                    </Shadow>
                </View>

                <Text style={styles.detailsTitle}>Details</Text>

                <FlatList 
                    data={detailsData}
                    style={{ marginHorizontal: 20 }}
                    renderItem={({ item, index }) => {
                        if (item.documentNo === params.documentNo) {
                            return (
                                <View style={styles.detailView}>
                                    <Shadow distance={3} style={styles.shadowView}>
                                        <View style={styles.topDetail}>
                                            <Text style={styles.topText}>{params.loanTitle}</Text>
                                            
                                            <View style={styles.topLeftDetail}>
                                                <Text style={styles.topText}>{Utils.amountFormat(params.balance)}</Text>
                                                <Text style={[styles.topText, { fontSize: 10, fontFamily: 'Inter_500Medium' }]}>Remaining Balance</Text>
                                            </View>
                                        </View>

                                        <View style={styles.bodyDetail}>
                                            <Text style={styles.boldText}>Payment Date:
                                            <Text style={styles.bodyText}> {DateTimeUtils.dateFullConvert(item.paymentDate)}</Text></Text>
                                            <Text style={styles.boldText}>Payment Amount:
                                            <Text style={styles.bodyText}> {Utils.amountFormat(item.paymentAmount)}</Text></Text>
                                        </View>
                                    </Shadow>
                                </View>
                            )
                        }
                    }}
                />
        </View>
    )
}