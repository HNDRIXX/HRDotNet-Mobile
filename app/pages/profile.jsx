import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "../../constant";
import NavigationHeader from "../../components/header/NavigationHeader";
import PersonalPanel from "../../components/panel/profile/Personal";
import PayslipPanel from "../../components/panel/profile/Payslip";

export default function Profile ({ navigation }) {
    const [isPanel, setPanel] = useState(0)

    return (
        <>
            <NavigationHeader headerName="Profile" />

                <View style={styles.container}>
                    <View
                        style={styles.buttonScroll}
                    >
                        <TouchableOpacity 
                            style={[styles.button, isPanel == 0 && styles.active ]}
                            onPress={() => setPanel(0)}
                        >
                            <Text 
                                style={[styles.textButton, isPanel == 0 && styles.textActive ]}
                            >Personal</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity 
                            style={[styles.button, isPanel == 1 && styles.active ]}
                            onPress={() => setPanel(1)}
                        >
                            <Text 
                                style={[styles.textButton, isPanel == 1 && styles.textActive ]}
                            >Payslip</Text>
                        </TouchableOpacity>
                    </View>


                    { isPanel == 0 ? (
                        <PersonalPanel />
                    ) : isPanel == 1 ? (
                        <PayslipPanel />
                    ) : null }
                </View>  
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    buttonScroll: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: COLORS.orange,
        borderBottomWidth: 3,
    },

    button: {
        paddingVertical: 7,
        width: 120,
        alignItems: 'center',
        borderRadius: 20,
    },

    textButton: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: COLORS.darkGray,
    },

    active: {
        backgroundColor: COLORS.orange,

        elevation: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: COLORS.darkGray,
        shadowRadius: 20,
    },

    textActive: {
        fontFamily: 'Inter_700Bold',
        color: COLORS.clearWhite
    }
})