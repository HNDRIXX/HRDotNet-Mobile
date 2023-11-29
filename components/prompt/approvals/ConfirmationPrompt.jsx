import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import StyledText from 'react-native-styled-text'

import { COLORS } from '../../../constant'

export default function ConfirmationPrompt({ isVisible, setVisible, subTitle, onHandlePress }) {
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
    modalView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    
    modalWrapper: {
        backgroundColor: COLORS.clearWhite, 
        padding: 30, 
        borderRadius: 15,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    rowView: {
        flexDirection: 'row',
        gap: 10
    },
    
    titleText: {
        fontFamily: 'Inter_700Bold',
        marginVertical: 10,
        fontSize: 19,
    },
    
    subTitleText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    
    button: {
        backgroundColor: COLORS.orange,
        padding: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
        width: 140,
    },
    
    buttonText: {
        textAlign: 'center',
        color: COLORS.clearWhite,
        fontFamily: 'Inter_800ExtraBold',
    },

    cancelButton: {
        backgroundColor: COLORS.clearWhite,
        borderWidth: 2,
        borderColor: COLORS.orange
    },

    cancelText: {
        color: COLORS.orange
    }
})

const textStyles = StyleSheet.create({
    b: {
        fontFamily: 'Inter_600SemiBold'
    }
})