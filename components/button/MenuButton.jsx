import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import CachedImage from 'expo-cached-image'
import { useNavigation } from '@react-navigation/native'

import { COLORS, ICONS } from '../../constant'

export default function MenuButton ({ clockedDate, clockedTime, clockedLocation }) {
    const [isLoading, setIsLoading] = useState(false)

    const { width, height } = Dimensions.get('window')
    const navigation = useNavigation()

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 2000)
    // }, [])

    const screenWidth = Dimensions.get('window').height
    const imageSize = Math.max(15, screenWidth / 15)
    const padding = screenWidth * 0.015

    const commonProps = {
        placeholderContent: <ActivityIndicator size={'small'} color={COLORS.darkGray} style={{ height: imageSize, width: imageSize, }} />,
        style: { width: imageSize ,  height: imageSize }
    }

    return (

        <View style={styles.container}>     
            { isLoading ? (
                {/* <HomeButtonLoader /> */}
            ) : ( 
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
                                    cacheKey={`loanLedger`}
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
            )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
    },

    buttonWrapper: {
        flexDirection: 'row',
    }, 

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    gridButton: {
        borderRadius: 10,
        backgroundColor: COLORS.clearWhite,
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 5.5,
        shadowColor: COLORS.darkGray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
    },

    textButton: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.black,
        paddingTop: 5.5,
        fontSize: 12,
        textAlign: 'center'
    },

    partitionWrapper: { 
        marginHorizontal: 4,
        marginVertical: 10,
    },

    textPartition : {
        fontFamily: 'DMSans_500Medium',
        color: COLORS.darkGray,
    },

    iconRow: {
        color: COLORS.clearWhite,
    },

    rowButton: {
        flex: 1,
        backgroundColor: COLORS.orange,
        padding: 25.5,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },

    buttonTextWrapper: {
        paddingLeft: 10,
        paddingTop: 5.5,
    }
})