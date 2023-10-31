import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import moment from 'moment'

import { COLORS } from '../../../../../constant'
import LoanLedgerItem from '../../../../../components/items/home/LoanLedgerItem'

const data = [
    {
        status: "Approved",
        loanTitle: "SSS Salary Loan",
        balance: "10,554.93",
        documentNo: "LA22305230009",
        source: "Government Deduction",
        loanCode: "LN-SSS",
        transactionDate: "20230417",
        approvedDate: "20230419",
        grantedDate: "20230501",
        firstDueDate: "20230510",
        referenceNo: "SL201708181674086",
        loanAmount: "11,013.84",
        disbursedAmount: "11,013.84",
        cycle: "Period 1",
        installmentAmountPerMonth: "458.91",
        totalInstallmentAmount: "458.91",
    },
    {
        status: "Filed",
        loanTitle: "HDMF Salary Loan",
        balance: "3,671.93",
        documentNo: "LA22305230075",
        source: "Government Deduction",
        loanCode: "LN-SSS",
        transactionDate: "20230417",
        approvedDate: "20230419",
        grantedDate: "20230501",
        firstDueDate: "20230510",
        referenceNo: "SL201708181674086",
        loanAmount: "11,013.84",
        disbursedAmount: "11,013.84",
        cycle: "Period 1",
        installmentAmountPerMonth: "458.91",
        totalInstallmentAmount: "458.91",
    },
]

const details = [
    {
        loanTitle: "SSS Salary Loan",
        balance: "10,554.93",
        documentNo: "LA22305230009",
        paymentDate: "20230823",
        paymentAmount: "458.91",
    },
    {
        loanTitle: "HDMF Salary Loan",
        balance: "3,671.28",
        documentNo: "LA22305230075",
        paymentDate: "20230823",
        paymentAmount: "458.91",
    },
]
export default function LoanLedgerPage ({ navigation }) {
    const formattedDateString = (date) => {
        const year = date.substring(0, 4)
        const month = date.substring(4, 6)
        const day = date.substring(6)

        return moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MMMM DD YYYY')
    }

    return (
        <View>
             <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Loan Ledger</Text>
            </View>

            <FlatList 
                data={data}
                style={styles.loanLedgerList}
                renderItem={({item, index}) => {

                    return (
                        <LoanLedgerItem 
                            key={index}
                            newItem={{ 
                                ...item,
                                details: details,
                                formattedTransactionDate: formattedDateString(item.transactionDate), 
                                formattedApprovedDate: formattedDateString(item.approvedDate),
                                formattedGrantedDate: formattedDateString(item.grantedDate),
                                formattedFirstDueDate: formattedDateString(item.firstDueDate),
                            }}
                        />
                    )

                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    loanLedgerList: {
        marginHorizontal: 10,
        marginTop: 20,
    }
})