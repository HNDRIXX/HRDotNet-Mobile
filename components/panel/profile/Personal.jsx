// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react'
import { Image } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable';
import CachedImage from 'expo-cached-image';

import { COLORS, COMPONENT_STYLES, ICONS } from '../../../constant'
import Loader from '../../loader/Loader';

export default function PersonalPanel ({ userData }) {
    const styles = COMPONENT_STYLES.Personal
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
    }, [])

    return (
        <>
            { isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={900}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.white }}
                >
                    <View style={styles.topView}>
                        <View style={styles.imageView}>
                            <CachedImage
                                source={{ 
                                    uri: userData?.ID_Gender === 1 ? ICONS.male : 
                                         userData?.ID_Gender === 2 ? ICONS.female :
                                         null 
                                }}
                                cacheKey={`profileUser+${userData?.FirstName}+${userData?.Code}`}
                                placeholderContent={
                                    <ActivityIndicator size={'small'} color={COLORS.darkGray} style={styles.profilePic} />
                                }
                                style={styles.profilePic}
                            />
                        </View>

                        <Text style={styles.nameText}>{userData?.FirstName}, {userData?.LastName} {userData?.MiddleName}</Text>
                        <Text style={styles.subText}>{userData?.Name_Department}</Text>
                        <Text style={styles.subText}>#{userData?.Code}</Text>
                    </View>
                    
                    <View style={styles.bodyView}></View>

                    <ScrollView 
                        style={styles.infoView}
                        contentContainerStyle={{ flexGrow: 0 }}>
                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Company</Text>
                            <Text style={styles.contentText}>{userData?.Name_Company}</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Branch</Text>
                            <Text style={styles.contentText}>{userData?.Name_Branch}</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Division</Text>
                            <Text style={styles.contentText}>{userData?.Name_Division}</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Department</Text>
                            <Text style={styles.contentText}>{userData?.Name_Department}</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Section</Text>
                            <Text style={styles.contentText}>{userData?.Name_Section}</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Contact Number</Text>
                            <Text style={styles.contentText}>{userData?.MobileNo}</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Email Address</Text>
                            <Text style={styles.contentText}>{userData?.EmailAdd}</Text>
                        </View>
                    </ScrollView>
                </Animatable.View>
            )}
        </>
    )
}