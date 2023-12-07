import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert, KeyboardAvoidingView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import PageHeader from "../../../../../components/header/PagesHeader";
import FileAttachedNote from "../../../../../components/note/FileAttachedNote";
import TitleInput from "../../../../../components/section/request/TitleInput";
import { COLORS, STRINGS, STYLES, Utils, DateTimeUtils, RequestUtils, LocationUtils } from "../../../../../constant";
import { ScrollView } from "react-native";

const data = [{ timeIn: "10:00 AM", timeOut: "7:00 PM"}, { timeIn: "8:00 AM", timeOut: "6:00 PM" }]

export default function OBRequest ({ navigation }) {
    const [OBDate, setOBDate] = useState(null)
    const [location, setLocation] = useState('')

    const [timeIn, setTimeIn] = useState(null)
    const [timeOut, setTimeOut] = useState(null)
    const [reason, setReason] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [timeInText, setTimeInText] = useState("00:00")
    const [timeOutText, setTimeOutText] = useState("00:00")

    const [isDatePicker, setDatePicker] = useState(false)
    const [isTimeInPicker, setTimeInPicker] = useState(false)
    const [isTimeOutPicker, setTimeOutPicker] = useState(false)

    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)
    const [isInputCheck, setInputCheck] = useState(false)

    const [shiftSched, setShiftSched] = useState(null)

    const route = useRoute()
    const styles = STYLES.OBRequest
    const imageParams = route.params?.image

    const getLocationPermission = async () => {
        LocationUtils.locationPermissionEnabled()
    
          try {
              LocationUtils.officialWorkLocation(location, setLocation)
          } catch (error) {
              await getLocationPermission()
              return
          }
    }

    useEffect(() => {
        imageParams != "undefined" && setSelectedFile(imageParams)
    }, [imageParams])

    
    useEffect(() => {
        getLocationPermission()

        const intervalId = setInterval(() => {
            getLocationPermission()
        }, 2000)
      
        return () => clearInterval(intervalId)
    }, [])

    const newData = data.map(item => `${item.timeIn} to ${item.timeOut}`)

    const handleOBDate = (date) => {
        setOBDate(moment(date).format('YYYYMMDD'))
        setDatePicker(false)
    }

    const handleTimeIn = (time) => {
        setTimeIn(DateTimeUtils.timeDefaultConvert(time))
        setTimeInPicker(false)
    }

    const handleTimeOut = (time) => {
        setTimeOut(DateTimeUtils.timeDefaultConvert(time))
        setTimeOutPicker(false)
    }

    const onNextHandler = () => {
        if ( !OBDate || !location || !shiftSched || !timeIn || !timeOut || !reason || !selectedFile) {
            setInputCheck(true)
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 1,
                OBDate:  OBDate,
                location: location,
                shiftSchedule: shiftSched,
                timeIn: timeIn,
                timeOut: timeOut,
                reason: reason,
                attachedFile: JSON.stringify(selectedFile),
            })   
        }
    }

    return (
        <View style={styles.mainView}>
            <PageHeader pageName={"OB New Request"} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="OB Date"
                                inputValue={OBDate} 
                                isInputCheck={isInputCheck}
                            />   

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    { OBDate == null ? ( <Text style={styles.placeholder}>mm/dd/yyyy</Text> ) 
                                    : (DateTimeUtils.dateFullConvert(OBDate)) }
                                </Text>
                                
                                <Ionicons 
                                    name="calendar" 
                                    size={24} 
                                    color={COLORS.darkGray} 
                                    onPress={() => setDatePicker(true)}   
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Location"
                                inputValue={location} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <TextInput
                                    // style={[styles.textInput]}
                                    onChangeText={(text) => setLocation(text)}
                                    value={location}
                                    placeholder="Location"
                                    placeholderTextColor={COLORS.tr_gray}
                                />

                                <FontAwesome5 
                                    name="location-arrow"
                                    size={20}
                                    color={COLORS.darkGray}  
                                    onPress={() => getLocationPermission()}                               
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Shift Schedule"
                                inputValue={shiftSched} 
                                isInputCheck={isInputCheck}
                            />  

                            <SelectDropdown 
                                data={newData}
                                onSelect={(item, index) => {
                                    setTimeInText(item.split(" to ")[0])
                                    setTimeOutText(item.split(" to ")[1])
                                    setShiftSched(item)
                                }}
                                buttonStyle={{
                                    width: '100%',
                                    height: 'auto',
                                    backgroundColor: COLORS.clearWhite,
                                    padding: 12,
                                    borderRadius: 15,
                                    borderColor: COLORS.darkGray,
                                    borderWidth: 1,
                                }}
                                buttonTextStyle={{
                                    fontSize: 14,
                                    textAlign: 'left'
                                }}
                                defaultButtonText="Select schedule"
                            />

                            <View style={styles.timeWrapper}>
                                <View style={styles.timeView}>
                                    <Text style={styles.grayText}>Time-in</Text>
                                    <Text style={styles.timeContent}>{timeInText}</Text>
                                </View>

                                <View style={styles.timeView}>
                                    <Text style={styles.grayText}>Time-out</Text>
                                    <Text style={styles.timeContent}>{timeOutText}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="OB Time-in"
                                inputValue={timeIn} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {timeIn == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(timeIn)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setTimeInPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="OB Time-out"
                                inputValue={timeOut} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {timeOut == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(timeOut)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setTimeOutPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Reason"
                                inputValue={reason} 
                                isInputCheck={isInputCheck}
                            /> 

                            <TextInput
                                style={[styles.textInput, styles.border]}
                                onChangeText={(text) => setReason(text)}
                                value={reason}
                                placeholder="Details"
                                placeholderTextColor={COLORS.tr_gray}
                            />
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="File"
                                inputValue={selectedFile} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                {selectedFile == null ? (
                                    <Text style={styles.placeholder}>Camera/Upload</Text>
                                ) : (
                                    <View style={[styles.rowView, { paddingHorizontal: 0 }]}>
                                        <AntDesign 
                                            name="checkcircle"
                                            size={20}
                                            color={COLORS.green}
                                        />

                                        <Text style={styles.fileSuccess}>File Attached</Text>
                                    </View>
                                )}

                                <View style={[styles.rowView, { marginRight: -10 }]}>
                                    <Ionicons 
                                        name="camera" size={26} color={COLORS.darkGray}
                                        onPress={() => navigation.navigate('CameraAccess', { onPanel: 1 })} />

                                    <FontAwesome5
                                        name="file-upload" size={18} color={COLORS.darkGray} style={{ marginLeft: 15 }}
                                        // onPress={() => Utils.fileAttach(setSelectedFile)}
                                    />
                                </View>
                            </View>

                            <FileAttachedNote 
                                isFileNote={isFileNote}
                                isInvalidError={isInvalidError}
                                isSizeError={isSizeError} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity 
                style={styles.button}
                onPress={onNextHandler}>
                <Text style={styles.textButton}>NEXT</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePicker}
                mode="date"
                onConfirm={handleOBDate}
                onCancel={() => setDatePicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isTimeInPicker}
                mode="time"
                onConfirm={handleTimeIn}
                onCancel={() => setTimeInPicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isTimeOutPicker}
                mode="time"
                onConfirm={handleTimeOut}
                onCancel={() => setTimeOutPicker(false)} 
            />
        </View>
  )
}