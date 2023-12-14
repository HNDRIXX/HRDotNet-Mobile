// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import moment from "moment"

import { DateTimeUtils } from "./DateTimeUtils"

export const RequestUtils = {
    requestDateApplied: (item) => {
        if (moment(item.startDate, 'YYYYMMDD').isSame(moment(item.endDate, 'YYYYMMDD'), 'day')) {
            return DateTimeUtils.dateFullConvert(item.startDate)
        } else {
            return (`${DateTimeUtils.dateMonthDayConvert(item.startDate)} - ${DateTimeUtils.dateDayYearConvert(item.endDate)}`)
        }
    },

    consoleLog: (date, setOBDate, setDatePicker) => {
        setOBDate("20231112")
    },

    checkSelectedDate: (date, setOBDate, setDatePicker) => {
        const currentDate = moment()
        const selectedDate = moment(date)

        if (DateTimeUtils.checkDateHalf(currentDate)) {
            if (selectedDate.isSameOrAfter(currentDate.date(16)) && selectedDate.isSameOrBefore(currentDate.endOf('month'))) {
                setOBDate(moment(date).format('YYYYMMDD'))
                setDatePicker(false)
            } else {
                alert('Please select a date between the 16th and the last day of the current month.')
                setDatePicker(false)
            }
        } else {
            if (selectedDate.isSameOrAfter(currentDate.startOf('month')) && selectedDate.isSameOrBefore(currentDate.date(15))) {
                setOBDate(moment(date).format('YYYYMMDD'))
                setDatePicker(false)
            } else {
                alert('Please select a date between the 1st and 15th day of the current month.');
                setDatePicker(false)
            }
        }
    }
}

