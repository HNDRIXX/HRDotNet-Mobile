// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';

import { COLORS } from '../Theme';
import { STRINGS } from '../Strings';

const currentDate = moment()
const firstDayOfMonth = moment().startOf('month')
const fifteenthDayOfMonth = moment().date(15)

const lastDayOfMonth = moment().endOf('month')
const sixteenthDayOfMonth = moment().date(15)

export const Utils = {
    leaveTypes: [
        'Bereavement Leave', 
        'Birthday Leave',
        'Emergency Leave',
        'Leave without Pay',
        'Magna Carta',
        'Maternity Leave',
        'Paternity Leave',
        'Sick Leave',
        'Single Parent Leave',
        'SSS Allocation Leave',
        'Vacation Leave'
    ],

    statusIcon: (status) => {
        const iconConfig = {
            Filed: { name: 'file-import', size: 17 },
            Reviewed: { name: 'file-find', size: 20 },
            Approved: { name: 'check', size: 17 },
            Cancelled: { name: 'circle-with-cross', size: 19 },
        }
      
        const icon = iconConfig[status]
        return icon ? (
            <FontAwesome5
                name={icon.name}
                size={icon.size}
                color={COLORS.clearWhite}
                style={{ marginRight: 10 }}
            />
        ) : null
    },    

    circledBulletColor: (valueColor) => {
        let color

        switch (valueColor) {
            case "Work Day":
                color = COLORS.green
                break
    
            case "Holiday":
                color = COLORS.red
                break
    
            case "Leave": 
                color = COLORS.filed
                break
          
            case "Rest Day": 
                color = COLORS.purple
                break
    
            default:
                color = COLORS.darkGray
        }
    
        return color
    },

    withinFirst: (filedDate) => {
        return moment(filedDate, 'YYYYMMDD').isBetween(firstDayOfMonth, fifteenthDayOfMonth, null, '[]');
    },

    withinSecond: (filedDate) => {
        return moment(filedDate, 'YYYYMMDD').isBetween(sixteenthDayOfMonth, lastDayOfMonth, null, '[]');
    },

    dataItemCount: (filteredData, setNewCount, setEarlierCount, isFirstHalf, isSecondHalf) => {
        let newCount = 0
        let earlierCount = 0

        filteredData.forEach((item) => {
            if (isFirstHalf) {
                const isBetweenFirstHalf = moment(item.filedDate, 'YYYYMMDD').isBetween(firstDayOfMonth, fifteenthDayOfMonth, null, '[]')
                newCount += isBetweenFirstHalf ? 1 : 0
                earlierCount += isBetweenFirstHalf ? 0 : 1
            }
              
            if (isSecondHalf) {
                const isBetweenSecondHalf = moment(item.filedDate, 'YYYYMMDD').isBetween(sixteenthDayOfMonth, lastDayOfMonth, null, '[]')
                newCount += isBetweenSecondHalf ? 1 : 0
                earlierCount += isBetweenSecondHalf ? 0 : 1
            }              
        })  

        setNewCount(newCount)
        setEarlierCount(earlierCount)
    },

    getHalf: (setFirstHalf, setSecondHalf) => {
        if (currentDate.isBetween(firstDayOfMonth, fifteenthDayOfMonth, null, '[]')) {
            setFirstHalf(true)
            setSecondHalf(false)    
        } else if (currentDate.isBetween(sixteenthDayOfMonth, lastDayOfMonth, null, '[]')) {
            setFirstHalf(false)
            setSecondHalf(true)
        }
    },

    amountFormat: (amount) => {
        const result = parseFloat(amount) || 0
        
        return result.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    },

    fileAttach: async ( setSelectedFile ) => {
        try {
            const result = await DocumentPicker.getDocumentAsync()

            if (!result.canceled){
                const fileInfo = result.assets[0]
                const uri = fileInfo.uri

                const fileExtension = uri.substring(uri.lastIndexOf('.') + 1).toLowerCase()
                const fileSizeInMB = fileInfo.size / (1024 * 1024)

                if (fileSizeInMB <= 25 && ['docx', 'pdf', 'jpeg', 'jpg', 'txt'].includes(fileExtension)) {
                    setSelectedFile(fileInfo.uri)
                } else {
                    if (fileSizeInMB > 25) {
                        Alert.alert(STRINGS.fileSizeError)
                    } else {
                        Alert.alert(STRINGS.fileFormatError)
                    }
                }
            }
        } catch (error) { }
    },

    fetchDataLoc: async ( setIsLoading, setLocation, setMapRegion, setCurrAddress ) => {
        
        try {
            setIsLoading(true)

            const location = await Location.getCurrentPositionAsync({})
            setLocation(location)
    
            const { coords } = location
            const address = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,
            })
    
            setMapRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.005,
            })
    
            const fullAddress = `${address[0].name} ${address[0].street}, ${address[0].city}, ${address[0].country}`
            setIsLoading(false)
            setCurrAddress(fullAddress)
        } catch (error) { } 
    },

    permissionLocation: async (setIsLoading, setLocation, setMapRegion, setCurrAddress) => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status != 'granted') {
            Linking.openSettings()
            
            // const openSettings = () => {
            //     Linking.openSettings()
            // }

            // Alert.alert(
            //     'Permission Required',
            //     'Please allow location permissions',
            //     [
            //     {
            //         text: 'OK',
            //         onPress: openSettings,
            //     },
            //     ]
            // )
        } else { 
            // Utils.fetchDataLoc(setIsLoading, setLocation, setMapRegion, setCurrAddress) 
        } 
    
        // try {
        //   const location = await Location.getCurrentPositionAsync({})
        // } catch (error) {
        //   console.log(error)
        // }
    }
}

// file:///var/mobile/Containers/Data/Application/8ED58F99-C645-4BEF-B8BC-DD3DD70BB7D8/Library/Caches/ExponentExperienceData/%2540hndrx022%252FHRDotNet-Mobile/Camera/1140FBBB-A338-4875-85B8-2AC10AD88A49.jpg

// file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540hndrx022%252FHRDotNet-Mobile/Camera/cf7772a8-acf3-45b5-9ef4-f64f81296336.jpg

// file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540hndrx022%252FHRDotNet-Mobile/Camera/1140FBBB-A338-4875-85B8-2AC10AD88A49.jpg