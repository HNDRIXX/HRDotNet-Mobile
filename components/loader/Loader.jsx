import {ActivityIndicator, StyleSheet} from 'react-native'

import { COLORS } from '../../constant'
export default function Loader () {
    return <ActivityIndicator size='large' color={COLORS.powderBlue} style={styles.loading}/>
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
})