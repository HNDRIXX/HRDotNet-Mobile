import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StyledText from 'react-native-styled-text'

import { COLORS } from '../../constant'
import { Image } from 'expo-image'

export default function MessagePrompt ({ title, subTitle, buttonText, visible, onClose }) {
    return (
        <>
            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
              >
                <View style={styles.modalView}>
                  <View style={styles.modalWrapper}>
                    <Image 
                      source={require('../../assets/icons/plane.png')}
                      style={{ width: 90, height: 90}}
                      contentFit='contain'
                    />
          
                    <StyledText 
                      textStyles={textStyles}
                      style={styles.titleText}>{`MESSAGE FOR YOU, <t>ALEX</t>`}</StyledText>

                    <ScrollView
                      style={{ height: 'auto'}}
                    >
                      <StyledText 
                        style={styles.subTitleText}
                        textStyles={textStyles}>{`I hope magwork etong message ko and sana din mabasa mo HAHAHAHA. Gusto ko lang magthankyou alex for working as a team with me, na kauna-unahang naging partner ko sa unang work ko and syempre sa bonding naten tulad ng paguusap at pagkakasundo naten sa lahat ng bagay HAHAHAH 🤣. Ginawa kolang tong message nato madalian habang nagwowork dito sa office and naisip kolang maisingit to as message para sayo. Lalo na sobrang dalang mo magsocial media HAHAHA. 🤣${'\n'}<b>PS: ikaw lang naman makakakita neto HAHAHA.</b>${'\n\n'}Kakalungkot lang dahil wala nako makakasundo sa mga bagay na ikaw lang din nakakaintindi dito sa work naten, lalo na sa mobile. I hope sa susunod na path mo is maging better para sayo but I'm sure kahit ano naman maging path mo is magwowork out para sayo 😊, ikaw paba Ma'am 😁.${'\n\n'}<b>THANKYOU AND GOODLUCK ALWAYS Alex.</b>${'\n\n'}- Pat`}
                      </StyledText>
                    </ScrollView>
          
                    <TouchableOpacity 
                      onPress={(onClose)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>DONE</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      titleText: {
        fontFamily: 'Inter_700Bold',
        marginVertical: 10,
        fontSize: 21,
      },
    
      subTitleText: {
        fontSize: 13.5,
        textAlign: 'left',
        fontFamily: 'Inter_400Regular',
      },
    
      button: {
        backgroundColor: '#EEA8C9',
        padding: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
        width: 200,
        elevation: 2,
      },
    
      buttonText: {
        fontSize: 14.5,
        textAlign: 'center',
        color: COLORS.clearWhite,
        fontFamily: 'Inter_800ExtraBold',
      }    
})

const textStyles = StyleSheet.create({
  b: {
    fontFamily: 'Inter_600SemiBold'
  },

  t: {
    color: '#EF87B8',
  }
})