import React from "react"
import moment from "moment"

import { DateTimeUtils } from "./DateTimeUtils"

export const ApprovalsUtils = {
    sortByDateAsync: async (data) => {
        return new Promise((resolve) => {
            const reviewedData = data.filter((item) => item.status === "Reviewed")

            const sorted = reviewedData.sort((a, b) => {
                const dateA = moment(a.date, "YYYYMMDD")
                const dateB = moment(b.date, "YYYYMMDD")
                return dateB - dateA
            })

            resolve(sorted)
        })
    },


    onFilterData: (indexPanel, sortedData, filterText, setFilteredData, filteredData) => {
        const formattedDateKey = indexPanel === 0 ? 'COSDate' :
            indexPanel === 1 ? 'officialWorkDate' :
            indexPanel === 2 ? 'overtimeDate' :
            indexPanel === 3 ? 'overtimeDate' :
            indexPanel === 4 ? 'startDate' :
            indexPanel === 5 ? 'missedLogDate'
            : null

        const filtered = sortedData.filter(item => {
            const formattedDate = formattedDateKey && DateTimeUtils.dateFullConvert(item[formattedDateKey])

            const textMatches = [
                formattedDate?.toLowerCase().includes(filterText.toLowerCase()),
                item.employeeName.toLowerCase().includes(filterText.toLowerCase()),
                indexPanel === 0 && item.requestedSched.toLowerCase().includes(filterText.toLowerCase()),
                indexPanel === 1 && item.location.toLowerCase().includes(filterText.toLowerCase()),
                indexPanel === 2 && item.overtimeHours.toLowerCase().includes(filterText.toLowerCase()),
                indexPanel === 3 && item.overtimeHours.toLowerCase().includes(filterText.toLowerCase()),
                indexPanel === 4 && item.reason.toLowerCase().includes(filterText.toLowerCase()),
                indexPanel === 5 && item.logType.toLowerCase().includes(filterText.toLowerCase()),
            ]

            return textMatches.some(Boolean)
        })

        setFilteredData(filtered)
    },


    onCheckboxValueChange: (filteredData, value, index, setSelectAll, setFilteredData) => {
        setSelectAll(false)
        const updatedData = [...filteredData]
        updatedData[index].isChecked = value
        setFilteredData(updatedData)
    },

    toggleSelectAll: (filteredData, setFilteredData, selectAll, setSelectAll, setSortedData) => {
        const updatedData = filteredData.map(item => ({ ...item, isChecked: !selectAll }))
        setFilteredData(updatedData)
        setSortedData(updatedData)
        setSelectAll(!selectAll)
    },
}