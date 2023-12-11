import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, } from "react-native"
import CachedImage from "expo-cached-image"
import { Shadow } from "react-native-shadow-2"

import { COLORS, ICONS } from "../../../constant"
export default function TeamsContactsItem ({ event, index, cacheText, isActive, onHandlePress, }) {
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

const styles = StyleSheet.create({
    shadowView: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        padding: 15,
        borderRadius: 20,
        
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonView: {
        backgroundColor: COLORS.clearWhite,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    
    disabledButton: {
        opacity: 0.4
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold'
    },

    regularText: {
        fontFamily: 'Inter_400Regular'
    },

    italicText: {
        fontStyle: 'italic',
        color: COLORS.darkGray,
    },

    userProfile: {
        width: 50, 
        height: 50, 
        borderRadius: 90,
        marginRight: 20,
    },
})