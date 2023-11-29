import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import PageHeader from "../../../../../components/header/PagesHeader";
import TitleInput from "../../../../../components/section/request/TitleInput";
import FileAttachedNote from "../../../../../components/note/FileAttachedNote";
import { COLORS, STRINGS, Utils, DateTimeUtils } from "../../../../../constant";
import { ScrollView } from "react-native";

const checkboxData = ['Time-in', 'Time-out']

export default function LVRequest ({ navigation }) {
    const [missedLogDate, setMissedLogDate] = useState(null)
    const [logType, setLogType] = useState(null)
    const [logTime, setLogTime] = useState(null)
    const [reason, setReason] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [checkSelect, setCheckSelect] = useState(null)

    const [isDatePicker, setDatePicker] = useState(false)
    const [isTimePicker, setTimePicker] = useState(false)

    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)
    const [isInputCheck, setInputCheck] = useState(false)

    const route = useRoute()
    const imageParams = route.params?.image

    useEffect(() => {
        imageParams != "undefined" && setSelectedFile(imageParams)
    }, [imageParams])

    const handleMissedLogData = (date) => {
        setMissedLogDate(DateTimeUtils.converDateFormat(date))
        setDatePicker(false)
    }

    const handleLogTime = (time) => {
        setLogTime(DateTimeUtils.timeDefaultConvert(time))
        setTimePicker(false)
    }

    const handleCheck = (index) => {
        setCheckSelect(index)

        index == 0 ? setLogType("Time-in") : setLogType("Time-out")
    }

    const onNextHandler = () => {
        if ( !missedLogDate || !logType || !logTime || !reason || !selectedFile) {
            setInputCheck(true)
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 5,
                missedLogDate:  missedLogDate,
                logType: logType,
                logTime: logTime,
                reason: reason,
                attachedFile: JSON.stringify(selectedFile),
            })   
        }
    }

    return (
        <View style={styles.mainView}>
            <PageHeader pageName={"ML New Request"} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Missed Log Date"
                                inputValue={missedLogDate} 
                                isInputCheck={isInputCheck}
                            />      
                        
                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.dateText}>
                                    {missedLogDate == null ? ( <Text style={styles.placeholder}>mm/dd/yyyy</Text> )
                                    : DateTimeUtils.dateFullConvert(missedLogDate)}
                                </Text>
                                
                                <Ionicons 
                                    name="calendar" 
                                    size={24} 
                                    color={COLORS.darkGray} 
                                    onPress={() => setDatePicker(true)}   
                                    />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <TitleInput 
                                    title="Log Type"
                                    inputValue={logType} 
                                    isInputCheck={isInputCheck}
                                />  

                                <View style={styles.checkboxView}>
                                    { checkboxData.map(( item, index ) => (
                                        <View style={styles.checkboxItem} key={index}>
                                            <Checkbox
                                                key={index}
                                                style={{ borderRadius: 10 }}
                                                value={checkSelect === index}
                                                onValueChange={() => handleCheck(index)}
                                            />

                                            <Text style={styles.checkboxText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                           </View>
                        </View>

                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Log Time"
                                inputValue={logTime} 
                                isInputCheck={isInputCheck}
                            />      
                        
                            <View style={[styles.rowView, styles.border]}>
                                <Text style={styles.dateText}>
                                    {logTime == null ? ( <Text style={styles.placeholder}>Time</Text> )
                                    : DateTimeUtils.timeConvert(logTime)}
                                </Text>
                                
                                <AntDesign 
                                    name="clockcircle"
                                    size={20}
                                    color={COLORS.darkGray}
                                    onPress={() => setTimePicker(true)} />
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
                                        onPress={() => navigation.navigate('CameraAccess', { onPanel: 5 })} />

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
                onConfirm={handleMissedLogData}
                onCancel={() => setDatePicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isTimePicker}
                mode="time"
                onConfirm={handleLogTime}
                onCancel={() => setTimePicker(false)} 
            />
        </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },
    
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

    mediumText: {
        fontFamily: 'Inter_500Medium',
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
        marginVertical: 10,
        marginHorizontal: 18,
    },

    timeContent: {
        fontFamily: 'Inter_500Medium',
        backgroundColor: COLORS.gray,
        width: 60,
        paddingTop: 3,
        textAlign: 'center',

        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.tr_gray
    },

    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    checkboxView: {
        flexDirection: 'row',
        paddingVertical: 8,
    },

    checkboxItem: {
        flexDirection: 'row', 
        paddingHorizontal: 14,
    },

    checkboxText: {
        fontFamily: 'Inter_500Medium',
        paddingLeft: 8,
    },

    fileSuccess: {
        color: COLORS.green,
        marginLeft: 10,
        fontFamily: 'Inter_600SemiBold'
    }
})