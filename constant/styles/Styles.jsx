// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco

import { Dimensions, StyleSheet, Platform } from "react-native";
import { COLORS } from "../Theme";

const paddingIOS = Platform.OS === "ios"

export const STYLES = StyleSheet.create({
    LogIn: {
        container: {
            flex: 1,
        },
        
        logo: {
            width: 230, height: 100,
            marginBottom: 20,
        },

        inputContainer: {
            margin: 10,
            padding: 20,
            flex: 1,
            marginTop: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },

        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: COLORS.clearWhite,
            borderRadius: 30,
            marginBottom: 15,

            elevation: 5,
            shadowColor: COLORS.darkGray,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },

        textInput: {
            width: '100%',
            fontFamily: 'Inter_400Regular',
            paddingVertical: paddingIOS ? 10 : 0,
            color: COLORS.darkGray
        },

        loginBtn: {
            backgroundColor: COLORS.orange,
            alignItems: 'center',
            alignSelf: 'center',
            width: 160,
            padding: 15,
            borderRadius: 50,
            marginTop: 70,

            elevation: 5,
            shadowColor: COLORS.darkGray,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },

        loginText: {
            color: COLORS.clearWhite,
            fontSize: 15,
            fontFamily: 'Inter_800ExtraBold'
        },

        forgotBtn: {
            alignSelf: 'center',
        },

        forgotText: {
            fontFamily: 'Inter_400Regular'
        },

        textFooter: {
            textAlign: 'center',
            color: COLORS.darkGray,
            fontFamily: 'Inter_400Regular',
            fontSize: 13,
            marginTop: 30,
            marginBottom: paddingIOS ? 30 : 10,
        }
    },

    ForgotPassword: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        backBtn: {
            width: 60,
            height: 60,
            alignItems: 'center',
            marginTop: 60,
        },

        wrapper: {
            flex: 1,
            margin: 30,
            marginTop: 0,
            justifyContent: 'center',
        },

        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: COLORS.clearWhite,
            borderRadius: 30,
            marginTop: 50,

            elevation: 5,
            shadowColor: COLORS.darkGray,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },

        textInput: {
            width: '100%',
            padding: 10,
            paddingVertical: paddingIOS ? 10 : 0,
            fontFamily: 'Inter_400Regular'
        },

        forgotText: {
            fontFamily: 'Inter_700Bold',
            textAlign: 'center',
            fontSize: 26,
        },

        subText: {
            textAlign: 'center',
            fontFamily: 'Inter_400Regular',
        },

        buttonView: {
            marginTop: 100,
        },

        button: {
            backgroundColor: COLORS.orange,
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 10,
            width: 170,
            padding: 10,
            borderRadius: 30,
        },

        textBtn: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_700Bold',
            fontSize: 15,
        },

        buttonOutline: {
            backgroundColor: COLORS.clearWhite,
            borderWidth: 2,
            borderColor: COLORS.orange,
        },

        textOutline: {
            color: COLORS.orange
        }
    },

    ResetPassword: {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.clearWhite,
        },

        wrapper: {
            alignItems: 'center',
            margin: 40,
        },

        resetPassText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
        },

        subText: {
            fontFamily: 'Inter_400Regular',
        },

        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: COLORS.clearWhite,
            borderRadius: 30,
            marginTop: 20,

            elevation: 5,
            shadowColor: COLORS.darkGray,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },

        textInput: {
            width: '100%',
            fontFamily: 'Inter_400Regular'
        },

        updateBtn: {
            backgroundColor: COLORS.orange,
            padding: 15,
            width: 150,
            marginTop: 30,
            borderRadius: 30,
        },

        textBtn: {
            textAlign: 'center',
            fontFamily: 'Inter_800ExtraBold',
            color: COLORS.clearWhite,
        }
    },

    UserHome: (insets) => ({
        container: {
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: COLORS.powderBlue
        },

        loader: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        headerView: {
            padding: 20,
            paddingTop: 15,
            height: 225,
            backgroundColor: COLORS.powderBlue,
        },

        headerNavigation: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 8,
            marginBottom: 10,
        },

        welcomeView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginHorizontal: 10
        },

        userIcon: {
            width: 83,
            height: 80,
            borderWidth: 4,
            borderColor: COLORS.orange,
            borderRadius: 40,
            marginRight: 15,
        },

        helloText: {
            fontFamily: 'Inter_800ExtraBold',
            letterSpacing: -.5,
            color: COLORS.clearWhite,
            fontSize: 21,

            textShadowColor: COLORS.darkGray,
            textShadowOffset: { width: 1.5, height: 2 },
            textShadowRadius: 10
        },

        nameText: {
            fontFamily: 'Inter_800ExtraBold',
            letterSpacing: -.5,
            color: COLORS.clearWhite,
            fontSize: 22,
            lineHeight: 26,

            textShadowColor: COLORS.darkGray,
            textShadowOffset: { width: 1.5, height: 2 },
            textShadowRadius: 10
        },

        statusView: {
            flexDirection: 'row',
            marginTop: 2,
            alignItems: 'center'
        },

        statusText: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            marginLeft: 10,
            fontSize: 13,
        },

        timeClockText: {
            color: COLORS.clearWhite,
            fontSize: 16,
            paddingHorizontal: 5,
            marginTop: 10,
            fontFamily: 'Inter_700Bold'
        },

        timeClockView: {
            backgroundColor: COLORS.clearWhite,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 70,
            borderTopEndRadius: 70,
            width: '100%',
        },

        menuView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.clearWhite,
        },

        sectionView: {
            width: Dimensions.get('window').width,

        },

        mainTitle: {
            marginHorizontal: 35,
            fontSize: 18,
            marginVertical: 6,
            color: COLORS.powderBlue,
            fontFamily: 'Inter_600SemiBold',
        }
    }),

    Calendar: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        calendarView: {
            paddingTop: 10,
            height: 'auto',
        },

        promptView: {
            marginBottom: 70,
        }
    },

    Profile: {
        container: {
            backgroundColor: COLORS.clearWhite,
            flex: 1,
        },

        buttonScroll: {
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            paddingVertical: 10,
            borderColor: COLORS.orange,
            borderBottomWidth: 3,
        },

        button: {
            paddingVertical: 5,
            width: 120,
            alignItems: 'center',
            borderRadius: 20,
        },

        textButton: {
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            color: COLORS.darkGray,
        },

        active: {
            backgroundColor: COLORS.orange,

            elevation: 5,
            shadowOffset: { width: 10, height: 10 },
            shadowColor: COLORS.darkGray,
            shadowRadius: 20,
        },

        textActive: {
            fontFamily: 'Inter_700Bold',
            color: COLORS.clearWhite
        }
    },

    Request: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        wrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: COLORS.shadowGray,
            borderBottomWidth: 2,
        },

        button: {
            width: 'auto',
            height: 35,
            paddingHorizontal: 20,
            marginRight: 20,
            borderRadius: 15,
            marginVertical: 13,
            marginLeft: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },

        buttonText: {
            color: COLORS.tr_gray,
            fontSize: 17,
            fontFamily: 'Inter_600SemiBold'
        },

        selectedButton: {
            backgroundColor: COLORS.orange,
        },

        selectedTextButton: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_700Bold'
        },

        buttonList: {
            backgroundColor: COLORS.clearWhite,
            borderColor: COLORS.orange,
            borderBottomWidth: 3,
            paddingLeft: 10
        }
    },


    TimeClock: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        disabledBtn: {
            backgroundColor: 'gray',
            opacity: 0.3,
        },

        bottomContainer: {
            width: '100%',
            backgroundColor: COLORS.clearWhite,
            padding: 30,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
        },

        dateTimeWrapper: {
            alignItems: 'center',
        },

        dateText: {
            fontSize: 12,
            fontFamily: 'Inter_500Medium'
        },

        timeText: {
            fontSize: 25,
            fontFamily: 'Inter_700Bold'
        },

        clockInBtn: {
            width: 170,
            marginTop: 10,
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            justifyContent: 'center',
            padding: 13,
            borderRadius: 8
        },

        clockOutBtn: {
            width: 170,
            marginTop: 10,
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: COLORS.powderBlue,
            justifyContent: 'center',
            padding: 13,
            borderRadius: 8
        },

        textClockIn: {
            color: COLORS.clearWhite,
            fontSize: 17,
            fontFamily: 'Inter_700Bold'
        },
    },

    Approvals: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        wrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: COLORS.shadowGray,
            borderBottomWidth: 2,
        },

        button: {
            width: 'auto',
            height: 35,
            paddingHorizontal: 20,
            marginRight: 20,
            borderRadius: 15,
            marginVertical: 13,
            marginLeft: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },

        buttonText: {
            color: COLORS.tr_gray,
            fontSize: 17,
            fontFamily: 'Inter_600SemiBold'
        },

        selectedButton: {
            backgroundColor: COLORS.orange,
        },

        selectedTextButton: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_700Bold'
        },

        buttonList: {
            backgroundColor: COLORS.clearWhite,
            borderColor: COLORS.orange,
            borderBottomWidth: 3,
            paddingLeft: 10
        }
    },

    ApprovalsDetails: (params) => ({
        topContent: {
            backgroundColor:
                params.status == "Filed" ?
                    COLORS.filed :
                    params.status == "Reviewed" ?
                        COLORS.purple :
                        params.status == "Approved" ?
                            COLORS.green :
                            params.status == "Cancelled" ?
                                COLORS.red
                                : COLORS.tr_gray,

            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 15,
        },

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
    }),

    LoanDetails: (params) => ({
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        backButton: {
            paddingHorizontal: 10,
        },

        topHeader: {
            padding: 1,
            paddingBottom: 10,
            paddingVertical: 40,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.powderBlue,
        },

        textHeader: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            flex: 1,
            textAlign: 'center',
            marginRight: 50,
        },

        topContent: {
            backgroundColor:
                params.DocStatus == "Filed" ?
                    COLORS.filed :
                    params.DocStatus == "Reviewed" ?
                        COLORS.purple :
                        params.DocStatus == "Approved" ?
                            COLORS.green :
                            params.DocStatus == "Cancelled" ?
                                COLORS.red
                                : COLORS.tr_gray,

            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 15,
        },

        topText: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 15,
        },

        container: {
            marginHorizontal: 30,
            marginVertical: 20,
        },

        content: {
            padding: 20,
            width: '100%',
            borderRadius: 20,
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

        detailsTitle: {
            fontFamily: 'Inter_700Bold',
            fontSize: 17,
            marginHorizontal: 30,
        },

        detailView: {
            backgroundColor: COLORS.clearWhite,
            borderRadius: 20,
            margin: 10,
        },

        shadowView: {
            width: '100%',
            borderRadius: 20,
        },

        topDetail: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.tr_gray,
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },

        bodyDetail: {
            paddingVertical: 10,
            paddingHorizontal: 20,
        },

        topLeftDetail: {
            alignItems: 'center'
        },

        boldText: {
            fontFamily: 'Inter_700Bold'
        },

        bodyText: {
            fontFamily: 'Inter_500Medium'
        },
    }),

    NotificationDetails: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        wrapper: {
            margin: 20,
            marginHorizontal: 30,
            borderRadius: 20,
            backgroundColor: COLORS.clearWhite,
        },

        icon: {
            height: 100, width: 100,
            alignSelf: 'center',
            justifyContent: 'center',
            marginBottom: 20
        },

        shadowView: {
            width: '100%',
            borderRadius: 20,
            padding: 30,
        },

        text: {
            fontSize: 14,
        }
    },

    Drawer: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        backButton: {
            paddingHorizontal: 20,
        },

        topHeader: {
            padding: 1,
            paddingBottom: 10,
            paddingVertical: 50,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.powderBlue,
        },

        textHeader: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            flex: 1,
            textAlign: 'center',
            marginLeft: 72,
        },

        button: {
            paddingHorizontal: 18,
            paddingVertical: 13,
            backgroundColor: COLORS.clearWhite,
            marginHorizontal: 20,
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,

            elevation: 5,
            shadowColor: COLORS.darkGray,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: { width: 1, height: 5 },
        },

        textButton: {
            marginLeft: 20,
            fontSize: 16,
            fontFamily: 'Inter_500Medium'
        },

        logOutButton: {
            marginVertical: 60,
            backgroundColor: 'red',
            padding: 15,
            width: 160,
            alignSelf: 'center',
            borderRadius: 23,

            elevation: 5,
            shadowColor: COLORS.darkGray,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        },

        logOutText: {
            fontFamily: 'Inter_700Bold',
            color: COLORS.clearWhite,
            textAlign: 'center',
        }
    },

    LoanLedger: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        loanLedgerList: {
            marginTop: 20,
        }
    },

    Notifications: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        listView: {
            padding: 20,
        },

        shadowView: {
            borderRadius: 15,
        },

        wrapper: {
            flex: 1,
            margin: 20,
            borderRadius: 20,
            backgroundColor: COLORS.clearWhite,
        },
    },

    Pending: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        btnHorizontal: {
            flexDirection: 'row',
            borderBottomColor: COLORS.lighterOrange,
            borderBottomWidth: 2,
        },

        button: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 15,
            padding: 5,
            borderRadius: 20,
            alignItems: 'center',
        },

        counterText: {
            backgroundColor: COLORS.clearWhite,
            color: COLORS.orange,
            marginRight: 10,
            fontSize: 18,
            fontFamily: 'Inter_700Bold',
            paddingHorizontal: 9,
            borderRadius: 10,
            overflow: 'hidden',
            display: 'none',
        },

        buttonText: {
            color: COLORS.tr_gray,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 17,
        },

        selectedButton: {
            backgroundColor: COLORS.orange,
            elevation: 7,
            shadowColor: COLORS.darkGray,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: .2,
            shadowRadius: 10,
        },

        selectedTextButton: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_700Bold',
        },

        selectedCounter: {
            display: 'flex',
        },

        searchView: {
            marginHorizontal: 20,
        }
    },

    SickLeave: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        topContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
        },

        titleText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 22,
        },

        yearText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18
        },

        yearValue: {
            color: COLORS.orange,
        },

        creditContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.clearWhite,
        },

        creditShadow: {
            borderRadius: 15,
        },

        creditsValue: {
            padding: 18,
            width: '100%',
            textAlign: 'center',
            fontSize: 25,
            color: COLORS.orange,
            fontFamily: 'Inter_600SemiBold',
        },

        detailsTitle: {
            fontSize: 15,
            marginHorizontal: 20,
            marginTop: 20,
            fontFamily: 'Inter_600SemiBold',
        },
    },

    Timesheet: {
        container: {
            flex: 1
        },

        line: {
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },

        textHeader: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
            flex: 1,
            textAlign: 'center',
            marginRight: 50,
        },

        agendaCalendar: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        monthYearText: {
            fontFamily: 'Inter_600SemiBold',
            padding: 15,
            fontSize: 18,
        },

        agendaItem: {
            paddingBottom: 20,
            flex: 1,
            backgroundColor: '#FCFCFC'
        },

        clockInOutText: {
            color: COLORS.darkGray,
            marginHorizontal: 20,
            marginVertical: 13,
            fontFamily: 'Inter_600SemiBold',
        },

        itemContainer: {
            marginHorizontal: 23,
        },

        shadowView: {
            width: '100%',
            backgroundColor: COLORS.clearWhite,
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            padding: 10,
        },

        itemText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 19,
        },

        itemLoc: {
            color: COLORS.darkGray,
            fontStyle: 'italic',
            fontWeight: '600',
            fontSize: 12,
        },

        noEventsText: {
            color: COLORS.tr_gray,
            textAlign: 'center',
            padding: 20,
            fontFamily: 'Inter_500Medium'
        },
    },

    VacationLeave: {
        container: {
            flex: 1,
            backgroundColor: COLORS.clearWhite
        },

        topContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
        },

        titleText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 22,
        },

        yearText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18
        },

        yearValue: {
            color: COLORS.orange,
        },

        creditContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.clearWhite,
        },

        creditShadow: {
            borderRadius: 15,
        },

        creditsValue: {
            padding: 18,
            width: '100%',
            textAlign: 'center',
            fontSize: 25,
            color: COLORS.orange,
            fontFamily: 'Inter_600SemiBold',
        },

        detailsTitle: {
            fontSize: 15,
            marginHorizontal: 20,
            marginTop: 20,
            fontFamily: 'Inter_600SemiBold',
        },
    },

    MorePayslip: {
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
        },

        shadowViewButton: {
            width: '100%',
            paddingVertical: 17,
            borderRadius: 0,
        },

        downloadButton: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            marginHorizontal: 20,
        }
    },

    COSRequest: {
        mainView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
    
        container: {
            flex: 1,
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
    
        wrapper: {
            marginVertical: 10,
        },
    
        border: {
            borderColor: COLORS.darkGray,
            borderWidth: 1,
            borderRadius: 12,
        },
    
        placeholder: {
            color: COLORS.tr_gray,
        },
    
        dateText: {
            paddingVertical: 7,
        },
    
        rowView: {
            paddingVertical: 5,
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
    
        itemPicker: {
            fontSize: 14
        },
    
        textInput: {
            paddingLeft: 15,
            paddingVertical: 10,
            height: 'auto',
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        checkboxView: {
            flexDirection: 'row',
            paddingVertical: 8, 
        },
    
        checkboxItem: {
            flexDirection: 'row', 
            paddingHorizontal: 15
        },
    
        checkboxText: {
            fontFamily: 'Inter_400Regular',
            paddingLeft: 10,
        },
    
        fileSuccess: {
            color: COLORS.green,
            marginLeft: 10,
            fontFamily: 'Inter_600SemiBold'
        }
    },

    LVRequest: {
        mainView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
        
        container: {
            flex: 1,
            marginVertical: 15,
            marginHorizontal: 20
        },
    
        wrapper: {
            marginTop: 10,
        },
    
        border: {
            borderColor: COLORS.darkGray,
            borderWidth: 1,
            borderRadius: 12,
        },
    
        title: {
            fontFamily: 'Inter_600SemiBold',
            marginHorizontal: 15,
            marginBottom: 7,
        },
    
        text: { 
            fontFamily: 'Inter_400Regular',
            paddingVertical: 5,
        },
    
        mediumText: {
            fontFamily: 'Inter_500Medium',
        },
    
        rowView: {
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: 45
        },
    
        placeholder: {
            color: COLORS.tr_gray,
        },
    
        itemPicker: {
            fontSize: 14
        },
    
        textInput: {
            paddingLeft: 15,
            paddingVertical: 10,
            height: 'auto',
        },
    
        timeWrapper:{
            marginVertical: 10,
            marginHorizontal: 18,
        },
    
        timeContent: {
            fontFamily: 'Inter_500Medium',
            backgroundColor: COLORS.gray,
            width: 60,
            paddingTop: 3,
            textAlign: 'center',
    
            borderRadius: 5,
            borderWidth: 2,
            borderColor: COLORS.tr_gray
        },
    
        timeView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        checkboxView: {
            flexDirection: 'row',
            paddingVertical: 8,
        },
    
        checkboxItem: {
            flexDirection: 'row', 
            paddingHorizontal: 14,
        },
    
        checkboxText: {
            fontFamily: 'Inter_500Medium',
            paddingLeft: 8,
        },
    
        fileSuccess: {
            color: COLORS.green,
            marginLeft: 10,
            fontFamily: 'Inter_600SemiBold'
        }
    },

    MLRequest: {
        mainView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
        
        container: {
            flex: 1,
            marginVertical: 15,
            marginHorizontal: 20
        },
    
        wrapper: {
            marginTop: 10,
        },
    
        border: {
            borderColor: COLORS.darkGray,
            borderWidth: 1,
            borderRadius: 12,
        },
    
        title: {
            fontFamily: 'Inter_600SemiBold',
            marginHorizontal: 15,
            marginBottom: 7,
        },
    
        text: { 
            fontFamily: 'Inter_400Regular',
            paddingVertical: 5,
        },
    
        mediumText: {
            fontFamily: 'Inter_500Medium',
        },
    
        rowView: {
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: 45
        },
    
        placeholder: {
            color: COLORS.tr_gray,
        },
    
        itemPicker: {
            fontSize: 14
        },
    
        textInput: {
            paddingLeft: 15,
            paddingVertical: 10,
            height: 'auto',
        },
    
        timeWrapper:{
            marginVertical: 10,
            marginHorizontal: 18,
        },
    
        timeContent: {
            fontFamily: 'Inter_500Medium',
            backgroundColor: COLORS.gray,
            width: 60,
            paddingTop: 3,
            textAlign: 'center',
    
            borderRadius: 5,
            borderWidth: 2,
            borderColor: COLORS.tr_gray
        },
    
        timeView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        checkboxView: {
            flexDirection: 'row',
            paddingVertical: 8,
        },
    
        checkboxItem: {
            flexDirection: 'row', 
            paddingHorizontal: 14,
        },
    
        checkboxText: {
            fontFamily: 'Inter_500Medium',
            paddingLeft: 8,
        },
    
        fileSuccess: {
            color: COLORS.green,
            marginLeft: 10,
            fontFamily: 'Inter_600SemiBold'
        }
    },

    OBRequest: {
        mainView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
        
        container: {
            flex: 1,
            marginVertical: 15,
            marginHorizontal: 20
        },
    
        wrapper: {
            marginTop: 10,
        },
    
        border: {
            borderColor: COLORS.darkGray,
            borderWidth: 1,
            borderRadius: 12,
        },
    
        title: {
            fontFamily: 'Inter_600SemiBold',
            marginHorizontal: 15,
            marginBottom: 7,
        },
    
        text: { 
            fontFamily: 'Inter_400Regular',
            paddingVertical: 5,
        },
    
        grayText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.darkGray
        },
    
        rowView: {
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: 45
        },
    
        placeholder: {
            color: COLORS.tr_gray,
        },
    
        itemPicker: {
            fontSize: 14
        },

        locationInput: {
            width: '80%',
            textAlign: 'left'
        },
    
        textInput: {
            paddingLeft: 15,
            paddingVertical: 10,
            height: 'auto',
        },
    
        timeWrapper:{
            marginVertical: 10,
            marginHorizontal: 20,
        },
    
        timeContent: {
            fontFamily: 'Inter_500Medium',
            backgroundColor: COLORS.shadowGray,
            width: 100,
            textAlign: 'center',
            paddingTop: 2,
    
            borderRadius: 5,
            borderWidth: 2,
            borderColor: COLORS.tr_gray
        },
    
        timeView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 2
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        fileSuccess: {
            color: COLORS.green,
            marginLeft: 10,
            fontFamily: 'Inter_600SemiBold'
        }
    },

    OSRequest: {
        mainView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
    
        container: {
            flex: 1,
            marginVertical: 15,
            marginHorizontal: 20
        },
    
        wrapper: {
            marginTop: 10,
        },
    
        border: {
            borderColor: COLORS.darkGray,
            borderWidth: 1,
            borderRadius: 12,
        },
    
        title: {
            fontFamily: 'Inter_600SemiBold',
            marginHorizontal: 15,
            marginBottom: 7,
        },
    
        text: { 
            fontFamily: 'Inter_400Regular',
            paddingVertical: 5,
        },
    
        grayText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.darkGray
        },
    
        rowView: {
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: 45
        },
    
        placeholder: {
            color: COLORS.tr_gray,
        },
    
        itemPicker: {
            fontSize: 14
        },
    
        textInput: {
            paddingLeft: 15,
            paddingVertical: 10,
            height: 'auto',
        },
    
        timeWrapper:{
            marginVertical: 15,
            marginHorizontal: 20,
        },
    
        timeContent: {
            fontFamily: 'Inter_500Medium',
            backgroundColor: COLORS.gray,
            width: 100,
            textAlign: 'center',
    
            borderRadius: 5,
            borderWidth: 2,
            borderColor: COLORS.tr_gray
        },
    
        timeView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        fileSuccess: {
            color: COLORS.green,
            marginLeft: 10,
            fontFamily: 'Inter_600SemiBold'
        }
    },

    OTRequest: {
        mainView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
        
        container: {
            flex: 1,
            marginVertical: 15,
            marginHorizontal: 20
        },
    
        wrapper: {
            marginTop: 10,
        },
    
        border: {
            borderColor: COLORS.darkGray,
            borderWidth: 1,
            borderRadius: 12,
        },
    
        title: {
            fontFamily: 'Inter_600SemiBold',
            marginHorizontal: 15,
            marginBottom: 7,
        },
    
        text: { 
            fontFamily: 'Inter_400Regular',
            paddingVertical: 5,
        },
    
        grayText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.darkGray
        },
    
        rowView: {
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: 45
        },
    
        placeholder: {
            color: COLORS.tr_gray,
        },
    
        itemPicker: {
            fontSize: 14
        },
    
        textInput: {
            paddingLeft: 15,
            paddingVertical: 10,
            height: 'auto',
        },
    
        timeWrapper:{
            marginVertical: 15,
            marginHorizontal: 20,
        },
    
        timeContent: {
            fontFamily: 'Inter_500Medium',
            backgroundColor: COLORS.gray,
            width: 100,
            textAlign: 'center',
    
            borderRadius: 5,
            borderWidth: 2,
            borderColor: COLORS.tr_gray
        },
    
        timeView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        disabledInput: {
            backgroundColor: COLORS.lightGray3,
        },
        
        fileSuccess: {
            color: COLORS.green,
            marginLeft: 10,
            fontFamily: 'Inter_600SemiBold'
        }
    },

    AttachedFile: {
        container: {
            marginHorizontal: 30
        },
    
        textView: {
            flexDirection: 'row',
        },
    
        rowView: {
            marginTop: 20,
        },
    
        boldText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 15
        },
    
        regularText: {
            fontFamily: 'Inter_400Regular',
            fontSize: 15,
        }
    },

    MorePage: (params) => ({
        topContent: {
            backgroundColor: 
                params.status == "Filed" ?
                    COLORS.filed :
                params.status == "Reviewed" ?
                    COLORS.purple :
                params.status == "Approved" ?
                    COLORS.green :
                params.status == "Cancelled" ?
                    COLORS.red
                : COLORS.tr_gray,
    
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 15,
        },
    
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
    }),

    RequestSummary: {
        container: {
            flex: 1,
            marginVertical: 20,
            marginHorizontal: 20,
        },
    
        summaryView: {
            height: 100,
            borderColor: COLORS.darkGray,
            borderWidth: 1, 
            borderRadius: 20,
            marginTop: 30,
            padding: 15
        },
    
        rowView: {
            margin: 10,
        },
    
        text: {
            fontFamily: 'Inter_500Medium'
        },
    
        summaryText: {
            fontFamily: 'Inter_500Medium',
            marginLeft: 20,
        },
    
        dashed: {
            paddingTop: 10,
        },
    
        boldText: {
            fontFamily: 'Inter_600SemiBold',
            color: COLORS.tr_gray
        },
    
        button: {
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: COLORS.orange,
            width: 170,
            padding: 10,
            borderRadius: 20,
            marginTop: 10,
        },
    
        textButton: {
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: COLORS.clearWhite,
            textAlign: 'center',
        },
    
        attachmentView: {
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 10 
        },
    },

    Camera: {
        container: {
            flex: 1
        },
    
        topHeader: {
            padding: 20,
            paddingTop: 45,
            paddingBottom: 10,
            alignItems: 'center',
            backgroundColor: COLORS.powderBlue,
        },
    
        textHeader: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
        },
    
        camera: {
            flex: 1,
        },
    
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.black,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            padding: 30,
        },
    
        button: {
            alignSelf: 'center',
            backgroundColor: 'transparent',
            verticalAlign: 'middle',
        },
    
        text: {
            fontSize: 16,
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            padding: 6,
        },
    
        previewView: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },
    
        btnWrapper: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
        },
    
        doneBtn: {
            width: 170,
            margin: 10,
            backgroundColor: COLORS.green,
            alignItems: 'center',
            paddingHorizontal: 17,
            paddingVertical: 10,
            borderRadius: 50,
        },
    
        deleteBtn: {
            width: 170,
            margin: 10,
            borderColor: COLORS.red,
            borderWidth: 2,
            alignItems: 'center',
            paddingHorizontal: 17,
            paddingVertical: 10,
            borderRadius: 50,
        },
    
        textBtn: {
            width: 200,
            fontFamily: 'Inter_600SemiBold',
            textAlign: 'center',
            fontSize: 17,
        },
    },
    
})