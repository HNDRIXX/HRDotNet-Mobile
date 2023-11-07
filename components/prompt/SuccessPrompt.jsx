import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import StyledText from 'react-native-styled-text'

import { COLORS } from '../../constant'

export default function SuccessPromptPage ({ title, subTitle, buttonText, visible, onClose }) {
    return (
        <>
            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
              >
                <View style={styles.modalView}>
                  <View style={styles.modalWrapper}>
                    <AntDesign 
                      name={'checkcircle'}
                      size={70}
                      color={COLORS.green}
                    />
          
                    <Text style={styles.titleText}>{title}</Text>

                    <StyledText 
                      style={styles.subTitleText}
                      textStyles={textStyles}>{subTitle}</StyledText>
          
                    <TouchableOpacity 
                      onPress={onClose}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
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
    
      titleText: {
        fontFamily: 'Inter_700Bold',
        marginVertical: 10,
        fontSize: 19,
      },
    
      subTitleText: {
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
      },
    
      button: {
        backgroundColor: COLORS.orange,
        padding: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
        width: 200,
      },
    
      buttonText: {
        textAlign: 'center',
        color: COLORS.clearWhite,
        fontFamily: 'Inter_800ExtraBold',
      }    
})

const textStyles = StyleSheet.create({
  b: {
    fontFamily: 'Inter_600SemiBold'
  }
})