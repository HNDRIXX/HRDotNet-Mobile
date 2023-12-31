// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

import PageHeader from "../../../../../components/header/PagesHeader";
import Loader from "../../../../../components/prompt/loader/Loader";
import FileAttachedNote from "../../../../../components/note/FileAttachedNote";
import { COLORS, STRINGS, STYLES, DateTimeUtils, Utils} from "../../../../../constant";

import OverTimePrompt from "../../../../../components/prompt/OverTimePrompt";

const data = [
    { 
        OTDate: '20231201',
        actualOTIn: '18:15:00',
        actualOTOut: '21:15:00',
        shiftSchedule: '08:00 AM to 06:00 PM (Default Schedule)',
    },
    { 
        OTDate: '20231202',
        actualOTIn: '18:38:00',
        actualOTOut: '21:45:00',
        shiftSchedule: '06:30 AM to 05:30 PM (Default Schedule)',
    },
    { 
        OTDate: '20231203',
        actualOTIn: '18:38:00',
        actualOTOut: '21:45:00',
        shiftSchedule: '06:30 AM to 05:30 PM (Default Schedule)',
    },
]

export default function OTRequest ({ navigation }) {
    const [filteredData, setFilteredData] = useState([])
    const [OTDate, setOTDate] = useState(null)
    const [shiftSched, setShiftSched] = useState(null)
    const [actualOTIn, setActualOTIn] = useState(null)
    const [actualOTOut, setActualOTOut] = useState(null)
    const [OvertimeFrom, setOvertimeFrom] = useState(null)
    const [OvertimeTo, setOvertimeTo] = useState(null)
    const [reason, setReason] = useState(null)
    const [selectedFile, setSelectedFile] = useState({})

    const [isVisible, setVisible] = useState(true)
    const [OvertimeFromPicker, setOvertimeFromPicker] = useState(false)
    const [OvertimeToPicker, setOvertimeToPicker] = useState(false)

    const [checkItem, setCheckItem] = useState(null)
    const [checkSelect, setCheckSelect] = useState(null)

    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)
    const [isPromptLoad, setPromptLoad] = useState(true)

    const [isHalf, setHalf] = useState(null)
    const [isFirstHalf, setFirstHalf] = useState(null)
    const [isSecondHalf, setSecondHalf] = useState(null)

    const currentDate = moment()
    const firstDayOfMonth = moment().startOf('month')
    const fifteenthDayOfMonth = moment().date(15)
    const lastDayOfMonth = moment().endOf('month')
    const sixteenthDayOfMonth = moment().date(15)

    const route = useRoute()
    const styles = STYLES.OTRequest
    const imageParams = route.params?.image

    useEffect(() => {
        imageParams != "undefined" && setSelectedFile(imageParams)
    }, [imageParams])

    useEffect(() => {
        if (moment(currentDate, 'YYYYMMDD').isBetween(firstDayOfMonth, fifteenthDayOfMonth, null, '[]')) {
            setHalf('first')
            setFirstHalf(true)
            setSecondHalf(false)
        } else if (moment(currentDate, 'YYYYMMDD').isBetween(sixteenthDayOfMonth, lastDayOfMonth, null, '[]')) {
            setHalf('second')
            setFirstHalf(false)
            setSecondHalf(true)
        }
    }) 

    useEffect(() => {
        let newFilteredData = []
        const fetchData = async () => {
            if (isFirstHalf) {
                newFilteredData = data.filter(item =>
                    moment(item.OTDate, 'YYYYMMDD').isBetween(firstDayOfMonth, fifteenthDayOfMonth, null, '[]')
                )
            } else if (isSecondHalf) {
                newFilteredData = data.filter(item =>
                    moment(item.OTDate, 'YYYYMMDD').isBetween(sixteenthDayOfMonth, lastDayOfMonth, null, '[]')
                )
            }

            if (newFilteredData.length > 0) {
                const sortedData = [...newFilteredData].sort((a, b) => a.OTDate.localeCompare(b.OTDate));
                setFilteredData(sortedData)
            } 

            setPromptLoad(false)
        }

        fetchData()
    }, [data, isFirstHalf, isSecondHalf])
    
    const onNextHandler = () => {
        if(!OTDate || !shiftSched || !actualOTIn || !actualOTOut ||
            !OvertimeFrom || !OvertimeTo || !reason || !selectedFile ){
            alert("Please complete your request form.")
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 2,
                OTDate: OTDate,
                shiftSchedule: shiftSched,
                actualOTIn: actualOTIn,
                actualOTOut: actualOTOut,
                OvertimeFrom: OvertimeFrom,
                OvertimeTo: OvertimeTo,
                reason: reason,
                attachedFile: JSON.stringify(selectedFile),
            })    
        }
    }

    const onCancel = () => {
        setVisible(false)
        navigation.goBack()
    }

    const onSelect = () => {
        checkSelect != null ? setVisible(false) : alert('Please select a date.')
    }

    const handleCheck = (index) => {
        setCheckSelect(index)
        setOTDate(filteredData[index].OTDate)
        setShiftSched(filteredData[index].shiftSchedule)
        setActualOTIn(filteredData[index].actualOTIn)
        setActualOTOut(filteredData[index].actualOTOut)   
    }

    const handleOvertimeFrom = (time) => {
        setOvertimeFrom(moment(time).format('HH:mm:ss'))
        setOvertimeFromPicker(false)
    }

    const handleOvertimeTo = (time) => {
        setOvertimeTo(moment(time).format('HH:mm:ss'))
        setOvertimeToPicker(false)
    }

    return (
        <View style={styles.mainView}>
            <PageHeader pageName={"OT New Request"} backStatus="react" />

            { isPromptLoad ? (
                <Loader />
            ) : (
                <OverTimePrompt 
                    isVisible={isVisible}
                    checkItem={checkItem}
                    isHalf={isHalf}
                    isPromptLoad={isPromptLoad}
                    data={filteredData}
                    checkSelect={checkSelect}
                    handleCheck={handleCheck}
                    onCancel={onCancel}
                    onSelect={onSelect}
                />
            )}
            
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled
            >
                <ScrollView bounces={false} >
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <Text style={styles.title}>OT Date</Text>

                            <View style={[styles.rowView, styles.border, styles.disabledInput]}>
                                <Text style={styles.text}>
                                    {OTDate && DateTimeUtils.dateFullConvert(OTDate)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>Shift</Text>

                            <View style={[styles.rowView, styles.border, styles.disabledInput]}>
                                <Text style={styles.text}>{shiftSched}</Text>
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>Actual OT In</Text>

                            <View style={[styles.rowView, styles.border, styles.disabledInput]}>
                                <Text style={styles.text}>
                                    {DateTimeUtils.timeConvert(actualOTIn)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>Actual OT Out</Text>

                            <View style={[styles.rowView, styles.border, styles.disabledInput]}>
                                <Text style={styles.text}>
                                    {DateTimeUtils.timeConvert(actualOTOut)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>OT From</Text>

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {!OvertimeFrom ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(OvertimeFrom)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setOvertimeFromPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>OT To</Text>

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {!OvertimeTo ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : DateTimeUtils.timeConvert(OvertimeTo)}
                                </Text>

                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setOvertimeToPicker(true)}
                                />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>Reason</Text>

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
                            <Text style={styles.title}>File</Text>

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
                                        onPress={() => navigation.navigate('CameraAccess', { onPanel: 2 })} />

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
                isVisible={OvertimeFromPicker}
                mode="time"
                onConfirm={handleOvertimeFrom}
                onCancel={() => setOvertimeFrom(false)} 
            />

            <DateTimePickerModal
                isVisible={OvertimeToPicker}
                mode="time"
                onConfirm={handleOvertimeTo}
                onCancel={() => setOvertimeFrom(false)} 
            />
        </View>
  )
}