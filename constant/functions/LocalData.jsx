import AsyncStorage from "@react-native-async-storage/async-storage";

import { DateTimeUtils } from "./DateTimeUtils";

export const LocalData = {
    insertCOS: (route) => AsyncStorage.getItem('COSData')
        .then((storedData) => {
            const existingData = JSON.parse(storedData) || [];

            const itemCount = existingData.length

            const newItem = {
                status: 'Filed',
                startDate: route.params.startDate,
                endDate: route.params.endDate,
                requestedSched: route.params.schedule,
                reason: route.params.reason,
                attachedFile: '-----',
                documentNo: `COS${itemCount + 1}`,
                filedDate: DateTimeUtils.defaultDateFormat(),
                statusBy: '',
                statusByDate: '',
                reviewedBy: '',
                reviewedDate: '',
            }

            existingData.push(newItem)
            const updatedDataString = JSON.stringify(existingData);

            return AsyncStorage.setItem('COSData', updatedDataString);
        })
        .then(() => {})
        .catch((error) => {}),

    insertOB: (route) => AsyncStorage.getItem('OBData')
        .then((storedData) => {
            const existingData = JSON.parse(storedData) || [];

            const itemCount = existingData.length

            const newItem = {
                status: 'Filed',
                officialWorkDate: route.params.OBDate,
                location: route.params.location,
                officialWorkTime: `${route.params.timeIn} to ${route.params.timeOut}`,
                reason: route.params.reason,
                attachedFile: '-----',
                documentNo: `OB${itemCount + 1}`,
                filedDate: DateTimeUtils.defaultDateFormat(),
                statusBy: '',
                statusByDate: '',
                reviewedBy: '',
                reviewedDate: '',
            }

            existingData.push(newItem)
            const updatedDataString = JSON.stringify(existingData);

            return AsyncStorage.setItem('OBData', updatedDataString);
        })
        .then(() => {})
        .catch((error) => {}),

    insertOT: (route) => AsyncStorage.getItem('OTData')
        .then((storedData) => {
            const existingData = JSON.parse(storedData) || [];

            const itemCount = existingData.length

            const newItem = {
                status: 'Filed',
                overtimeDate: route.params.OBDate,
                overtimeHours: `${route.params.timeIn} to ${route.params.timeOut}`,
                reason: route.params.reason,
                attachedFile: '-----',
                documentNo: `OT${itemCount + 1}`,
                filedDate: DateTimeUtils.defaultDateFormat(),
                statusBy: '',
                statusByDate: '',
                reviewedBy: '',
                reviewedDate: '',
            }

            existingData.push(newItem)
            const updatedDataString = JSON.stringify(existingData);

            return AsyncStorage.setItem('OBData', updatedDataString);
        })
        .then(() => {})
        .catch((error) => {})
}