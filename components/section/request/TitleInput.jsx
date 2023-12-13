import { View, Text, StyleSheet } from 'react-native'

import { COMPONENT_STYLES, ErrorUtils } from '../../../constant'

export default function TitleInput ({title, inputValue, isInputCheck})  {
    const styles = COMPONENT_STYLES.TitleInput
    
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>{title}</Text>
            { isInputCheck && !inputValue  && ErrorUtils.errorIndicator()}
        </View>
    )
}