// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS, Utils, DateTimeUtils, COMPONENT_STYLES } from '../../../constant';

export default function RequestItem ({onPanel, newItem, index}) {
    const styles = COMPONENT_STYLES.RequestItem(newItem)
    
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={5} offset={[4, 1]} style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper}>
                    <Text style={styles.currDateText}>{
                        onPanel == 0 ? newItem.formattedAppliedDate :
                        onPanel == 1 ? newItem.formattedOfficialWorkDate :
                        onPanel == 2 ? newItem.formattedOvertimeDate :
                        onPanel == 3 ? newItem.formattedOvertimeDate :
                        onPanel == 4 ? newItem.formattedAppliedDate :
                        onPanel == 5 ? newItem.formattedMissedLogDate
                        : null
                    }</Text>

                    <View style={styles.rowWrapper}>
                        {Utils.statusIcon(newItem.status)}

                        <Text style={styles.statusText}>{newItem.status}</Text>
                    </View>
                </View>

                <View style={styles.bodyWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>
                            { onPanel == 0 ? "Requested Schedule: "
                                : onPanel == 1 ? "Location: "
                                : onPanel == 2 ? "Overtime Hours: "
                                : onPanel == 3 ? "Offset Hours: "
                                : onPanel == 4 ? "Type: " 
                                : onPanel == 5 ? "Log Type: "
                                : null }
                        </Text>
                        <Text style={styles.valueText}>
                            { onPanel == 0 ? newItem.requestedSched
                                : onPanel == 1 ? newItem.location
                                : onPanel == 2 ? newItem.overtimeHours
                                : onPanel == 3 ? newItem.overtimeHours
                                : onPanel == 4 ? newItem.leaveType
                                : onPanel == 5 ? newItem.logType
                                : null }
                        </Text>
                    </View>

                    <View style={styles.reasonWrapper}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.boldText}>{
                                onPanel == 5 ? "Log Time: " : "Date Filed: "
                            }</Text>
                            <Text style={styles.valueText}>{
                                onPanel == 5 ? newItem.logTime : newItem.formattedFiledDate
                            }</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.moreButton}
                            onPress={() => navigation.navigate('MorePage', newItem)}>
                                <Text style={styles.moreText}>More</Text>
                                <Entypo name="chevron-small-right" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Shadow>
        </View>
    )
}