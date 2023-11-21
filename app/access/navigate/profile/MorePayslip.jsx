import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
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
        <html lang="en">
        <head>
            <style>
                body {
                    font-family: Tahoma, Geneva, sans-serif;
                    padding: 80px;
                }
        
                #headerTitle {
                    text-align: center;
                    margin-left: 20px;
                    margin-right: 20px;
                }
        
                .rowView {
                    line-height: 5px;
                }
        
                .rowRightView {
                    margin-top: -10px;
                    display: flex;
                    justify-content: flex-end;
                }
        
                .rowIndentView {
                    margin-left: 50px;
                }
        
                .hr {
                    height: 0px;
                    border: none;
                    border-top: 1px solid black;
                }
        
                .hrThick {
                    height: 0px;
                    border: none;
                    border-top: 2px solid black;
                }
        
                #title {
                    font-size: 20
                }
        
                #boldText {
                    font-size: 16px;
                    font-weight: bolder;
                    margin-right: 10px;
                }
        
                #rowSpaceText {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    line-height: 5px;
                }
            </style>
        </head>
        <body>
            <div>
                <h2 id="headerTitle">MAGELLAN PERFORMANCE OUTSOURCING CORP.</h2>
        
                <div class="rowView" style="margin-top: 50px;">
                    <p id="rowText">
                        <span id="boldText">Document No: </span>
                        <span id="regularText">PP01</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowText">
                        <span id="boldText">Employee Name: </span>
                        <span id="regularText">Juan Dela Cruz</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowText">
                        <span id="boldText">Employee Code: </span>
                        <span id="regularText">5985</span>
                    </p>
                </div> <hr class="hr" />
        
                <div class="rowView">
                    <p id="rowText">
                        <span id="boldText">Pay Out Date: </span>
                        <span id="regularText">November 25, 2023</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowText">
                        <span id="boldText">Cut Off Period: </span>
                        <span id="regularText">November 25, 2023</span>
                    </p>
                </div> <hr class="hr" />
        
                <p id="boldText" style="margin-top: 40px">Gross Pay</p>
                <hr class="hrThick" /> <hr class="hrThick" />
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">Regular Day: </span>
                        <span id="regularText">84.62 hrs</span>
                        <span id="regularText">15,075.36</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">Meal Allowance: </span>
                        <span id="regularText">736.10</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">Complexity Allowance: </span>
                        <span id="regularText">1,321.84</span>
                    </p>
                </div> <hr class="hr" />
        
                <div class="rowRightView">
                    <p id="rowText">
                        <span id="boldText">Total Gross Pay: </span>
                        <span id="regularText">17133.3</span>
                    </p>
                </div>
        
                <p id="boldText">Deductions</p>
                <hr class="hrThick" /> <hr class="hrThick" />
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">SSS Employee Share: </span>
                        <span id="regularText">675.00</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">PhilHealth Employee Share: </span>
                        <span id="regularText">301.51</span>
                    </p>
                </div>
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">HDMF Employee Share: </span>
                        <span id="regularText">100.00</span>
                    </p>
                </div> 
        
                <div class="rowView">
                    <p id="rowSpaceText">
                        <span id="boldText">Withholding Tax: </span>
                        <span id="regularText">735.00</span>
                    </p>
                </div> <hr class="hr" />
        
                <div class="rowRightView">
                    <p id="rowText">
                        <span id="boldText">Total Deductions: </span>
                        <span id="regularText">1811.51</span>
                    </p>
                </div>
        
                <p id="boldText">Net Pay</p>
                <hr class="hrThick" /> <hr class="hrThick" />
        
                <div class="rowRightView">
                    <p id="rowText">
                        <span id="boldText">PHP: </span>
                        <span id="boldText">15,378.24</span>
                    </p>
                </div> <hr class="hr" />
        
                <!-- Timekeeping -->
                <div style="page-break-before: always;">
                    <h3 id="headerTitle" style="margin-top: 70px;">TIMEKEEPING</h3>
        
                    <div class="rowView" style="margin-top: 40px;">
                        <p id="rowText">
                            <span id="boldText">Cut-off Period: </span>
                            <span id="regularText">August 16-31, 2023</span>
                        </p>
                    </div>
            
                    <hr class="hrThick" /> <hr class="hrThick" />
            
                    <div class="rowView">
                        <p id="boldText" style="margin-top: 20px; margin-bottom: 20px; font-size: 17px;">August 16, 2023</p>
            
                        <div class="rowIndentView">
                            <p id="rowText">
                                <span id="boldText">Date Type:</span>
                                <span id="regularText">Regular Day</span>
                            </p>
            
                            <p id="rowText">
                                <span id="boldText">Schedule: </span>
                                <span id="regularText">schedule</span>
                            </p>
            
                            <p id="rowText">
                                <span id="boldText">Time-in: </span>
                                <span id="regularText">timeIn</span>
                            </p>
            
                            <p id="rowText">
                                <span id="boldText">Time-out: </span>
                                <span id="regularText">timeOut</span>
                            </p>
            
                            <p id="rowText" style="margin-top: 40px;">
                                <span id="boldText">Regular Hours: </span>
                                <span id="regularText">regularHours</span>
                            </p>
            
                            <p id="rowText">
                                <span id="boldText">Overtime: </span>
                                <span id="regularText">overtime</span>
                            </p>
            
                            <p id="rowText">
                                <span id="boldText">Tardy: </span>
                                <span id="regularText">tardy</span>
                            </p> 
                        </div> <hr class="hr" />
                    </div>
                </div>
            </div>
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

            console.log(`Nakasave sa ${destination}`)
            setPdfUri(destination)

            Alert.alert(
                'Success',
                'PDF Payslip is done rendered.',
                [
                       { text: 'Cancel', style: 'cancel' },
                       { text: 'Save', onPress: () => sharePDF() },
                ]
            )
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