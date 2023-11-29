import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { STYLES } from "../../constant";
import NavigationHeader from "../../components/header/NavigationHeader";
import PersonalPanel from "../../components/panel/profile/Personal";
import PayslipPanel from "../../components/panel/profile/Payslip";

export default function Profile ({ navigation }) {
    const [isPanel, setPanel] = useState(0)

    const styles = STYLES.Profile

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
