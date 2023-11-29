import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { Image } from 'expo-image';

import PagesHeader from '../../../components/header/PagesHeader'
import SuccessTimeClock from '../../../components/prompt/SuccessTimeClock'
import RefreshPage from '../../../components/use/RefreshPage'
import { COLORS, Utils, DateTimeUtils, STYLES } from '../../../constant';
import { LocationUtils } from '../../../constant/functions/LocationUtils';

export default function TimeClock({ navigation }) {
  const [clockedStatus, setClockedStatus] = useState('')
  const [clockedValue, setClockedValue] = useState(1)
  const [clockedTime, setClockedTime] = useState('')
  const [clockedDate, setClockedDate] = useState('')
  const [currAddress, setCurrAddress] = useState('')

  const [location, setLocation] = useState(null)
  const [region, setRegion] = useState(null)
  const [geofences, setGeofences] = useState([
    {
      latitude: 14.64390146932187,
      longitude: 121.02651191049141,
      radius: 70,
    },
    {
      latitude: 14.64186612992079,
      longitude: 121.04221619072203,
      radius: 900,
    },
  ])

  const [isInsideGeofences, setIsInsideGeofences] = useState([])

  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRestart, setRestart] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [time, setTime] = useState(moment())
  const route = useRoute()
  const styles = STYLES.TimeClock

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const getLocationPermission = async () => {
      LocationUtils.locationPermissionEnabled()

      try {
        LocationUtils.locationEnabled()

        const userLocation = await Location.getCurrentPositionAsync({})
        setLocation(userLocation.coords)
        setRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.005,
        })

        const locationWatcher = await Location.watchPositionAsync(
          { distanceInterval: 5 },
          (newLocation) => {
            setLocation(newLocation.coords)
            setRegion({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })

            const insideGeofences = geofences.map((geofence) => {
              const distance = LocationUtils.calculationDistance(
                newLocation.coords.latitude,
                newLocation.coords.longitude,
                geofence.latitude,
                geofence.longitude
              )

              return distance <= geofence.radius
            })

            setIsInsideGeofences(insideGeofences)
          }
        )

        return () => locationWatcher.remove()
      } catch (error) {
        await getLocationPermission()
        return
      }
    }

    getLocationPermission()
  }, [geofences, isRestart])

  const openCustomAlert = () => {
    setIsSuccessAlertVisible(true)

    setClockedDate(DateTimeUtils.momentCurrDateWithExtra())
    setClockedTime(time.format('h:mm:ss A'))
  }

  const closeCustomAlert = async () => {
    setIsSuccessAlertVisible(false)

    navigation.navigate('TabStack', {
      screen: 'Home',
      params: {
        clockedValue: clockedValue,
        clockedStatus: clockedStatus,
        clockedDate: clockedDate,
        clockedTime: clockedTime,
      },
    })
  }

  const onRefresh = useCallback(() => {
    setRestart(true)

    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }, [])

  return (
    <>
      <PagesHeader pageName={'Time Clock'} />

      {isLoading ? (
        <RefreshPage setRestart={setRestart} onRefresh={onRefresh} refreshing={refreshing} />
      ) : (
        <>
          {location ? (
            <View style={styles.container}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={region}
                userLocationPriority='high'
                showsUserLocation
                followsUserLocation
              >
                <Marker
                  coordinate={location}
                  title="Your Location"
                  description="You are here"
                >
                  <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('../../../assets/icons/usermap.png')}
                      style={{ width: 80, height: 80 }}
                      contentFit='contain'
                    />
                  </View>
                </Marker>

                {geofences.map((geofence, index) => (
                  <Circle
                    key={index}
                    center={{ latitude: geofence.latitude, longitude: geofence.longitude }}
                    radius={geofence.radius}
                    strokeWidth={2}
                    strokeColor={isInsideGeofences[index] ? 'rgba(0,255,0,0.2)' : 'rgba(168, 168, 168, 0.23)'}
                    fillColor={isInsideGeofences[index] ? 'rgba(0,255,0,0.2)' : 'rgba(168, 168, 168, 0.23)'}
                  />
                ))}
              </MapView>

              <Shadow style={styles.bottomContainer}>
                <View style={styles.dateTimeWrapper}>
                  <Text style={styles.dateText}>{DateTimeUtils.momentCurrDateWithExtra()}</Text>
                  <Text style={styles.timeText}>{time.format('h:mm:ss A')}</Text>
                </View>

                {route.params.clockedValue == 0 ? (
                  <TouchableOpacity
                    style={[styles.clockOutBtn, !isInsideGeofences.some((inside) => inside) ? styles.disabledBtn : null]}
                    disabled={!isInsideGeofences.some((inside) => inside)}
                    onPress={() => {
                      setClockedStatus("Clocked Out")
                      setClockedValue(1)
                      openCustomAlert()
                    }}
                  >
                    <Ionicons
                      name='stopwatch'
                      size={22}
                      color={COLORS.clearWhite}
                    />

                    <Text style={styles.textClockIn}>Clock-Out</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.clockInBtn,
                    !isInsideGeofences.some((inside) => inside) ? styles.disabledBtn : null]}
                    disabled={!isInsideGeofences.some((inside) => inside)}
                    onPress={() => {
                      setClockedStatus("Clocked In")
                      setClockedValue(0)
                      openCustomAlert()
                    }}
                  >
                    <Ionicons
                      name='stopwatch'
                      size={22}
                      color={COLORS.clearWhite}
                    />

                    <Text style={styles.textClockIn}>Clock-In</Text>
                  </TouchableOpacity>
                )}
              </Shadow>
            </View>
          ) : (
            <RefreshPage setRestart={setRestart} onRefresh={onRefresh} refreshing={refreshing} />
          )}

          <SuccessTimeClock
            clockedTime={clockedTime}
            clockedDate={clockedDate}
            clockedStatus={clockedStatus}
            clockedValue={clockedValue}
            subText={currAddress}
            visible={isSuccessAlertVisible}
            onClose={closeCustomAlert}
          />
        </>
      )}
    </>
  )
}