import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import StyledText from 'react-native-styled-text'

import { COLORS, COMPONENT_STYLES } from '../../../constant'

export default function ConfirmationPrompt({ isVisible, setVisible, subTitle, onHandlePress }) {
    const styles = COMPONENT_STYLES.ConfirmationPrompt
    
    return (
        <>
            <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
            >
                <View style={styles.modalView}>
                    <View style={styles.modalWrapper}>

                    <FontAwesome 
                        name="question-circle" 
                        size={70} color={COLORS.yellow} />
          
                    <Text style={styles.titleText}>Confirmation</Text>

                    <StyledText 
                        style={styles.subTitleText}
                        textStyles={textStyles}>{subTitle}</StyledText>
          
                    <View style={styles.rowView}>
                        <TouchableOpacity 
                            onPress={() => setVisible(false)}
                            style={[styles.button, styles.cancelButton]}
                        >
                            <Text style={[styles.buttonText, styles.cancelText]}>CANCEL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={onHandlePress}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>CONTINUE</Text>
                        </TouchableOpacity>
                   </View>
                  </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
 
})

const textStyles = StyleSheet.create({
    b: {
        fontFamily: 'Inter_600SemiBold'
    }
})