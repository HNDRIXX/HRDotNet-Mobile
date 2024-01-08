// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import CachedImage from 'expo-cached-image'
import { useNavigation } from '@react-navigation/native'

import { COLORS, ICONS, COMPONENT_STYLES } from '../../constant'

export default function MenuButton({ show, clockedDate, clockedTime, clockedLocation }) {
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
                        onPress={() => navigation.navigate( show === 0 ? 'COSRequest' : 'Approvals' )} >
                        <CachedImage
                            source={{ uri: show === 0 ? ICONS.COSRequest : ICONS.approvalsIcon }}
                            cacheKey={ show === 0 ? 'COSRequest' : 'approvalsIcon' }
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>{ show === 0 ? 'COS Request' : 'Approvals' }</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate( show === 0 ? 'OBRequest' : 'Teams' )}>
                        <CachedImage
                            source={{ uri: show === 0 ? ICONS.OBRequest : ICONS.teams }}
                            cacheKey={ show === 0 ? 'OBRequest' : 'teams' }
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>{ show === 0 ? 'OB Request' : 'Teams' }</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate( show === 0 ? 'OTRequest' : 'Contacts' )}>
                        <CachedImage
                            source={{ uri: show === 0 ? ICONS.OTRequest : ICONS.contacts }}
                            cacheKey={show === 0 ? 'OTRequest' : 'contacts' }
                            {...commonProps}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>{show === 0 ? 'OT Request' : 'Contacts'}</Text>
                </View>
            </View>
        </View>
    )
}