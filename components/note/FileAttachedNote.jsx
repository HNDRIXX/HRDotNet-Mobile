import { View, Text, StyleSheet } from 'react-native'

import { COLORS, STRINGS } from '../../constant'

export default function FileAttachedNote ({ isFileNote, isInvalidError, isSizeError }) {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    fileNote: {
        fontStyle: 'italic',
        fontSize: 13,
        marginHorizontal: 20,
        marginVertical: 10,
    },

    fileError: {
        fontSize: 13,
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: COLORS.red,
        fontStyle: 'italic',
    },
})