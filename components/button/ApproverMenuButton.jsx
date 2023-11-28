import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../../constant'

export default function MenuButton ({ clockedDate, clockedTime, clockedLocation }) {
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    const screenWidth = Dimensions.get('window').height
    const imageSize = Math.max(15, screenWidth / 15)
    const padding = screenWidth * 0.015

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
                        <Image 
                            source={require('../../assets/icons/timesheet.png')}
                            style={{ width: imageSize ,  height: imageSize }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Timesheet</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('LoanLedger')}>
                        <Image 
                            source={require('../../assets/icons/ledger.png')}
                            style={{ width: imageSize ,  height: imageSize }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Loan Ledger</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('Pending')}>
                        <Image 
                            source={require('../../assets/icons/pending.png')}
                            style={{ width: imageSize ,  height: imageSize }}
                            contentFit="contain"
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
                        <Image 
                            source={require('../../assets/icons/approvals.png')}
                            style={{ width: imageSize ,  height: imageSize }}
                            contentFit="contain"
                        />
                    
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Approvals</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('OBRequest')}>
                        <Image 
                            source={require('../../assets/icons/teams.png')}
                            style={{ width: imageSize ,  height: imageSize }}
                            contentFit="contain"
                        />
                        
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Teams</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.gridButton, { padding: padding }]}
                        onPress={() => navigation.navigate('OTRequest')}>
                        <Image 
                            source={require('../../assets/icons/contacts.png')}
                            style={{ width: imageSize ,  height: imageSize }}
                            contentFit="contain"
                        />
                    </TouchableOpacity>

                    <Text style={styles.textButton}>Contacts</Text>
                </View>
            </View>   
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