import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";

import { COLORS } from "../../../constant";
import TimeClock from "../../../components/section/home/TimeClock";
import MenuButton from "../../../components/button/webuser/MenuButton";
import TimeOff from "../../../components/button/TimeOff";
import BottomNavigation from "../../../components/navigation/BottomNavigation";

export default function Home () {  
    const [isLoading, setIsLoading] = useState(true)
    const route = useRoute()
    
    const insets = useSafeAreaInsets()

    useEffect(() => {
        setTimeout(() => {
        setIsLoading(false)
        }, 800)
    }, [])

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.powderBlue} style={styles.loader} />
            ) : ( 
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1 }}
                >
                    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: COLORS.powderBlue }}>

                    <StatusBar backgroundColor={COLORS.powderBlue} barStyle={'light-content'} />

                    <View style={styles.headerView}>
                        <View style={styles.headerNavigation}>
                            <TouchableOpacity>
                                <FontAwesome name={'bars'} size={25} color={COLORS.clearWhite} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <FontAwesome name={'bell'} size={25} color={COLORS.clearWhite} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeView}>
                            <Image style={styles.userIcon} source={require('../../../assets/icons/profile.png')} />

                            <View>
                                <Text style={styles.helloText}>Hello,</Text>
                                <Text style={styles.nameText}>Juan Dela Cruz!</Text>

                                <View style={styles.statusView}>
                                    <Entypo name={'briefcase'} size={17} color={COLORS.clearWhite} />

                                    <Text style={styles.statusText}>Work Day</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.timeClockText}>Time Clock</Text>
                    </View>

                    <Shadow
                        distance={20}
                        style={styles.TimeClockView}
                    >
                        <TimeClock
                            clockedValue={route.params?.clockedValue}
                            clockedStatus={route.params?.clockedStatus}
                            clockedDate={route.params?.clockedDate}
                            clockedTime={route.params?.clockedTime}
                        />

                    </Shadow>

                    <View style={styles.menuView}>
                        <ScrollView style={styles.scrollView}>
                            <View>
                                <Text style={styles.mainTitle}>Menu</Text>
                                <MenuButton />
                            </View>

                            <View>
                                <Text style={styles.mainTitle}>Time Off</Text>
                                <TimeOff />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                </Animatable.View>
            )}
{/* 
            <BottomNavigation showValue={true}/> */}
        </>
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerView: {
        padding: 20,
        paddingTop: 5,
        height: 235,
        backgroundColor: COLORS.powderBlue,
    },

    headerNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    welcomeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10
    },

    userIcon: {
        width: 83,
        height: 83,
        borderWidth: 4,
        borderColor: COLORS.orange,
        borderRadius: 40,
        marginRight: 15
    },

    helloText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.clearWhite,
        fontSize: 21,

        textShadowColor: COLORS.tr_gray,
        textShadowOffset: {width: 1.5, height: 2},
        textShadowRadius: 17
    },

    nameText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.clearWhite,
        fontSize: 22,
        lineHeight: 26,

        textShadowColor: COLORS.tr_gray,
        textShadowOffset: {width: 1.5, height: 2},
        textShadowRadius: 17
    },

    statusView: {
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center'
    },

    statusText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 10,    
        fontSize: 13, 
    },

    timeClockText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        paddingHorizontal: 5,
        marginTop: 19,
        fontFamily: 'Inter_700Bold'
    },

    TimeClockView: {
        backgroundColor: COLORS.clearWhite,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 80,
        borderTopEndRadius: 80,
        width: '100%',
    },
   
    menuView: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    scrollView: {
        marginHorizontal: 10,
    },

    mainTitle: {
        marginHorizontal: 15,
        fontSize: 15,
        marginVertical: 6,
        color: COLORS.powderBlue,
        fontFamily: 'Inter_700Bold',
    }
})