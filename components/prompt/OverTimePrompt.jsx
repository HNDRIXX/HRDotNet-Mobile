import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import Checkbox from 'expo-checkbox';
import StyledText from 'react-native-styled-text'
import { Image } from 'expo-image'

import { COLORS, COMPONENT_STYLES, DateTimeUtils } from '../../constant'

export default function OverTimePrompt({ isVisible, isHalf, data, onCancel, onSelect, handleCheck, checkSelect }) {
  const styles = COMPONENT_STYLES.OverTimePrompt
  
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

            {data.length <= 0 ? (
              <StyledText
                style={styles.subTitleText}
                textStyles={textStyles}>{`The system found no logs that are open for an overtime request in the <b><u>${isHalf} half</u></b> of <b><u>${DateTimeUtils.getCurrMonth()}</u></b>`}
              </StyledText>
            ) : (
              <>
                <StyledText
                  style={styles.subTitleText}
                  textStyles={textStyles}>{`The system detected the following overtime hours on the ensuing dates for the <b><u>${isHalf} half</u></b> of <b><u>${DateTimeUtils.getCurrMonth()}</u></b>`}
                </StyledText>

                <StyledText
                  style={[styles.subTitleText, { marginTop: 10 }]}
                  textStyles={textStyles}>{"<b>Select the date</b> for which you want to submit an overtime request. "}
                </StyledText>

                <View style={styles.listView}>
                  <View style={styles.listTitle}>
                    <Text style={styles.dateTitle}>Date</Text>

                    <View style={styles.listTimeTitle}>
                      <Text style={styles.timeTitle}>Time-in</Text>
                      <Text style={styles.timeTitle}>Time-out</Text>
                    </View>
                  </View>

                  <FlatList
                    data={data}
                    persistentScrollbar={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <View style={styles.itemView}>
                        <Checkbox
                          value={checkSelect === index}
                          onValueChange={() => handleCheck(index)}
                        />

                        <Text style={styles.itemText}>{DateTimeUtils.dateHalfConvert(item.OTDate)}</Text>
                        <Text style={styles.itemText}>{DateTimeUtils.timeConvert(item.actualOTIn)}</Text>
                        <Text style={styles.itemText}>{DateTimeUtils.timeConvert(item.actualOTOut)}</Text>
                      </View>
                    )}
                  />
                </View>
              </>
            )}

            {data.length <= 0 ? (
              <TouchableOpacity
                onPress={onCancel}
                style={styles.button}
              >
                <Text style={styles.buttonText}>OKAY</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.rowView}>
                <TouchableOpacity
                  onPress={onCancel}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={[styles.buttonText, styles.cancelText]}>CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={onSelect}
                >
                  <Text style={styles.buttonText}>SELECT</Text>
                </TouchableOpacity>
              </View>
            )}
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