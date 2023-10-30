import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Easing } from 'react-native-reanimated';

import Home from './pages/webuser/home';
import Calendar from './pages/webuser/calendar';
import Request from './pages/webuser/request';
import Profile from './pages/profile';
import MorePage from './access/navigate/request/MorePage';
import ClockInOut from './access/home/ClockInOut';
import BottomNavigation from '../components/navigation/BottomNavigation';

import { useFonts } from '../constant/fonts';
import LoanLedgerPage from './access/navigate/home/webuser/loanledger';

export default function Index() {
    const [fontsLoaded] = useFonts()
    const [show, setShow] = useState()

    const Stack = createStackNavigator()
    const Tab = createBottomTabNavigator()

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    const config = {
        animation: 'timing',
        config: {
            duration: 500,
            easing: Easing.customEasing,
        },
    }

    const TabStack = () => {
        return (
            <>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="HomeScreen"
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen 
                        name="Calendar" 
                        options={{ unmountOnBlur: true }} 
                        component={Calendar} />
                    <Stack.Screen 
                        name="Request"
                        options={{ unmountOnBlur: true }} 
                        component={Request} />
                    <Stack.Screen 
                        name="Profile" 
                        component={Profile}
                        options={{ unmountOnBlur: true }} 
                    />
                </Tab.Navigator>
            </>
        )
    }

    const MainStack = () => {
        return (
            <>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                >
                    <Stack.Screen name="TabStack" component={TabStack} />
                    <Stack.Screen name="ClockInOut" component={ClockInOut} />
                    <Stack.Screen name="LoanLedger" component={LoanLedgerPage} />
                </Stack.Navigator>
            </>
        )
    }

    return (
        <NavigationContainer independent={true}>
            <MainStack />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    showNav: (show) => ({

    })
})