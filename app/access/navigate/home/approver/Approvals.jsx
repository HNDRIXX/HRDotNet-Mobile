// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { COLORS, STYLES} from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader';
import COSApprovals from '../../../../../components/panel/home/approvals/COSApprovals';
import OBApprovals from '../../../../../components/panel/home/approvals/OBApprovals';
import OTApprovals from '../../../../../components/panel/home/approvals/OTApprovals';
import LVApprovals from '../../../../../components/panel/home/approvals/LVApprovals';
import OSApprovals from '../../../../../components/panel/home/approvals/OSApprovals';
import MLApprovals from '../../../../../components/panel/home/approvals/MLApprovals';

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

    const styles = STYLES.Approvals

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

                    {   selectedButtonIndex == 0 ? ( <COSApprovals /> ) :
                        selectedButtonIndex == 1 ? ( <OBApprovals /> ) :
                        selectedButtonIndex == 2 ? ( <OTApprovals /> ) :
                        selectedButtonIndex == 3 ? ( <OSApprovals /> ) :
                        selectedButtonIndex == 4 ? ( <LVApprovals /> ) :
                        selectedButtonIndex == 5 ? ( <MLApprovals /> ) 
                        : ( null )}
                </View>
            </Animatable.View>
        </>
    )
}