// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { COLORS, COMPONENT_STYLES } from '../../constant'

export default function SuccessTimeClock ({ clockedTime, clockedStatus, clockedValue, clockedDate, 
  clockedAddress, visible, onClose }) {
    const styles = COMPONENT_STYLES.SuccessTimeClock

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