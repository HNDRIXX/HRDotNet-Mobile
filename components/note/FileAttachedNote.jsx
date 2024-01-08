// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet } from 'react-native'

import { COLORS, STRINGS, COMPONENT_STYLES } from '../../constant'

export default function FileAttachedNote ({ isFileNote, isInvalidError, isSizeError }) {
    const styles = COMPONENT_STYLES.FileAttachedNote

    return (
        <>
            { isFileNote && (
                <Text style={styles.fileNote}>{STRINGS.fileNote}</Text>
            )}

            { isInvalidError && (
                <Text style={styles.fileError}>{STRINGS.invalidError}</Text>
            )}

            { isSizeError && (
                <Text style={styles.fileError}>{STRINGS.sizeError}</Text>
            )}
        </>
    )
}