import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';

import { COLORS } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader';
import ChangeOfSchedulePanel from '../../../../../components/panel/home/approvals/ChangeOfSchedule';

const data = [
    { title: 'Change of Schedule' },
    { title: 'Official Work' },
    { title: 'Overtime' },
    { title: 'Offset' },
    { title: 'Leave' },
    { title: 'Missed Logs' },
]

export default function ApprovalsPage() {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)
    const navigation = useNavigation()
    
    const handleButtonPress = (index, title) => {
        setSelectedButtonIndex(index)
    }

    return (
        <>
            <PageHeader pageName={'Approvals'} />
            
            <Animatable.View
                animation={'fadeIn'}
                duration={900}
                style={{ opacity: 1, flex: 1 }}
            >
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        selectedButtonIndex === index && styles.selectedButton,
                                    ]}
                                    onPress={() => handleButtonPress(index)}
                                    disabled={ selectedButtonIndex === index ? true : false }
                                >
                                    <Text 
                                        style={[
                                            styles.buttonText,
                                            selectedButtonIndex === index && styles.selectedTextButton,
                                            index == 6 && { color: COLORS.gray }
                                        ]}
                                    >{item.title}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.buttonList}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    { selectedButtonIndex == 0 ? ( <ChangeOfSchedulePanel /> )
                        
                    : ( null )}
                </View>
            </Animatable.View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.clearWhite,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.shadowGray,
    borderBottomWidth: 2,
    // marginHorizontal: 10,
  },

  innerWrapper: {
    // marginHorizontal: 10,
  },

  button: {
      width: 'auto',
      height: 35,
      paddingHorizontal: 20,
      marginRight: 20,
      borderRadius: 15,
      marginVertical: 13,
      marginLeft: 0,
      alignItems: 'center',
      justifyContent: 'center',
  },

  buttonText: {
      color: COLORS.tr_gray,
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold'
  },

  selectedButton: {
      backgroundColor: COLORS.orange,
  },

  selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold'
  },

  buttonList: {
    backgroundColor: COLORS.clearWhite,
    borderColor: COLORS.orange,
    borderBottomWidth: 3,
    paddingLeft: 10
  }
})