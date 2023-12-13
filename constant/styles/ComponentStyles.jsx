import { Dimensions, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../Theme";

const paddingIOS = Platform.OS === "ios"

export const COMPONENT_STYLES = StyleSheet.create({
    // Button Component
    MenuButton: {
        container: {
            flex: 1,
            marginHorizontal: 15
        },

        buttonWrapper: {
            flexDirection: 'row',
        },

        buttonContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },

        gridButton: {
            borderRadius: 10,
            backgroundColor: COLORS.clearWhite,
            alignItems: 'center',
            justifyContent: 'center',

            elevation: 5.5,
            shadowColor: COLORS.darkGray,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: { width: 1, height: 5 },
        },

        textButton: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.black,
            paddingTop: 5.5,
            fontSize: 12,
            textAlign: 'center'
        },

        partitionWrapper: {
            marginHorizontal: 4,
            marginVertical: 10,
        },

        textPartition: {
            fontFamily: 'DMSans_500Medium',
            color: COLORS.darkGray,
        },

        iconRow: {
            color: COLORS.clearWhite,
        },

        rowButton: {
            flex: 1,
            backgroundColor: COLORS.orange,
            padding: 25.5,
            borderRadius: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
        },

        buttonTextWrapper: {
            paddingLeft: 10,
            paddingTop: 5.5,
        }
    },

    TimeOff: {
        container: {
            flex: 1,
            // height: 150,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginHorizontal: 30,
            marginBottom: 10,
        },

        button: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
            marginHorizontal: 6,
            flexDirection: 'row',
            borderRadius: 20,
            justifyContent: 'center',

            elevation: 3,
            shadowColor: COLORS.black,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: { width: 1, height: 5 },

        },

        textWrapper: {
            color: COLORS.black,
            fontFamily: 'Inter_600SemiBold',
        },

        alignWrapper: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
        },

        totalText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 20,
            textAlign: 'center'
        },

        title: {
            color: COLORS.black,
            fontSize: 12,
            lineHeight: 14,
            textAlign: 'center',
            fontFamily: 'Inter_500Medium',
        },
    },

    // Header Component
    NavigationHeader: {
        container: {
            alignItems: 'center',
            backgroundColor: COLORS.powderBlue,
        },

        text: {
            padding: 12,
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
        },
    },

    PagesHeader: {
        backButton: {
            paddingHorizontal: 17,
            paddingVertical: 3,
            marginTop: 5
        },

        topHeader: {
            paddingBottom: 10,
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
            marginRight: 60,
        },
    },

    // Items Component 
    // Home Items Component 
    ApprovalsItem: {
        container: {
            flex: 1,
            paddingHorizontal: 7,
            paddingLeft: 16,
            paddingVertical: 10,
        },

        itemView: {
        },

        rowView: {
            flexDirection: 'row',
        },

        rowSpaceView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },

        boldText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16
        },

        regularText: {
            fontFamily: 'Inter_400Regular',
            fontSize: 14
        }
    },

    LoanLedgerItem: (item) => ({
        itemContainer: {
            backgroundColor: COLORS.clearWhite,
            marginBottom: 25,
            borderRadius: 40,
        },

        itemWrapper: {
            width: '100%',
            backgroundColor: COLORS.clearWhite,
            borderRadius: 20,
        },

        dateRowWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor:
                item.status == "Approved" ? COLORS.green :
                    item.status == "Reviewed" ? COLORS.purple :
                        item.status == "Filed" ? COLORS.filed :
                            item.status == "Cancelled" ? COLORS.red
                                : COLORS.orange
            ,
            paddingHorizontal: 20,
        },

        rowWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        currDateText: {
            fontFamily: 'Inter_600SemiBold',
            color: COLORS.clearWhite,
        },

        statusText: {
            fontFamily: 'Inter_600SemiBold',
            color: COLORS.clearWhite,
        },

        bodyWrapper: {
            paddingHorizontal: 15,
            paddingVertical: 10,
        },

        reasonWrapper: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },

        boldText: {
            fontFamily: 'Inter_600SemiBold'
        },

        valueText: {
            fontFamily: 'Inter_400Regular',
        },

        moreText: {
            fontSize: 13,
            paddingBottom: 2,
        },

        moreButton: {
            flexDirection: 'row',
            alignItems: 'center',
        }
    }),

    NotificationsItem: (item) => ({
        contentTitle: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 14,
        },

        contentDate: {
            fontFamily: 'Inter_400Regular',
            color: COLORS.darkGray,
            fontSize: 12,
        },

        innerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 5,
        },

        contentWrapper: {
            width: item.isReaded ? '100%' : '95%',
            paddingHorizontal: 20,
            paddingRight: 40,
            flexDirection: 'column'
        },

        topContentWrapper: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },

        bodyContentWrapper: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },

        description: {
            width: '80%',
            color: COLORS.darkGray,
            fontSize: 13,
        },

        dashLine: {
            paddingVertical: 15,
        }
    }),

    PendingItem: (index, lastIndex) => ({
        itemContainer: {
            backgroundColor: COLORS.clearWhite,
            justifyContent: 'center',
            alignSelf: 'center',
            width: '90%',

            borderTopLeftRadius: index == 0 ? 20 : 0,
            borderTopRightRadius: index == 0 ? 20 : 0,
            borderBottomLeftRadius: lastIndex == index ? 20 : 0,
            borderBottomRightRadius: lastIndex == index ? 20 : 0,

            paddingTop: index == 0 ? 5 : 0,
            paddingBottom: lastIndex == index ? 5 : 0,

            borderBottomColor: COLORS.darkGray,
            borderBottomWidth: lastIndex != index ? 1.5 : 0,
        },

        itemWrapper: {
            width: '100%',
            padding: 7,

            borderTopLeftRadius: index == 0 ? 20 : 0,
            borderTopRightRadius: index == 0 ? 20 : 0,
            borderBottomLeftRadius: lastIndex == index ? 20 : 0,
            borderBottomRightRadius: lastIndex == index ? 20 : 0,
        },


        dateRowWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.clearWhite,
            paddingHorizontal: 20,
        },

        rowWrapper: {
            flexDirection: 'row',
            marginLeft: 20,
            alignItems: 'center',
        },

        currDateText: {
            fontFamily: 'Inter_500Medium',
            fontSize: 13,
        },

        statusText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 17,
            color: COLORS.black,
        },

        bodyWrapper: {
            paddingHorizontal: 15,
            paddingVertical: 10,
        },

        reasonWrapper: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },

        boldText: {
            fontFamily: 'Inter_500Medium',
            fontSize: 13,
            color: COLORS.darkGray,
        },

        valueText: {
            fontFamily: 'Inter_400Regular',
            fontSize: 13,
            color: COLORS.darkGray,
        },
    }),

    TeamsContactsItem: {
        shadowView: {
            width: '100%',
            backgroundColor: COLORS.clearWhite,
            padding: 15,
            borderRadius: 20,

            flexDirection: 'row',
            alignItems: 'center',
        },

        buttonView: {
            backgroundColor: COLORS.clearWhite,
            marginVertical: 10,
            marginHorizontal: 5,
            borderRadius: 20,
        },

        disabledButton: {
            opacity: 0.4
        },

        boldText: {
            fontFamily: 'Inter_600SemiBold'
        },

        regularText: {
            fontFamily: 'Inter_400Regular'
        },

        italicText: {
            fontStyle: 'italic',
            color: COLORS.darkGray,
        },

        userProfile: {
            width: 50,
            height: 50,
            borderRadius: 90,
            marginRight: 20,
        },
    },

    TimeOffItem: {
        shadowView: {
            width: '100%',
            backgroundColor: COLORS.clearWhite,
            borderRadius: 20,
        },

        itemWrapper: {
            backgroundColor: COLORS.clearWhite,
            margin: 10,
            borderRadius: 20,
            marginHorizontal: 20,
        },

        itemHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.tr_gray,
            padding: 10,
            paddingHorizontal: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        },

        itemHeaderText: {
            color: COLORS.clearWhite,
            fontFamily: 'Inter_700Bold',
        },

        itemBody: {
            padding: 15,
        },

        bodyText: {
            fontFamily: 'Inter_600SemiBold',
        },

        itemText: {
            fontFamily: 'Inter_400Regular'
        }
    },

    // Profile Items Component
    PayHistoryItem: {
        container: {
            marginTop: 3,
            marginBottom: 10,
            marginHorizontal: 4,
            borderRadius: 10,
            backgroundColor: COLORS.clearWhite
        },

        amountText: {
            fontStyle: 'italic',
            fontSize: 14,
        },

        boldText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 12.5,
            color: COLORS.darkGray
        },

        regularText: {
            fontFamily: 'Inter_400Regular',
            fontSize: 12.5,
        },

        shadowItem: {
            backgroundColor: COLORS.clearWhite,
            width: '100%',
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        moreButtonText: {
            fontFamily: 'Inter_400Regular',
            fontSize: 11,
            paddingTop: 1,
        },

        row: {
            flexDirection: 'row',
        },
    },

    RecentPayItem: {
        topView: {
            backgroundColor: COLORS.clearWhite,
            borderRadius: 20,
        },

        shadowView: {
            backgroundColor: COLORS.clearWhite,
            width: '100%',
            paddingRight: 15,
            paddingLeft: 15,
            paddingBottom: 20,
            paddingTop: 15,
            borderRadius: 20,
        },

        row: {
            flexDirection: 'row',
        },

        rowView: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        recentPayText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
        },

        netpayView: {
            flexDirection: 'row',
            marginLeft: 20,
        },

        netpayText: {
            fontFamily: 'Inter_600SemiBold',
            marginRight: 62,
        },

        netpayValue: {
            fontFamily: 'Inter_600SemiBold'
        },

        grosspayView: {
            flexDirection: 'row',
            marginLeft: 35,
        },

        grosspayText: {
            marginRight: 75,
            fontStyle: 'italic',
            fontSize: 14,
        },

        amountText: {
            fontStyle: 'italic',
        },

        deductionsText: {
            marginRight: 75,
            fontStyle: 'italic',
            fontSize: 14,
        },

        deductionsView: {
            flexDirection: 'row',
            marginLeft: 36,
        },

        moreText: {
            fontFamily: 'Inter_400Regular',
            fontSize: 12,
            paddingTop: 1,
        },

        topMoreButton: {
            alignItems: 'baseline',
            alignSelf: 'baseline',
            position: 'absolute',
            bottom: -3,
            right: 0,
        },
    },

    RequestItem: (newItem) => ({
        itemContainer: {
            backgroundColor: COLORS.clearWhite,
            marginHorizontal: 20,
            marginBottom: 25,
            borderRadius: 20,
        },

        itemWrapper: {
            width: '100%',
            backgroundColor: COLORS.clearWhite,
            borderRadius: 20,
        },

        dateRowWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor:
                newItem.status == "Approved" ? COLORS.green :
                    newItem.status == "Reviewed" ? COLORS.purple :
                        newItem.status == "Filed" ? COLORS.filed :
                            newItem.status == "Cancelled" ? COLORS.red
                                : COLORS.orange
            ,
            paddingHorizontal: 20,
        },

        rowWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        currDateText: {
            fontFamily: 'Inter_600SemiBold',
            color: COLORS.clearWhite,
        },

        statusText: {
            fontFamily: 'Inter_600SemiBold',
            color: COLORS.clearWhite,
        },

        bodyWrapper: {
            paddingHorizontal: 15,
            paddingVertical: 10,
        },

        reasonWrapper: {
            justifyContent: 'space-between',
            flexDirection: 'row',
        },

        boldText: {
            fontFamily: 'Inter_600SemiBold'
        },

        valueText: {
            fontFamily: 'Inter_400Regular',
        },

        moreText: {
            fontSize: 13,
            paddingBottom: 2,
        },

        moreButton: {
            flexDirection: 'row',
            alignItems: 'center',
        }
    }),

    // Loader Component
    Loader: {
        loading: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
        },
    },

    // Note Component
    CalendarNote: {
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50,
        },

        text: {
            fontFamily: 'Inter_400Regular',
            color: COLORS.tr_gray,
            paddingTop: 20
        }
    },

    FileAttachedNote: {
        container: {
            flex: 1,
        },

        fileNote: {
            fontStyle: 'italic',
            fontSize: 13,
            marginHorizontal: 20,
            marginVertical: 10,
        },

        fileError: {
            fontSize: 13,
            paddingHorizontal: 20,
            paddingVertical: 5,
            color: COLORS.red,
            fontStyle: 'italic',
        },
    },

    NothingFoundNote: {
        container: {
            margin: 40,
            alignItems: 'center',
            justifyContent: 'center'
        },

        text: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.tr_gray
        }
    },

    // Panel Components

    // Home Panel 
    // Approvals Panel
    PanelApprovals: {
        container: {
            opacity: 1,
            flex: 1,
            backgroundColor: COLORS.clearWhite,
            marginHorizontal: 20
        },

        bodyContainer: {
            flex: 1,
        },

        itemView: {
            marginTop: 20,
        },

        itemStatusText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.darkGray,
            padding: 10,
            fontSize: 18,
            marginHorizontal: 15
        },

        rowView: {
            flexDirection: 'row',
            borderBottomColor: COLORS.darkGray,
            borderBottomWidth: 1.5
        },

        checkBox: {
            marginTop: 15,
            borderColor: COLORS.orange,
            borderWidth: 2
        },
    },

    // Profile Panel
    Payslip: {
        animatedView: {
            backgroundColor: COLORS.clearWhite,
            opacity: 1,
            flex: 1,
            paddingHorizontal: 20,
        },

        payHistoryTitle: {
            fontFamily: 'Inter_600SemiBold',
            marginHorizontal: 3,
            fontSize: 16,
            marginVertical: 13,
        },
    },

    Personal: {
        topView: {
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
        },

        imageView: {
            borderRadius: 90,
            borderWidth: 7,
            marginBottom: 10,
            borderColor: COLORS.white,
        },

        bodyView: {
            backgroundColor: COLORS.clearWhite,
            width: '100%',
            height: '85%',
            position: 'absolute',
            bottom: 0,
            zIndex: -1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        },

        profilePic: {
            width: 160,
            height: 160,
            borderRadius: 80,
        },

        nameText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 27,
            color: COLORS.orange
        },

        subText: {
            fontFamily: 'Inter_500Medium',
            fontSize: 15,
        },

        infoView: {
            marginHorizontal: 20,
            marginBottom: 30,
            flexGrow: 0,
        },

        titleText: {
            fontFamily: 'Inter_400Regular',
            marginHorizontal: 15,
            marginVertical: 8,
        },

        contentText: {
            fontFamily: 'Inter_500Medium',
            fontSize: 13,
            borderColor: COLORS.darkGray,
            borderWidth: 2,
            padding: 10,
            borderRadius: 13,
            paddingLeft: 20,
        }
    },

    // Prompt Component
    // Approvals Prompt
    ConfirmationPrompt: {
        modalView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },

        modalWrapper: {
            backgroundColor: COLORS.clearWhite,
            padding: 30,
            borderRadius: 15,
            margin: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },

        rowView: {
            flexDirection: 'row',
            gap: 10
        },

        titleText: {
            fontFamily: 'Inter_700Bold',
            marginVertical: 10,
            fontSize: 19,
        },

        subTitleText: {
            fontSize: 14,
            textAlign: 'center',
            fontFamily: 'Inter_400Regular',
        },

        button: {
            backgroundColor: COLORS.orange,
            padding: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginTop: 20,
            width: 140,
        },

        buttonText: {
            textAlign: 'center',
            color: COLORS.clearWhite,
            fontFamily: 'Inter_800ExtraBold',
        },

        cancelButton: {
            backgroundColor: COLORS.clearWhite,
            borderWidth: 2,
            borderColor: COLORS.orange
        },

        cancelText: {
            color: COLORS.orange
        }
    },

    OverTimePrompt: {
        modalView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },

        modalWrapper: {
            backgroundColor: COLORS.clearWhite,
            padding: 30,
            borderRadius: 15,
            margin: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },

        titleText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 17,
            marginVertical: 10,
        },

        subTitleText: {
            fontSize: 13,
            textAlign: 'center',
            fontFamily: 'Inter_400Regular',
        },

        button: {
            backgroundColor: COLORS.orange,
            padding: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginTop: 20,
            width: 120,
        },

        cancelButton: {
            backgroundColor: COLORS.clearWhite,
            borderWidth: 1,
            borderColor: COLORS.orange,
        },

        buttonText: {
            textAlign: 'center',
            color: COLORS.clearWhite,
            fontFamily: 'Inter_800ExtraBold',
        },

        cancelText: {
            color: COLORS.orange,
        },

        rowView: {
            flexDirection: 'row',
            marginTop: 10,
            gap: 10,
        },

        dateTitle: {
            fontFamily: 'Inter_600SemiBold',
            paddingHorizontal: 48,
        },

        timeTitle: { fontFamily: 'Inter_600SemiBold' },

        listTitle: {
            flexDirection: 'row',
            gap: 0,
            marginTop: 20,
            marginBottom: 10,
            justifyContent: 'space-between',
        },

        listTimeTitle: {
            flexDirection: 'row',
            gap: 22,
        },

        listView: {
            height: 140,
            alignItems: 'center',
            justifyContent: 'center',
        },

        itemView: {
            flexDirection: 'row',
            paddingVertical: 5,
        },

        itemText: {
            paddingHorizontal: 10,
        }
    },

    SuccessPrompt: {
        modalView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },

        modalWrapper: {
            backgroundColor: COLORS.clearWhite,
            padding: 30,
            borderRadius: 15,
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center'
        },

        titleText: {
            fontFamily: 'Inter_700Bold',
            marginVertical: 10,
            fontSize: 19,
        },

        subTitleText: {
            fontSize: 13,
            textAlign: 'center',
            fontFamily: 'Inter_400Regular',
        },

        button: {
            backgroundColor: COLORS.orange,
            padding: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginTop: 20,
            width: 200,
        },

        buttonText: {
            textAlign: 'center',
            color: COLORS.clearWhite,
            fontFamily: 'Inter_800ExtraBold',
        }
    },

    SuccessTimeClock: {
        modalView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },

        modalWrapper: {
            backgroundColor: COLORS.clearWhite,
            width: '90%',
            padding: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center'
        },

        titleText: {
            color: COLORS.darkGray,
            fontFamily: 'Inter_700Bold',
            fontSize: 15,
        },

        clockedDate: {
            fontSize: 14,
            fontFamily: 'Inter_400Regular',
            marginTop: 20,
        },

        clockedTime: {
            fontSize: 20,
            fontFamily: 'Inter_700Bold',
        },

        subText: {
            fontSize: 14,
            marginTop: 20,
            textAlign: 'center',
            fontFamily: 'Inter_400Regular',
            marginHorizontal: 10
        },

        button: {
            backgroundColor: COLORS.orange,
            padding: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginTop: 20,
            width: 200,
        },

        buttonText: {
            textAlign: 'center',
            color: COLORS.clearWhite,
            fontFamily: 'Inter_800ExtraBold',
        }
    },

    // Section Component

    // Calendar Section
    CalendarEvent: {
        container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 10,
            paddingVertical: 40,
            width: '100%',
            height: 300,
            shadowColor: COLORS.darkGray,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: { width: 1, height: 5 },
            backgroundColor: COLORS.clearWhite,
        },

        topView: {
            paddingHorizontal: 20,
            paddingBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        dayStatus: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
        },

        selectedDayText: {
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'Inter_400Regular',
        },

        selectedEvent: {
            paddingHorizontal: 20,
            paddingBottom: 10,
            backgroundColor: COLORS.clearWhite,
        },

        topCircle: {
            position: 'absolute',
            zIndex: 99,
            marginLeft: -1,
        },


        dayBelowEvent: {
            fontSize: 13,
            fontFamily: 'Inter_400Regular'
        },

        dayEventText: {
            textAlign: 'center',
            paddingLeft: 10,
            fontSize: 16,
            fontFamily: 'Inter_500Medium',
        },

        dayContentWrapper: {
            paddingVertical: 10,
            borderBottomColor: COLORS.tr_gray,
            borderBottomWidth: 1.5,
        },

        dayContentText: {
            fontSize: 14,
            textAlign: 'center',
            fontFamily: 'Inter_500Medium',
        },

        dayBelowWrapper: {
            paddingHorizontal: 10,
            padding: 5,
        },

        rowWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        boldText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.black,
            fontWeight: '700',
            fontStyle: 'italic',
        },

        dateBelowText: {
            marginTop: 5,
            fontFamily: 'Inter_400Regular',
            color: COLORS.black,
            fontSize: 12,
        },

        noEventsText: {
            fontSize: 13,
            textAlign: 'center',
            color: COLORS.darkGray,
            fontFamily: 'Inter_400Regular',
        },

        selectedDayEvent: (color) => ({
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
            height: 35,
            paddingLeft: 40,
            borderRadius: 50,
            borderColor: color,
            borderColor: color ? COLORS.clearWhite : null,
            backgroundColor: COLORS.clearWhite,
            elevation: 5,
            // shadowColor: COLORS.darkGray,
            // shadowOpacity: 0.1,
            // shadowRadius: 2,
            // shadowOffset : { width: 1, height: 5},
        }),

        dayBelowEventWrapper: (color) => ({
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
            height: 25,
            paddingLeft: 40,
            borderRadius: 50,
            borderColor: color,
            borderWidth: 1,
            backgroundColor: COLORS.clearWhite,
        }),
    },

    // Home Section
    TimeClock: {
        topBox: {
            backgroundColor: COLORS.clearWhite,
            paddingVertical: 20,
            width: '87%',
            marginTop: -45,
            marginBottom: 5,
            borderRadius: 20,
            borderColor: COLORS.orange,
            borderWidth: 1.5,
        },

        linkButton: {
            alignSelf: 'center',
            marginTop: 10,
        },

        clockInButton: {
            backgroundColor: COLORS.orange,
            width: 170,
            borderRadius: 15,
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'center',
        },

        clockOutButton: {
            backgroundColor: COLORS.powderBlue,
            width: 170,
            borderRadius: 15,
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'center',
        },

        timeInOutText: {
            fontSize: 18,
            marginLeft: 5,
            color: COLORS.clearWhite,
            fontFamily: 'Inter_600SemiBold',
        },

        timeText: {
            fontFamily: 'Inter_700Bold',
            fontSize: 25,
            textAlign: 'center',
            color: COLORS.black,
        },

        dateText: {
            fontFamily: 'Inter_600SemiBold',
            color: COLORS.black,
            textAlign: 'center',
            fontSize: 13,
        },

        clockInOutText: {
            fontFamily: 'Inter_500Medium',
            color: COLORS.darkGray,
            fontSize: 13,
            textAlign: 'center'
        }
    },

    // Request Section
    TitleInput: {
        title: {
            fontFamily: 'Inter_600SemiBold',
            marginLeft: 15,
            marginRight: 8,
            marginBottom: 5,
        }
    },

    // Use Component
    ApprovalsAction: {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        rowView: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
        },

        button: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        disabled: {
            opacity: 0.30
        },

        regularText: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 17
        },

        boldText: {
            fontFamily: 'Inter_600SemiBold',
            marginLeft: 5,
            fontSize: 15
        },

        checkBox: {
            marginTop: 2,
            borderColor: COLORS.orange,
            borderWidth: 2,
        }
    },

    RefreshPage: {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },

        button: {
            backgroundColor: COLORS.orange, borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 5,
            marginTop: 20,
            flexDirection: 'row',
        },

        textButton: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 17,
            marginLeft: 10,
            color: COLORS.clearWhite
        },
    },

    Search: {
        topContainer: {
            width: "100%",
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: 'flex-start',
        },

        searchContainer: {
            flexDirection: "row",
            alignItems: 'center',
            marginLeft: -1,
        },

        searchValueText: (platformIOS) => ({
            backgroundColor: COLORS.clearWhite,
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            borderRadius: 15,
            width: 130,
            marginLeft: 10,
            paddingHorizontal: 10,
            paddingVertical: platformIOS ? 5 : 0
        }),
    },

    SearchAndNew: {
        topContainer: {
            width: "100%",
            // padding: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          },
        
          searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 4,
          },
        
          searchValueText: (platformIOS) => ({
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            borderRadius: 15,
            width: 130,
            paddingHorizontal: 10,
            paddingVertical: platformIOS ? 5 : 0
          }),
        
          newRequestButton: {
            flexDirection: "row",
            alignItems: "center",
            marginRight: 5 
          },
        
          newRequestText: {
            fontFamily: "Inter_500Medium",
            fontSize: 15,
            marginStart: 5,
            color: COLORS.darkGray,
          },
    },
})