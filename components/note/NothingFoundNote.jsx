import { View, Text, StyleSheet } from "react-native";

export default function NothingFoundNote () {
    return (
        <View style={styles.container}>
            <Text>Nothing Found.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})