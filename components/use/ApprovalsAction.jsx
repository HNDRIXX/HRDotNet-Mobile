import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'

import { COLORS } from '../../constant'

export default function ApprovalsAction ({isDisabled, selectAll, toggleSelectAll, onHandleApprove}) {

    return (
        <View style={styles.container}>
            <View style={styles.rowView}>
                <Checkbox
                    color={COLORS.orange}
                    style={styles.checkBox}
                    value={selectAll}
                    onValueChange={toggleSelectAll}
                />
                
                <Text style={styles.regularText} >All</Text>
            </View>

            <View style={styles.rowView}>
                <TouchableOpacity
                    style={[styles.button, isDisabled && styles.disabled]}
                    disabled={isDisabled}
                >
                    <MaterialIcons 
                        name="cancel" 
                        size={24} 
                        color={isDisabled ? COLORS.tr_gray : COLORS.red} />
                    <Text style={styles.boldText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, isDisabled && styles.disabled]}
                    disabled={isDisabled}
                    onPress={onHandleApprove}
                >
                    <FontAwesome 
                        name="check-circle" 
                        size={24} 
                        color={isDisabled ? COLORS.tr_gray : COLORS.green} />
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
        alignItems: 'center',
        gap: 13,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    disabled: {
        opacity: 0.30
    },

    regularText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 5,
        fontSize: 15
    },

    checkBox: {
        marginTop: 2,
        borderColor: COLORS.orange, 
        borderWidth: 2,
    }
})