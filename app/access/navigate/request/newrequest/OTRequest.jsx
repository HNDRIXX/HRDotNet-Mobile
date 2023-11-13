import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import RadioButtonRN from "radio-buttons-react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Image } from "expo-image";

import PageHeader from "../../../../../components/header/PagesHeader";
import { COLORS } from "../../../../../constant";
import OverTimePrompt from "../../../../../components/prompt/OverTimePrompt";

const radioLabel = [{ label: 'Rest Day' }]

const data = [
    { 
        OTDate: '20230914',
        actualOTIn: '18:15',
        actualOTOut: '21:15'
    },
    { 
        OTDate: '20230915',
        actualOTIn: '18:38',
        actualOTOut: '21:45'
    },
]

export default function OTRequest ({ navigation }) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reason, setReason] = useState(null)
    const [restDay, setRestDay] = useState(null)

    const [imageUpload, setImageUpload] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [isVisible, setVisible] = useState(true)
    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndDatePicker] = useState(false)
    const [shiftSched, setShiftSched] = useState(null)

    const route = useRoute()
    const imageURL = decodeURIComponent(route.params?.image)

    const [checkItem, setCheckItem] = useState(null)
    const [checkSelect, setCheckSelect] = useState(null)

    useEffect(() => {
        imageURL != "undefined" && setSelectedFile(imageURL)
    }, [imageURL])

    const onStartDateChange = (event, selectedDate) => {
        event.type === 'set'
            ? (setShowStartPicker(Platform.OS === 'ios'), setStartDate(moment(selectedDate).format('YYYYMMDD')))
            : setShowStartPicker(false)
    }

    const onEndDateChange = (event, selectedDate) => {
        event.type === 'set'
            ? (setShowEndDatePicker(Platform.OS === 'ios'), setEndDate(moment(selectedDate).format('YYYYMMDD')))
            : setShowEndDatePicker(false)
    }
    
    const selectDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync()

            if (!result.canceled){
                const fileInfo = result.assets[0]
                const uri = fileInfo.uri

                const fileExtension = uri.substring(uri.lastIndexOf('.') + 1).toLowerCase()
                
                const fileSizeInMB = fileInfo.size / (1024 * 1024)

                if (fileSizeInMB <= 5 && ['docx', 'pdf', 'jpeg', 'jpg', 'txt'].includes(fileExtension)) {
                    setSelectedFile(fileInfo.uri)
                } else {
                    if (fileSizeInMB > 5) {
                        Alert.alert('File Too Large', 'Please select a file with a size of 5MB or less.')
                    } else {
                        Alert.alert('Unsupported File Format', 'Please select a docx, pdf, jpeg, jpg, or txt file.')
                    }
                }
            }
        } catch (error) {
            console.error('Error picking document:', error)
        }
    }

    const onNextHandler = () => {
        if(!startDate || !endDate || !reason || !selectedFile){
            alert("Please complete your request form.")
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

    const onCancel = () => {
        setVisible(false)
        navigation.goBack()
    }

    const onSelect = () => {
        setVisible(false)
    }

    const handleCheck = (index) => {
        setCheckSelect(index)
        setCheckItem(data[index])

        console.log(checkItem)
    }

    return (
        <>
            <PageHeader pageName={"New Request"} backStatus="react" />

            <OverTimePrompt 
                isVisible={isVisible}
                checkItem={checkItem}
                data={data}
                checkSelect={checkSelect}
                handleCheck={handleCheck}
                onCancel={onCancel}
                onSelect={onSelect}
            />

            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Start Date</Text>

                    <View style={[styles.rowView, styles.border]}>
                        <Text>
                            {startDate == null ? "mm/dd/yyyy" 
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
                        <Text>
                            {endDate == null ? "mm/dd/yyyy"
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

                    <View style={[styles.pickerView, styles.border]}>
                        <Picker
                            selectedValue={shiftSched}
                            onValueChange={(itemValue, itemIndex) => setShiftSched(itemValue)}
                        >
                            <Picker.Item 
                                label="Select an option" 
                                style={styles.itemPicker} 
                                color={COLORS.tr_gray} 
                                value={null} enabled={false} /> 
                            <Picker.Item 
                                label="10:00 AM to 7:00 PM" 
                                style={styles.itemPicker} 
                                value="10:00 AM to 7:00 PM" />
                        </Picker>
                    </View>

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
                            <Text>Camera/Image</Text>
                        ) : (
                            typeof selectedFile === 'string' && selectedFile.includes("Camera") ? (
                                <Text style={{ width: 220 }}>{selectedFile}</Text>
                            ) : (
                                <Text style={{ width: 220 }}>{selectedFile.name || selectedFile}</Text>
                            )
                        )}

                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                            <Ionicons 
                                name="camera" size={26}
                                onPress={() => navigation.navigate('CameraAccess', { onPanel: 0 })} />

                            <FontAwesome 
                                name="file" size={18} style={{ marginLeft: 15 }}
                                onPress={selectDocument}
                                />
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={onNextHandler}>
                    <Text style={styles.textButton}>NEXT</Text>
                </TouchableOpacity>
            </View>

            {showStartPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onEndDateChange}
                />
            )}
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
        fontFamily: 'Inter_600SemiBold'
    },

    rowView: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemPicker: {
        fontSize: 14
    },

    textInput: {
        paddingLeft: 15,
        paddingVertical: 13
    },

    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.orange,
        width: 170,
        padding: 10,
        borderRadius: 20,
    },

    textButton: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: COLORS.clearWhite,
        textAlign: 'center',
    }
})