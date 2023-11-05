import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
import { COLORS } from '../constant';
import TimeSheetPage from './access/navigate/home/webuser/timesheet';
import PendingPage from './access/navigate/home/webuser/pending';
import VacationLeavePage from './access/navigate/home/webuser/vacationleave';
import SickLeavePage from './access/navigate/home/webuser/sickleave';
import NotificationPage from './access/navigate/home/notification';
import DrawerPage from './access/navigate/home/drawer';
import LogInPage from './authentication/base/login';
import ForgotPasswordPage from './authentication/base/forgotpass';
import ResetPasswordPage from './authentication/base/resetpassword';
import VerifyCodePage from './authentication/auth/verifycode';
import COSRequest from './access/navigate/request/newrequest/COSRequest';
import RequestSummary from './access/navigate/request/RequestSummary';
import CameraAccess from './access/use/camera';
import OBRequest from './access/navigate/request/newrequest/OBRequest';
import OTRequest from './access/navigate/request/newrequest/OTRequest';

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
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      };

    const TabStack = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: { paddingTop: 8, height: 60 },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        marginBottom: 8,
                        fontFamily: 'Inter_600SemiBold',
                    },

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'md-home'
                                : 'md-home-outline'
                        } else if (route.name === 'Calendar') {
                            iconName = focused 
                                ? 'md-calendar' 
                                : 'md-calendar-outline'
                        } else if (route.name === 'Request') {
                            iconName = focused 
                                ? 'folder-open' 
                                : 'folder-open-outline'
                        } else if (route.name === 'Profile') {
                            iconName = focused 
                                ? 'person-circle' 
                                : 'person-circle-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    

                    tabBarActiveTintColor: COLORS.orange,
                    tabBarInactiveTintColor: COLORS.darkGray,
                })}
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
        )
    }

    const MainStack = () => {
        return (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                    initialRouteName="LogIn"
                >
                    <Stack.Screen name="LogIn" component={LogInPage} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />
                    <Stack.Screen name="VerifyCode" component={VerifyCodePage} />

                    <Stack.Screen name="TabStack" component={TabStack} />

                    <Stack.Screen name="ClockInOut" component={ClockInOut} />
                    <Stack.Screen name="LoanLedger" component={LoanLedgerPage} />
                    <Stack.Screen name="TimeSheet" component={TimeSheetPage} />
                    <Stack.Screen name="Pending" component={PendingPage} />
                    <Stack.Screen name="VacationLeave" component={VacationLeavePage} />
                    <Stack.Screen name="SickLeave" component={SickLeavePage} />
                    <Stack.Screen name="Notification" component={NotificationPage} />
                    <Stack.Screen 
                        name="SideDrawer" 
                        component={DrawerPage} 
                        options={{
                            gestureDirection: "horizontal-inverted"
                        }}
                    />

                    <Stack.Screen name="COSRequest" component={COSRequest} />
                    <Stack.Screen name="OBRequest" component={OBRequest} />
                    <Stack.Screen name="OTRequest" component={OTRequest} />

                    <Stack.Screen 
                        name="RequestSummary" 
                        component={RequestSummary}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                        }}/>

                    <Stack.Screen 
                        name="CameraAccess" 
                        component={CameraAccess}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                        }}/>

                </Stack.Navigator>
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