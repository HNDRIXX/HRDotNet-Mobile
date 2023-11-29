import React, { useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PageHeader from "../../../../components/header/PagesHeader";
import { COLORS, STYLES, DateTimeUtils, LocalData } from "../../../../constant";
import OBSummary from "../../../../components/panel/request/summary/OBSummary";
import COSSummary from "../../../../components/panel/request/summary/COSSummary";
import OTSummary from "../../../../components/panel/request/summary/OTSummary";
import OSSummary from "../../../../components/panel/request/summary/OSSummary";
import LVSummary from "../../../../components/panel/request/summary/LVSummary";
import MLSummary from "../../../../components/panel/request/summary/MLSummary";

export default function RequestSummary({ navigation }) {
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
    const route = useRoute()
    const styles = STYLES.RequestSummary
    const imageParams = JSON.parse(route.params.attachedFile)

    const openCustomAlert = () => {
        const onPanel = route.params.onPanel

        switch (onPanel) {
            case 0:
                LocalData.insertCOS(route)
                break;

            case 1:
                LocalData.insertOB(route)
                break;

            default:
                break;
        }
        setIsSuccessAlertVisible(true)
    }

    const closeCustomAlert = () => {
        setIsSuccessAlertVisible(false)
        
        navigation.navigate('TabStack', { screen: 'Home' })
    }

    const currPanel = route.params?.onPanel

    return (
        <>
            <PageHeader pageName={"Request Summary"} />
            
            {currPanel == 0 ? (
                <COSSummary 
                    route={route.params}
                    imageParams={imageParams}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible} />
            ) : currPanel == 1 ? (
                <OBSummary 
                    route={route.params}
                    imageParams={imageParams}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible} />
            ) : currPanel == 2 ? (
                <OTSummary 
                    route={route.params}
                    imageParams={imageParams}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible} />
            ) : currPanel == 3 ? ( 
                <OSSummary 
                    route={route.params}
                    imageParams={imageParams}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible}
                />
            ) : currPanel == 4 ? ( 
                <LVSummary 
                    route={route.params}
                    imageParams={imageParams}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible}
                />
            ) : currPanel == 5 ? ( 
                <MLSummary 
                    route={route.params}
                    imageParams={imageParams}
                    openCustomAlert={openCustomAlert}
                    closeCustomAlert={closeCustomAlert}
                    isSuccessAlertVisible={isSuccessAlertVisible}
                />
            ): null }
            

        </>
    )
}