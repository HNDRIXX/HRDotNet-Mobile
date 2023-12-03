import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Image } from "react-native-expo-image-cache";
import CachedImage from 'expo-cached-image'
import { Shadow } from "react-native-shadow-2";

import Loader from '../../../../components/loader/Loader';
import { COLORS, ICONS, STYLES, DateTimeUtils } from "../../../../constant";
import PageHeader from "../../../../components/header/PagesHeader";
import TimeOffItem from '../../../../components/items/home/TimeOffItem';

const data = [
    {
        status: "Adjustment",
        date: "20230823",
        leaveCredit: "3.00",
        documentNo: "LA2230702003"
    },
    {
        status: "Adjustment",
        date: "20230818",
        leaveCredit: "-2.00",
        documentNo: "LA2230702003"
    },
    {
        status: "Adjustment",
        date: "20230801",
        leaveCredit: "5.00",
        documentNo: "LA2230702003"
    },
]


export default function VacationLeavePage ({ navigation }) {
    const [isLoading, setLoading] = useState(true)
    const styles = STYLES.VacationLeave
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <PageHeader pageName={'Vacation Leave'} />

            <View style={styles.topContainer}>
                <CachedImage
                    source={{  uri: ICONS.vacation}}
                    style={{ width: 70, height: 70, marginRight: 10 }}
                    cacheKey={`vacation`}
                    placeholderContent={( 
                        <ActivityIndicator size={'small'} style={{marginRight: 30}} />
                    )} 
                />

                <View>
                    <Text style={styles.titleText}>Available Credits</Text>
                    <Text style={styles.yearText}>for <Text style={styles.yearValue}>{DateTimeUtils.getCurrYear()}</Text></Text>
                </View>
            </View>

            <View style={styles.creditContainer}>
                <Shadow distance={3} style={styles.creditShadow}>
                    <Text style={styles.creditsValue}>3.00</Text>
                </Shadow>
            </View>

            <Text style={styles.detailsTitle}>Details</Text>

            { isLoading ? (<Loader />) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
                >
                    <FlatList 
                        data={data}
                        renderItem={({item, index}) => {
                            return (
                                <TimeOffItem 
                                    item={item}
                                />
                            )

                        }}
                    />
                </Animatable.View>
            )}
        </View>
    )
}