// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet } from 'react-native'
import PageHeader from '../../../../../components/header/PagesHeader'
import { useRoute } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'
import { Image } from 'react-native-expo-image-cache'

import { COLORS, ICONS, STYLES} from '../../../../../constant'

export default function NotificationDetails({ navigation }) {
    const route = useRoute()
    const styles = STYLES.NotificationDetails
    
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
                            : route.params.name === "Approvals Update" ? ICONS.fileApprovals 
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
