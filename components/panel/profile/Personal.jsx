import { Image } from 'react-native-elements';
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { COLORS, COMPONENT_STYLES, ICONS } from '../../../constant'
import Loader from '../../loader/Loader';

export default function PersonalPanel () {
    const styles = COMPONENT_STYLES.Personal
    
    return (
        <>
            <Animatable.View
                animation={'fadeIn'}
                duration={900}
                style={{ opacity: 1, flex: 1, backgroundColor: COLORS.white }}
            >
                <View style={styles.topView}>
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../assets/user/juan.jpg')}
                            style={styles.profilePic}
                            PlaceholderContent={<Loader />}
                        />
                            
                    </View>

                    <Text style={styles.nameText}>Juan dela Cruz</Text>
                    <Text style={styles.subText}>Quality Assurance Specialist</Text>
                    <Text style={styles.subText}>#5985</Text>
                </View>
                
                <View style={styles.bodyView}></View>

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