import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
import { useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import PageHeader from "../../../../../components/header/PagesHeader";
import TitleInput from "../../../../../components/section/request/TitleInput";
import FileAttachedNote from "../../../../../components/note/FileAttachedNote";
import { COLORS, STRINGS, Utils, DateTimeUtils } from "../../../../../constant";

const checkboxData = ['Whole Day', '1st Half', '2nd Half']

export default function LVRequest ({ navigation }) {
    const [leaveType, setLeaveType] = useState(null)
    const [availableCredits, setAvailableCredits] = useState("0:00")
    const [leaveOption, setLeaveOption] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reason, setReason] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [checkSelect, setCheckSelect] = useState(null)

    const [isStartDatePicker, setStartDatePicker] = useState(false)
    const [isEndDatePicker, setEndDatePicker] = useState(false)

    const [isFileNote, setFileNote] = useState(true)
    const [isInvalidError, setInvalidError] = useState(false)
    const [isSizeError, setSizeError] = useState(false)
    const [isInputCheck, setInputCheck] = useState(false)

    const route = useRoute()
    const imageParams = route.params?.image

    useEffect(() => {
        imageParams != "undefined" && setSelectedFile(imageParams)
    }, [imageParams])

    const handleStartDate = (date) => {
        setStartDate(DateTimeUtils.converDateFormat(date))
        setStartDatePicker(false)
    }

    const handleEndDate = (date) => {
        setEndDate(DateTimeUtils.converDateFormat(date))
        setEndDatePicker(false)
    }

    const handleCheck = (index) => {
        setCheckSelect(index)

        index == 0 ? setLeaveOption("Whole Day") : index == 1 ? setLeaveOption("1st Half") : index == 2 ? setLeaveOption("2nd Half") : null
    }

    const onNextHandler = () => {
        if ( !leaveType || !leaveOption || !startDate || !endDate || !reason || !selectedFile) {
            setInputCheck(true)
            alert(STRINGS.fillFormError)
        } else {
            navigation.navigate('RequestSummary', {
                onPanel: 4,
                leaveType:  leaveType,
                leaveOption: leaveOption,
                startDate: startDate,
                endDate: endDate,
                reason: reason,
                attachedFile: JSON.stringify(selectedFile),
            })   
        }
    }

    return (
        <View style={styles.mainView}>
            <PageHeader pageName={"LV New Request"} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <TitleInput 
                                title="Leave Type"
                                inputValue={leaveType} 
                                isInputCheck={isInputCheck}
                            />  

                            <SelectDropdown 
                                data={Utils.leaveTypes}
                                onSelect={(item, index) => { setLeaveType(item) }}
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
                                defaultButtonText="Select Leave Type"
                            />

                            <View style={styles.timeWrapper}>
                                <View style={styles.timeView}>
                                    <Text style={styles.mediumText}>Available Credits</Text>
                                    <Text style={styles.timeContent}>{availableCredits}</Text>
                                </View>
                            </View>

                            <View>
                                <TitleInput 
                                    title="Leave Option"
                                    inputValue={leaveOption} 
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
                                    onPress={() => setStartDatePicker(true)}   
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
                                    {endDate == null ? ( <Text style={styles.placeholder}>mm/dd/yyyy</Text> )
                                    : DateTimeUtils.dateFullConvert(endDate)}
                                </Text>
                                
                                <Ionicons 
                                    name="calendar" 
                                    size={24} 
                                    color={COLORS.darkGray} 
                                    onPress={() => setEndDatePicker(true)}   
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
                                        onPress={() => navigation.navigate('CameraAccess', { onPanel: 4 })} />

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
                isVisible={isStartDatePicker}
                mode="date"
                onConfirm={handleStartDate}
                onCancel={() => setStartDatePicker(false)} 
            />

            <DateTimePickerModal
                isVisible={isEndDatePicker}
                mode="date"
                onConfirm={handleEndDate}
                onCancel={() => setEndDatePicker(false)} 
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