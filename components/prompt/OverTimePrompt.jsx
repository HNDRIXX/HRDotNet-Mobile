import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native'
import Checkbox from 'expo-checkbox';
import StyledText from 'react-native-styled-text'

import { COLORS } from '../../constant'
import { Image } from 'expo-image'

export default function OverTimePrompt ({ isVisible, data, onCancel, onSelect, checkedItems, handleCheck, checkSelect}) {
    return (
        <>
            <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
              >
                <View style={styles.modalView}>
                  <View style={styles.modalWrapper}>
          
                    <Image 
                        source={require('../../assets/icons/ot.png')}
                        style={{ width: 70, height: 70 }}
                    />

                    <Text style={styles.titleText}>Overtime Tracking</Text>

                    <StyledText 
                        style={styles.subTitleText}
                        textStyles={textStyles}>{"The system detected the following overtime hours on the ensuing dates for the <b><u>first half</u></b> of <b><u>MONTH</u></b>"}</StyledText>

                    <StyledText 
                        style={[styles.subTitleText, { marginTop: 10 }]}
                        textStyles={textStyles}>{"<b>Select the date</b> for which you want to submit an overtime request. "}</StyledText>
                      
                      <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <View style={styles.itemContainer}>
                            <Checkbox
                              value={checkSelect === index}
                              onValueChange={() => handleCheck(index)}
                            />

                            <Text>{`OT Date: ${item.OTDate}`}</Text>
                            <Text>{`Actual OT In: ${item.actualOTIn}`}</Text>
                            <Text>{`Actual OT Out: ${item.actualOTOut}`}</Text>
                          </View>
                        )}
                      />

                    <View style={styles.rowView}>
                        <TouchableOpacity 
                            onPress={onCancel}
                            style={[styles.button, styles.cancelButton]}
                        >
                            <Text style={[styles.buttonText, styles.cancelText]}>CANCEL</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity 
                            onPress={onSelect}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>SELECT</Text>
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
    
      titleText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 22,
        marginVertical: 10,
      },
    
      subTitleText: {
        fontSize: 13,
        width: 220,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
      },
    
      button: {
        backgroundColor: COLORS.orange,
        padding: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
        width: 120,
      },

      cancelButton: {
        backgroundColor: COLORS.clearWhite,
        borderWidth: 1,
        borderColor: COLORS.orange,
      },
    
      buttonText: {
        textAlign: 'center',
        color: COLORS.clearWhite,
        fontFamily: 'Inter_800ExtraBold',
      },

      cancelText: {
        color: COLORS.orange,
      },
      
      rowView: {
        flexDirection: 'row',
        gap: 10,
      }
})

const textStyles = StyleSheet.create({
    b: {
      fontFamily: 'Inter_600SemiBold'
    }
})