import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import PageHeader from "../header/PagesHeader";
import * as Location from 'expo-location';
import { COLORS } from "../../constant";

export default function LocationEnablePage () {
    return (
        <>
            <PageHeader pageName={''}/>

            <View style={styles.container}>
                <Text>Enable Location</Text>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={requestLocationEnable}
                    >
                        <Text style={styles.buttonText}>ENABLE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonView: {
        flexDirection: 'row',
        gap: 10,
    },

    button: {
        backgroundColor: COLORS.orange,
        width: 150,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold'
    }
})