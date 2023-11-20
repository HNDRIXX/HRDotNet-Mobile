import { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Search } from '../../../../../components/use/Search'
import { DateTimeUtils } from '../../../../../constant'
import LoanLedgerItem from '../../../../../components/items/home/LoanLedgerItem'
import PageHeader from '../../../../../components/header/PagesHeader'
import NothingFoundNote from '../../../../../components/note/NothingFoundNote'

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
export default function LoanLedgerPage () {
    const [filterText, setFilterText] = useState('')

    const [refreshing, setRefreshing] = useState(false)
    const scrollViewRef = useRef(null)

    let filteredData = []

    filteredData = data.filter((newItem) => {
        return (
            newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
            newItem.loanTitle.toLowerCase().includes(filterText.toLowerCase())
        )
    })

    const refresh = () => {
        setRefreshing(true)
        // setLoading(true)
        // fetchData()
    }

    return (
        <View>
            <PageHeader pageName={"Loan Ledger"} />

            <Search 
                filterText={filterText}
                setFilterText={setFilterText}
            />

            { filteredData.length > 0 ? (
                <ScrollView
                    ref={scrollViewRef}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh} />
                    }
                    style={styles.loanLedgerList}
                >
                    {filteredData.map((item, index) => (
                        <LoanLedgerItem 
                            key={index}
                            newItem={{ 
                                ...item,
                                details: details,
                                formattedTransactionDate: DateTimeUtils.dateFullConvert(item.transactionDate), 
                                formattedApprovedDate:  DateTimeUtils.dateFullConvert(item.approvedDate),
                                formattedGrantedDate: DateTimeUtils.dateFullConvert(item.grantedDate),
                                formattedFirstDueDate: DateTimeUtils.dateFullConvert(item.firstDueDate),
                            }}
                        />
                    ))}

                </ScrollView>
            ) : ( <NothingFoundNote /> )}

            {/* <FlatList 
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <LoanLedgerItem 
                            key={index}
                            newItem={{ 
                                ...item,
                                details: details,
                                formattedTransactionDate: DateTimeUtils.dateFullConvert(item.transactionDate), 
                                formattedApprovedDate:  DateTimeUtils.dateFullConvert(item.approvedDate),
                                formattedGrantedDate: DateTimeUtils.dateFullConvert(item.grantedDate),
                                formattedFirstDueDate: DateTimeUtils.dateFullConvert(item.firstDueDate),
                            }}
                        />
                    )

                }}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    loanLedgerList: {
        marginTop: 20,
    }
})