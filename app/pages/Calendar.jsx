// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet,  RefreshControl } from "react-native";
import { Calendar } from "react-native-calendars";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import { COLORS, STYLES, Utils } from "../../constant";
import CalendarNote from "../../components/note/CalendarNote";
import NavigationHeader from "../../components/header/NavigationHeader";
import CalendarEvent from "../../components/section/calendar/CalendarEvent";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/loader/Loader";

export default function CalendarScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [dateCalendar, setDateCalendar] = useState(moment().format('YYYY-MM-DD'))
  const [selectedMonth, setSelectedMonth] = useState(moment().month())
  const [selectedYear, setSelectedYear] = useState(moment().year())
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(null)
  const [previousDate, setPreviousDate] = useState(null)
  const [nextDate, setNextDate] = useState(null)
  const [valueEvents, setValueEvents] = useState(null)
  const scrollViewRef = useRef(null)

  const styles = STYLES.Calendar
  const updatedValueEvents = {}

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
                  
        const startDate = moment().month(selectedMonth).startOf('month').year(selectedYear)
        const endDate = moment().month(selectedMonth).endOf('month').year(selectedYear)

        const userID = await AsyncStorage.getItem('userID')
        const connValue = await AsyncStorage.getItem('conn')
        const portValue = await AsyncStorage.getItem('port')

        const setPortValue = portValue !== null ? ':' + portValue : ''

        const response = await fetch(`http://${connValue}${setPortValue}/api/calendar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                IDEmployee: userID, 
                startDate: startDate.format('YYYYMMDD'), 
                endDate: endDate.format('YYYYMMDD') 
            }),
        })

        const data = await response.json()

        if (response.ok) {
          try {
            const transformData = async (inputArray) => {
              const transformedData = {}
            
              for (const item of inputArray) {
                for (const key of Object.keys(item)) {
                  if (key.endsWith('_Date')) {
                    const date = item[key];
                    const scheduleKey = key.replace('_Date', '_Name_Schedule')
                    const scheduleValue = item[scheduleKey]
            
                    if (transformedData[date]) {
                      transformedData[date].push({ Name_Schedule: scheduleValue })
                    } else {
                      transformedData[date] = [{ Name_Schedule: scheduleValue }]
                    }
                  }
                }
              }
            
              return transformedData;
            }

            const transformRD = async (inputArray) => {
              const transformedObject = {};
            
              inputArray.forEach(item => {
                // Assuming that the properties are consistently named in the input
                const dates = Object.keys(item).filter(key => key.includes('_Date'));
                
                dates.forEach(dateKey => {
                  const date = item[dateKey];
                  const isRestDayKey = dateKey.replace('_Date', '_IsRestDay');
                  const isRestDay = item[isRestDayKey];
                  
                  if (!transformedObject[date]) {
                    transformedObject[date] = [{ isRestDay }];
                  } else {
                    transformedObject[date].push({ isRestDay });
                  }
                });
              });
            
              return transformedObject
            }

            const transformTKData = async (inputArray) => {
              const formattedObject = {};
            
              for (const item of inputArray) {
                const { WorkDate, ActualTimeIn, ActualTimeOut } = item;
            
                if (ActualTimeIn !== 'No Log' && ActualTimeOut !== 'No Log') {
                  if (!formattedObject[WorkDate]) {
                    formattedObject[WorkDate] = [];
                  }
            
                  const formattedData = {
                    ActualTimeIn: ActualTimeIn,
                    ActualTimeOut: ActualTimeOut,
                  };
            
                  formattedObject[WorkDate].push(formattedData);
                }
              }
            
              return formattedObject;
            };

            const modifiedWorkSched = await transformData(data.workSched)
            const modifiedWorkSchedRD = await transformRD(data.workSchedRD)
            const modifiedTKData = await transformTKData(data.TKData)

            console.log(modifiedTKData)
    
            const datesObject = {}
      
            while (startDate.isSameOrBefore(endDate)) {
              const formattedDate = startDate.format('YYYYMMDD')
              const dayOfWeek = startDate.format('dddd').toUpperCase().slice(0, 3)
    
              const workDayData = modifiedWorkSched[formattedDate]
              const workRDData = modifiedWorkSchedRD[formattedDate]
              const workTKData = modifiedTKData[formattedDate]

              datesObject[formattedDate] = [
                {
                  day: dayOfWeek,
                  event:  
                    (workDayData && workDayData.length > 0 &&
                      workDayData[workDayData.length - 1].Name_Schedule) ||
                      
                    data.defaultSched[0][`${dayOfWeek}_Name_Schedule`],

                  status: (workRDData &&
                    workRDData.length > 0 &&
                    workRDData[workRDData.length - 1].isRestDay)
                    ? 'Rest Day'
                    : (data.defaultSched[0][`${dayOfWeek}_IsRestDay`] ? 'Rest Day' : 'Work Day'),
      
                  logs: workTKData && workTKData.length > 0 && `${workTKData[0].ActualTimeIn} - ${workTKData[0].ActualTimeOut}` || '',
                },
                ...(datesObject[formattedDate] || []),
              ]
    
              startDate.add(1, 'days')
            }
    
            setValueEvents(datesObject)
            // console.log(datesObject)
            setIsLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error)
            setIsLoading(false)
          }
        } else { alert(data.message) }
      } catch (error) { console.error(error) }
    }

    fetchUserData()
  }, [selectedMonth,])
  
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
    return Utils.circledBulletColor(valueColor)
  }

  return (
    <>
      <NavigationHeader headerName="Calendar" />

      {isLoading ? ( <Loader /> ) : (
        <Animatable.View
              animation={'fadeIn'}
              duration={500}
              style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
        >
          <View style={styles.container}>
              <ScrollView
                ref={scrollViewRef}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh} />
              }>
                <Calendar
                    onDayPress={dayPress}
                    current={dateCalendar}
                    onMonthChange={(date) => {
                      setIsLoading(true)
                      setSelectedDate(null)
                      setSelectedMonth(date.month - 1)
                      setSelectedYear(date.year)
                      setDateCalendar(date.dateString)
                    }}
                    style={styles.calendarView}
                    showSixWeeks={false}
                    enableSwipeMonths

                    headerStyle={{
                      backgroundColor: COLORS.clearWhite,
                    }}

                    theme={{
                      dotColor: COLORS.clearWhite,
                      todayTextColor: COLORS.baseOrange,
                      arrowColor: COLORS.powderBlue,
                    }}

                    markedDates={addMarkedDates()}
                />
              </ScrollView>
          </View>

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
              <View style={styles.promptView}>
                <CalendarNote />
              </View>
          )}
        </Animatable.View>
      )}
    </>
  )
}
