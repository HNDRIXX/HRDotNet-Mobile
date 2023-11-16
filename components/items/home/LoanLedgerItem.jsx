import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Link } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS, Utils} from '../../../constant';

export default function LoanLedgerItem ({ newItem, details, index }) {
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={5} style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper(newItem)}>
                    <Text style={styles.currDateText}>{newItem.loanTitle}</Text>

                    <View style={styles.rowWrapper}>
                        {Utils.statusIcon(newItem.status)}

                        <Text style={styles.statusText}>{newItem.status}</Text>
                    </View>

                </View>

                <View style={styles.bodyWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>Balance: </Text>
                        <Text style={styles.valueText}>Php {newItem.balance}</Text>
                    </View>

                    <View style={styles.reasonWrapper}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.boldText}>Document No: </Text>
                            <Text style={styles.valueText}>{newItem.documentNo}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => 
                                navigation.navigate('LoanDetails', newItem )
                            }
                        >
                            <Text style={styles.moreText}>More {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({ 
    itemContainer: {
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 20,
        marginBottom: 25,
        borderRadius: 20,
        elevation: 2,
    },

    itemWrapper: {
        width: '100%',
        borderRadius: 20,
    },

    dateRowWrapper: (newItem)  => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 
            newItem.status == "Approved" ? COLORS.green :
            newItem.status == "Reviewed" ? COLORS.purple :
            newItem.status == "Filed" ? COLORS.filed :
            newItem.status == "Cancelled" ? COLORS.red 
            : COLORS.orange
        ,
        paddingHorizontal: 20,
    }),

    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    currDateText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
    },

    statusText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
    },

    bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold'
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
    },

})