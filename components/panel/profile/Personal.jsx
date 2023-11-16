import { Image } from 'expo-image'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { COLORS } from '../../../constant'

export default function PersonalPanel () {
    return (
        <>
            <Animatable.View
                animation={'fadeIn'}
                duration={900}
                style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
            >
                <View style={styles.topView}>
                    <View style={styles.imageView}>
                        <Image 
                            source={require('../../../assets/user/juan.jpg')}
                            style={styles.profilePic}
                        />
                    </View>

                    <Text style={styles.nameText}>Juan dela Cruz</Text>
                    <Text style={styles.subText}>Quality Assurance Specialist</Text>
                    <Text style={styles.subText}>#5985</Text>
                </View>
                
                <View style={{
                    backgroundColor: COLORS.white,
                    width: '100%',
                    height: '85%',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: -1,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}>
                </View>

                <ScrollView 
                    style={styles.infoView}
                    contentContainerStyle={{ flexGrow: 0 }}>
                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Company</Text>
                        <Text style={styles.contentText}>Magellan Performance Outsourcing Corp.</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Branch</Text>
                        <Text style={styles.contentText}>Magellan Performance Outsourcing Corp.</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Division</Text>
                        <Text style={styles.contentText}>Magellan Performance Outsourcing Corp.</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Department</Text>
                        <Text style={styles.contentText}>Quality Assurance</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Section</Text>
                        <Text style={styles.contentText}>Quality Assurance</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Contact Number</Text>
                        <Text style={styles.contentText}>0912 345 6789</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.titleText}>Email Address</Text>
                        <Text style={styles.contentText}>juandelacruz@gmail.com</Text>
                    </View>
                </ScrollView>
            </Animatable.View>
        </>
    )
}

const styles = StyleSheet.create({
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },

    imageView: {
        borderRadius: 90,
        borderWidth: 7,
        marginBottom: 10,
        borderColor: COLORS.clearWhite,
    },

    profilePic: {
        width: 160, 
        height: 160,
        borderRadius: 80,
    },

    nameText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 27,
        color: COLORS.orange
    },

    subText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 15,
    },

    infoView: {
        marginHorizontal: 20,
        marginBottom: 30,
        flexGrow: 0,
    },

    titleText: {
        fontFamily: 'Inter_400Regular',
        marginHorizontal: 15,
        marginVertical: 8,
    },

    contentText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        borderColor: COLORS.darkGray,
        borderWidth: 2,
        padding: 10,
        borderRadius: 13,
        paddingLeft: 20,
    }
})