// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import moment from "moment";

export const DateTimeUtils = {
    currDate: () => new Date(),
    momentCurrDate: () => moment(),
    momentCurrTime: () => moment().format('HH:mm'),
    momentCurrDateWithExtra : () => moment().format('MMMM D, YYYY, dddd'),
    momentCurrDateFormat: () => moment().format('MMMM DD, YYYY'),
    getDashDate: (date) => moment(date, 'YYYYMMDD').format('MMM-DD-YYYY'),
    getDashDateReverse: (date) => moment(date, 'YYYYMMDD').format('YYYY-MM-DD'),
    getHalfDateWithExtra: (date) => moment(date, 'YYYYMMDD').format('MMM DD, ddd'),
    getCurrMonth: () => moment().format('MMMM'),
    getCurrYear: () => moment().format('YYYY'),
    setDefaultDateFormat: (date) => moment(date).format('YYYYMMDD'),
    defaultDateFormat: () => moment().format('YYYYMMDD'),
    dashDateFormat: () => moment().format('YYYY-MM-DD'),
    dashToDefaultFormat: (date) => moment(date, 'YYYY-MM-DD').format('YYYYMMDD'),
    converDateFormat: (date) => moment(date, 'MMMM DD, YYYY').format('YYYYMMDD'),

    timeConvert: (time) => moment(time, 'HH:mm:ss').format('hh:mm A'),
    timeConvertWithSeconds: (time) => moment(time, 'HH:mm:ss').format('hh:mm:ss A'),
    timeDefaultConvert: (time) => moment(time).format('HH:mm:ss'),

    dateMonthDayConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD'),
    dateDayYearConvert: (date) => moment(date, 'YYYYMMDD').format('DD, YYYY'),
    dateHalfMonthConvert: (date) => moment(date, 'YYYYMMDD').format('MMM DD, YYYY'),
    dateHalfConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD'),
    dateFullConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD, YYYY'),

    subtractDashCurrDate: (date) => moment(date, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD'),
    addDashCurrDate: (date) => moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD'),

    dateSecondHalfRange: (date) => {
        const startDate = moment(date, 'YYYYMMDD')
            .subtract(1, 'months')
            .date(16)
            .startOf('day')

        const endDate = moment(date, 'YYYYMMDD')
            .subtract(1, 'months')
            .endOf('month')
            .endOf('day')

        return {
            startDate: startDate.format('YYYYMMDD'),
            endDate: endDate.format('YYYYMMDD'),
        }
    },
    
    dateFirstHalfRange: (date) => {
        const startDate = moment(date, 'YYYYMMDD').date(1).startOf('day')
        const endDate = moment(date, 'YYYYMMDD').date(15).endOf('day')

        return {
            startDate: startDate.format('YYYYMMDD'),
            endDate: endDate.format('YYYYMMDD'),
        }
    },

    checkDateHalf: (date) => {
        const currentDate = moment(date, 'YYYYMMDD')
        const isRange = currentDate.date() >= 1 && currentDate.date() <= 15
        return isRange
    }
}