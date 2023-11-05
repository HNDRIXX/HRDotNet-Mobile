import React, { useState } from "react";
import { View, Text , StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import PageHeader from "../../../../components/header/PagesHeader";
import { COLORS } from "../../../../constant";
import OBSummary from "../../../../components/panel/request/summary/OBSummary";
import COSSummary from "../../../../components/panel/request/summary/COSSummary";

export default function RequestSummary({ navigation }) {
    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
    const route = useRoute()

    // console.log(route.params?.attachedFile)

    const openCustomAlert = () => {
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