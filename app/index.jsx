import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

import Home from './pages/home/ApproverHome';
import Calendar from './pages/Calendar';
import Request from './pages/Request';
import Profile from './pages/Profile';
import MorePage from './access/navigate/request/MorePage';
import TimeClock from './access/home/TimeClock';

import { useFonts } from '../constant/fonts';
import LoanLedgerPage from './access/navigate/home/LoanLedger';
import { COLORS } from '../constant';
import TimeSheetPage from './access/navigate/home/Timesheet';
import PendingPage from './access/navigate/home/Pending';
import VacationLeavePage from './access/navigate/home/VacationLeave';
import SickLeavePage from './access/navigate/home/SickLeave';
import NotificationPage from './access/navigate/home/Notification';
import DrawerPage from './access/navigate/home/Drawer';
import LogInPage from './authentication/base/LogIn';
import ForgotPasswordPage from './authentication/base/ForgotPassword';
import ResetPasswordPage from './authentication/base/ResetPassword';
import VerifyCodePage from './authentication/auth/VerifyCode';
import COSRequest from './access/navigate/request/newrequest/COSRequest';
import RequestSummary from './access/navigate/request/RequestSummary';
import CameraAccess from './access/use/Camera';
import OBRequest from './access/navigate/request/newrequest/OBRequest';
import OTRequest from './access/navigate/request/newrequest/OTRequest';
import NotificationDetails from './access/navigate/home/more/NotificationDetails';
import LoanDetails from './access/navigate/home/more/LoanDetails';
import OSRequest from './access/navigate/request/newrequest/OSRequest';
import LVRequest from './access/navigate/request/newrequest/LVRequest';
import MLRequest from './access/navigate/request/newrequest/MLRequest';
import MorePayslip from './access/navigate/profile/payslip/MorePayslip';
import AttachedFile from './access/navigate/request/AttachedFile';

import ApprovalsPage from './access/navigate/home/approver/Approvals';
import ApprovalsDetails from './access/navigate/home/approver/ApprovalsDetails'

export default function Index() {
    const [fontsLoaded] = useFonts()

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
    }

    const TabStack = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIconStyle: { },
                    tabBarStyle: { },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        // marginBottom: 8,
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
                initialRouteName="Home"
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

                    <Stack.Screen name="TimeClock" component={TimeClock} />

                    <Stack.Screen name="LoanLedger" component={LoanLedgerPage} />
                    <Stack.Screen 
                        name="LoanDetails" 
                        component={LoanDetails}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                        }}/>

                    <Stack.Screen name="Approvals" component={ApprovalsPage} />
                    <Stack.Screen 
                        name="ApprovalsDetails" 
                        component={ApprovalsDetails}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                        }} />                    

                    <Stack.Screen name="TimeSheet" component={TimeSheetPage} />
                    <Stack.Screen name="Pending" component={PendingPage} />
                    <Stack.Screen name="VacationLeave" component={VacationLeavePage} />
                    <Stack.Screen name="SickLeave" component={SickLeavePage} />
                    <Stack.Screen name="Notification" component={NotificationPage} />
                    <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
                    <Stack.Screen 
                        name="SideDrawer" 
                        component={DrawerPage} 
                        options={{
                            gestureDirection: "horizontal-inverted"
                        }}
                    />

                    <Stack.Screen name="AttachedFile" component={AttachedFile} />
                    <Stack.Screen 
                        name="MorePage" 
                        component={MorePage}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                        }} />                    


                    <Stack.Screen name="COSRequest" component={COSRequest} />
                    <Stack.Screen name="OBRequest" component={OBRequest} />
                    <Stack.Screen name="OTRequest" component={OTRequest} />
                    <Stack.Screen name="OSRequest" component={OSRequest} />
                    <Stack.Screen name="LVRequest" component={LVRequest} />
                    <Stack.Screen name="MLRequest" component={MLRequest} />

                    <Stack.Screen name="MorePayslip" component={MorePayslip} />

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