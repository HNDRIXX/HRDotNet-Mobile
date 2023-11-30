import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { useRoute } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { COLORS, ICONS, STYLES } from "../../../constant";
import TimeClock from "../../../components/section/home/TimeClock";
import MenuButton from "../../../components/button/MenuButton";
import TimeOff from "../../../components/button/TimeOff";
import Loader from "../../../components/loader/Loader"

export default function Home ({ navigation }) {  
    const [isLoading, setIsLoading] = useState(true)

    const route = useRoute()
    const insets = useSafeAreaInsets()
    const styles = STYLES.UserHome(insets)

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
                    <View style={styles.container}>
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
                                    uri={ICONS.maria} />

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
                                    <MenuButton 
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
   
})