import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import PageHeader from "../../../../../components/header/PagesHeader";
import { COLORS } from "../../../../../constant";
import { ScrollView } from "react-native";

const radioLabel = [{ label: 'Rest Day' }]

export default function OBRequest ({ navigation }) {
    const [OBDate, setOBDate] = useState(null)
    const [timeIn, setTimeIn] = useState(null)
    const [timeOut, setTimeOut] = useState(null)
    const [reason, setReason] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)

    const [isDatePicker, setDatePicker] = useState(false)
    const [isTimeInPicker, setTimeInPicker] = useState(false)
    const [isTimeOutPicker, setTimeOutPicker] = useState(false)

    const [shiftSched, setShiftSched] = useState(null)

    const route = useRoute()
    const imageURL = decodeURIComponent(route.params?.image)

    useEffect(() => {
        imageURL != "undefined" && setSelectedFile(imageURL)
    }, [imageURL])

    const handleOBDate = (event, date) => {
        event.type === 'set'
            ? (setDatePicker(Platform.OS === 'ios'), setOBDate(moment(date).format('YYYYMMDD')))
            : setDatePicker(false)
    }

    const handleTimeIn = (event, time) => {
        event.type === 'set'
            ? (setTimeInPicker(Platform.OS === 'ios'), setTimeIn(moment(time).format('HH:mm')))
            : setTimeInPicker(false)
    }

    const handleTimeOut = (event, time) => {
        event.type === 'set'
            ? (setTimeOutPicker(Platform.OS === 'ios'), setTimeOut(moment(time).format('HH:mm')))
            : setTimeOutPicker(false)
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

    return (
        <>
            <PageHeader pageName={"New Request"} backStatus="react" />

            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>OB Date</Text>

                        <View style={[styles.rowView, styles.border]}>
                            <Text>
                                {OBDate == null ? "mm/dd/yyyy" 
                                : moment(OBDate, "YYYYMMDD").format("MMMM DD, YYYY")}
                            </Text>
                            
                            <FontAwesome 
                                name="calendar"
                                size={20}
                                color={COLORS.darkGray}
                                onPress={() =>  setDatePicker(true)}
                            />
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <Text style={styles.title}>Location</Text>

                        <View style={[styles.rowView, styles.border]}>
                            <Text>Location</Text>
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
                                    label="10:00 AM to 7:00 PM (Approved COS)"  
                                    style={styles.itemPicker} 
                                    value="10:00 AM to 7:00 PM (Approved COS)" />
                            </Picker>
                        </View>

                        <View style={styles.timeWrapper}>
                            <View style={styles.timeView}>
                                <Text style={styles.text}>Time-in</Text>
                                <Text style={styles.timeContent}>00:00 AM</Text>
                            </View>

                            <View style={styles.timeView}>
                                <Text style={styles.text}>Time-out</Text>
                                <Text style={styles.timeContent}>00:00 PM</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <Text style={styles.title}>OB Time-in</Text>

                        <View style={[styles.rowView, styles.border]}>
                            <Text>{timeIn == null ? "Time-In" : timeIn}</Text>

                            <AntDesign 
                                name="clockcircle"
                                size={17}
                                color={COLORS.darkGray}
                                onPress={() => setTimeInPicker(true)}
                            />
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <Text style={styles.title}>OB Time-out</Text>

                        <View style={[styles.rowView, styles.border]}>
                            <Text>{timeOut == null ? "Time-out" : timeOut}</Text>

                            <AntDesign 
                                name="clockcircle"
                                size={17}
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
                                    onPress={() => navigation.navigate('CameraAccess', { onPanel: 1 })} />

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
            </ScrollView>

            { isDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleOBDate}
                />
            )}

            { isTimeInPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeIn}
                />
            )}

            { isTimeOutPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeOut}
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

    text: { fontFamily: 'Inter_400Regular' },

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
        paddingVertical: 6
    },

    timeWrapper:{
        marginVertical: 15,
        marginHorizontal: 20,
    },

    timeContent: {
        fontFamily: 'Inter_500Medium',
        backgroundColor: COLORS.gray,
        paddingVertical: 2,
        paddingHorizontal: 9,

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
        borderRadius: 20,
    },

    textButton: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: COLORS.clearWhite,
        textAlign: 'center',
    }
})