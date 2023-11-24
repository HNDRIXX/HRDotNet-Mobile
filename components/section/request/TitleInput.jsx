import { View, Text, StyleSheet } from 'react-native'

import { ErrorUtils } from '../../../constant'

export default function TitleInput ({title, inputValue, isInputCheck})  {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>{title}</Text>
            { isInputCheck && !inputValue  && ErrorUtils.errorIndicator()}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 15,
        marginRight: 8,
        marginBottom: 5,
    }
})