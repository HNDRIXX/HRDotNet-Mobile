import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { COLORS } from "../../constant";

export const Search = ({ filterText, setFilterText }) => {

  const platformIOS = Platform.OS === 'ios'

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
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: 'flex-start',
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 4,
  },

  searchValueText: (platformIOS) => ({
    backgroundColor: COLORS.clearWhite,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    borderRadius: 15,
    width: 130,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: platformIOS ? 5 : 0
  }),
})
