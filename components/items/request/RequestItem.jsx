import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS } from '../../../constant';

export default function RequestItem ({onPanel, newItem, index}) {
    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer} key={index}>
            <Shadow distance={5} style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper(newItem)}>
                    <Text style={styles.currDateText}>{
                        onPanel == 0 ? newItem.formattedAppliedDate :
                        onPanel == 1 ? newItem.formattedOfficialWorkDate :
                        onPanel == 2 ? newItem.formattedOverTimeDate :
                        onPanel == 3 ? newItem.formattedOverTimeDate :
                        onPanel == 4 ? newItem.formattedAppliedDate :
                        onPanel == 5 ? newItem.formattedMissedLogDate
                        : null
                    }</Text>

                    <View style={styles.rowWrapper}>
                        { newItem.status == "Filed" ? (
                            <FontAwesome5 
                                name="file-import" 
                                size={17} 
                                color={COLORS.clearWhite}
                            />
                        ) : newItem.status == "Reviewed" ? (
                            <MaterialCommunityIcons 
                                name="file-find" 
                                size={20} 
                                color={COLORS.clearWhite} 
                            />
                        ) : newItem.status == "Approved" ? (
                            <AntDesign
                                name="checkcircle"
                                size={17}
                                color={COLORS.clearWhite}
                            />
                        ) : newItem.status == "Cancelled" ? (
                            <Entypo
                                name="circle-with-cross"
                                size={19}
                                color={COLORS.clearWhite}
                            /> 
                        ) : ( null )}

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
                                : onPanel == 2 ? newItem.overTimeHours
                                : onPanel == 3 ? newItem.offSetHours
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
                            onPress={() => router.push({ 
                                pathname: 'access/navigate/request/MorePage', 
                                params: newItem 
                            })}
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
        paddingLeft: 10,
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