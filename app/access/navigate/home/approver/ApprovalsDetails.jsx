import { useEffect } from 'react'
import { View, Text, StyleSheet, BackHandler, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { useRoute } from '@react-navigation/native';

import { COLORS, STYLES, Utils } from '../../../../../constant';
import PageHeader from '../../../../../components/header/PagesHeader';

import { DateTimeUtils } from '../../../../../constant';
export default function MorePage ({ navigation }) {
    const params = useRoute().params
    const styles = STYLES.ApprovalsDetails(params)

    return (
        <View style={{ flex: 1 }}>
            <PageHeader pageName={"Approvals Details"} />

            <View>
                <View style={styles.topContent}>
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
                            <Text style={styles.titleText}>Date Filed:</Text>
                            <Text style={styles.valueText}>{DateTimeUtils.dateFullConvert(params?.filedDate)}</Text>
                        </View>


                        { params?.type === "Change of Schedule" ? (
                            <>
                                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                                    <Text style={styles.titleText}>COS Date:</Text>
                                    <Text style={styles.valueText}>{DateTimeUtils.dateFullConvert(params?.date)}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Requested Schedule:</Text>
                                    <Text style={styles.valueText}>{params?.requestedSched}</Text>
                                </View>
                            </>
                        ) : null}

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Reason:</Text>
                            <Text style={styles.valueText}>
                                { params?.reason == "" ? "-----" : params?.reason }
                            </Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Attached File:</Text>
                            <Text style={styles.valueText}>
                                { params?.attachedFile == "" ? "-----" : (
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
                                    
                                    <Text stye={styles.valueText}>Reviewed by {params?.reviewedBy} on {DateTimeUtils.dateFullConvert(params?.reviewedDate)}</Text>
                                </View>
                            ) : (<Text>Filed</Text>)}
                        </View>
                    </Shadow>
                </View>
            </View>
        </View>
    )
}