// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Shadow } from "react-native-shadow-2";
import * as Animatable from 'react-native-animatable';
import { Image } from "react-native-expo-image-cache";
import CachedImage from 'expo-cached-image'
import { useRoute } from "@react-navigation/native";

import Loader from "../../../../components/loader/Loader";
import { COLORS, ICONS, STYLES, DateTimeUtils } from "../../../../constant";
import PageHeader from "../../../../components/header/PagesHeader";
import TimeOffItem from "../../../../components/items/home/TimeOffItem";

const data = [
    {
        status: "Application",
        date: "20230823",
        leaveCredit: "1.50",
        documentNo: "LA2230702003"
    },
    {
        status: "Application",
        date: "20230818",
        leaveCredit: "-2.00",
        documentNo: "LA2230702003"
    },
    {
        status: "Application",
        date: "20230801",
        leaveCredit: "3.50",
        documentNo: "LA2230702003"
    },
]

export default function SickLeavePage ({ navigation }) {
    const styles = STYLES.SickLeave
    const [isLoading, setLoading] = useState(true)
    const [currYear, setCurrYear] = useState(DateTimeUtils.getCurrYear())

    const route = useRoute()
    const sParams = route.params?.sData
    const sCount = route.params?.sCount

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])
    
    return (
        <View style={styles.container}>
            <PageHeader pageName={'Sick Leave'}/>

            <View style={styles.topContainer}>
                <CachedImage
                    source={{ uri: ICONS.medicine }}
                    style={{ width: 70, height: 70, marginRight: 10 }}
                    cacheKey={`medecine`}
                    placeholderContent={( 
                        <ActivityIndicator size={'small'} style={{marginRight: 30}} />
                    )} 
                />

                <View>
                    <Text style={styles.titleText}>Available Credits</Text>
                    <Text style={styles.yearText}>for <Text style={styles.yearValue}>{currYear}</Text></Text>
                </View>
            </View>
            
            { isLoading ? ( <Loader /> ) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                    <View style={styles.creditContainer}>
                        <Shadow distance={3} style={styles.creditShadow}>
                            <Text style={styles.creditsValue}>{sCount}</Text>
                        </Shadow>
                    </View>

                    <Text style={styles.detailsTitle}>Details</Text>
                    
                    <FlatList 
                        data={sParams}
                        renderItem={({item, index}) => { return ( <TimeOffItem item={item} /> ) }}
                    />
                </Animatable.View>
            )}
        </View>
    )
}