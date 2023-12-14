// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';

import { COLORS, COMPONENT_STYLES } from '../../../constant';
import { Shadow } from 'react-native-shadow-2';

export default function PendingItem ({ item, lastIndex, index, newItem }) {
    const styles = COMPONENT_STYLES.PendingItem(index, lastIndex)
    
    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={3} style={styles.itemWrapper}>
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