import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { COLORS, STYLES } from '../../constant'
import NavigationHeader from '../../components/header/NavigationHeader';
import ChangeOfSchedulePanel from '../../components/panel/request/ChangeOfSchedule';
import OfficialWorkPanel from '../../components/panel/request/OfficialWork';
import OverTimePanel from '../../components/panel/request/OverTime';
import OffSetPanel from '../../components/panel/request/OffSet';
import LeavePanel from '../../components/panel/request/Leave';
import MissedLogsPanel from '../../components/panel/request/MissedLogs';

const data = [
    { title: 'Change of Schedule' },
    { title: 'Official Work' },
    { title: 'Overtime' },
    { title: 'Offset' },
    { title: 'Leave' },
    { title: 'Missed Logs' },
]

export default function WebUserRequest() {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0)
    
    const styles = STYLES.Request

    const handleButtonPress = (index, title) => {
        setSelectedButtonIndex(index)
    }

    return (
        <>
            <NavigationHeader headerName="Request" />
            
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

                {
                    selectedButtonIndex == 0 ? ( <ChangeOfSchedulePanel /> )
                    : selectedButtonIndex == 1 ? ( <OfficialWorkPanel /> )
                    : selectedButtonIndex == 2 ? ( <OverTimePanel /> )
                    : selectedButtonIndex == 3 ? ( <OffSetPanel /> )
                    : selectedButtonIndex == 4 ? ( <LeavePanel /> )
                    : selectedButtonIndex == 5 ? ( <MissedLogsPanel /> )
                    : ( null )
                }
                </View>
            </Animatable.View>
        </>
    )
}