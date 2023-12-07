import React, {useState, useEffect } from 'react';
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
    const [isClockedIn, setClockedIn] = useState(null)
    const [isClockedOut, setClockedOut] = useState(null)

    const currDate = route.params?.selectedDate
    const prevDate = route.params?.prevSelectedDate
    const nextDate = route.params?.nextSelectedDate

    const prevEvent = route.params?.prevEvent
    const nextEvent = route.params?.nextEvent
    const currEvent = route.params?.event
    const clockedParams = route.params?.currClocked

    const checkCircledBullet = (value) => {
        return Utils.circledBulletColor(value)
    }

    const currDateBullet = (status, event, expanded) => {
        return (
            <View style={[styles.dayBelowEventWrapper(checkCircledBullet(status)), expanded && { width: '95%' }]}>
                <FontAwesome
                    name="circle"
                    size={27}
                    color={checkCircledBullet(status)}
                    style={styles.topCircle}
                />

                <Text style={styles.dayBelowEvent}>
                    {status ? `${status}${event ? ' : ' + event : ''}` : 'None'}
                </Text>
            </View>
        )
    }

    const displayClockedData = (action) => {
        return clockedParams ? (
            Object.entries(clockedParams).map(([index, entry]) =>
                entry?.clocked === action && (
                    <View key={index}>
                        <Text style={styles.mediumText}>{DateTimeUtils.timeConvertWithSeconds(entry?.time)}</Text>
                        <Text style={styles.italicStyle}>{entry?.location}</Text>
                    </View>
                ) 
            )
        ) : <Text style={styles.italicStyle}>No History</Text>
    } 

    const checkTodayDate = () => {
        return DateTimeUtils.dashDateFormat() === currDate ? 'Today' : '';
    }

    useEffect(() => {
    //     Object.entries(clockedParams).map(([index, entry]) => 
    //     entry?.clocked == "In" ? (
    //         <View key={index}>                                
    //             <View style={styles.rowView}>
    //                 <FontAwesome
    //                     name={'sign-in'}
    //                     size={34}
    //                     color={COLORS.orange}
    //                     style={{ paddingRight: 20, marginLeft: 8 }}
    //                 />
        
    //                 <View>
    //                     <Text style={styles.mediumText}>{DateTimeUtils.timeConvertWithSeconds(entry?.time)}</Text>
    //                     <Text style={styles.italicStyle}>{entry?.location}</Text>
    //                 </View>
    //             </View>
    //         </View>
    //     ) : entry?.clocked == "Out" ? (
    //         <View key={index}>
    //             <DashedLine
    //                 dashLength={10}
    //                 dashColor={COLORS.lightGray2}
    //                 dashGap={2}
    //                 dashThickness={2}
    //                 style={{ marginTop: 15}}
    //             />

    //             <Text style={styles.clockedTitle}>Clock-Out</Text>

    //             <View style={styles.rowView}>
    //                 <FontAwesome
    //                     name={'sign-out'}
    //                     size={34}
    //                     color={COLORS.powderBlue}
    //                     style={{ paddingRight: 17, marginLeft: 10 }}
    //                 />
        
    //                 <View>
    //                     <Text style={styles.mediumText}>{DateTimeUtils.timeConvertWithSeconds(entry?.time)}</Text>
    //                     <Text style={styles.italicStyle}>{entry?.location}</Text>
    //                 </View>
    //             </View>
    //         </View>
    //     ) : null
    // )
    }, [])

    return (
        <>
            <PageHeader pageName={'Team Member'}/>

            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Shadow distance={4} style={styles.shadowView}>
                        <View style={styles.topView}>
                            <CachedImage
                                source={{ uri: currEvent.uri }}
                                cacheKey={`imageProfile${currEvent.name}`}
                                style={styles.imageProfile}
                                placeholderContent={
                                    <ActivityIndicator size={'small'} color={COLORS.powderBlue} />
                                }
                            />
                            
                            <Text style={[styles.boldText, { marginTop: 20 }]}>{currEvent?.name}</Text>
                            <Text style={styles.regularText}>{currEvent?.position}</Text>
                        </View>

                            
                        <View style={styles.rowViewSpace}>
                            <Text style={styles.mediumText}>{checkTodayDate(
                                
                            )}</Text>

                            <Text style={styles.mediumText}>{DateTimeUtils.getHalfDateWithExtra(currDate)}</Text>
                        </View>

                        {currDateBullet(currEvent?.status, currEvent?.event, true)}

                        <View>                         
                            <Text style={styles.clockedTitle}>Clock-In</Text>
                            
                            <View>                                
                                <View style={styles.rowView}>
                                    <FontAwesome
                                        name={'sign-in'}
                                        size={34}
                                        color={COLORS.orange}
                                        style={{ paddingRight: 20, marginLeft: 8 }}
                                    />
                        
                                    {displayClockedData('In')}
                                </View>

                                <DashedLine
                                    dashLength={10}
                                    dashColor={COLORS.lightGray2}
                                    dashGap={2}
                                    dashThickness={2}
                                    style={{ marginTop: 15}}
                                />

                                <Text style={styles.clockedTitle}>Clock-Out</Text>

                                <View style={styles.rowView}>
                                    <FontAwesome
                                        name={'sign-out'}
                                        size={34}
                                        color={COLORS.powderBlue}
                                        style={{ paddingRight: 17, marginLeft: 10 }}
                                    />

                                    {displayClockedData('Out')}
                                </View>
                            </View>
                        </View>

                        <View style={styles.hrView}>
                            <Hr />
                        </View>

                        <View>
                            <View style={styles.rowViewSpace}>
                                <Text style={styles.italicTitle}>Previous</Text>
                                <Text style={styles.italicTitle}>{DateTimeUtils.getHalfDateWithExtra(prevDate)}</Text>
                            </View>

                            {currDateBullet(prevEvent?.status)}
                            
                            <View style={styles.rowViewSpace}>
                                <Text style={styles.italicTitle}>Upcoming</Text>
                                <Text style={styles.italicTitle}>{DateTimeUtils.getHalfDateWithExtra(nextDate)}</Text>
                            </View>

                            {currDateBullet(nextEvent?.status)}
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
        alignItems: 'center',
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
        width: '50%',
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

    italicStyle: {
        fontStyle: 'italic',
        fontWeight: '500',
        fontSize: 11,
    },

    italicTitle: {
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: 13,
    },

    // Clocked Styles

    clockedTitle: {
        fontStyle: 'italic',
        fontWeight: '600',
        color: COLORS.tr_gray,
        marginVertical: 10
    }
})