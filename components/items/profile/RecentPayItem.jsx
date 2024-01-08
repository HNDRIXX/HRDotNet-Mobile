// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Entypo } from "@expo/vector-icons";
import CachedImage from "expo-cached-image";

import { COLORS, COMPONENT_STYLES, DateTimeUtils, Utils, ICONS } from "../../../constant";

export default function RecentPayItem ({ item, currDeductions, index, onHandleMore }) {
    const styles = COMPONENT_STYLES.RecentPayItem

    const totalDeductions = currDeductions?.reduce((accumulator, currentItem) => accumulator + currentItem.Amount, 0)
    
    return (
        <View key={index} style={styles.topView}>
            <Shadow distance={4} offset={[2, 2]} style={styles.shadowView}>
                <View style={styles.rowView}>
                    <CachedImage
                        source={{ uri: ICONS.money }} 
                        cacheKey={`money`}
                        placeholderContent={
                            <ActivityIndicator size={'small'} color={COLORS.darkGray} style={{ marginRight: 10 }} />
                        }
                        style={{  width: 55, height: 55  }}
                    />

                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.recentPayText}>Recent Pay</Text>

                        <Text>{DateTimeUtils.dateHalfMonthConvert(item?.DatePayoutSchedule)}</Text>
                    </View>
                </View>

                <View style={[styles.rowView, { marginTop: 10 }]}>
                    <View>
                        <View style={styles.netpayView}>
                            <Text style={styles.netpayText}>Net Pay</Text>
                            <Text style={styles.netpayValue}>Php {Utils.amountFormat(item.NetPay)}</Text>
                        </View>

                        <View style={styles.grosspayView}>
                            <Text style={styles.grosspayText}>Gross Pay</Text>
                            <Text style={styles.amountText}>{Utils.amountFormat(item.GrossPay)}</Text>
                        </View>

                        <View style={styles.deductionsView}>
                            <Text style={styles.deductionsText}>Deductions</Text>
                            <Text style={styles.amountText}>{Utils.amountFormat(totalDeductions)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.topMoreButton}
                        onPress={() => onHandleMore(item, currDeductions, totalDeductions)}
                    >
                        <View style={styles.row}>
                            <Text style={styles.moreText}>More</Text>
                            <Entypo name="chevron-small-right" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </Shadow>
        </View>
    )
}