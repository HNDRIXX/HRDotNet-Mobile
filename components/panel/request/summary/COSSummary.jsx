import React, { useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import DashedLine from "react-native-dashed-line";

import PageHeader from "../../../../components/header/PagesHeader";
import SuccessPromptPage from "../../../../components/prompt/SuccessPrompt";
import { COLORS } from "../../../../constant";
import { Image } from "expo-image";

export default function COSSummary({ route, openCustomAlert, closeCustomAlert, isSuccessAlertVisible }) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>Please review your details below before submitting.</Text>

                <ScrollView style={styles.summaryView}> 
                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Start Date</Text>
                        <Text style={styles.summaryText}>{moment(route.params?.startDate, "YYYYMMDD").format("MMMM DD, YYYY")}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>End Date</Text>
                        <Text style={styles.summaryText}>{moment(route.params?.endDate, "YYYYMMDD").format("MMMM DD, YYYY")}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Shift Schedule</Text>
                        <Text style={styles.summaryText}>{route.params?.shiftSchedule}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>Reason</Text>
                        <Text style={styles.summaryText}>{route.params?.reason}</Text>
                        <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.boldText}>File Attachment</Text>

                        <View style={styles.attachmentView}>
                            <Image 
                                source={{ uri: route.params?.attachedFile }}
                                style={{ width: 100, height: 100 }}
                                contentFit="contain"
                            />

                            <Text style={[styles.summaryText, { width: '60%' }]}>
                                {/* {route.params?.attachedFile} */}
                                Attachment
                            </Text>
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
                title={"Success"}
                subTitle = {`Your Official Work request for ${moment(route.params?.OBDate, "YYYYMMDD").format("MMM DD, YYYY")} was successfully submitted. We will get back to you soon.`}
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
        marginVertical: 20,
        marginHorizontal: 20,
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