import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { Entypo, AntDesign } from '@expo/vector-icons'
import moment from 'moment'
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
    const [filteredData, setFilteredData] = useState([])
    const [pdfUri, setPdfUri] = useState(null)
    const [isAlert, setAlert] = useState(false)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    // const [secondHalfStart, setSecondHalfStart] = useState(DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).startDate)
    // const [secondHalfEnd, setSecondHalfEnd] = useState(DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).endDate)

    const route = useRoute()
    const params = route.params.item
    const TKparams = route.params.TKData

    const generateAndDownloadPDF = async () => {
        const htmlContent = `
        <html lang="en">
        <head>
            <style>
                body {
                    font-family: Tahoma, Geneva, sans-serif;
                    padding: 50px;
                }

                #headerTitle {
                    text-align: center;
                    margin-left: 20px;
                    margin-right: 20px;
                }

                .rowView {
                    line-height: 3px;
                }

                .rowRightView {
                    margin-top: -10px;
                    display: flex;
                    justify-content: flex-end;
                }

                .rowIndentView {
                    margin-left: 60px;
                }

                .hr {
                    height: 0px;
                    border: none;
                    border-top: 1px solid black;
                }

                .hrThick {
                    height: 0px;
                    margin-top: -5px;
                    border: none;
                    border-top: 2px solid black;
                }

                #boldText {
                    font-size: 15px;
                    font-weight: bolder;
                    margin-right: 10px;
                }

                #regularText {
                    font-size: 15px;
                    font-weight: 500;
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
                <h3 id="headerTitle">MAGELLAN PERFORMANCE OUTSOURCING CORP.</h3>

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

                <p id="boldText">Gross Pay</p>
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
                        <span id="boldText">PHP </span>
                        <span id="boldText">15,378.24</span>
                    </p>
                </div> <hr class="hr" />

                <!-- Timekeeping -->
                <div style="page-break-before: always; padding-top: 3em !important">
                    <h4 id="headerTitle">TIMEKEEPING</h4>

                    <div class="rowView" style="margin-top: 40px;">
                        <p id="rowText">
                            <span id="boldText">Cut-off Period: </span>
                            <span id="regularText">August 16-31, 2023</span>
                        </p>
                    </div>
            
                    <hr class="hrThick" /> <hr class="hrThick" />
            
                    <div class="rowView">
                        <p id="boldText" style="margin-top: 20px; margin-bottom: 20px; font-size: 15px;">August 16, 2023</p>
            
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
            const pdfName = DateTimeUtils.momentDashCurrDate() + '-Payslip.pdf';
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
        console.log(pdfUri)

        if (pdfUri) {
            const fileUri = pdfUri
            await Sharing.shareAsync(fileUri)
        } else {
            // generateAndDownloadPDF()
        }
    }

    useEffect(() => {
        // if (DateTimeUtils.checkDateHalf(params?.cutOffDate)) {
        //   const startDateRange = DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).startDate;
        //   const endDateRange = DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).endDate;
      
        //   const filteredData = TKparams.filter((item) => {
        //     const itemDate = item.date;
        //     return moment(itemDate, 'YYYYMMDD').isBetween(startDateRange, endDateRange, undefined, '[]');
        //   });
      
        //   setFilteredData(filteredData);
        //   console.log(filteredData)
        // } else {
        //   const startDateRange = DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).startDate;
        //   const endDateRange = DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).endDate;
      
        //   const filteredData = TKparams.filter((item) => {
        //     const itemDate = item.date;
        //     return moment(itemDate, 'YYYYMMDD').isBetween(startDateRange, endDateRange, undefined, '[]');
        //   });
      
        //   setFilteredData(filteredData)
        // }

        let startDateRange = DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).startDate;
        let endDateRange = DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).endDate;
      
          const filteredData = TKparams.filter((item) => {
            const itemDate = item.date
            return moment(itemDate, 'YYYYMMDD').isBetween(DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).startDate, DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).endDate, undefined, '[]');
          });

          console.log(filteredData)
      
          setFilteredData(filteredData)
    }, [params?.cutOffDate])


    return (
        <>
            {isAlert && (
                Alert.alert(
                    'Success',
                    'PDF Payslip is done rendered.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Save', onPress: () => {
                            if (pdfUri) {
                                const fileUri = pdfUri
                                Sharing.shareAsync(fileUri)
                            }
                        }},
                    ]
                )
            )}

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
                    <Shadow distance={5} offset={[2, 3]} style={styles.shadowView}>
                        <Text style={styles.titleText}>MAGELLAN PERFORMANCE OUTSOURCING CORP.</Text>

                        <View style={styles.textView}>
                            <RowTextView semiText='Document No' regularText={params?.documentNo} />
                            <RowTextView semiText='Employee Name' regularText={params?.employeeName} />
                            <RowTextView semiText='Employee Code' regularText={params?.employeeCode} />
                        </View>

                        <Hr />

                        <View style={styles.textView}>
                            <RowTextView semiText='Pay Out Date' regularText={DateTimeUtils.dateFullConvert(params?.cutOffDate)} />

                            <RowTextView 
                                semiText='Cut Off Period' 
                                regularText={
                                    DateTimeUtils.checkDateHalf(params?.cutOffDate) == true ? (
                                        DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).startDate +  DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).endDate
                                    ) : (
                                        DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).startDate +  DateTimeUtils.dateFirstHalfRange(params?.cutOffDate).endDate
                                    )
                                }
                            />
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
                            <RowTextView semiText='Cut-off Period' regularText={
                                DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).startDate +  DateTimeUtils.dateSecondHalfRange(params?.cutOffDate).endDate
                            } />
                        </View>
                        <Hr width={1} />
                        <Hr width={1} space={.1} />

                        {/* const filteredData = TKData.filter((item) => {
                            const itemDate = item.date;
                            return moment(itemDate, 'YYYYMMDD').isBetween(startDateRange, endDateRange, undefined, '[]');
                            }); */
                        }

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
                    </Shadow>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.clearWhite,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    shadowView: {
        backgroundColor: COLORS.clearWhite,
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