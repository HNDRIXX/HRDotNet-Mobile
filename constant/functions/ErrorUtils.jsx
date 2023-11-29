import { FontAwesome } from "@expo/vector-icons"

import { COLORS } from "../Theme"

export const ErrorUtils = {
    errorIndicator: () => { return (<FontAwesome name="asterisk" size={13} color={COLORS.red} style={{ marginTop: 2}} />) }
}