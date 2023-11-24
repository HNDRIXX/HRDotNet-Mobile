import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";

import PageHeader from "../../../../../components/header/PagesHeader";
import { COLORS, STRINGS, DateTimeUtils, Utils, ErrorUtils } from "../../../../../constant";
import TitleInput from "../../../../../components/section/request/TitleInput";

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
    const [isInputCheck, setInputCheck] = useState(false)

    const [showStartPicker, setShowStartPicker] = useState(false)
    const [showEndPicker, setShowEndDatePicker] = useState(false)
    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)

    const route = useRoute()
    const imageParams = route.params?.image
    // const imageURL = decodeURIComponent(route.params?.image)

    useEffect(() => {
        imageParams != "undefined" && setSelectedFile(imageParams)
    }, [imageParams])

    const onStartDateChange = (date) => {
        setStartDate(DateTimeUtils.converDateFormat(date))
        setShowStartPicker(false)
    }

    const onEndDateChange = (date) => {
        setEndDate(DateTimeUtils.converDateFormat(date))
        setShowEndDatePicker(false)
    }

    const handleCheck = (index) => {
        setCheckSelect(index)

        index === 0 ? (setDropdown(true), setRadio(false), setSchedule(null)) :
        index === 1 ? (setDropdown(false), setRadio(true), setSchedule('Rest Day')) : null
    }
    
    const onNextHandler = () => {
        if(!startDate || !endDate || !schedule || !reason || !selectedFile){
            setInputCheck(true)
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 0,
                startDate: startDate,
                endDate: endDate,
                restDay: restDay,
                schedule: schedule,
                reason: reason,
                attachedFile: JSON.stringify(selectedFile),
            })    
        }
    }


    return (
        <View style={styles.mainView}>
            <PageHeader pageName={"COS New Request"} />

            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    <TitleInput 
                        title="Start Date"
                        inputValue={startDate} 
                        isInputCheck={isInputCheck}
                    />      
                
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
                    <TitleInput 
                        title="End Date"
                        inputValue={endDate} 
                        isInputCheck={isInputCheck}
                    /> 

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
                    <TitleInput 
                        title="Schedule"
                        inputValue={schedule} 
                        isInputCheck={isInputCheck}
                    /> 

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
                    <TitleInput 
                        title="Reason"
                        inputValue={reason} 
                        isInputCheck={isInputCheck}
                    /> 

                    <TextInput
                        style={[styles.textInput, styles.border]}
                        onChangeText={(text) => setReason(text)}
                        value={reason}
                        maxLength={500}
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

                        <View style={[styles.rowView, { paddingHorizontal: 0 }]}>
                            <Ionicons 
                                name="camera" size={26} color={COLORS.darkGray}
                                onPress={() => {
                                    navigation.navigate('CameraAccess', { onPanel: 0 })
                                    setInvalidError(false)
                                    setSizeError(false)
                                }} />

                            <FontAwesome5
                                name="file-upload" size={18} color={COLORS.darkGray} style={{ marginLeft: 15 }}
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
                minimumDate={DateTimeUtils.currDate()}
                onCancel={() => setShowStartPicker(false)} 
            />

            <DateTimePickerModal
                isVisible={showEndPicker}
                mode="date"
                onConfirm={onEndDateChange}
                minimumDate={DateTimeUtils.currDate()}
                onCancel={() => setShowEndDatePicker(false)} 
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
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    wrapper: {
        marginVertical: 10,
    },

    border: {
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        borderRadius: 12,
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