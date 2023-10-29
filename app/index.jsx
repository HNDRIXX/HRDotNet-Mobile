import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Easing } from 'react-native-reanimated';

import Home from './pages/webuser/home';
import Calendar from './pages/webuser/calendar';
import Request from './pages/webuser/request';
import Profile from './pages/profile';
import BottomNavigation from '../components/navigation/BottomNavigation';

import { useFonts } from '../constant/fonts';

export default function Index() {
    const [fontsLoaded] = useFonts()
    const Stack = createStackNavigator()
    const customEasing = Easing.bezier(0.42, 0, 0.58, 1)

    if(!fontsLoaded) {
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

    const IndexStack = () => {
        return (
            <>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                >
                    <Stack.Screen name="HomeScreen" component={Home} />
                    <Stack.Screen name="CalendarScreen" component={Calendar} />
                    <Stack.Screen name="RequestScreen" component={Request} />
                    <Stack.Screen name="ProfileScreen" component={Profile} />
                </Stack.Navigator>

                <BottomNavigation />
            </>
        )
    }

    return (
        <NavigationContainer independent={true}>
            <IndexStack />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  
})
