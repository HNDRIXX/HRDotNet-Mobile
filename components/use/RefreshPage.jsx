import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { COLORS } from '../../constant'

export default function RefreshPage ({ setRestart }) {
    return (
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={COLORS.powderBlue}/>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setRestart(true)}
          >
            <FontAwesome name="refresh" size={24} color={COLORS.clearWhite} />

            <Text style={styles.textButton}>Refresh</Text>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    button: {
        backgroundColor: COLORS.orange, borderRadius: 10, 
        paddingHorizontal: 30, 
        paddingVertical: 5, 
        marginTop: 20, 
        flexDirection: 'row',
    },

    textButton: {
        fontFamily: 'Inter_600SemiBold', 
        fontSize: 17, 
        marginLeft: 10,
        color: COLORS.clearWhite
    },
})