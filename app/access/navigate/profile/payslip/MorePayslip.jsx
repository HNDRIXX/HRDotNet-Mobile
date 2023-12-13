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
            <Text style={styles.regularText(false)}>{regularText}</Text>
        </View>
    )
}

const RowBetweenView = ({ title, textOne, textTwo }) => {
    return (
        <View style={styles.regularDayView}>
            <Text style={styles.semiText(false)}>{title}</Text>

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
        <View style={[styles.rowText, { marginTop: gap && 30 }]}>
            <Text style={[styles.semiText(false), { marginRight: 0 }]}>{title}: </Text>
            <Text style={styles.regularText(false)}>{text}</Text>
        </View>
    )
}

export default function MorePayslip () {
    const route = useRoute()
    const params = route.params.item
    const TKparams = route.params.TKData

    const [filteredData, setFilteredData] = useState([])
    const [pdfUri, setPdfUri] = useState(null)
    const [isAlert, setAlert] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const [dateRange, setDateRange] = useState(DateTimeUtils.dateMonthDayConvert(params?.dateTo) + ' - ' + DateTimeUtils.dateDayYearConvert(params?.dateFrom) )

    const generateAndDownloadPDF = async () => {
        const htmlContent = PayslipPrint.payslip(params, filteredData, dateRange)
    
        const { uri } = await Print.printToFileAsync({ html: htmlContent })
    
        if (uri) {
            const pdfName = DateTimeUtils.getDashDate(params?.payOutSchedule) + '-Payslip.pdf'
            const destination = `${FileSystem.documentDirectory}${pdfName}`

            await FileSystem.moveAsync({
                from: uri,
                to: destination,
            });

            console.log(`Nakasave sa ${destination}`)
            setPdfUri(destination)
            setAlert(true)
        }
    }

    const sharePDF = async () => {
        if (pdfUri) {
            const fileUri = pdfUri
            await Sharing.shareAsync(fileUri)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                await new Promise(resolve => setTimeout(resolve, 2000))
        
                const filteredData = TKparams.filter((data) => {
                    const currentDate = moment(data.date, 'YYYYMMDD')
                    return currentDate.isBetween(params.dateTo, params.dateFrom, null, '[]')
                })
                
                setFilteredData(filteredData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => {}
    }, [params, TKparams])

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
                                    <RowTextView semiText='Document No' regularText={params?.documentNo} />
                                    <RowTextView semiText='Employee Name' regularText={params?.employeeName} />
                                    <RowTextView semiText='Employee Code' regularText={params?.employeeCode} />
                                </View>

                                <Hr />

                                <View style={styles.textView}>
                                    <RowTextView semiText='Pay Out Date' regularText={DateTimeUtils.dateFullConvert(params?.payOutSchedule)} />

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
                                        textOne={Utils.amountFormat(params?.totalWorkingHours) + ' hrs'}
                                        textTwo={Utils.amountFormat(params?.regularDayTotal)} />

                                    { params?.mealAllowanceTotal != '' && (
                                        <RowBetweenView 
                                        title='Meal Allowance'
                                        textTwo={Utils.amountFormat(params?.mealAllowanceTotal)} />
                                    )}

                                    { params?.complexityAllowance != '' && (
                                        <RowBetweenView 
                                            title='Complexity Allowance'
                                            textTwo={Utils.amountFormat(params?.complexityAllowance)} />
                                    )}
                                </View>
                                <Hr />

                                <View style={[styles.textView, { marginVertical: 0 }]}>
                                    <RowEndView title='Total Gross Pay' text={Utils.amountFormat(params?.grossPay)}/>
                                </View>

                                <Text style={[styles.semiText(false), { marginTop: 10, }]}>Deductions</Text>
                                <Hr width={2.5} />
                                <Hr width={2.5} space={.1} />

                                <View style={styles.textView}>
                                    <RowBetweenView 
                                        title='SSS Employee Share' 
                                        textTwo={ Utils.amountFormat(params?.SSSShare)} />
                                    
                                    <RowBetweenView 
                                        title='PhilHealth Employee Share' 
                                        textTwo={ Utils.amountFormat(params?.philHealthShare)} />

                                    <RowBetweenView 
                                        title='HDMF Employee Share' 
                                        textTwo={ Utils.amountFormat(params?.HDMFShare)} />

                                    <RowBetweenView 
                                        title='Withholding Tax' 
                                        textTwo={ Utils.amountFormat(params?.withHoldingTax)} />
                                </View>

                                <Hr width={2.2} />

                                <View style={[styles.textView, { marginVertical: 0 }]}>
                                    <RowEndView title='Total Deductions' text={Utils.amountFormat(params?.deductions)} />
                                </View>

                                <Text style={[styles.semiText, { marginTop: 10, fontFamily: 'Inter_700Bold'}]}>Net Pay</Text>
                                <Hr width={2.5} />
                                <Hr width={2.5} space={.1} />

                                <View style={[styles.textView, { marginVertical: 3 }]}>
                                    <RowEndView 
                                        title='PHP' 
                                        text={ Utils.amountFormat(params?.netPay)} 
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

                                {filteredData.map(( item, index ) => (
                                    <View key={index}>
                                        <View style={styles.textView}  >
                                            <Text style={styles.tkDateText}>{DateTimeUtils.dateFullConvert(item.date)}</Text>
                                            
                                            <View style={{ marginLeft: 30 }}>
                                                <TimekeepingText title='Day Type' text={item.dayType} />
                                                
                                                { item.dayType != 'Rest Day' && item.dayType != 'Special Holiday' && (
                                                    <>
                                                        <TimekeepingText title='Schedule' text={item.schedule} />

                                                        {item.leave == '' ? (
                                                            <>
                                                                <TimekeepingText title='Time-in' text={DateTimeUtils.timeConvert(item.timeIn)} />
                                                                <TimekeepingText title='Time-out' text={DateTimeUtils.timeConvert(item.timeOut)} /> 
                                                            </>
                                                        ) : ( <TimekeepingText title='Leave' text={item.leave} /> )}

                                                        <TimekeepingText title='Regular Hours' text={item.regularHours} gap={true} />
                                                    </>
                                                )}

                                                { item.overtime != '0.00' && (
                                                    <View style={styles.rowText}>
                                                        <Text style={[styles.semiText(false), { marginRight: 0 }]}>Overtime: </Text>
                                                        <Text style={styles.regularText(false)}>{item.overtime}</Text>
                                                    </View>
                                                )}

                                                { item.tardy != '0.00' && (
                                                    <View style={styles.rowText}>
                                                        <Text style={[styles.semiText(false), { marginRight: 0 }]}>Tardy: </Text>
                                                        <Text style={styles.regularText(false)}>{item.tardy}</Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>

                                        <Hr width={1} />
                                    </View>
                                ))}
                                {filteredData.length <= 0 && (
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