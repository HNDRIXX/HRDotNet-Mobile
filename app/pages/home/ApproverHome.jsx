import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import * as Animatable from 'react-native-animatable';
import { Image } from "expo-image";
// import { Image } from "react-native-expo-image-cache";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { COLORS, ICONS } from "../../../constant";
import TimeClock from "../../../components/section/home/TimeClock";
import ApproverMenuButton from "../../../components/button/ApproverMenuButton"
import TimeOff from "../../../components/button/TimeOff";
import Loader from "../../../components/loader/Loader"

export default function Home ({ navigation }) {  
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
            {isLoading ? ( <Loader /> ) : ( 
                <Animatable.View
                    animation={'fadeIn'}
                    duration={500}
                    style={{ opacity: 1, flex: 1 }}
                >
                    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: COLORS.powderBlue }}>
                        <StatusBar backgroundColor={COLORS.powderBlue} barStyle={'light-content'} />

                        <View style={styles.headerView}>
                            <View style={styles.headerNavigation}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SideDrawer')}>
                                    <FontAwesome name={'bars'} size={25} color={COLORS.clearWhite} />
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Notification')}
                                >
                                    <FontAwesome name={'bell'} size={25} color={COLORS.clearWhite} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.welcomeView}>
                                <Image 
                                    style={styles.userIcon} 
                                    uri={ICONS.maria}
                                />


                                <View>
                                    <Text style={styles.helloText}>Hello,</Text>
                                    <Text style={styles.nameText}>Maria Clara!</Text>

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
                            style={styles.timeClockView}
                        >
                            <TimeClock
                                clockedValue={route.params?.clockedValue}
                                clockedStatus={route.params?.clockedStatus}
                                clockedDate={route.params?.clockedDate}
                                clockedTime={route.params?.clockedTime}
                            />
                        </Shadow>

                        <View style={styles.menuView}>
                            <ScrollView 
                                style={styles.scrollView}
                                bounces={false}
                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                                >
                                <View style={[styles.sectionView, { marginBottom: 20 }]}>
                                    <Text style={styles.mainTitle}>Menu</Text>
                                    <ApproverMenuButton 
                                        clockedDate={route.params?.clockedDate}
                                        clockedTime={route.params?.clockedTime}
                                        clockedLocation={"Location Location"}
                                    />
                                </View>

                                <View style={styles.sectionView}>
                                    <Text style={styles.mainTitle}>Time Off</Text>
                                    <TimeOff />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Animatable.View>
            )}
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
        paddingTop: 15,
        height: 225,
        backgroundColor: COLORS.powderBlue,
    },

    headerNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginBottom: 10,
    },

    welcomeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
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

        textShadowColor: COLORS.darkGray,
        textShadowOffset: {width: 1.5, height: 2},
        textShadowRadius: 10
    },

    nameText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.clearWhite,
        fontSize: 22,
        lineHeight: 26,

        textShadowColor: COLORS.darkGray,
        textShadowOffset: {width: 1.5, height: 2},
        textShadowRadius: 10
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
        fontSize: 16,
        paddingHorizontal: 5,
        marginTop: 10,
        fontFamily: 'Inter_700Bold'
    },

    timeClockView: {
        backgroundColor: COLORS.clearWhite,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 70,
        borderTopEndRadius: 70,
        width: '100%',
    },
   
    menuView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.clearWhite,
    },

    sectionView: {
        width: Dimensions.get('window').width, 
    },

    mainTitle: {
        marginHorizontal: 35,
        fontSize: 18,
        marginVertical: 6,
        color: COLORS.powderBlue,
        fontFamily: 'Inter_600SemiBold',
    }
})