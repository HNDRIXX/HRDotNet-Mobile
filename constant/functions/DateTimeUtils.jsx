import moment from "moment";


export const DateTimeUtils = {
    getCurrMonth: () => moment().format('MMMM'),
    timeConvert: (time) => moment(time, 'HH:mm:ss').format('hh:mm A'),
    dateHalfConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD'),
    dateFullConvert: (date) => moment(date, 'YYYYMMDD').format('MMMM DD, YYYY')
}