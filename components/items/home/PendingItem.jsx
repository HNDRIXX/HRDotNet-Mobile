import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS } from '../../../constant';
import { Shadow } from 'react-native-shadow-2';

export default function PendingItem ({onPanel, item, index, newItem}) {
    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={1} startColor={COLORS.shadowGray} style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper}>
                    <Text style={styles.statusText}>{item.status}</Text>
                    <Text style={styles.currDateText}>{newItem.formattedDate}</Text>    
                </View>

                <View style={styles.bodyWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>Applied Date/s: </Text>
                        <Text style={styles.valueText}>{newItem.appliedDate}</Text>
                    </View>
                </View>
            </Shadow>
        </View>
    )
}

const styles = StyleSheet.create({ 
    itemContainer: {
        backgroundColor: COLORS.clearWhite,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 20,
        width: '90%',
        // elevation: 10,
    },

    itemWrapper: {
        width: '100%',
        borderRadius: 20,
    },

    dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.clearWhite,
        paddingHorizontal: 20,
    },

    rowWrapper: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
    },

    currDateText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 11,
        color: COLORS.black,
    },

    statusText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: COLORS.black,
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
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray,
    },

})