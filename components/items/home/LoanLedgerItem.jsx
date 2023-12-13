import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Link } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS, COMPONENT_STYLES, Utils } from '../../../constant';

export default function LoanLedgerItem ({ item, details, index }) {
    const styles = COMPONENT_STYLES.LoanLedgerItem(item)
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={8} offset={[4,0.9]} style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper}>
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