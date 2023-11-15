import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

import { COLORS, Utils } from '../../../constant';
import SuccessTimeClock from '../../../components/prompt/SuccessTimeClock';
import LocationPrompt from '../../../components/prompt/LocationPrompt';
import RefreshPage from '../../../components/use/RefreshPage';

export default function ClockInOut () {
  const [clockedStatus, setClockedStatus] = useState('')
  const [clockedValue, setClockedValue] = useState(1)
  const [clockedTime, setClockedTime] = useState('')
  const [clockedDate, setClockedDate] = useState('')
  const [location, setLocation] = useState(null)
  const [currAddress, setCurrAddress] = useState("")
  const [mapRegion, setMapRegion] = useState({})

  const [onLocation, setOnLocation] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRestart, setRestart] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [time, setTime] = useState(moment())
  const currentDate = moment().format('MMMM D, YYYY, dddd')

  const route = useRoute()
  const navigation = useNavigation()

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 14.643779,
    longitude: 121.026478,
  })

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 1000)  
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    Utils.permissionLocation(setIsLoading, setLocation, setMapRegion, setCurrAddress)
  }, [isRestart])  

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const isLocationEnabled = await Location.getProviderStatusAsync()
  
        if (!isLocationEnabled.locationServicesEnabled) {
          setOnLocation(true)
          setIsDisabled(true)
        } else {
          setOnLocation(false)
          setIsDisabled(false)
        }                  

      } catch (error) { console.error("Error checking location services:", error) }
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  
  const openCustomAlert = () => {
    setIsSuccessAlertVisible(true)

    setClockedDate(currentDate)
    setClockedTime(time.format('h:mm:ss A'))
  }

  const closeCustomAlert = () => {
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
      <View style={styles.topHeader}>
          <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
          >
              <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
          </TouchableOpacity>

          <Text style={styles.textHeader}>Time Clock</Text>
      </View>

      { onLocation ? ( 
        <LocationPrompt 
          permissionLocation={Utils.permissionLocation(setIsLoading, setLocation, setMapRegion, setCurrAddress)} 
          navigation={navigation}
        /> ) : ( null )}

      { isLoading ? (
        <RefreshPage setRestart={setRestart} onRefresh={onRefresh} refreshing={refreshing} />
      ) : (
        <>
          <View style={styles.container}>
            <MapView
              showsPointsOfInterest
              showsMyLocationButton
              style={{ flex: 1, height: 'auto' }}
              region={mapRegion}
              showsUserLocation
              followsUserLocation
              showsTraffic
              loadingEnabled
              userInterfaceStyle='light'
              userLocationPriority='high'
              // onPress={handleMapPress}
            >
              <Marker
                coordinate={markerCoordinate}
                title={`Latitude: ${markerCoordinate.latitude.toFixed(6)}`}
                description={`Longitude: ${markerCoordinate.longitude.toFixed(6)}`}
              />
            </MapView>
            
            <Shadow style={styles.bottomContainer}>
              <View style={styles.dateTimeWrapper}>
                <Text style={styles.dateText}>{currentDate}</Text>
                <Text style={styles.timeText}>{time.format('h:mm:ss A')}</Text>
              </View>

              { route.params.clockedValue == 0 ? (
                <TouchableOpacity 
                  style={[ styles.clockOutBtn, isDisabled ? styles.disabledBtn : null  ]}
                  disabled={ isDisabled  ? true : false }
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
                  style={[ styles.clockInBtn, isDisabled ? styles.disabledBtn : null  ]}
                  disabled={ isDisabled  ? true : false }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
      paddingHorizontal: 10,
  },

  topHeader: {
      padding: 1,
      paddingBottom: 10,
      paddingVertical: 50,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLORS.powderBlue,
  },

  textHeader: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
      marginRight: 50,
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
