// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { STYLES } from "../../constant";
import NavigationHeader from "../../components/header/NavigationHeader";
import PersonalPanel from "../../components/panel/profile/Personal";
import PayslipPanel from "../../components/panel/profile/Payslip";

export default function Profile ({ navigation }) {
    const [userData, setUserData] = useState(null)
    const [isPanel, setPanel] = useState(0)

    const styles = STYLES.Profile

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID')
                const connValue = await AsyncStorage.getItem('conn')
                const portValue = await AsyncStorage.getItem('port')
                const setPortValue = portValue !== null ? ':' + portValue : ''
      
                const response = await fetch(`http://${connValue}${setPortValue}/api/profile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ IDEmployee: userID }),
                })
    
                const data = await response.json()

                if (userID !== null) {
                    if (response.ok) {
                        setUserData(data)
                    } else { alert(data.message) }
                } else { console.log('userID not found in AsyncStorage') }
            } catch (error) { console.error(error) }
        }

        fetchUserData()
    }, [])
    
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
                            <Text style={[styles.textButton, isPanel == 0 && styles.textActive ]}>Personal</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.button, isPanel == 1 && styles.active ]}
                            onPress={() => setPanel(1)}
                        >
                            <Text style={[styles.textButton, isPanel == 1 && styles.textActive ]}>Payslip</Text>
                        </TouchableOpacity>
                    </View>


                    { isPanel == 0 ? (
                        <PersonalPanel 
                            userData={userData}
                        />
                    ) : isPanel == 1 ? (
                        <PayslipPanel />
                    ) : null }
                </View>  
        </>
    )
}
