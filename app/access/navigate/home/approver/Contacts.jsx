// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { COLORS, ICONS } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader';
import { Search } from '../../../../../components/use/Search';
import TeamsContactsItem from '../../../../../components/items/home/TeamsContactsItem';
import Loader from '../../../../../components/loader/Loader';
import NothingFoundNote from '../../../../../components/note/NothingFoundNote';

export default function ContactsPage({ navigation }) {
    const [data, setData] = useState([
        {
            name: 'Alejandro Alcanar',
            position: 'Customer Service Specialist',
            contactNumber: '09123456789',
            emailAddress: 'emailaddress@gmail.com',
            uri: ICONS.alejandro,
        },
        {
            name: 'Brian Noel Cruz',
            position: 'Training Specialist',
            contactNumber: '09123456789',
            emailAddress: 'emailaddress@gmail.com',
            uri: ICONS.brian,
        },
        {
            name: 'Dave Andrew Carandang',
            position: 'Messenger',
            contactNumber: '09123456789',
            emailAddress: 'emailaddress@gmail.com',
            uri: ICONS.dave,
        },
    ])
    
    const [isLoading, setIsLoading] = useState(true)
    const [filteredData, setFilteredData] = useState(data)
    const [filterText, setFilterText] = useState('')

    const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name))

    const groupedData = sortedData.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), contact];
        return acc
    }, {})

    const flatListData = Object.keys(groupedData).reduce((acc, letter) => {
        acc.push({ title: letter, data: groupedData[letter] })
        return acc
    }, [])

    const onHandlePress = (event) => {
        navigation.navigate('ContactInfo', event)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 800)
    }, [])

    useEffect(() => {
        const filteredContacts = data.filter((contact) =>
            contact.name.toLowerCase().includes(filterText.toLowerCase())
        )

        setFilteredData(filteredContacts)
    }, [filterText])

    return (
        <View style={styles.main}>
            <PageHeader pageName={'Contacts'} />

            <View style={styles.topView}>
                <Search setFilterText={setFilterText} filterText={filterText} />
            </View>

            {isLoading ? ( <Loader /> ) : (
                <Animatable.View animation={'fadeIn'} duration={600} style={[styles.bodyContainer]}>
                    { flatListData.length > 0 ? (
                        <FlatList
                            data={flatListData}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.listView}
                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item, index }) => (
                                <>
                                    <Text style={styles.letterTitle}>{item.title}</Text>

                                    {item.data.map((event) => (
                                        <TeamsContactsItem
                                            key={event.name}
                                            event={event}
                                            isActive={true}
                                            cacheText={'contactsImage'}
                                            onHandlePress={() => onHandlePress(event)}
                                        />
                                    ))}
                                </>
                            )}

                            getItemLayout={(data, index) => ({
                                length: 50,
                                offset: 50 * index,
                                index,
                            })}
                        />
                    ) : ( <NothingFoundNote /> )}
                </Animatable.View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    topView: {
        paddingHorizontal: 20,
        borderBottomColor: COLORS.orange,
        borderBottomWidth: 2,
    },

    bodyContainer: {
        flex: 1,
    },

    letterTitle: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.orange,
        fontSize: 17,
        marginHorizontal: 25,
    },

    listView: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 30,
    },
})