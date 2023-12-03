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
import { COLORS, Utils, LocationUtils, DateTimeUtils } from '../../../constant';

export default function ClockInOut ({ navigation }) {
  const [clockedValue, setClockedValue] = useState(1)
  const [clockedStatus, setClockedStatus] = useState('')
  const [clockedTime, setClockedTime] = useState('')
  const [clockedDate, setClockedDate] = useState('')
  const [clockedAddress, setClockedAddress] = useState('')

  const [location, setLocation] = useState(null)
  const [region, setRegion] = useState(null)
  const [geofences, setGeofences] = useState([
    // {
    //   latitude: 14.62115091925712,
    //   longitude: 120.99299900745191,
    //   radius: 16,
    // },
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

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 1000)  
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const getLocationPermission = async () => {
      return new Promise(async (resolve, reject) => {
        try {
          LocationUtils.locationPermissionEnabled()
  
          // LocationUtils.locationEnabled()
  
          const userLocation = await Location.getCurrentPositionAsync({})

          const geocodeLocation = await Location.reverseGeocodeAsync({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          })

          // setLocation(userLocation.coords)
          // setRegion({
          //   longitude: userLocation.coords.longitude,
          //   latitudeDelta: 0.001,
          //   longitudeDelta: 0.00001,
          // })
  
          const locationWatcher = await Location.watchPositionAsync(
            { distanceInterval: 5 },
            (newLocation) => {
              setLocation(newLocation.coords)
              setRegion({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
                // latitudeDelta: 0.0922,
                // longitudeDelta: 0.0421,
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
            }
          )

          const currAddress = geocodeLocation[0]
          setClockedAddress(`${currAddress.name} ${currAddress.street}, 
          ${currAddress.district} ${currAddress.city}, ${currAddress.country}`)
  
          resolve(locationWatcher)
        } catch (error) {
          reject(error)
        }
      })
    }
  
    const handleLocationPermission = async () => {
      try {
        const locationWatcher = await getLocationPermission()
      } catch (error) {
        alert('Need to allow permissions')
        navigation.navigate('TabStack', { screen: 'Home'})
      }
    }
  
    handleLocationPermission()
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
      <PagesHeader pageName={'Time Clock'}/>

      { isLoading ? (
        <RefreshPage setRestart={setRestart} onRefresh={onRefresh} refreshing={refreshing} />
      ) : (
        <>
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
                >
                  <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                    <Image 
                      source={require('../../../assets/icons/usermap.png')}
                      style={{ width: 80, height: 80}}
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
                    strokeColor={isInsideGeofences[index] ? COLORS.opaqueGreen : COLORS.opaqueRed }
                    fillColor={isInsideGeofences[index] ? COLORS.opaqueGreen : COLORS.opaqueRed }
                  />
                ))}
              </MapView>

              <Shadow style={styles.bottomContainer}>
              <View style={styles.dateTimeWrapper}>
                <Text style={styles.dateText}>{DateTimeUtils.momentCurrDateWithExtra()}</Text>
                <Text style={styles.timeText}>{time.format('h:mm:ss A')}</Text>
              </View>

              { route.params.clockedValue == 0 ? (
                <TouchableOpacity 
                  style={[ styles.clockOutBtn, !isInsideGeofences.some((inside) => inside) ? styles.disabledBtn : null ]}
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
                      style={[ styles.clockInBtn, 
                        !isInsideGeofences.some((inside) => inside) ? styles.disabledBtn : null  ]}

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
            clockedAddress={clockedAddress}
            visible={isSuccessAlertVisible}
            onClose={closeCustomAlert}
          />
        </>
      )}
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
    width: 170,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8
  },

  clockOutBtn: {
    width: 170,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.powderBlue,
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8
  },

  textClockIn: {
    color: COLORS.clearWhite,
    fontSize: 17,
    fontFamily: 'Inter_700Bold'
  },
})