import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import RadioButtonRN from "radio-buttons-react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from 'expo-router'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
import { Image } from "expo-image";

import PageHeader from "../../../../../components/header/PagesHeader";
import { COLORS, STRINGS } from "../../../../../constant";

const radioLabel = [{ label: 'Rest Day' }]

export default function COSRequest ({ navigation }) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reason, setReason] = useState(null)
    const [restDay, setRestDay] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)
    const [shiftSched, setShiftSched] = useState(null)

    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndDatePicker] = useState(false)
    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)

    const route = useRoute()
    const imageURL = decodeURIComponent(route.params?.image)

    useEffect(() => {
        imageURL != "undefined" && setSelectedFile(imageURL)
    }, [imageURL])

    const onStartDateChange = (date) => {
        setStartDate(moment(date).format('YYYYMMDD'))
        setShowStartPicker(false)
    }

    const onEndDateChange = (date) => {
        setEndDate(moment(date).format('YYYYMMDD'))
        setShowEndDatePicker(false)
    }
    
    const selectDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync()
            setInvalidError(false)
            setSizeError(false)

            if (!result.canceled){
                const fileInfo = result.assets[0]
                const uri = fileInfo.uri

                const fileExtension = uri.substring(uri.lastIndexOf('.') + 1).toLowerCase()
                const fileSizeInMB = fileInfo.size / (1024 * 1024)

                if (fileSizeInMB <= 25 && ['doc', 'docx', 'pdf', 'jpeg', 'jpg', 'txt'].includes(fileExtension)) {
                    setFileNote(true)
                    setSizeError(false)
                    setInvalidError(false)
                    setSelectedFile(fileInfo.uri)
                } else {
                    if (fileSizeInMB > 25) {
                        setFileNote(false)
                        setSizeError(true)
                    } else {
                        setFileNote(false)
                        setInvalidError(true)
                    }
                }
            }
        } catch (error) {
            console.error('Error picking document:', error)
        }
    }

    const onNextHandler = () => {
        if(!startDate || !endDate || !reason || !selectedFile){
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 0,
                startDate: startDate,
                endDate: endDate,
                restDay: restDay,
                shiftSchedule: shiftSched,
                reason: reason,
                attachedFile: selectedFile,
            })    
        }
    }

    return (
        <>
            <PageHeader pageName={"New Request"} backStatus="react" />

            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Start Date</Text>

                    <View style={[styles.rowView, styles.border]}>
                        <Text style={styles.dateText}>
                            {startDate == null ? ( <Text style={styles.placeholder}>mm/dd/yyyy</Text> )
                            : moment(startDate, "YYYYMMDD").format("MMMM DD, YYYY")}
                        </Text>
                        
                        <FontAwesome 
                            name="calendar"
                            size={20}
                            color={COLORS.darkGray}
                            onPress={() =>  setShowStartPicker(true)}
                        />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.title}>End Date</Text>

                    <View style={[styles.rowView, styles.border]}>
                        <Text style={styles.dateText}>
                            {endDate == null ? ( <Text style={{ color: COLORS.tr_gray}}>mm/dd/yyyy</Text> )
                            : moment(endDate, "YYYYMMDD").format("MMMM DD, YYYY")}
                        </Text>
                        
                        <FontAwesome 
                            name="calendar"
                            size={20}
                            color={COLORS.darkGray}
                            onPress={() => setShowEndDatePicker(true)}
                        />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.title}>Shift Schedule</Text>

                    <SelectDropdown 
                            data={["10:00 AM to 10:00 PM"]}
                            onSelect={(item, index) => {
                                setShiftSched(item)
                            }}
                            buttonStyle={{
                                width: '100%',
                                height: 'auto',
                                padding: 12,
                                borderRadius: 15,
                                marginTop: 10,
                                borderColor: COLORS.darkGray,
                                borderWidth: 1,
                            }}
                            buttonTextStyle={{
                                fontSize: 14,
                            }}
                        />

                    <RadioButtonRN
                        data={radioLabel}
                        box={false}
                        animationTypes={['pulse']}
                        selectedBtn={(e) => setRestDay(e.label)}
                    />
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
                            <View style={styles.rowView}>
                                <AntDesign 
                                    name="checkcircle"
                                    size={20}
                                    color={COLORS.green}
                                />

                                <Text style={styles.fileSuccess}>File Attached</Text>
                            </View>
                        )}

                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                            <Ionicons 
                                name="camera" size={26}
                                onPress={() => {
                                    navigation.navigate('CameraAccess', { onPanel: 0 })
                                    setInvalidError(false)
                                    setSizeError(false)
                                }} />

                            <FontAwesome 
                                name="file" size={18} style={{ marginLeft: 15 }}
                                onPress={selectDocument}
                                />
                        </View>
                    </View>

                    <View>
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

            <TouchableOpacity 
                style={styles.button}
                onPress={onNextHandler}>
                <Text style={styles.textButton}>NEXT</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={showStartPicker}
                mode="date"
                onConfirm={onStartDateChange}
                onCancel={() => setShowStartPicker(false)} 
            />

            <DateTimePickerModal
                isVisible={showEndPicker}
                mode="date"
                onConfirm={onEndDateChange}
                onCancel={() => setShowEndDatePicker(false)} 
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
        marginVertical: 10,
    },

    border: {
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        borderRadius: 12,
    },

    title: {
        fontFamily: 'Inter_600SemiBold',
        marginHorizontal: 12,
        marginBottom: 5,
    },

    placeholder: {
        color: COLORS.tr_gray,
    },

    dateText: {
        paddingVertical: 7,
    },

    rowView: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemPicker: {
        fontSize: 14
    },

    textInput: {
        paddingLeft: 15,
        paddingVertical: 9
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