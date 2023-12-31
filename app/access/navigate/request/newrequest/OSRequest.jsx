// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert, KeyboardAvoidingView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import PageHeader from "../../../../../components/header/PagesHeader";
import FileAttachedNote from "../../../../../components/note/FileAttachedNote";
import TitleInput from "../../../../../components/section/request/TitleInput";
import { COLORS, STRINGS, STYLES, Utils, DateTimeUtils } from "../../../../../constant";
import { ScrollView } from "react-native";

const data = ["8:00 AM to 5:00 PM"]

export default function OSRequest ({ navigation }) {
    const [offsetDate, setOffsetDate] = useState(null)
    const [location, setLocation] = useState("Location")
    const [actualOSIn, setActualOSIn] = useState(null)
    const [actualOSOut, setActualOSOut] = useState(null)
    const [OSStart, setOSStart] = useState(null)
    const [OSEnd, setOSEnd] = useState(null)
    const [reason, setReason] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [isDatePicker, setDatePicker] = useState(false)
    const [isActualInPicker, setActualInPicker] = useState(false)
    const [isActualOutPicker, setActualOutPicker] = useState(false)
    const [isOSStartPicker, setOSStartPicker] = useState(false)
    const [isOSEndPicker, setOSEndPicker] = useState(false)

    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)
    const [isInputCheck, setInputCheck] = useState(false)

    const [shiftSched, setShiftSched] = useState(null)

    const route = useRoute()
    const styles = STYLES.OSRequest
    const imageParams = route.params?.image

    useEffect(() => {
        imageParams != "undefined" && setSelectedFile(imageParams)
    }, [imageParams])

    const handleOFFDate = (date) => {
        setOffsetDate(DateTimeUtils.defaultDateFormat(date))
        setDatePicker(false)
    }

    const handleTimeIn = (time) => {
        setActualOSIn(DateTimeUtils.timeDefaultConvert(time))
        setActualInPicker(false)
    }

    const handleTimeOut = (time) => {
        setActualOSOut(DateTimeUtils.timeDefaultConvert(time))
        setActualOutPicker(false)
    }

    const handleOffsetStart = (time) => {
        setOSStart(DateTimeUtils.timeDefaultConvert(time))
        setOSStartPicker(false)
    }

    const handleOffsetEnd = (time) => {
        setOSEnd(DateTimeUtils.timeDefaultConvert(time))
        setOSEndPicker(false)
    }

    const onNextHandler = () => {
        if ( !offsetDate || !shiftSched || !actualOSIn || !actualOSOut || !OSStart || !OSEnd || !reason || !selectedFile) {
            setInputCheck(true)
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 3,
                offsetDate:  offsetDate,
                shiftSchedule: shiftSched,
                actualOSIn: actualOSIn,
                actualOSOut: actualOSOut,
                OSStart: OSStart,
                OSEnd: OSEnd,
                reason: reason,
                attachedFile: JSON.stringify(selectedFile),
            })   
        }
    }

    return (
        <View style={styles.mainView}>
            <PageHeader pageName={"OS New Request"} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Offset Date"
                                inputValue={offsetDate} 
                                isInputCheck={isInputCheck}
                            />   

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    { offsetDate == null ? ( <Text style={styles.placeholder}>mm/dd/yyyy</Text> ) 
                                    : (DateTimeUtils.dateFullConvert(offsetDate)) }
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
                                title="Shift"
                                inputValue={shiftSched} 
                                isInputCheck={isInputCheck}
                            />  

                            <SelectDropdown 
                                data={data}
                                onSelect={ (item, index) => { setShiftSched(item)} }
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
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Actual OS In"
                                inputValue={actualOSIn} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {actualOSIn == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(actualOSIn)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setActualInPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Actual OS Out"
                                inputValue={actualOSOut} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {actualOSOut == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(actualOSOut)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setActualOutPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="OS Start"
                                inputValue={OSStart} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {OSStart == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(OSStart)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setOSStartPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="OS End"
                                inputValue={OSEnd} 
                                isInputCheck={isInputCheck}
                            /> 

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {OSEnd == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(OSEnd)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setOSEndPicker(true)}
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
                                multiline
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
                                        onPress={() => navigation.navigate('CameraAccess', { onPanel: 3 })} />

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
                onPress={onNextHandler}
            >
                <Text style={styles.textButton}>NEXT</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePicker}
                mode="date"
                onConfirm={handleOFFDate}
                onCancel={() => setDatePicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isActualInPicker}
                mode="time"
                onConfirm={handleTimeIn}
                onCancel={() => setActualInPicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isActualOutPicker}
                mode="time"
                onConfirm={handleTimeOut}
                onCancel={() => setActualOutPicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isOSStartPicker}
                mode="time"
                onConfirm={handleOffsetStart}
                onCancel={() => setOSStartPicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isOSEndPicker}
                mode="time"
                onConfirm={handleOffsetEnd}
                onCancel={() => setOSEndPicker(false)} 
            />
        </View>
  )
}