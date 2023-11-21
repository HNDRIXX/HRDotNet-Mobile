import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../../constant";

export default function PageHeader ({ pageName, backStatus }) {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const onBackHandler = () => {
        backStatus == "expo" ? router.back() : navigation.goBack()
    }

    return (
        <View style={[styles.topHeader, { paddingTop: insets.top }]}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={onBackHandler}
            >
                <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
            </TouchableOpacity>

            <Text style={styles.textHeader}>{pageName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginTop: 5
    },

    topHeader: {
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.powderBlue,
    },
    
    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
    },
})