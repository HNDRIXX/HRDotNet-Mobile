import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constant";

export const SearchAndNew = ({ filterText, setFilterText, onPanel }) => {

  const navigation = useNavigation()
  const platformIOS = Platform.OS === 'ios'

  const onNewRequestHandle = () => {
    switch(onPanel) {
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
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    // padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },

  searchValueText: (platformIOS) => ({
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    borderRadius: 15,
    width: 130,
    paddingHorizontal: 10,
    paddingVertical: platformIOS ? 5 : 0
  }),

  newRequestButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5 
  },

  newRequestText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    marginStart: 5,
    color: COLORS.darkGray,
  },
});
