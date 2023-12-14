// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import CachedImage from 'expo-cached-image'
import { useNavigation } from "@react-navigation/native";

import { COLORS, ICONS, COMPONENT_STYLES } from "../../constant";

export default function TimeOff () {
    const styles = COMPONENT_STYLES.TimeOff
    const navigation = useNavigation()

    const screenWidth = Dimensions.get('window').height
    const imageSize = Math.max(15, screenWidth * 0.13 / 1.3)
    
    const commonProps = {
        style: { width: 50, height: 50, marginRight: 10 },
        contentFit: "contain"
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.button]}
                onPress={() => navigation.navigate('VacationLeave')}
            >
                <View style={[styles.alignWrapper, { height: imageSize}]}>
                    <CachedImage
                        source={{ uri: ICONS.vacation }}
                        cacheKey={`vacation`}
                        {...commonProps}
                    />

                    <View>
                        <Text style={styles.totalText}>3.00</Text>
                        <Text style={styles.title}>Vacation{'\n'}Leave</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button]}
                onPress={() => navigation.navigate('SickLeave')}
            >
                <View style={[styles.alignWrapper, { height: imageSize }]}>
                    <CachedImage
                        source={{ uri: ICONS.medicine }}
                        cacheKey={`medicine`}
                        {...commonProps}
                    />

                    <View>
                        <Text style={styles.totalText}>1.50</Text>
                        <Text style={styles.title}>Sick{'\n'}Leave</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}