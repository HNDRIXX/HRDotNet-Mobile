import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import CachedImage from 'expo-cached-image'
import { Shadow } from 'react-native-shadow-2'

import { COLORS, DateTimeUtils, ICONS } from '../../../../../../constant'
import PageHeader from '../../../../../../components/header/PagesHeader'
import Hr from '../../../../../../components/use/Hr'

export default function TeamMember () {
    return (
        <>
            <PageHeader pageName={'Team Member'}/>

            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Shadow distance={4} style={styles.shadowView}>
                        <View style={styles.topView}>
                            <CachedImage 
                                source={{ uri: ICONS.juan }}
                                cacheKey='juan'
                                style={styles.imageProfile}
                                placeholderContent={
                                    <ActivityIndicator size={'small'} color={COLORS.clearWhite} style={{ marginRight: 30, marginLeft: 40 }} />
                                }
                            />
                            <Text style={[styles.boldText, { marginTop: 20 }]}>Juan dela Cruz</Text>
                            <Text style={styles.regularText}>Quality Assurance Specialist</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Text>Today</Text>
                            <Text>Date</Text>
                        </View>

                        <View>
                            <Text>Clock-In</Text>
                            <Text>Clock-Out</Text>
                        </View>

                        <Hr />

                        <View>
                            <Text>Previous</Text>
                            <Text>Upcoming</Text>
                        </View>
                    </Shadow>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    boldText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },

    regularText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },

    wrapper: {
        marginVertical: 20,
        marginHorizontal: 30,
    },

    shadowView: {
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingBottom: 30
    },

    topView: {
        marginVertical: 20,
        alignItems: 'center',
    },

    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 90,
    },

    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})