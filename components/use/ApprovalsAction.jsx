// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'

import { COLORS, COMPONENT_STYLES } from '../../constant'

export default function ApprovalsAction ({isDisabled, selectAll, toggleSelectAll, onHandleCancel, onHandleApprove}) {
    const styles = COMPONENT_STYLES.ApprovalsAction
    
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
                    onPress={onHandleCancel}
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