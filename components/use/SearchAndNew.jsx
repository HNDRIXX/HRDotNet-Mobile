import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS, COMPONENT_STYLES } from "../../constant";

export const SearchAndNew = ({ filterText, setFilterText, onPanel }) => {

  const styles = COMPONENT_STYLES.SearchAndNew
  
  const navigation = useNavigation()
  const platformIOS = Platform.OS === 'ios'

  const onNewRequestHandle = () => {
    switch (onPanel) {
      case 0:
        navigation.navigate('COSRequest')
        break

      case 1:
        navigation.navigate('OBRequest')
        break

      case 2:
        navigation.navigate('OTRequest')
        break

      case 3:
        navigation.navigate('OSRequest')
        break

      case 4:
        navigation.navigate('LVRequest')
        break

      case 5:
        navigation.navigate('MLRequest')
        break

      default:
        break
    }
  }

  return (
    <View style={styles.topContainer}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color={COLORS.orange} />

        <TextInput
          style={styles.searchValueText(platformIOS)}
          placeholder="Search"
          placeholderTextColor={COLORS.tr_gray}
          onChangeText={(text) => setFilterText(text)}
          value={filterText}
        />
      </View>

      <TouchableOpacity
        style={styles.newRequestButton}
        onPress={onNewRequestHandle}
      >
        <Entypo name="circle-with-plus" size={23} color={COLORS.orange} />
        <Text style={styles.newRequestText}>New Request</Text>
      </TouchableOpacity>
    </View>
  )
}