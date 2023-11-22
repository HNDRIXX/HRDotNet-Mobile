import moment from "moment";


export const DateTimeUtils = {
    currDate: () => new Date(),
    momentCurrDate: () => moment(),
    momentDashCurrDate: () => moment().format('MMM-DD-YYYY'),
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