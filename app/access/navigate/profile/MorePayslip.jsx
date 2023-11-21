import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import * as Print from 'expo-print'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

import { Utils, DateTimeUtils, COLORS  } from '../../../../constant'
import PageHeader from '../../../../components/header/PagesHeader'
import Hr from '../../../../components/use/Hr'

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
            <Text style={styles.semiText(bold)}>{title}: </Text>
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

const sumTotal = ( a, b, c, d ) => {
    const numA = parseFloat(a) || 0
    const numB = parseFloat(b) || 0
    const numC = parseFloat(c) || 0
    const numD = parseFloat(d) || 0

    const total = numA + numB + numC + numD;

    return total.toString()
}

// const amountConvert = (amount) => {
//     return Utils.amountFormat(amount)
// }

export default function MorePayslip () {
    const [pdfUri, setPdfUri] = useState(null);
    const [value, setValue] = useState(500)

    const route = useRoute()
    const params = route.params

    const generateAndDownloadPDF = async () => {
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            text-align: center;
                        }

                        h1 {
                            text-align: center;
                        }
                    </style>
                </head>
                
                <body>
                    <h1>MAGELLAN PERFORMANCE OUTSOURCING CORP.</h1>
                    
                    <p>Employee Name</p>
                    <p>${params?.employeeName}</p>
                </body>
            </html>
        `
    
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
        if (uri) {
            const pdfName = 'payslip.pdf';
            const destination = `${FileSystem.documentDirectory}${pdfName}`

            await FileSystem.moveAsync({
                from: uri,
                to: destination,
            });

            console.log(`PDF saved at ${destination}`)
            setPdfUri(destination)
        }
    }

    const sharePDF = async () => {
        if (pdfUri) {
            const fileUri = pdfUri
            await Sharing.shareAsync(fileUri)
        }
    }

    return (
        <>
            <PageHeader pageName={'Payslip'}/>

            <ScrollView>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        backgroundColor: COLORS.green,
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={generateAndDownloadPDF}
                >
                    <Entypo 
                        name="download"
                        size={24}
                        color={COLORS.clearWhite} 
                        style={{ marginRight: 10 }} />
                    
                    <Text style={{ color: COLORS.clearWhite, fontFamily: 'Inter_700Bold'}}>DOWNLOAD</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: '100%',
                        backgroundColor: COLORS.orange,
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={sharePDF}
                >
                    <Entypo 
                        name="save" 
                        size={24} 
                        color={COLORS.clearWhite}
                        style={{ marginRight: 10 }} />
                    
                    <Text style={{ color: COLORS.clearWhite, fontFamily: 'Inter_700Bold'}}>SAVE</Text>
                </TouchableOpacity>

                <View style={styles.container}>
                    <Shadow distance={4} style={styles.shadowView}>
                        <Text style={styles.titleText}>MAGELLAN PERFORMANCE OUTSOURCING CORP.</Text>

                        <View style={styles.textView}>
                            <RowTextView semiText='Document No' regularText={params?.documentNo} />
                            <RowTextView semiText='Employee Name' regularText={params?.employeeName} />
                            <RowTextView semiText='Employee Code' regularText={params?.employeeCode} />
                        </View>

                        <Hr />

                        <View style={styles.textView}>
                            <RowTextView semiText='Pay Out Date' regularText={DateTimeUtils.dateFullConvert(params?.cutOffDate)} />
                            <RowTextView semiText='Cut Off Period' regularText='cutOffPeriod' />
                        </View>

                        <Hr />

                        <Text style={[styles.semiText(false), { marginTop: 10, }]}>Gross Pay</Text>
                        <Hr width={2.5} />
                        <Hr width={2.5} space={.1} />

                        <View style={styles.textView}>
                            <RowBetweenView 
                                title='Regular Day'
                                textOne={ Utils.amountFormat(params?.totalWorkingHours) + ' hrs'}
                                textTwo={ Utils.amountFormat(params?.regularDayTotal)} />

                            { params?.mealAllowanceTotal != '' && (
                                <RowBetweenView 
                                title='Meal Allowance'
                                textTwo={ Utils.amountFormat(params?.mealAllowanceTotal)} />
                            )}

                            { params?.complexityAllowance != '' && (
                                <RowBetweenView 
                                    title='Complexity Allowance'
                                    textTwo={ Utils.amountFormat(params?.complexityAllowance)} />
                            )}
                        </View>
                        <Hr />

                        <View style={[styles.textView, { marginVertical: 0 }]}>
                            <RowEndView title='Total Gross Pay' text={
                                sumTotal(
                                    params?.regularDayTotal, 
                                    params?.mealAllowanceTotal, 
                                    params?.complexityAllowance 
                                )} />
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
                            <RowEndView title='Total Deductions' text={
                                sumTotal(params?.SSSShare, 
                                    params?.philHealthShare, 
                                    params?.HDMFShare,
                                    params?.withHoldingTax
                                )} />
                        </View>

                        <Text style={[styles.semiText, { marginTop: 10, fontFamily: 'Inter_700Bold'}]}>Net Pay</Text>
                        <Hr width={2.5} />
                        <Hr width={2.5} space={.1} />

                        <View style={[styles.textView, { marginVertical: 3 }]}>
                            <RowEndView 
                                title='PHP' 
                                text={ Utils.amountFormat(params?.netpay)} 
                                bold={true} />
                        </View>

                        <Hr />
                    </Shadow>
                </View>

                <View style={styles.container}>
                    <Shadow distance={4} style={styles.shadowView}>
                        <Text style={styles.titleText}>TIMEKEEPING</Text>

                        <View style={styles.textView}>
                            <RowTextView semiText='Cut-off Period' regularText='August 16-31, 2023' />
                        </View>

                        <Hr width={1} />
                        <Hr width={1} space={.1} />

                        <View style={styles.textView}>
                            <Text style={styles.tkDateText}>August 16, 2023</Text>
                            
                            <View style={{ marginLeft: 30 }}>
                                <TimekeepingText title='Day Type' text='Regular Day' />
                                <TimekeepingText title='Schedule' text='schedule' />
                                <TimekeepingText title='Time-in' text='timeIn' />
                                <TimekeepingText title='Time-out' text='timeOut' />
                                <TimekeepingText title='Regular Hours' text='regularHours' gap={true} />

                                <View style={styles.rowText}>
                                    <Text style={[styles.semiText(false), { marginRight: 0 }]}>Overtime: </Text>
                                    <Text style={styles.regularText(false)}>overtime</Text>
                                </View>

                                <View style={styles.rowText}>
                                    <Text style={[styles.semiText(false), { marginRight: 0 }]}>Tardy: </Text>
                                    <Text style={styles.regularText(false)}>tardy</Text>
                                </View>
                            </View>
                        </View>

                        <Hr width={1} />
                    </Shadow>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 30,
    },

    shadowView: {
        width: '100%',
        paddingVertical: 35,
        paddingHorizontal: 35,
    },

    titleText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        width: '100%'
    },

    textView: {
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        marginVertical: 10
    },

    semiText: (bold) => ({
        fontFamily: bold ? 'Inter_700Bold' : 'Inter_600SemiBold',
        marginRight: 20
    }),

    regularText: (bold) => ({
        fontFamily: bold ? 'Inter_700Bold' : 'Inter_400Regular'
    }),

    rowText: {
        flexDirection: 'row',
        textAlign: 'left',
    },

    regularDayView: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        width: '100%',
    },

    tkDateText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16
    }
})