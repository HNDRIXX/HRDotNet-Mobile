import { View, Text, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../constant";

export default function NothingFoundNote () {
    return (
        <View style={styles.container}>
            <Entypo name="emoji-sad" size={24} color={COLORS.tr_gray} />
            <Text style={styles.text}>Nothing Found.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.tr_gray
    }
})