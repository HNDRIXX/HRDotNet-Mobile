import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import CachedImage from 'expo-cached-image';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import { useRoute } from '@react-navigation/native';

import { COLORS, DateTimeUtils, Utils, ICONS } from '../../../../../../constant';
import PageHeader from '../../../../../../components/header/PagesHeader';
import Hr from '../../../../../../components/use/Hr';

export default function TeamMember () {
    const route = useRoute()
    const params = route.params

    const checkCircledBullet = (value) => {
        return Utils.circledBulletColor(value)
    }

    const displayBulletDay = (status, event) => {
        return (
            <View style={styles.dayBelowEventWrapper(checkCircledBullet(params?.status))}>
                <FontAwesome
                    name="circle"
                    size={27}
                    color={checkCircledBullet(params?.status)}
                    style={styles.topCircle}
                />

                <Text style={styles.dayBelowEvent}>{status} {event}</Text>
            </View>
        )
    }

    // const displayClockedDay = () => {
    //     return (
            
    //     )
    // }

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

                            <Text style={[styles.boldText, { marginTop: 20 }]}>{params?.name}</Text>
                            <Text style={styles.regularText}>{params?.position}</Text>
                        </View>

                        <View style={styles.rowViewSpace}>
                            <Text style={styles.mediumText}>Today</Text>
                            <Text >Date</Text>
                        </View>

                        {displayBulletDay(params?.status, params?.event)}

                        <View>                            
                            <Text style={styles.clockedTitle}>Clock-In</Text>
                                
                            <View style={styles.rowView}>
                                <FontAwesome
                                    name={'sign-in'}
                                    size={34}
                                    color={COLORS.orange}
                                    style={{ paddingRight: 20, marginLeft: 8 }}
                                />
                    
                                <View>
                                    <Text style={styles.mediumText}>08:00:00 AM</Text>
                                    <Text style={{ fontStyle: 'italic', fontSize: 15 }}>Manila Location</Text>
                                </View>
                            </View>

                            <DashedLine
                                dashLength={10}
                                dashColor={COLORS.lightGray2}
                                dashGap={ 2}
                                dashThickness={2}
                                style={{ marginTop: 15}}
                            />

                            <Text style={styles.clockedTitle}>Clock-Out</Text>

                            <View style={styles.rowView}>
                                <FontAwesome
                                    name={'sign-out'}
                                    size={34}
                                    color={COLORS.powderBlue}
                                    style={{ paddingRight: 20, marginLeft: 10 }}
                                />
                    
                                <View>
                                    <Text style={styles.mediumText}>07:00:00 PM</Text>
                                    <Text style={styles.regularText}>Manila Location</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.hrView}>
                            <Hr />
                        </View>

                        <View>
                            <View style={styles.rowViewSpace}>
                                <Text style={styles.italiceS}>Previous</Text>
                                <Text style={styles.italiceS}>Date</Text>
                            </View>

                            {displayBulletDay()}
                            
                            <View style={styles.rowViewSpace}>
                                <Text style={styles.italiceS}>Previous</Text>
                                <Text style={styles.italiceS}>Date</Text>
                            </View>

                            {displayBulletDay()}
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

    mediumText: {
        fontFamily: 'Inter_600SemiBold',
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
    },

    rowViewSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    hrView: {
        marginTop: 20,
        marginBottom: 10,
    },

    // Calendar Styles
    dayBelowEventWrapper: (color) => ({
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        paddingLeft: 40,
        borderRadius: 50,
        borderColor: color,
        borderWidth: 1,
        marginLeft: 10,
        marginVertical: 10,
        backgroundColor: COLORS.clearWhite,
    }),

    topCircle: {
        position: 'absolute',
        zIndex: 99,
        marginLeft: -1,
    },

    italiceS: {
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: 15,
    },

    // Clocked Styles

    clockedTitle: {
        fontStyle: 'italic',
        fontWeight: '600',
        color: COLORS.tr_gray,
        marginVertical: 10
    }
})