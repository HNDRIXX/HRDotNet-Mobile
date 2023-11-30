import { Dimensions, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../Theme";

const paddingIOS = Platform.OS === "ios"

export const COMPONENT_STYLES = StyleSheet.create({
    PanelApprovals: {
        container: {
            opacity: 1, 
            flex: 1, 
            backgroundColor: COLORS.clearWhite,
            marginHorizontal: 20
        },
    
        bodyContainer: {
            flex: 1,
        },
    
        itemView: {
            marginTop: 20,
        },
        
        itemStatusText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.darkGray,
            padding: 10,
            fontSize: 18,
            marginHorizontal: 15
        },
    
        rowView: {
            flexDirection: 'row',
            borderBottomColor: COLORS.darkGray,
            borderBottomWidth: 1.5
        },
    
        checkBox: {
            marginTop: 15, 
            borderColor: COLORS.orange, 
            borderWidth: 2 
        },
    },
})