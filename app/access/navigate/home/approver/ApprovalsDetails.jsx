import { useEffect } from 'react'
import { View, Text, StyleSheet, BackHandler, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { useRoute } from '@react-navigation/native';

import { COLORS, Utils } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader';

import { DateTimeUtils } from '../../../../../constant';
export default function MorePage ({ navigation }) {
    const params = useRoute().params

    return (
        <View style={{ flex: 1 }}>
            <PageHeader pageName={"Approvals Details"} />

            <View>
                <View style={styles.topContent(params)}>
                    <Text style={styles.topDate}>{DateTimeUtils.dateHalfMonthConvert(params.date)}</Text>
                    
                    <View style={styles.rowWrapper}>
                        { Utils.statusIcon(params.status) }

                        <Text style={styles.topDate}>{params.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow distance={5} style={styles.content}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Employee:</Text>
                            <Text style={styles.valueText}>{params?.employeeName}</Text>
                        </View>

                        <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                            <Text style={styles.titleText}>Type:</Text>
                            <Text style={styles.valueText}>{params?.type}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Document No:</Text>
                            <Text style={styles.valueText}>{params?.documentNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Attached File:</Text>
                            <Text style={styles.valueText}>
                                { params.attachedFile == "" ? "-----" : (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AttachedFile', params)}
                                    >
                                        <Text style={styles.attachText}>View Attachment</Text>
                                    </TouchableOpacity>
                                )}
                            </Text>
                        </View>

                        <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                            <Text style={styles.titleText}>Status:</Text>

                            { params.statusBy || params.reviewedBy ? (
                                <View style={styles.statusWrapper}>
                                    {params.status != "Reviewed" && (
                                        <Text style={[styles.valueText, { marginBottom: 10 }]}>{params.status} by {params.statusBy} on {params.formattedStatusByDate}</Text>
                                    )}
                                    
                                    <Text stye={styles.valueText}>Reviewed by {params.reviewedBy} on {params.formattedReviewedDate}</Text>
                                </View>
                            ) : (<Text>Filed</Text>)}
                        </View>
                    </Shadow>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topContent: (item) => ({
        backgroundColor: 
            item.status == "Filed" ?
                COLORS.filed :
            item.status == "Reviewed" ?
                COLORS.purple :
            item.status == "Approved" ?
                COLORS.green :
            item.status == "Cancelled" ?
                COLORS.red
            : COLORS.tr_gray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
    }),

    topDate: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
    },

    container: {
        marginHorizontal: 20,
        marginVertical: 20,
    },

    content: {
        padding: 20,
        borderRadius: 20,
        width: '100%'
    },

    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 10,
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.black,
    },

    statusWrapper: {
        width: '80%',
    },

    attachText: {
        color: COLORS.powderBlue,
        fontFamily: 'Inter_600SemiBold',
    }
})