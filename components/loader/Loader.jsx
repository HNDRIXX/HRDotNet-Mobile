// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import {ActivityIndicator, StyleSheet} from 'react-native'

import { COLORS, COMPONENT_STYLES } from '../../constant'
export default function Loader () {
    const styles = COMPONENT_STYLES.Loader

    return <ActivityIndicator size='large' color={COLORS.powderBlue} style={styles.loading}/>
}