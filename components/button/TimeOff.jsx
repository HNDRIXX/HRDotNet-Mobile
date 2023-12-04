import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import CachedImage from 'expo-cached-image'
import { useNavigation } from "@react-navigation/native";

import { COLORS, ICONS } from "../../constant";

export default function TimeOff () {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 10,
    },

    button: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 6,
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'center',

        elevation: 3,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},

    },

    textWrapper: {
        color: COLORS.black,
        fontFamily: 'Inter_600SemiBold',
    },

    alignWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    totalText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        textAlign: 'center'
    },

    title: {
        color: COLORS.black,
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
})