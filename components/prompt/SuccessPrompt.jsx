// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import StyledText from 'react-native-styled-text'

import { COLORS, COMPONENT_STYLES } from '../../constant'

export default function SuccessPromptPage({ title, subTitle, buttonText, visible, onClose }) {
  const styles = COMPONENT_STYLES.SuccessPrompt

  return (
    <>
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
      >
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <FontAwesome
              name="check-circle"
              size={80}
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

const textStyles = StyleSheet.create({
  b: {
    fontFamily: 'Inter_600SemiBold'
  }
})