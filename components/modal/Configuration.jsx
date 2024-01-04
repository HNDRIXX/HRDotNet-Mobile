import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../../constant'

export default function Configuration ({toggleModal, setConn, isModal, conn, onConnHandle})  {

    const [connFetch, setConnFetch] = useState(null)
    useEffect(() => {
        const getConn = async () => {
            const connValue = await AsyncStorage.getItem('conn')

            setConnFetch(connValue)
        }

        getConn()
    })

    return (
        <Modal
            visible={isModal}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.insideWrapper}>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={styles.closeButton}
                        >
                            <FontAwesome name="close" size={24} color={COLORS.darkGray} />
                        </TouchableOpacity>

                        <Text style={styles.titleText}>Configuration</Text>

                        {connFetch && <Text style={styles.subText}>Current: {connFetch}</Text>}

                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setConn(text)}
                            value={conn}
                            inputMode='numeric'
                            placeholder="Enter IP Address"
                            contextMenuHidden={true}
                            placeholderTextColor={COLORS.tr_gray}
                        />

                        <TouchableOpacity 
                            style={styles.button}
                            onPress={onConnHandle}
                        >
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    wrapper: {
        flex: 1, 
        justifyContent: 'center',
    },

    insideWrapper: {
        margin: 20, 
        paddingVertical: 30,
        paddingHorizontal: 25, 
        borderRadius: 20,
        backgroundColor: COLORS.clearWhite 
    },

    titleText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        marginVertical: 10,
    },

    textInput: {
        borderColor: COLORS.darkGray, 
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
    },

    subText: {
        fontFamily: 'Inter_500Medium',
        fontStyle: 'italic',
        fontWeight: '600',
        marginBottom: 10,
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
    },

    button: {
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        alignSelf: 'center',
        width: 200,
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
    },

    buttonText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        fontFamily: 'Inter_800ExtraBold'
    },
})