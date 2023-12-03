import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { COLORS } from '../../constant'
import { Link } from 'expo-router'

export default function SuccessTimeClock ({ clockedTime, clockedStatus, clockedValue, clockedDate, 
  clockedAddress, visible, onClose }) {
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
                      size={40}
                      color={COLORS.green}
                    />
          
                    <Text style={styles.titleText}>Success!</Text>
                    <Text style={styles.clockedDate}>{clockedDate}</Text>
                    <Text style={styles.clockedTime}>{clockedTime}</Text>

                    <Text style={styles.subText}>You have successfully  
                        <Text style={{ fontFamily: 'Inter_700Bold' }}> {clockedStatus} </Text>
                        from 
                        <Text style={{ fontFamily: 'Inter_700Bold' }}> {clockedAddress}</Text>
                    </Text>
                    
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.button}
                    >
                      <Text style={styles.buttonText}>OKAY</Text>
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
        width: '90%',
        padding: 30, 
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      titleText: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
      },

      clockedDate: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 20,
      },

      clockedTime: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
      },
    
      subText: {
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        marginHorizontal: 10
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