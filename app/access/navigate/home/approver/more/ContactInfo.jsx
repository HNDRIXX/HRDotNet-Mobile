import { View, Text, StyleSheet, ActivityIndicator, Linking } from "react-native";
import { Shadow } from "react-native-shadow-2";
import CachedImage from "expo-cached-image";
import { useRoute } from "@react-navigation/native";

import { COLORS } from "../../../../../../constant";
import Hr from "../../../../../../components/use/Hr"
import PageHeader from "../../../../../../components/header/PagesHeader";

export default function ContactInfo ({}) {
    const route = useRoute()
    const params = route.params

    const phoneNum = params?.contactNumber
    const emailAddress = params?.emailAddress

    const onHandlePhoneNumPress = (phoneNum) => {
        const dialNumber = `tel:${phoneNum}`
        Linking.openURL(dialNumber)
    }

    const onHandleEmailAddPress = (emailAddress) => {
        const sendEmail = `mailto:${emailAddress}`
        Linking.openURL(sendEmail)
    }

    return (
        <View style={styles.main}>
            <PageHeader pageName={'Contact Information'} />

            <View style={styles.container}>
                <Shadow distance={4} style={styles.shadowView}>
                    <View style={styles.centerView}>
                        <CachedImage
                            source={{ uri: params.uri }}
                            cacheKey={`contactInfo-${params.name}`}
                            style={styles.userProfile}
                            placeholderContent={
                                <ActivityIndicator size={'small'} color={COLORS.powderBlue} 
                                    style={{ marginBottom: 30 }} />
                            }
                        />

                        <Text style={styles.boldText}>{params?.name}</Text>
                        <Text style={styles.regularText}>{params?.position}</Text>
                    </View>

                    <Text style={styles.grayTitle}>Contact Number</Text>
                    <Hr/>
                    <Text 
                        style={[styles.semiBoldText, { marginBottom: 20 }]}
                        onPress={() => onHandlePhoneNumPress(phoneNum)}
                    >
                        {phoneNum}
                    </Text>

                    <Text style={styles.grayTitle}>Email Address</Text>
                    <Hr />
                    <Text 
                        style={styles.semiBoldText}
                        onPress={() => onHandleEmailAddPress(emailAddress)}
                    >
                        {emailAddress}
                    </Text>
                </Shadow>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: { 
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    container: {
        padding: 30,
        backgroundColor: COLORS.clearWhite,
    },

    shadowView: {
        padding: 30,
        width: '100%',
        borderRadius: 20,
    },

    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },

    userProfile: {
        width: 130, 
        height: 130, 
        borderRadius: 90,
        marginBottom: 20,
    },

    grayTitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: COLORS.darkGray
    },

    boldText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
    },

    semiBoldText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.blue,
        fontSize: 14
    },

    regularText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
    }
})