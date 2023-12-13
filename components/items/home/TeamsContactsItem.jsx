import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, } from "react-native"
import CachedImage from "expo-cached-image"
import { Shadow } from "react-native-shadow-2"

import { COLORS, COMPONENT_STYLES, ICONS } from "../../../constant"
export default function TeamsContactsItem ({ event, index, cacheText, isActive, onHandlePress, }) {
    const styles = COMPONENT_STYLES.TeamsContactsItem

    return (
        <TouchableOpacity 
            style={[styles.buttonView, event.status != "Work Day" && !isActive && styles.disabledButton]}
            onPress={onHandlePress} 
        >
            
            <Shadow distance={5} offset={[2,3]} style={styles.shadowView}>
                <CachedImage
                    source={{ uri: event.uri }}
                    cacheKey={`${cacheText}-${event.name}`}
                    style={styles.userProfile}
                    placeholderContent={
                        <ActivityIndicator size={'small'} color={COLORS.powderBlue} 
                            style={{ marginRight: 30 }} />
                    }
                />

                <View>
                    <Text style={styles.boldText}>{event.name}</Text>
                    <Text style={styles.italicText}>{event.position}</Text>
                </View>
            </Shadow>
        </TouchableOpacity>
    )
}