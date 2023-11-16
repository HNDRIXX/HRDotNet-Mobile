import moment from "moment"

import { DateTimeUtils } from "./DateTimeUtils"

export const RequestUtils = {
    requestDateApplied: (item) => {
        if (moment(item.startDate, 'YYYYMMDD').isSame(moment(item.endDate, 'YYYYMMDD'), 'day')) {
            return DateTimeUtils.dateFullConvert(item.startDate)
        } else {
            return (`${DateTimeUtils.dateMonthDayConvert(item.startDate)} - ${DateTimeUtils.dateDayYearConvert(item.endDate)}`)
        }
    }
}

