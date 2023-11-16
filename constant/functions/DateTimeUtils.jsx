import moment from "moment";


export const DateTimeUtils = {
    getCurrMonth: () => moment().format('MMMM'),
    getCurrYear: () => moment().format('YYYY'),
    defaultDateFormat: () => moment().format('YYYYMMDD'),
    converDateFormat: (date) => moment(date, 'MMMM DD, YYYY').format('YYYYMMDD'),

    timeConvert: (time) => moment(time, 'HH:mm:ss').format('hh:mm A'),
    timeDefaultConvert: (time) => moment(time).format('HH:mm:ss'),

    dateMonthDayConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD'),
    dateDayYearConvert: (date) => moment(date, 'YYYYMMDD').format('DD, YYYY'),
    dateHalfMonthConvert: (date) => moment(date, 'YYYYMMDD').format('MMM DD, YYYY'),
    dateHalfConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD'),
    dateFullConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD, YYYY'),
}