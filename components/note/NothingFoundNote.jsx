// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { COLORS, COMPONENT_STYLES } from "../../constant";

export default function NothingFoundNote () {
    const styles = COMPONENT_STYLES.NothingFoundNote

    return (
        <View style={styles.container}>
            <Entypo name="emoji-sad" size={24} color={COLORS.tr_gray} />
            <Text style={styles.text}>Nothing Found.</Text>
        </View>
    )
}