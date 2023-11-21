import { View, StyleSheet } from "react-native";

export default function Hr ({ width, space }) {
    return (
        <View style={[styles.hr, { borderBottomWidth: width || 1.5, marginVertical: space || 5, }]} />
    )
}

const styles = StyleSheet.create({
    hr: {
        borderBottomColor: 'black',
    }
})