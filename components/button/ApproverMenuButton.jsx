// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco

import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, ActivityIndicator, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import CachedImage from 'expo-cached-image'

import { COLORS, COMPONENT_STYLES, ICONS } from '../../constant'

export default function ApproverMenuButton ({ clockedDate, clockedTime, clockedLocation }) {
    const styles = COMPONENT_STYLES.MenuButton
    const navigation = useNavigation()

    const screenWidth = Dimensions.get('window').height
    const imageSize = Math.max(15, screenWidth / 15)
    const padding = screenWidth * 0.015

    const commonProps = {
        placeholderContent: <ActivityIndicator size={'small'} color={COLORS.darkGray} style={{ height: imageSize, width: imageSize, }} />,
        style: { width: imageSize ,  height: imageSize }
    }

    return (
        <View style={styles.container}>     
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
                        onPress={() => navigation.navigate('Approvals')} >
                        <CachedImage
                            source={{ uri: ICONS.approvalsIcon }}
                            cacheKey={`approvals`}
                            {...commonProps}
                        />
                    
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Approvals</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('Teams')}>
                        <CachedImage
                            source={{ uri: ICONS.teams }}
                            cacheKey={`teams`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Teams</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('Contacts')}>
                        <CachedImage
                            source={{ uri: ICONS.contacts }}
                            cacheKey={`contacts`}
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Contacts</Text>
                </View>
            </View>   
        </View>
    )
}