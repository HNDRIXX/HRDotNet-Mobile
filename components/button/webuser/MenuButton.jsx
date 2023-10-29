import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'

import { COLORS } from '../../../constant'
// import HomeButtonLoader from '../loader/HomeButtonLoader'

export default function MenuButton () {
    const [isLoading, setIsLoading] = useState(false)

    const { width, height } = Dimensions.get('window')

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 2000)
    // }, [])

    return (

        <View style={styles.container}>     
            { isLoading ? (
                {/* <HomeButtonLoader /> */}
            ) : ( 
                <>
                    <View style={styles.buttonWrapper}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gridButton, { width: width / 5.5, height: height / 11 }]}>
                                <Image 
                                    source={require('../../../assets/icons/timesheet.png')}
                                    style={{ width: width / 5 ,  height: height / 14 }}
                                    contentFit="contain"
                                />
                            </TouchableOpacity>

                            <Text style={styles.textButton}>Timesheet</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gridButton, { width: width / 5.5, height: height / 11 }]}>
                                <Image 
                                    source={require('../../../assets/icons/ledger.png')}
                                    style={{ width: width / 5 ,  height: height / 14 }}
                                    contentFit="contain"
                                />
                            </TouchableOpacity>

                            <Text style={styles.textButton}>Loan Ledger</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gridButton, { width: width / 5.5, height: height / 11 }]}>
                                <Image 
                                    source={require('../../../assets/icons/pending.png')}
                                    style={{ width: width / 5 ,  height: height / 14 }}
                                    contentFit="contain"
                                />

                            </TouchableOpacity>

                            <Text style={styles.textButton}>Pending</Text>
                        </View>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gridButton, { width: width / 5.5, height: height / 11 }]}>
                                <Image 
                                    source={require('../../../assets/icons/cos.png')}
                                    style={{ width: width / 5 ,  height: height / 14 }}
                                    contentFit="contain"
                                />
                            
                            </TouchableOpacity>

                            <Text style={styles.textButton}>COS Request</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gridButton, { width: width / 5.5, height: height / 11 }]}>
                                <Image 
                                    source={require('../../../assets/icons/ob.png')}
                                    style={{ width: width / 5 ,  height: height / 14 }}
                                    contentFit="contain"
                                />
                              
                            </TouchableOpacity>

                            <Text style={styles.textButton}>OB Request</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gridButton, { width: width / 5.5, height: height / 11 }]}>
                                <Image 
                                    source={require('../../../assets/icons/ot.png')}
                                    style={{ width: width / 5 ,  height: height / 14 }}
                                    contentFit="contain"
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
        fontSize: 11,
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