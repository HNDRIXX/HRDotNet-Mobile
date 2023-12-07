import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import { COLORS, STRINGS } from '../../../../../constant'
import PageHeader from '../../../../../components/header/PagesHeader'
export default function AboutUsPage () {
    return (
        <>
            <PageHeader pageName={'About Us'} />

            <View style={styles.container}>
                <Shadow 
                    distance={5} 
                    style={styles.shadowView} >
                    <ScrollView>
                        <Text style={styles.titleText}>HRDotNet</Text>

                        <View style={styles.textView}>
                            <Text style={styles.semiBoldText}>Title</Text>

                            <Text>{STRINGS.aboutTheCompany}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.semiBoldText}>Title</Text>

                            <Text>{STRINGS.aboutTheCompany}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.semiBoldText}>Title</Text>
                        
                            <Text>{STRINGS.aboutTheCompany}</Text>
                        </View>
                    </ScrollView>
                </Shadow>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: COLORS.clearWhite,
    },

    shadowView: {
        width: '100%',
        height: '100%',
        padding: 20,
        borderRadius: 20,
    },

    titleText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
    },

    semiBoldText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
    }
})