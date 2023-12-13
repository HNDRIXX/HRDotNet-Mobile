import { View, Text, StyleSheet,  } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, COMPONENT_STYLES } from "../../constant";

export default function NavigationHeader ({ headerName }) {
    const styles = COMPONENT_STYLES.NavigationHeader
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.text}>{headerName}</Text>
        </View>
    )
}