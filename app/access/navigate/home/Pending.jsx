// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco

import React, { useState } from "react"
import { View, Text, StyleSheet,TouchableOpacity} from "react-native"

import { COLORS, STYLES } from "../../../../constant"
import ReviewedPanel from '../../../../components/panel/home/Reviewed'
import FiledPanel from '../../../../components/panel/home/Filed'
import PageHeader from "../../../../components/header/PagesHeader"

export default function PendingPage ({ navigation }) {
    const styles = STYLES.Pending

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