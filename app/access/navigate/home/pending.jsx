import React, { useState } from "react"
import { View, Text, StyleSheet,TouchableOpacity} from "react-native"

import { COLORS } from "../../../../constant"
import {Search} from "../../../../components/use/Search"
import ReviewedPanel from '../../../../components/panel/home/Reviewed'
import FiledPanel from '../../../../components/panel/home/Filed'
import PageHeader from "../../../../components/header/PagesHeader"

export default function PendingPage ({ navigation }) {
    const [activePanel, setActivePanel] = useState(1)
    const [filedCount, setFiledCount] = useState(0)
    const [reviewedCount, setReviewedCount] = useState(0)

    const switchPanel = (panelNum) => {
        setActivePanel(panelNum)
    }

    return (
        <View style={styles.container}>
            <PageHeader pageName={'Pending'} />

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
    container: {
        flex: 1, 
        backgroundColor: COLORS.clearWhite
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
        paddingHorizontal: 9,
        borderRadius: 10,
        overflow: 'hidden',
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
    },

    searchView: {
        marginHorizontal: 20,
    }
})
