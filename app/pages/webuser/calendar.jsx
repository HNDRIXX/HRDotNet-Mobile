import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import * as Animatable from 'react-native-animatable';
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { Shadow } from "react-native-shadow-2";

import { COLORS } from "../../../constant";
import CalendarNote from "../../../components/note/CalendarNote";
import NavigationHeader from "../../../components/header/NavigationHeader";
import CalendarEvent from "../../../components/section/calendar/CalendarEvent";

export default function CalendarScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [currDate, setCurrDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(null)
  const [previousDate, setPreviousDate] = useState(null)
  const [nextDate, setNextDate] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const scrollViewRef = useRef(null)

  const updatedValueEvents = {}

  useEffect(() => {
      setTimeout(() => {
      setIsLoading(false)
      }, 800)
  }, [])

  const valueEvents = {
    '20231001': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231002': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231003': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231004': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day', }, ],
    '20231005': [ { event: 'Approved Leave', status: 'Leave', }, ],
    '20231006': [ { event: 'Government Declared Holiday', status: 'Holiday' } ],
    '20231007': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231008': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231018': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231019': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231020': [ { event: 'No Work Schedule', status: 'Rest Day' } ],
    '20231030': [ { event: 'Election', status: 'Holiday' } ],
    '20231031': [ { event: '7:00 AM to 4:00 PM', status: 'Work Day' } ],
  }

  for (const key in valueEvents) {
    const formattedDate = key.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    updatedValueEvents[formattedDate] = valueEvents[key]
  }
  
  const today = moment().format("MMMM DD, YYYY")
  const todayDate = moment(today, "MMMM DD, YYYY")
  const yesterday = todayDate.clone().subtract(1, 'days')
  const tomorrow = todayDate.clone().add(1, 'days')

  const addMarkedDates = () => {
    const marked = {}
    for (const date in updatedValueEvents) {
      marked[date] = { marked: true, }
    }
    return marked
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    
    return `${month} ${day}, ${year}`
  }
  
  const getPreviousDate = (dateString) => {
    const currentDate = new Date(dateString)
    const previousDate = new Date(currentDate)
    previousDate.setDate(currentDate.getDate() - 1)
    return formatDate(previousDate.toISOString())
  }

  const getNextDate = (dateString) => {
    const currentDate = new Date(dateString)
    const previousDate = new Date(currentDate)
    previousDate.setDate(currentDate.getDate() + 1)
    return formatDate(previousDate.toISOString())
  }

  const dayPress = (day) => {
    setSelectedDate(day.dateString)
    const previousDate = getPreviousDate(day.dateString)
    const nextDate = getNextDate(day.dateString)
    setEvents(updatedValueEvents[day.dateString] || [])
    setPreviousDate(previousDate)
    setNextDate(nextDate)
  }  
  
  const refresh = () => {
    setRefreshing(true)
    setSelectedDate(null)
    setEvents(null)

    setTimeout(() => {
      setRefreshing(false)

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true })
      }
    }, 1000)
  }

  const defaultDate = (originalDate) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ]

    const parts = originalDate.split(' ')
  
    const month = monthNames.indexOf(parts[0]) + 1
    const day = parseInt(parts[1].replace(',', ''), 10)
    const year = parseInt(parts[2], 10)
  
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  
    return formattedDate
  }

  const checkColor = (valueColor) => {
    let color

    switch (valueColor) {
      case "Work Day":
        color = COLORS.green
        break

      case "Holiday":
        color = COLORS.red
        break

      case "Leave": 
        color = COLORS.filed
        break
      
      case "Rest Day": 
        color = COLORS.purple
        break

      default:
        color = COLORS.darkGray
    }

    return color
  }

  return (
    <>
      <NavigationHeader headerName="Calendar" />
      
      {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.powderBlue} style={styles.loader} />
      ) : (
          <Animatable.View
              animation={'fadeIn'}
              duration={500}
              style={{ opacity: 1, flex: 1 }}
          >
              <View style={styles.container}>
                  <View
                    ref={scrollViewRef}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                      />
                  }>
                    <Calendar
                        onDayPress={dayPress}
                        style={styles.calendarView}
                        enableSwipeMonths
                        headerStyle={{
                          backgroundColor: COLORS.clearWhite,
                        }}
                        theme={{
                          dotColor: COLORS.orange,
                          todayTextColor: COLORS.baseOrange,
                          arrowColor: COLORS.powderBlue,
                        }}
                        markedDates={addMarkedDates()}
                    />

                  {selectedDate ? (
                      <CalendarEvent 
                        events={events}
                        formatDate={formatDate}
                        selectedDate={selectedDate}
                        yesterday={yesterday}
                        tomorrow={tomorrow}
                        checkColor={checkColor}
                        previousDate={previousDate}
                        updatedValueEvents={updatedValueEvents}
                        defaultDate={defaultDate}
                        nextDate={nextDate}
                      />
                  ) : (
                      <View style={styles.promptView}><CalendarNote /></View>
                  )}
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

  container: {
    flex: 1,
    backgroundColor: COLORS.clearWhite,
  },

  calendarView: {
    paddingTop: 5,
    paddingBottom: 50,
    height: 'auto',
  },
})