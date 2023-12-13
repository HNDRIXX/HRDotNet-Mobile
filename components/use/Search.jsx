import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { COLORS, COMPONENT_STYLES } from "../../constant";

export const Search = ({ filterText, setFilterText }) => {
  const styles = COMPONENT_STYLES.Search
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