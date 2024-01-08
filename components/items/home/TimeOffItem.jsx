// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { COLORS, COMPONENT_STYLES, DateTimeUtils } from "../../../constant";

export default function TimeOffItem ({ item }) {
    const styles = COMPONENT_STYLES.TimeOffItem
    
    return (
        <View style={styles.itemWrapper}>
            <Shadow distance={3} offset={[2,2]} style={styles.shadowView}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderText}>{item.Source}</Text>
                    <Text style={styles.itemHeaderText}>{item.leaveCredit}</Text>
                </View>

                <View style={styles.itemBody}>
                    <Text style={styles.bodyText}>Date: 
                        <Text style={styles.itemText}> {DateTimeUtils.dateFullConvert(item.DateTransaction)}</Text>
                    </Text>

                    <Text style={styles.bodyText}>Document No: 
                        <Text style={styles.itemText}> {item.DocumentNo}</Text>
                    </Text>
                </View>
            </Shadow>
        </View>
    )
}