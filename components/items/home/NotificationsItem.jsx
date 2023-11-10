import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import { Octicons, Entypo } from '@expo/vector-icons'
import { Image } from 'react-native-expo-image-cache'
import DashedLine from 'react-native-dashed-line'

import { ICONS, COLORS } from '../../../constant'

export default function NotificationsItem ({ item, index, formattedDate, onPress }) {
    return (
        <>
            <TouchableOpacity style={styles.innerContent} onPress={() => onPress(index, item)}>
                { item.isReaded === 0 ? (
                    <Octicons 
                        name="dot-fill" 
                        size={15} 
                        color={COLORS.powderBlue} 
                        style={{ marginRight: 10 }}
                    />) : null }
 
                <Image 
                    style={{ height: 30, width: 30 }} 
                    uri={ 
                        item.name === "Request Update" ? ICONS.calendarBadge 
                        : item.name === "Advisory" ? ICONS.megaphone 
                        : ICONS.info
                    }
                    transitionDuration={100}
                />

                <View style={styles.contentWrapper}>
                    <View style={styles.topContentWrapper}>
                        <Text style={styles.contentTitle}>{item.name}</Text>
                        <Text style={styles.contentDate}>{formattedDate(item.date)}</Text>
                    </View>

                    <View style={styles.bodyContentWrapper}>
                        <Text 
                            numberOfLines={2}
                            style={styles.description}>{item.message}</Text>

                        <Entypo
                            name="dots-three-horizontal" 
                            size={17} 
                            style={{ paddingTop: 20 }}
                            color={COLORS.darkGray}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            <DashedLine 
                dashLength={10}
                dashColor={COLORS.tr_gray}
                dashGap={5}
                dashThickness={1}
                style={styles.dashLine}
            />
        </>
    )
}

const styles = StyleSheet.create({
    contentTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
    },

    contentDate: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray,
        fontSize: 12,
    },

    innerContent: {
        flexDirection: 'row',
        alignItems: 'center',   
    },

    contentWrapper: {
        width: '97%',
        paddingHorizontal: 20,
        paddingRight: 40,
        flexDirection: 'column'
    },

    topContentWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    bodyContentWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    description: {
        width: '90%',
        color: COLORS.darkGray,
        fontSize: 13,
    },

    dashLine: {
        paddingVertical: 15,
    }
})