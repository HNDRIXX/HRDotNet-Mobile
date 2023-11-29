import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'
import * as FileSystem from 'expo-file-system';

import PageHeader from '../../../../components/header/PagesHeader'
import { DateTimeUtils } from '../../../../constant'

export default function AttachedFile ({ navigation }) {
    const route = useRoute()
    const params = route.params
    const imageParams = route.params.attachedFile
    const imageUri = decodeURIComponent(imageParams?.uri)

    return (
        <>
            <PageHeader pageName={'Attached File'}/>

            <View style={styles.container}>
                <Image 
                    source={
                        imageUri == "" || imageUri == null ? require('../../../../assets/mntn.jpg') 
                        : { uri: imageUri }
                    }
                    style={{ width: 350, height: 400, marginTop: 20, justifyContent: 'center', alignSelf: 'center'}}
                    contentFit='contain'
                />

                <View style={styles.rowView}>
                    <View style={styles.textView}>
                        <Text style={styles.boldText}>Date: </Text>
                        <Text style={styles.regularText}>
                            { imageParams.date ? DateTimeUtils.dateFullConvert(imageParams.date) : '------' }
                        </Text>
                    </View>

                    <View style={styles.textView}>
                        <Text style={styles.boldText}>Time: </Text>
                        <Text style={styles.regularText}>
                            { imageParams.time ? DateTimeUtils.timeConvert(imageParams.time) : '------' }
                        </Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.boldText}>Location: </Text>
                        <Text style={styles.regularText}>
                            { imageParams.location ? imageParams.location : '------' }
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30
    },

    textView: {
        flexDirection: 'row',
    },

    rowView: {
        marginTop: 20,
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15
    },

    regularText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
    }
})