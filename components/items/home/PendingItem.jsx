import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';

import { COLORS } from '../../../constant';
import { Shadow } from 'react-native-shadow-2';

export default function PendingItem ({onPanel, item, lastIndex, index, newItem}) {
    return (
        <View style={styles.itemContainer(index, lastIndex)} key={index}>
            <Shadow distance={5} startColor={COLORS.shadowGray} style={styles.itemWrapper(index, lastIndex)}>
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
    itemContainer: (index, lastIndex) => ({
        backgroundColor: COLORS.clearWhite,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',

        borderTopLeftRadius: index == 0 ? 20 : 0,
        borderTopRightRadius: index == 0 ? 20 : 0,
        borderBottomLeftRadius : lastIndex == index ? 20 : 0,
        borderBottomRightRadius : lastIndex == index ? 20 : 0, 

        borderBottomColor: COLORS.darkGray,
        borderBottomWidth: lastIndex != index ? 1 : 0,
    }),

    itemWrapper: (index, lastIndex) => ({
        width: '100%',
        padding: 7,

        borderTopLeftRadius: index == 0 ? 20 : 0,
        borderTopRightRadius: index == 0 ? 20 : 0,
        borderBottomLeftRadius : lastIndex == index ? 20 : 0,
        borderBottomRightRadius : lastIndex == index ? 20 : 0,
    }),


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
        fontSize: 13,
    },

    statusText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
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
        fontSize: 13,
        color: COLORS.darkGray,
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: COLORS.darkGray,
    },

})