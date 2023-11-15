import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert, KeyboardAvoidingView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

import PageHeader from "../../../../../components/header/PagesHeader";
import { COLORS, STRINGS, Utils } from "../../../../../constant";
import { ScrollView } from "react-native";

const data = [{ timeIn: "10:00 AM", timeOut: "7:00 PM"}, { timeIn: "8:00 AM", timeOut: "6:00 PM" }]

export default function OBRequest ({ navigation }) {
    const [OBDate, setOBDate] = useState(null)
    const [location, setLocation] = useState("Location")
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

    const [shiftSched, setShiftSched] = useState(null)

    const route = useRoute()
    const imageURL = decodeURIComponent(route.params?.image)

    useEffect(() => {
        imageURL != "undefined" && setSelectedFile(imageURL)
    }, [imageURL])

    const newData = data.map(item => `${item.timeIn} to ${item.timeOut}`)

    const handleOBDate = (date) => {
        setOBDate(moment(date).format('YYYYMMDD'))
        setDatePicker(false)
    }

    const handleTimeIn = (time) => {
        setTimeIn(moment(time).format('HH:mm'))
        setTimeInPicker(false)
    }

    const handleTimeOut = (time) => {
        setTimeOut(moment(time).format('HH:mm'))
        setTimeOutPicker(false)
    }

    const onNextHandler = () => {
        if ( !OBDate || !location || !shiftSched || !timeIn || !timeOut || !reason || !selectedFile) {
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 1,
                OBDate:  OBDate,
                location: '',
                shiftSchedule: shiftSched,
                timeIn: timeIn,
                timeOut: timeOut,
                reason: reason,
                attachedFile: selectedFile,
            })   
        }
    }

    return (
        <>
            <PageHeader pageName={"OB New Request"} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled
            >
                <ScrollView bounces={false}>
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <Text style={styles.title}>OB Date</Text>

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    { OBDate == null ? (<Text style={styles.placeholder}>mm/dd/yyyy</Text>) 
                                    : (moment(OBDate, "YYYYMMDD").format("MMMM DD, YYYY")) }
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
                            <Text style={styles.title}>Location</Text>

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    <Text style={styles.placeholder}>Location</Text>
                                </Text>

                                <Entypo 
                                    name="location" 
                                    size={22} 
                                    color={COLORS.darkGray} />
                            </View>
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.title}>Shift Schedule</Text>

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
                                    padding: 12,
                                    borderRadius: 15,
                                    borderColor: COLORS.darkGray,
                                    borderWidth: 1,
                                }}
                                buttonTextStyle={{
                                    fontSize: 14,
                                }}
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
                            <Text style={styles.title}>OB Time-in</Text>

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {timeIn == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : timeIn}
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
                            <Text style={styles.title}>OB Time-out</Text>

                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.text}>
                                    {timeOut == null ? (
                                        <Text style={styles.placeholder}>Time</Text>
                                    ) : timeOut}
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
                            <Text style={styles.title}>Reason</Text>

                            <TextInput
                                style={[styles.textInput, styles.border]}
                                onChangeText={(text) => setReason(text)}
                                value={reason}
                                placeholder="Details"
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
                                        onPress={() => navigation.navigate('CameraAccess', { onPanel: 1 })} />

                                    <FontAwesome 
                                        name="file" size={18} color={COLORS.darkGray} style={{ marginLeft: 15 }}
                                        onPress={() => Utils.fileAttach(setSelectedFile)}
                                    />
                                </View>
                            </View>

                            { isFileNote && (
                                <Text style={styles.fileNote}>{STRINGS.fileNote}</Text>
                            )}

                            { isInvalidError && (
                                <Text style={styles.fileError}>{STRINGS.invalidError}</Text>
                            )}

                            { isSizeError && (
                                <Text style={styles.fileError}>{STRINGS.sizeError}</Text>
                            )}
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
        </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 15,
        marginHorizontal: 20
    },

    wrapper: {
        marginTop: 10,
    },

    border: {
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        borderRadius: 12,
    },

    title: {
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 15,
        marginBottom: 7,
    },

    text: { 
        fontFamily: 'Inter_400Regular',
        paddingVertical: 5,
    },

    grayText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray
    },

    rowView: {
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 45
    },

    placeholder: {
        color: COLORS.tr_gray,
    },

    itemPicker: {
        fontSize: 14
    },

    textInput: {
        paddingLeft: 15,
        height: 45
    },

    timeWrapper:{
        marginVertical: 15,
        marginHorizontal: 20,
    },

    timeContent: {
        fontFamily: 'Inter_500Medium',
        backgroundColor: COLORS.gray,
        width: 100,
        textAlign: 'center',

        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.tr_gray
    },

    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },

    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.orange,
        width: 170,
        padding: 10,
        marginVertical: 20,
        borderRadius: 20,
    },

    textButton: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: COLORS.clearWhite,
        textAlign: 'center',
    },

    fileNote: {
        fontStyle: 'italic',
        fontSize: 13,
        marginHorizontal: 20,
        marginVertical: 10,
    },

    fileError: {
        fontSize: 13,
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: COLORS.red,
        fontStyle: 'italic',
    },

    fileSuccess: {
        color: COLORS.green,
        marginLeft: 10,
        fontFamily: 'Inter_600SemiBold'
    }
})