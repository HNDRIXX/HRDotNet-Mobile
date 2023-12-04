import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, BackHandler, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import { useRoute } from '@react-navigation/native';

import { COLORS, STYLES, Utils } from '../../../../../../constant';
import PageHeader from '../../../../../../components/header/PagesHeader';

import { DateTimeUtils } from '../../../../../../constant';
export default function MorePage ({ navigation }) {
    const params = useRoute().params
    const styles = STYLES.ApprovalsDetails(params)

    let topDate

    switch (params?.type) {
        case 'Change of Schedule':
            topDate = params.filedDate
            break

        case 'Official Work':
            topDate = params.officialWorkDate
            break

        case 'Overtime':
            topDate = params.overtimeDate
            break

        case 'Offset':
            topDate = params.overtimeDate
            break

        case 'Missed Log': 
            topDate = params.missedLogDate
            break

        default:
            topDate = null
    } 

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.clearWhite }}>
            <PageHeader pageName={"Approvals Details"} />

            <View>
                <View style={styles.topContent}>
                    <Text style={styles.topDate}>{DateTimeUtils.dateHalfMonthConvert(topDate)}</Text>
                    
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
                                    <Text style={styles.valueText}>{DateTimeUtils.dateFullConvert(params?.COSDate)}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Requested Schedule:</Text>
                                    <Text style={styles.valueText}>{params?.requestedSched}</Text>
                                </View>
                            </>
                        ) : params?.type === "Official Work" ? (
                            <>
                                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                                    <Text style={styles.titleText}>Official Work Date:</Text>
                                    <Text style={styles.valueText}>{DateTimeUtils.dateFullConvert(params?.officialWorkDate)}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Official Work Time:</Text>
                                    <Text style={styles.valueText}>{params?.officialWorkTime}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Location:</Text>
                                    <Text style={styles.valueText}>{params?.location}</Text>
                                </View>
                            </>
                        ) : params?.type === "Overtime" ? (
                            <>
                                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                                    <Text style={styles.titleText}>Overtime Date:</Text>
                                    <Text style={styles.valueText}>{DateTimeUtils.dateFullConvert(params?.overtimeDate)}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Overtime Hours:</Text>
                                    <Text style={styles.valueText}>{params?.overtimeHours}</Text>
                                </View>
                            </>
                        ) : params?.type === "Offset" ? (
                            <>
                                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                                    <Text style={styles.titleText}>Overtime Date:</Text>
                                    <Text style={styles.valueText}>{DateTimeUtils.dateFullConvert(params?.overtimeDate)}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Overtime Hours:</Text>
                                    <Text style={styles.valueText}>{params?.overtimeHours}</Text>
                                </View>
                            </>
                        ) : params?.type === "Leave" ? (
                            <>
                                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                                    <Text style={styles.titleText}>Applied Date/:</Text>
                                    <Text style={styles.valueText}>
                                        {DateTimeUtils.dateFullConvert(params?.startDate)}
                                        {DateTimeUtils.dateFullConvert(params?.endDate)}
                                    </Text>
                                </View>
                            </>
                        ) : params?.type === "Missed Log" ? (
                            <>
                                <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                                    <Text style={styles.titleText}>Missed Log Date/:</Text>
                                    <Text style={styles.valueText}>
                                        {DateTimeUtils.dateFullConvert(params?.missedLogDate)}
                                    </Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Log Type:</Text>
                                    <Text style={styles.valueText}>{params?.logType}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Log Time:</Text>
                                    <Text style={styles.valueText}>{DateTimeUtils.timeConvert(params?.logTime)}</Text>
                                </View>
                            </>
                        )  : null}

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