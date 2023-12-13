import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, COMPONENT_STYLES } from "../../constant";

export default function PageHeader ({ pageName, backStatus }) {
    const [isDisabled, setDisabled] = useState(false)

    const styles = COMPONENT_STYLES.PagesHeader
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const onBackHandler = () => {
        setDisabled(true)
        backStatus == "expo" ? router.back() : navigation.goBack()
    }

    return (
        <View style={[styles.topHeader, 
            { paddingTop: insets.top }
        ]}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={onBackHandler}
                disabled={isDisabled ? true : false}
            >
                <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
            </TouchableOpacity>

            <Text style={styles.textHeader}>{pageName}</Text>
        </View>
    )
}