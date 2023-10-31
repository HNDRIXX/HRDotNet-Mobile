import React, { useState } from "react"
import { View, Text, StyleSheet,TouchableOpacity} from "react-native"
import { router } from "expo-router"
import { AntDesign } from "@expo/vector-icons"

import { COLORS } from "../../../../../constant"
import ReviewedPanel from '../../../../../components/panel/home/Reviewed'
import FiledPanel from '../../../../../components/panel/home/Filed'

export default function PendingPage ({ navigation }) {
    const [activePanel, setActivePanel] = useState(1)
    const [filedCount, setFiledCount] = useState(0)
    const [reviewedCount, setReviewedCount] = useState(0)

    const switchPanel = (panelNum) => {
        setActivePanel(panelNum)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Pending</Text>
            </View>

            <View style={styles.btnHorizontal}>
                <TouchableOpacity
                    style={[ styles.button, activePanel ===  1  && styles.selectedButton ]}
                    onPress={() => switchPanel(1)}
                >
                    <Text style={[ styles.counterText, activePanel === 1 && styles.selectedCounter ]}>{filedCount}</Text>

                    <Text style={[ styles.buttonText, activePanel === 1 && styles.selectedTextButton ]}>Filed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[ styles.button, activePanel ===  2  && styles.selectedButton ]}
                    onPress={() => switchPanel(2)}
                >
                    <Text style={[ styles.counterText, activePanel === 2 && styles.selectedCounter ]}>{reviewedCount}</Text>

                    <Text style={[ styles.buttonText, activePanel === 2 && styles.selectedTextButton ]}>Reviewed</Text>
                </TouchableOpacity>
            </View>

            { activePanel === 1 && (
                <FiledPanel
                    onAnimate={true}
                    setFiledCount={setFiledCount}
                />
            )}

            { activePanel === 2 && (
                <ReviewedPanel
                    onAnimate={true}
                    setReviewedCount={setReviewedCount}
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
   
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

    btnHorizontal: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomColor: COLORS.lighterOrange,
        borderBottomWidth: 2,
    },

    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15,
        padding: 5,
        borderRadius: 20,
        alignItems: 'center',
    },

    counterText: {
        backgroundColor: COLORS.clearWhite,
        color: COLORS.orange,
        marginRight: 10,
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        paddingHorizontal: 7,
        borderRadius: 20,
        display: 'none',
    },
  
    buttonText: {
        color: COLORS.tr_gray,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
    },
  
    selectedButton: {
        backgroundColor: COLORS.orange,
        elevation: 7,
        shadowColor: COLORS.darkGray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .2,
        shadowRadius: 10,
    },
  
    selectedTextButton: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
    },

    selectedCounter: {
        display: 'flex',
    }
})
