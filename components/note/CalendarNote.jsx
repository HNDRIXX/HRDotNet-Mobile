import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { COLORS } from '../../constant'

export default function CalendarNote () {
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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },

    text: {
        fontFamily: 'Inter_400Regular',
        fontStyle: 'italic',
        color: COLORS.tr_gray,
        paddingTop: 20
    }
})