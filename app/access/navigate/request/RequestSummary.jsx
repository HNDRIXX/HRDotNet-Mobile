import React, { useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PageHeader from "../../../../components/header/PagesHeader";
import { COLORS, DateTimeUtils } from "../../../../constant";
import OBSummary from "../../../../components/panel/request/summary/OBSummary";
import COSSummary from "../../../../components/panel/request/summary/COSSummary";
import OTSummary from "../../../../components/panel/request/summary/OTSummary";

export default function RequestSummary({ navigation }) {
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
    const route = useRoute()

    // { 
    //     status: 'Cancelled',  
    //     startDate: '20231014',
    //     endDate: '20231014',
    //     requestedSched: '7:00 AM - 4:00 PM',
    //     reason: '----',
    //     attachedFile: '-----',
    //     documentNo: 'COS0003',
    //     filedDate: '20231117',
    //     statusBy: 'Mark Sasama',
    //     statusByDate: '20230913',
    //     reviewedBy: 'Benjamin Peralta',
    //     reviewedDate: '20230916',
    // },

    // {"attachedFile": "file:///var/mobile/Containers/Data/Application/8ED58F99-C645-4BEF-B8BC-DD3DD70BB7D8/Library/Caches/ExponentExperienceData/%2540hndrx022%252FHRDotNet-Mobile/Camera/8C5FA198-3270-46DD-8689-1892330A0929.jpg", "endDate": "20231116", "onPanel": 0, "reason": "Bbq", "restDay": null, "schedule": "Rest Day", "startDate": "20231116"}
    // status: 'Filed',
    // startDate: route.params.startDate,
    // endDate: route.params.endDate,
    // requestedSchedule: route.params.schedule,
    // reason: route.params.reason,
    // attachedFile: '-----',
    // filedDate: todayDate,
    // statusBy: '',
    // statusByDate: '',
    // reviewedBy: '',
    // reviewedDate: '',
    const openCustomAlert = () => {
        AsyncStorage.getItem('COSData')
            .then((storedData) => {
                const existingData = JSON.parse(storedData) || [];

                const itemCount = existingData.length

                const newItem = {
                    status: 'Filed',
                    startDate: route.params.startDate,
                    endDate: route.params.endDate,
                    requestedSched: route.params.schedule,
                    reason: route.params.reason,
                    attachedFile: '-----',
                    documentNo: `COS${itemCount + 1}`,
                    filedDate: DateTimeUtils.defaultDateFormat(),
                    statusBy: '',
                    statusByDate: '',
                    reviewedBy: '',
                    reviewedDate: '',
                }

                existingData.push(newItem)
                const updatedDataString = JSON.stringify(existingData);

                return AsyncStorage.setItem('COSData', updatedDataString);
            })
            .then(() => {})
            .catch((error) => {})

        setIsSuccessAlertVisible(true)
    }

    const closeCustomAlert = () => {
        setIsSuccessAlertVisible(false)
        
        navigation.navigate('TabStack', { screen: 'Home' })
    }

    return (
        <>
            <PageHeader pageName={"Request Summary"} />
            
            {route.params?.onPanel == 0 ? (
                <COSSummary 
                    route={route}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible} />
            ) : route.params?.onPanel == 1 ? (
                <OBSummary 
                    route={route}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible} />
            ) : route.params?.onPanel == 2 ? (
                <OTSummary 
                    route={route}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible} />
            ) : null }
            
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