// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import { COLORS, STRINGS } from '../../../../../constant'

import PageHeader from '../../../../../components/header/PagesHeader'

export default function AboutUsPage () {
    return (
        <View style={styles.main}>
            <PageHeader pageName={'About Us'} />

            <ScrollView>
                <View style={styles.container}>
                    <Shadow 
                        distance={3} 
                        style={styles.shadowView}
                    >
                        <Text style={styles.titleText}>HRDotNet</Text>
                        
                        <View style={styles.textView}>
                            <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleOne}</Text>

                            <Text style={styles.regularText}>{STRINGS.aboutTheCompany}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleTwo}</Text>

                            <Text style={styles.regularText}>{STRINGS.aboutTheCompany}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleThree}</Text>

                            <Text style={styles.regularText}>{STRINGS.aboutTheCompany}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.verticalSemiBoldText}>{STRINGS.aboutUsTitleFour}</Text>

                            <Text style={styles.boldText}>Designed by</Text>
                            <Text style={[styles.regularText, styles.indentText]}>{STRINGS.alex}</Text>
                            
                            <Text style={[styles.boldText, { marginTop: 20 }]}>Developed by</Text>
                            <Text style={[styles.regularText, styles.indentText]}>{STRINGS.patrick}</Text>
                            <Text style={[styles.regularText, styles.indentText]}>{STRINGS.jess}</Text>
                        </View>
                    </Shadow>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

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
    },

    titleText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 23,
    },

    verticalSemiBoldText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
        marginVertical: 15,
    },

    regularText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
    },

    boldText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
    },  

    indentText: {
        marginLeft: 30,
    }
})