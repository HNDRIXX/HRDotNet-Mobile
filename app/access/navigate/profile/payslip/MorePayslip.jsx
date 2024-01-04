// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { FontAwesome5 } from '@expo/vector-icons'
import moment from 'moment'
import { useRoute } from '@react-navigation/native'
import * as Print from 'expo-print'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Utils, DateTimeUtils, COLORS, STYLES } from '../../../../../constant'
import PageHeader from '../../../../../components/header/PagesHeader'
import Hr from '../../../../../components/use/Hr'
import Loader from '../../../../../components/loader/Loader'
import { PayslipPrint } from '../../../../../constant/print/PayslipPrint'

const styles = STYLES.MorePayslip
const RowTextView = ({ semiText, regularText }) => {
    return (
        <View style={styles.rowText}>
            <Text style={[styles.semiText(false), { marginRight: 3 }]}>{semiText}: </Text>
            <Text style={styles.regularText(false, true)}>{regularText}</Text>
        </View>
    )
}

const RowBetweenView = ({ title, textOne, textTwo }) => {
    return (
        <View style={styles.regularDayView}>
            <Text style={styles.semiText(false, true)}>{title}</Text>

            { textOne && 
                <Text style={styles.regularText(false)}>{textOne}</Text>
            }

            <Text style={styles.regularText(false)}>{textTwo}</Text>
        </View>
    )
}

const RowEndView = ({ title, text, bold }) => {
    return (
        <View style={[styles.regularDayView, { justifyContent: 'flex-end' }]}>
            <Text style={styles.semiText(bold)}>{title} </Text>
            <Text style={styles.regularText(bold)}>{text}</Text>
        </View>
    )
}

const TimekeepingText = ({ title, text, gap }) => {
    return (
        <View style={[styles.rowText, { marginTop: gap && 20 }]}>
            <Text style={[styles.semiText(false), { marginRight: 0 }]}>{title}: </Text>
            <Text style={styles.regularText(false)}>{text}</Text>
        </View>
    )
}

export default function MorePayslip ({ navigation }) {
    const route = useRoute()
    const params = route.params.item
    const TKparams = route.params.TKData

    const [tempData, setTempData] = useState(null)
    const [grossData, setGrossData] = useState(null)
    const [RDData, setRDData] = useState(null)
    const [TKData, setTKData] = useState(null)

    const [filteredData, setFilteredData] = useState([])
    const [pdfUri, setPdfUri] = useState(null)
    const [isAlert, setAlert] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const [dateRange, setDateRange] = useState(null)

    const zeroValue = (value) => {
        return value != 0  ?  true : false
    }

    const generateAndDownloadPDF = async () => {
        const htmlContent = PayslipPrint.payslip(params, dateRange, tempData, grossData, RDData, TKData, zeroValue)
    
        const { uri } = await Print.printToFileAsync({ html: htmlContent })
    
        if (uri) {
            const pdfName = DateTimeUtils.getDashDate(tempData?.DatePayoutSchedule) + '-Payslip.pdf'
            const destination = `${FileSystem.documentDirectory}${pdfName}`

            await FileSystem.moveAsync({
                from: uri,
                to: destination,
            });

            console.log(`Nakasave sa ${destination}`)
            setPdfUri(destination)
            setAlert(!isAlert)
        }
    }

    const sharePDF = async () => {
        if (pdfUri) {
            const fileUri = pdfUri
            await Sharing.shareAsync(fileUri)
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)
                const userID = await AsyncStorage.getItem('userID')
                const connValue = await AsyncStorage.getItem('conn')
                const portValue = await AsyncStorage.getItem('port')
                
                const setPortValue = portValue !== null ? ':' + portValue : ''
      
                const response = await fetch(`http://${connValue}${setPortValue}/api/morePayslip`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ IDPayroll: params?.ID, IDTKProcessing: params?.ID_TKProcessing, IDEmployee: userID }),
                })
    
                const data = await response.json()
    
                if (response.ok) {
                    setTempData(data.summary[0])
                    setGrossData(data.detail)
                    setRDData(data.restDay)
    
                    let sortedData = [...data.tkData]
    
                    sortedData.sort((a, b) => {
                        const dateA = moment(a.WorkDate, 'YYYYMMDD')
                        const dateB = moment(b.WorkDate, 'YYYYMMDD')
                    
                        return dateA - dateB
                    })
    
                    setTKData(sortedData)
                    setDateRange(DateTimeUtils.dateMonthDayConvert(data.summary[0].DateFrom) + ' - ' + DateTimeUtils.dateDayYearConvert(data.summary[0].DateTo))
                } else {
                    alert(data.message)
                }
            } catch (error) {
                alert('An error occurred while fetching data.')
            } finally {
                setLoading(false)
            }
        }
    
        fetchUserData()
    }, [])

    return (
        <>
            {isAlert && (
                Alert.alert(
                    'Success',
                    'PDF Payslip is done rendered.',
                    [
                        { text: 'Cancel' },
                        { text: 'Save', onPress: () => sharePDF()},
                    ]
                )
            )}

            <PageHeader pageName={'Payslip'}/>

            { isLoading ? ( <Loader /> ) : (
                <View style={{ flex: 1, backgroundColor: COLORS.clearWhite }}>
                    <ScrollView>
                        <TouchableOpacity
                            style={[styles.downloadButton, { marginTop: 20}]}
                            onPress={generateAndDownloadPDF}
                        >
                            <FontAwesome5 name="file-download" size={22} color={COLORS.orange} style={{ marginRight: 10 }} />
                            <Text style={{ fontFamily: 'Inter_600SemiBold', color: COLORS.orange }}>Download</Text>
                        </TouchableOpacity>

                        <View style={styles.container}>
                            <Shadow distance={5} offset={[2, 3]} style={styles.shadowView}>
                                <Text style={styles.titleText}>MAGELLAN PERFORMANCE OUTSOURCING CORP.</Text>

                                <View style={styles.textView}>
                                    <RowTextView semiText='Document No' regularText={params?.DocumentNo} />
                                    <RowTextView semiText='Employee Name' regularText={tempData?.Name_Employee} />
                                    <RowTextView semiText='Employee Code' regularText={tempData?.Code_Employee} />
                                </View>

                                <Hr />

                                <View style={styles.textView}>
                                    <RowTextView semiText='Pay Out Date' regularText={DateTimeUtils.dateFullConvert(tempData?.DatePayoutSchedule)} />

                                    <RowTextView 
                                        semiText='Cut Off Period' 
                                        regularText={dateRange}
                                    />
                                </View>

                                <Hr />

                                <Text style={[styles.semiText(false), { marginTop: 10, }]}>Gross Pay</Text>
                                <Hr width={2.5} />
                                <Hr width={2.5} space={.1} />

                                <View style={styles.textView}>
                                    <RowBetweenView 
                                        title='Regular Day'
                                        textOne={Utils.amountFormat(RDData[0]?.TotalHours) + ' hrs'}
                                        textTwo={Utils.amountFormat(RDData[0]?.TotalAmount)} />

                                    { grossData?.map(( item, index ) => (
                                        <RowBetweenView 
                                            key={index}
                                            title={item?.Name_PayrollItem}
                                            textTwo={Utils.amountFormat(item?.TotalAmount)} />
                                    ))}
                                </View>
                                <Hr />

                                <View style={[styles.textView, { marginVertical: 0 }]}>
                                    <RowEndView title='Total Gross Pay' text={Utils.amountFormat(params?.GrossPay)}/>
                                </View>

                                <Text style={[styles.semiText(false), { marginTop: 10, }]}>Deductions</Text>
                                <Hr width={2.5} />
                                <Hr width={2.5} space={.1} />

                                <View style={styles.textView}>
                                    { zeroValue(params?.SSSES) ? <RowBetweenView title='SSS Employee Share' textTwo={Utils.amountFormat(params?.SSSES)} /> : null }
                                    
                                    { zeroValue(params?.PHICEE) ?  <RowBetweenView title='PHIC Employee Share' textTwo={Utils.amountFormat(params?.PHICEE)} /> : null }
                                    
                                    { zeroValue(params?.HDMFEE) ? <RowBetweenView title='HDMF Employee Share' 
                                    textTwo={ Utils.amountFormat(params?.HDMFEE)} /> : null }

                                    { zeroValue(params?.Tax) ? <RowBetweenView title='Withholding Tax' 
                                    textTwo={ Utils.amountFormat(params?.Tax)} /> : null }
                                </View>

                                <Hr width={2.2} />

                                <View style={[styles.textView, { marginVertical: 0 }]}>
                                    <RowEndView title='Total Deductions' text={Utils.amountFormat(params?.Deductions)} />
                                </View>

                                <Text style={[styles.semiText, { marginTop: 10, fontFamily: 'Inter_700Bold'}]}>Net Pay</Text>
                                <Hr width={2.5} />
                                <Hr width={2.5} space={.1} />

                                <View style={[styles.textView, { marginVertical: 3 }]}>
                                    <RowEndView 
                                        title='PHP' 
                                        text={ Utils.amountFormat(params?.NetPay)} 
                                        bold={true} />
                                </View>

                                <Hr />
                            </Shadow>
                        </View>

                        <View style={styles.container}>
                            <Shadow distance={5} offset={[2, 3]} style={styles.shadowView}>
                                <Text style={styles.titleText}>TIMEKEEPING</Text>

                                <View style={styles.textView}>
                                    <RowTextView semiText='Cut-off Period' regularText={dateRange} />
                                </View>

                                <Hr width={1} />
                                <Hr width={1} space={.1} />

                                {TKData?.map(( item, index ) => (
                                    <View key={index}>
                                        <View style={styles.textView}  >
                                            <Text style={styles.tkDateText}>{DateTimeUtils.dateFullConvert(item.WorkDate)}</Text>
                                            
                                            <View>
                                                <TimekeepingText title='Day Type' text={item.DayType} />
                                                
                                                { (item.DayType === 'RG' || (item.DayType && item.DayType.includes('LH'))) && (
                                                    <>
                                                        <TimekeepingText title='Schedule' text={item.Name_Schedule} />

                                                        <TimekeepingText title='Time-in' text={
                                                            item.ActualTimeIn != 'No Log' ?
                                                            DateTimeUtils.timeConvert(item.ActualTimeIn) : 'No Log'
                                                        } />

                                                        <TimekeepingText title='Time-Out' text={
                                                            item.ActualTimeOut != 'No Log' ?
                                                            DateTimeUtils.timeConvert(item.ActualTimeOut) : 'No Log'
                                                        } />

                                                        {(item.REG !== '' && item.REG !== 0 ) && (
                                                            <TimekeepingText title='Regular Hours' text={item.REG} 
                                                            gap={true} />
                                                        )}

                                                        {(item.Leave !== '' && item.Leave !== null && item.Leave !== 0) && (
                                                            <View style={styles.rowText}>
                                                                <Text style={[styles.semiText(false), {marginLeft: 1}]}>Leave: </Text>
                                                                <Text style={styles.regularText(false)}>{item.Leave}</Text>
                                                            </View>
                                                        )}

                                                        { (item.OT !== '' && item.OT != null && item.OT !== 0) && (
                                                            <View style={styles.rowText}>
                                                                <Text style={styles.semiText(false)}>Overtime: </Text>
                                                                <Text style={styles.regularText(false)}>{item.OT}</Text>
                                                            </View>
                                                        )}

                                                        { (item.Tardy !== '' && item.Tardy !== null && item.Tardy !== 0) && (
                                                            <View style={styles.rowText}>
                                                                <Text style={styles.semiText(false)}>Tardy: </Text>
                                                                <Text style={styles.regularText(false)}>{item.tardy}</Text>
                                                            </View>
                                                        )}
                                                    </>
                                                )}
                                            </View>
                                        </View>

                                        <Hr width={1} />
                                    </View>
                                ))}
                                
                                {TKData?.length <= 0 && (
                                    <Text style={[styles.titleText, 
                                        {fontFamily: 'Inter_400Regular', fontSize: 14, paddingVertical: 10 }]}>
                                        No Records.</Text>
                                )}
                            </Shadow>
                        </View>
                    </ScrollView>
                </View>
            )}
        </>
    )
}