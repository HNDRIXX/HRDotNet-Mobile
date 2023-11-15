import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";

import PageHeader from "../../../../../components/header/PagesHeader";
import { COLORS, STRINGS, DateTimeUtils, Utils} from "../../../../../constant";

const checkboxData = ['Work Shift', 'Rest Day']

export default function COSRequest ({ navigation }) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reason, setReason] = useState(null)
    const [restDay, setRestDay] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)
    const [schedule, setSchedule] = useState(null)

    const [isDropdown, setDropdown] = useState(false)
    const [isRadio, setRadio] = useState(false)
    const [checkSelect, setCheckSelect] = useState(null)
    
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
        setStartDate(DateTimeUtils.defaultDateFormat(date))
        setShowStartPicker(false)
    }

    const onEndDateChange = (date) => {
        setEndDate(DateTimeUtils.defaultDateFormat(date))
        setShowEndDatePicker(false)
    }
    
    const handleCheck = (index) => {
        setCheckSelect(index)

        index === 0 ? (setDropdown(true), setRadio(false), setSchedule(null)) :
        index === 1 ? (setDropdown(false), setRadio(true), setSchedule('Rest Day')) : null
    }
    
    const onNextHandler = () => {
        if(!startDate || !endDate || !schedule || !reason || !selectedFile){
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 0,
                startDate: startDate,
                endDate: endDate,
                restDay: restDay,
                schedule: schedule,
                reason: reason,
                attachedFile: selectedFile,
            })    
        }
    }

    return (
        <>
            <PageHeader pageName={"COS New Request"} />

            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Start Date</Text>

                    <View style={[styles.rowView, styles.border]}>
                        <Text style={styles.dateText}>
                            {startDate == null ? ( <Text style={styles.placeholder}>mm/dd/yyyy</Text> )
                            : DateTimeUtils.dateFullConvert(startDate)}
                        </Text>
                        
                        <Ionicons 
                            name="calendar" 
                            size={24} 
                            color={COLORS.darkGray} 
                            onPress={() => setShowStartPicker(true)}   
                            />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.title}>End Date</Text>

                    <View style={[styles.rowView, styles.border]}>
                        <Text style={styles.dateText}>
                            {endDate == null ? ( <Text style={{ color: COLORS.tr_gray}}>mm/dd/yyyy</Text> )
                            : DateTimeUtils.dateFullConvert(endDate)}
                        </Text>
                        
                        <Ionicons 
                            name="calendar" 
                            size={24} 
                            color={COLORS.darkGray} 
                            onPress={() => setShowEndDatePicker(true)}   
                            />
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.title}>Schedule</Text>

                    <View style={styles.checkboxView}>
                        { checkboxData.map(( item, index ) => (
                            <View style={styles.checkboxItem} key={index}>
                                <Checkbox
                                    key={index}
                                    value={checkSelect === index}
                                    onValueChange={() => handleCheck(index)}
                                />

                                <Text style={styles.checkboxText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    { isDropdown && (
                        <SelectDropdown 
                            data={["10:00 AM to 10:00 PM"]}
                            onSelect={(item, index) => {
                                setSchedule(item)
                                setRadio(false)
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
                                textAlign: 'left',
                            }}
                            defaultButtonText="Select Schedule"
                        />
                    )}
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

                        <View style={[styles.rowView, { paddingHorizontal: 0 }]}>
                            <Ionicons 
                                name="camera" size={26} color={COLORS.darkGray}
                                onPress={() => {
                                    navigation.navigate('CameraAccess', { onPanel: 0 })
                                    setInvalidError(false)
                                    setSizeError(false)
                                }} />

                            <FontAwesome 
                                name="file" size={18} style={{ marginLeft: 15 }}
                                color={COLORS.darkGray}
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
        paddingVertical: 12
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
        paddingHorizontal: 15
    },

    checkboxText: {
        fontFamily: 'Inter_400Regular',
        paddingLeft: 10,
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