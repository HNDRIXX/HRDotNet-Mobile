import { View, Text, StyleSheet } from 'react-native'
import PageHeader from '../../../../../components/header/PagesHeader'
import { useRoute } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'
import { Image } from 'react-native-expo-image-cache'

import { COLORS, ICONS } from '../../../../../constant'

export default function NotificationDetails({ navigation }) {
    const route = useRoute()
    
    return (
        <View style={styles.container}>
            <PageHeader pageName="Notification Details" />

            <View style={styles.wrapper}>
                <Shadow distance={7} style={styles.shadowView}>
                    <Image 
                        style={styles.icon} 
                        uri={ 
                            route.params.name === "Request Update" ? ICONS.calendarBadge 
                            : route.params.name === "Advisory" ? ICONS.megaphone 
                            : ICONS.info
                        }
                        transitionDuration={100}
                    />

                    <Text style={styles.text}>{route.params.message}</Text>
                </Shadow>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
        margin: 20,
        marginHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.clearWhite,
    },

    icon: {
        height: 100, width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    shadowView: {
        width: '100%',
        borderRadius: 20,
        padding: 30,
    },
    
    text: {
        fontSize: 14,
    }
})