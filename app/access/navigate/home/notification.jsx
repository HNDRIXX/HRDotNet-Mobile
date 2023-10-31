import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import DashedLine from "react-native-dashed-line";
import { Image } from "react-native-expo-image-cache";

import { COLORS, ICONS } from "../../../../constant";

export default function NotificationPage ({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Notification</Text>
            </View>

            <ScrollView style={styles.wrapper}>
                <View style={styles.content}>
                    <View style={styles.innerContent}>
                        <Image 
                            style={{height: 25, width: 25 }} 
                            uri={ICONS.info}
                        />

                        <View style={styles.contentWrapper}>
                            <View style={styles.topContentWrapper}>
                                <Text style={styles.contentTitle}>Title</Text>
                                <Text style={styles.contentDate}>Oct 10, 2023</Text>
                            </View>

                            <View style={styles.bodyContentWrapper}>
                                <Text style={styles.description}>Lorem Ipsum Dolor Sit. Lorem Ipsum Dolor Lorem Ipum....</Text>

                                <Entypo
                                    name="dots-three-horizontal" 
                                    size={24} 
                                    color="black" 
                                />
                            </View>
                        </View>
                    </View>

                    <DashedLine 
                        dashLength={10}
                        dashColor={COLORS.tr_gray}
                        dashGap={5}
                        dashThickness={1}
                        style={styles.dashLine}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    backButton: {
        paddingHorizontal: 10,
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.powderBlue,
    },
    
    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
    },

    contentTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
    },

    contentDate: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray
    },

    wrapper: {
        flex: 1,
        margin: 20,
        padding: 30,
        borderRadius: 20,
        backgroundColor: COLORS.clearWhite,
        elevation: 6,
    },

    content: {
        
    },

    innerContent: {
        flexDirection: 'row',
        alignItems: 'center',   
    },

    contentWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingRight: 35,
        flexDirection: 'column'
    },

    topContentWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    bodyContentWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    description: {
        width: '80%',
        color: COLORS.darkGray,
        fontSize: 13,
    },

    dashLine: {
        paddingVertical: 15,
    }
})