import { View, Text, StyleSheet, Modal, ActivityIndicator  } from 'react-native'
import { COLORS } from '../../../constant'

export default function Loader () {
    return (
        <>
            <Modal
                transparent={true}
                visible={true}
                animationType="fade"
              >
                <View style={styles.modalView}>
                    <View style={styles.modalWrapper}>
                        <ActivityIndicator size={'large'} />
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
      fontSize: 17,
      marginVertical: 10,
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
      marginTop: 10,
      gap: 10,
    },

    dateTitle: {
      fontFamily: 'Inter_600SemiBold',
      paddingHorizontal: 48,
    },

    timeTitle: { fontFamily: 'Inter_600SemiBold' },

    listTitle: {
      flexDirection: 'row',
      gap: 0,
      marginTop: 20,
      marginBottom: 10,
      justifyContent: 'space-between',
    },

    listTimeTitle: {
      flexDirection: 'row',
      gap: 22,
    },

    listView: {
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },

    itemView: {
      flexDirection: 'row',
      paddingVertical: 5,
    },

    itemText: {
      paddingHorizontal: 10,
    }
})

const textStyles = StyleSheet.create({
    b: {
      fontFamily: 'Inter_600SemiBold'
    }
})