// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { COLORS, COMPONENT_STYLES } from '../../constant'

export default function CalendarNote () {
    const styles = COMPONENT_STYLES.CalendarNote
    
    return (
        <View style={styles.container}>
            <AntDesign
                name={'select1'}
                size={90}
                color={COLORS.tr_gray}
            />

            <Text style={styles.text}>Tap a certain date to display.</Text>
        </View>
    )
}