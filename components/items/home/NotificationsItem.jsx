import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Octicons, Entypo } from '@expo/vector-icons'
import { Image } from 'react-native-expo-image-cache'
import DashedLine from 'react-native-dashed-line'
import CachedImage from 'expo-cached-image'

import { ICONS, COLORS, COMPONENT_STYLES } from '../../../constant'

export default function NotificationsItem ({ item, index, formattedDate, onPress }) {
    const styles = COMPONENT_STYLES.NotificationsItem(item)
    
    const getSourceUri = (name) => {
        const commonProps = {
            placeholderContent: <ActivityIndicator size={'small'} style={{ marginTop: 30 }} />,
            style: { height: 30, width: 30 },
        }
    
        switch (name) {
            case "Request Update":
                return (
                    <CachedImage
                        source={{ uri: ICONS.calendarBadge }}
                        cacheKey={`itemCalendar`}
                        {...commonProps}
                    />
                )
    
            case "Advisory":
                return (
                    <CachedImage
                        source={{ uri: ICONS.megaphone }}
                        cacheKey={`advisory`}
                        {...commonProps}
                    />
                )

            case "Approvals Update":
                return (
                    <CachedImage
                        source={{ uri: ICONS.fileApprovals }}
                        cacheKey={`fileApprovals`}
                        {...commonProps}
                        style={{ height: 40, width: 40 }}
                    />
                )
                
            default: null
        }
    }

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
 
                { getSourceUri(item.name) }

                <View style={styles.contentWrapper}>
                    <View style={styles.topContentWrapper}>
                        <Text style={styles.contentTitle}>{item.name}</Text>
                        <Text style={styles.contentDate}>{formattedDate}</Text>
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