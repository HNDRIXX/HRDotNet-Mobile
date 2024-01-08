// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect } from 'react'
import { View, Text, StyleSheet, BackHandler, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-shadow-2';
import { useRoute } from '@react-navigation/native';

import { COLORS, STYLES, Utils } from '../../../../constant';
import PageHeader from '../../../../components/header/PagesHeader';

export default function MorePage ({ navigation }) {
    const params = useRoute().params
    const styles = STYLES.MorePage(params)
    let topDate

    switch (params.requestType) {
        case 'Change of Schedule':
            topDate = params.formattedAppliedDate
            break
        case 'Official Work':
            topDate = params.formattedOfficialWorkDate
            break
        case 'Overtime' :
            topDate = params.formattedOvertimeDate
            break
        case 'Offset' :
            topDate = params.formattedOvertimeDate
            break
        case 'Leave' :
            topDate = params.formattedAppliedDate
            break
        case 'Missed Logs' :
            topDate = params.formattedMissedLogDate
            break
        default:
            topDate = null
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.clearWhite }}>
            <PageHeader pageName={"Request Details"} />

            <View>
                <View style={styles.topContent}>
                    <Text style={styles.topDate}>{topDate}</Text>
                    
                    <View style={styles.rowWrapper}>
                        { Utils.statusIcon(params.status) }

                        <Text style={styles.topDate}>{params.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow distance={5} style={styles.content}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Type:</Text>
                            <Text style={styles.valueText}>{params.requestType}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Document No:</Text>
                            <Text style={styles.valueText}>{params.documentNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Date Filed:</Text>
                            <Text style={styles.valueText}>{params.formattedFiledDate}</Text>
                        </View>

                        { params.requestType == "Change of Schedule" ? (
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Applied Date/s Filed:</Text>
                                    <Text style={styles.valueText}>{params.formattedAppliedDate}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>
                                        { params.reason == "" ? "-----" : params.reason }
                                    </Text>
                                </View>
                            </>
                        ) : params.requestType == "Official Work" ? ( 
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Official Work Date:</Text>
                                    <Text style={styles.valueText}>{params.formattedOfficialWorkDate}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Official Work Time:</Text>
                                    <Text style={styles.valueText}>{params.officialWorkTime}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Location:</Text>
                                    <Text style={styles.valueText}>{params.location}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>
                                        { params.reason == "" ? "-----" : params.reason }
                                    </Text>
                                </View>
                            </>
                        ) : params.requestType == "Overtime" || params.requestType == "Offset" ? ( 
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Overtime Date:</Text>
                                    <Text style={styles.valueText}>{params.formattedOvertimeDate}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Overtime Hours:</Text>
                                    <Text style={styles.valueText}>{params.overtimeHours}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>{params.reason}</Text>
                                </View>
                            </>
                        ) : params.requestType == "Leave" ? ( 
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Applied Date/s:</Text>
                                    <Text style={styles.valueText}>{params.formattedAppliedDate}</Text>
                                </View> 

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>
                                        { params.reason == "" ? "-----" : params.reason }
                                    </Text>
                                </View>
                            </>
                        ) : params.requestType == "Missed Logs" ? ( 
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Missed Log Date:</Text>
                                    <Text style={styles.valueText}>{params.formattedMissedLogDate}</Text>
                                </View> 

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Log Type:</Text>
                                    <Text style={styles.valueText}>{params.logType}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Log Time:</Text>
                                    <Text style={styles.valueText}>{params.logTime}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>
                                        { params.reason == "" ? "-----" : params.reason }
                                    </Text>
                                </View>
                            </>
                        )
                        
                        : ( null )}

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