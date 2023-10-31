import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constant";


export const SearchAndNew = ({ filterText, setFilterText }) => {

  const navigation = useNavigation()

  return (
    <View style={styles.topContainer}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color={COLORS.orange} />

        <TextInput
          style={styles.searchValueText}
          placeholder="Search"
          editable={false}
          onChangeText={(text) => setFilterText(text)}
          value={filterText}
        />
      </View>

      <TouchableOpacity 
        style={styles.newRequestButton} 
        onPress={() => navigation.navigate('NewRequest', { onPanel: 0 })}
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchValueText: {
    fontFamily: "Inter_500Medium",
    marginLeft: 10,
    width: "50%",
  },

  newRequestButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  newRequestText: {
    fontFamily: "Inter_500Medium",
    marginStart: 5,
    color: COLORS.darkGray,
  },
});
