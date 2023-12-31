// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

import PagesHeader from '../../../components/header/PagesHeader'
import SuccessTimeClock from '../../../components/prompt/SuccessTimeClock'
import RefreshPage from '../../../components/use/RefreshPage'
import { COLORS, ICONS, Utils, LocationUtils, DateTimeUtils } from '../../../constant';

export default function ClockInOut({ navigation }) {
  const [clockedValue, setClockedValue] = useState(1)
  const [clockedStatus, setClockedStatus] = useState('')
  const [clockedTime, setClockedTime] = useState('')
  const [clockedDate, setClockedDate] = useState('')
  const [clockedAddress, setClockedAddress] = useState('')

  const [location, setLocation] = useState(null)
  const [region, setRegion] = useState(null)
  const [geofences, setGeofences] = useState([
    {
      latitude: 14.62115091925712,
      longitude: 120.99299900745191,
      radius: 16,
    },
    // {
    //   latitude: 14.606756738855745, 
    //   longitude: 120.97320725674159,
    //   radius: 50,
    // },
    {
      latitude: 14.64370146932187,
      longitude: 121.02651191049141,
      radius: 10,
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

  let clocked = route.params.clockedValue

  const getLocationPermission = () => {
    LocationUtils.locationPermissionEnabled()
      .then(() => Location.getCurrentPositionAsync({}))
      .then((userLocation) => {
        // setLocation(userLocation.coords)
        // setRegion({
        //   latitude: userLocation.coords.latitude,
        //   longitude: userLocation.coords.longitude,
        //   latitudeDelta: 0.001,
        //   longitudeDelta: 0.00001,
        // })

        return Location.reverseGeocodeAsync({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        })
      })
      .then((geocodeLocation) => {
        const checkNull = (value) => (value != null ? value : '')

        const currAddress = geocodeLocation[0]
        setClockedAddress(
          currAddress ? `${checkNull(currAddress?.name)} ${checkNull(currAddress?.street)} ${checkNull(currAddress?.city)} ${checkNull(currAddress?.country)}` : 'No address found.'
        )
      })
      .then(() => {
        return Location.watchPositionAsync({ distanceInterval: 5 }, (newLocation) => {
          setLocation(newLocation.coords)
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.00001,
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
        })
      })
      .then((locationWatcher) => {
        return () => locationWatcher.remove()
      })
      .catch((error) => {
        // console.error('Error getting location:', error)
      })
  }

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

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 1000)
    return () => clearInterval(timer)
  }, [])

  // useEffect(() => {
  //   if (isLoading) {
  //     const intervalId = setInterval(() => {
  //       getLocationPermission()
  //     }, 2000)

  //     return () => clearInterval(intervalId)
  //   }
  // }, [time])

  useEffect(() => {
    getLocationPermission()
  }, [geofences, isRestart])

  return (
    <>
      <PagesHeader pageName={'Time Clock'} />

      {location ? (
        <View style={styles.container}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={region}
            userInterfaceStyle='light'
            userLocationPriority='high'
            showsUserLocation
            followsUserLocation
          >
            <Marker
              coordinate={location}
              title="Your Location"
              description="You are here"
            ></Marker>

            {geofences.map((geofence, index) => (
              <Circle
                key={index}
                center={{ latitude: geofence.latitude, longitude: geofence.longitude }}
                radius={geofence.radius}
                strokeWidth={2}
                strokeColor={isInsideGeofences[index] ? COLORS.opaqueGreen : COLORS.opaqueRed}
                fillColor={isInsideGeofences[index] ? COLORS.opaqueGreen : COLORS.opaqueRed}
              />
            ))}
          </MapView>

          <Shadow style={styles.bottomContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: '10%',
                top: '10%',
              }}

              onPress={() => { setLocation(null), getLocationPermission() }}
            >
              <FontAwesome name="refresh" size={20} color={COLORS.darkGray} />
            </TouchableOpacity>

            <View style={styles.dateTimeWrapper}>
              <Text style={styles.dateText}>{DateTimeUtils.momentCurrDateWithExtra()}</Text>
              <Text style={styles.timeText}>{time.format('h:mm:ss A')}</Text>
            </View>

            <TouchableOpacity
              style={[
                clocked === 0 ? styles.clockOutBtn : styles.clockInBtn,
                !isInsideGeofences.some((inside) => inside) ? styles.disabledBtn : null,
              ]}

              disabled={!isInsideGeofences.some((inside) => inside)}
              onPress={() => {
                const newStatus = clocked === 0 ? "Clocked Out" : "Clocked In"
                const newValue = clocked === 0 ? 1 : 0
                setClockedStatus(newStatus)
                setClockedValue(newValue)
                openCustomAlert()
              }}
            >
              <Ionicons name='stopwatch' size={22} color={COLORS.clearWhite} />
              <Text style={styles.textClockIn}>{clocked === 0 ? "Clock-Out" : "Clock-In"}</Text>
            </TouchableOpacity>
          </Shadow>
        </View>
      ) : (
        <RefreshPage
          setRestart={setRestart}
          onRefresh={onRefresh}
          refreshing={refreshing}
          text={'Slide up to reload again.'} />
      )}

      <SuccessTimeClock
        clockedTime={clockedTime}
        clockedDate={clockedDate}
        clockedStatus={clockedStatus}
        clockedValue={clockedValue}
        clockedAddress={clockedAddress}
        visible={isSuccessAlertVisible}
        onClose={closeCustomAlert}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.clearWhite
  },

  disabledBtn: {
    backgroundColor: 'gray',
    opacity: 0.3,
  },

  bottomContainer: {
    width: '100%',
    backgroundColor: COLORS.clearWhite,
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  dateTimeWrapper: {
    alignItems: 'center',
  },

  dateText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium'
  },

  timeText: {
    fontSize: 25,
    fontFamily: 'Inter_700Bold'
  },

  clockInBtn: {
    width: 190,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    padding: 9,
    borderRadius: 15
  },

  clockOutBtn: {
    width: 190,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.powderBlue,
    justifyContent: 'center',
    padding: 9,
    borderRadius: 15
  },

  textClockIn: {
    color: COLORS.clearWhite,
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 7
  },
})