// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import DashedLine from "react-native-dashed-line";

import SuccessPromptPage from "../../../../components/prompt/SuccessPrompt";
import { COLORS, STRINGS, DateTimeUtils, COMPONENT_STYLES } from "../../../../constant";
import { Image } from "expo-image";

export default function OSSummary({ route, imageParams, openCustomAlert, closeCustomAlert, isSuccessAlertVisible }) {
    const styles = COMPONENT_STYLES.RequestSummary

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>{STRINGS.requestSummary}</Text>

                <ScrollView style={styles.summaryView}> 
                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Offset Date</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.dateFullConvert(route?.offsetDate)}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Shift</Text>
                        <Text style={styles.summaryText}>{route?.shiftSchedule}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Actual OS In</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.timeConvert(route?.actualOSIn)}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Actual OS Out</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.timeConvert(route?.actualOSOut)}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>OT Start</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.timeConvert(route?.OSStart)}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>OT End</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.timeConvert(route?.OSEnd)}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Reason</Text>
                        <Text style={styles.summaryText}>{route?.reason}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>File Attachment</Text>

                        <View style={styles.attachmentView}>
                            <Image 
                                source={{ uri: decodeURIComponent(imageParams?.uri) }}
                                style={{ width: 130, height: 150 }}
                                contentFit="contain"
                            />

                            { route?.attachedFile && (
                                <Text style={styles.summaryText}>File Attached</Text>
                            )}
                        </View>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>
                </ScrollView>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={openCustomAlert}>
                    <Text style={styles.textButton}>SUBMIT</Text>
                </TouchableOpacity>
            </View>

            <SuccessPromptPage
                title={"Success!"}
                subTitle = {`Your <b><u>Offset</u></b> request for <b><u>${DateTimeUtils.dateFullConvert(route?.offsetDate)}</u></b> was successfully submitted. We will get back to you soon.`}
                buttonText={"OKAY"}
                visible={isSuccessAlertVisible} 
                onClose={closeCustomAlert} 
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.clearWhite
    },

    summaryView: {
        height: 100,
        borderColor: COLORS.darkGray,
        borderWidth: 1, 
        borderRadius: 20,
        marginTop: 30,
        padding: 15
    },

    rowView: {
        margin: 10,
    },

    text: {
        fontFamily: 'Inter_500Medium'
    },

    summaryText: {
        fontFamily: 'Inter_500Medium',
        marginLeft: 20,
    },

    dashed: {
        paddingTop: 10,
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.tr_gray
    },

    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.orange,
        width: 170,
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
    },

    textButton: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: COLORS.clearWhite,
        textAlign: 'center',
    },

    attachmentView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 10 
    },
})