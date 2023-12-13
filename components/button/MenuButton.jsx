import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import CachedImage from 'expo-cached-image'
import { useNavigation } from '@react-navigation/native'

import { COLORS, ICONS, COMPONENT_STYLES } from '../../constant'

export default function MenuButton({ clockedDate, clockedTime, clockedLocation }) {
    const styles = COMPONENT_STYLES.MenuButton
    const navigation = useNavigation()

    const screenWidth = Dimensions.get('window').height
    const imageSize = Math.max(15, screenWidth / 15)
    const padding = screenWidth * 0.015

    const commonProps = {
        placeholderContent: <ActivityIndicator size={'small'} color={COLORS.darkGray} style={{ height: imageSize, width: imageSize, }} />,
        style: { width: imageSize, height: imageSize }
    }

    return (
        <>
            <View style={styles.buttonWrapper}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => {
                            navigation.navigate('TimeSheet', {
                                clockedDate: clockedDate,
                                clockedTime: clockedTime,
                                clockedLocation: clockedLocation
                            })
                        }}>
                        <CachedImage
                            source={{ uri: ICONS.timesheet }}
                            cacheKey={`timesheet`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Timesheet</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('LoanLedger')}>
                        <CachedImage
                            source={{ uri: ICONS.loanLedger }}
                            cacheKey={`ledger`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Loan Ledger</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('Pending')}>
                        <CachedImage
                            source={{ uri: ICONS.pending }}
                            cacheKey={`pending`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Pending</Text>
                </View>
            </View>

            <View style={styles.buttonWrapper}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('COSRequest')} >
                        <CachedImage
                            source={{ uri: ICONS.COSRequest }}
                            cacheKey={`COSRequest`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>COS Request</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('OBRequest')}>
                        <CachedImage
                            source={{ uri: ICONS.OBRequest }}
                            cacheKey={`OBRequest`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>OB Request</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('OTRequest')}>
                        <CachedImage
                            source={{ uri: ICONS.OTRequest }}
                            cacheKey={`OTRequest`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>OT Request</Text>
                </View>
            </View>
        </>
    )
}