import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import { COLORS } from '../../constant'

export default function ApprovalsAction () {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.regularText}>All</Text>
            </View>

           <View style={styles.rowView}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <MaterialIcons 
                        name="cancel" 
                        size={24} 
                        color={COLORS.red} />
                    <Text style={styles.boldText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                >
                    <FontAwesome 
                        name="check-circle" 
                        size={24} 
                        color={COLORS.green} />
                    <Text style={styles.boldText}>Approve</Text>
                </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    rowView: {
        flexDirection: 'row',
        gap: 13,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    regularText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 17
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 5,
        fontSize: 15
    }
})