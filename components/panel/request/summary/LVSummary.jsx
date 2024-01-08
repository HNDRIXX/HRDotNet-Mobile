// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import DashedLine from "react-native-dashed-line";

import PageHeader from "../../../../components/header/PagesHeader";
import SuccessPromptPage from "../../../../components/prompt/SuccessPrompt";
import { COLORS, COMPONENT_STYLES, STRINGS, DateTimeUtils, RequestUtils } from "../../../../constant";
import { Image } from "expo-image";

export default function OSSummary({ route, imageParams, openCustomAlert, closeCustomAlert, isSuccessAlertVisible }) {
    const styles = COMPONENT_STYLES.RequestSummary
    
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>{STRINGS.requestSummary}</Text>

                <ScrollView style={styles.summaryView}> 
                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Leave Type</Text>
                        <Text style={styles.summaryText}>{route?.leaveType}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Leave Option</Text>
                        <Text style={styles.summaryText}>{route?.leaveOption}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Start Date</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.dateFullConvert(route?.startDate)}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>End Date</Text>
                        <Text style={styles.summaryText}>{DateTimeUtils.dateFullConvert(route?.endDate)}</Text>
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
                subTitle = {`Your <b><u>Leave</u></b> request for <b><u>${RequestUtils.requestDateApplied(route)}</u></b> was successfully submitted. We will get back to you soon.`}
                buttonText={"OKAY"}
                visible={isSuccessAlertVisible} 
                onClose={closeCustomAlert} 
            />
        </>
    )
}