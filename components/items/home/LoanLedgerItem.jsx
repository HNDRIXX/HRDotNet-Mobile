import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Link } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS, Utils } from '../../../constant';

export default function LoanLedgerItem ({ item, details, index }) {
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={8} offset={[4,0.9]} style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper(item)}>
                    <Text style={styles.currDateText}>{item.loanTitle}</Text>

                    <View style={styles.rowWrapper}>
                        {Utils.statusIcon(item.status)}

                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>

                </View>

                <View style={styles.bodyWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>Balance: </Text>
                        <Text style={styles.valueText}>Php {Utils.amountFormat(item.balance)}</Text>
                    </View>

                    <View style={styles.reasonWrapper}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.boldText}>Document No: </Text>
                            <Text style={styles.valueText}>{item.documentNo}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.moreButton}
                            onPress={() => navigation.navigate('LoanDetails', item )}>
                                <Text style={styles.moreText}>More</Text>
                                <Entypo name="chevron-small-right" size={18} color="black" />
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
        marginBottom: 25,
        borderRadius: 40,
    },

    itemWrapper: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
    },

    dateRowWrapper: (item)  => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 
            item.status == "Approved" ? COLORS.green :
            item.status == "Reviewed" ? COLORS.purple :
            item.status == "Filed" ? COLORS.filed :
            item.status == "Cancelled" ? COLORS.red 
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

    moreText: {
        fontSize: 13,
        paddingBottom: 2,
    },

    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})