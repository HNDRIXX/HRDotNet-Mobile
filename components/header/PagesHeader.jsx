import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constant";

export default function PageHeader ({ pageName }) {
    const navigation = useNavigation()

    return (
        <View style={styles.topHeader}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => { router.back(); navigation.goBack(); }}
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
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 40,
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