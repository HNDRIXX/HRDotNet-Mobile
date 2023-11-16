import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';

import { COLORS } from '../theme';

const currentDate = moment()
const firstDayOfMonth = moment().startOf('month')
const fifteenthDayOfMonth = moment().date(15)

const lastDayOfMonth = moment().endOf('month')
const sixteenthDayOfMonth = moment().date(15)

export const Utils = {
    statusIcon: (status) => {
        return status === "Filed" ? (
            <FontAwesome5 
                name="file-import" 
                size={17} 
                color={COLORS.clearWhite}
                style={{ marginRight: 10 }}
            />
        ) : status == "Reviewed" ? (
            <MaterialCommunityIcons 
                name="file-find" 
                size={20} 
                color={COLORS.clearWhite} 
                style={{ marginRight: 10 }}
            />
        ) : status == "Approved" ? (
            <AntDesign
                name="checkcircle"
                size={17}
                color={COLORS.clearWhite}
                style={{ marginRight: 10 }}
            />
        ) : status == "Cancelled" ? (
            <Entypo
                name="circle-with-cross"
                size={19}
                color={COLORS.clearWhite}
                style={{ marginRight: 10 }}
            /> 
        ) : null
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
                        Alert.alert('File Too Large', 'Please select a file with a size of 5MB or less.')
                    } else {
                        Alert.alert('Unsupported File Format', 'Please select a docx, pdf, jpeg, jpg, or txt file.')
                    }
                }
            }
        } catch (error) {
            console.error('Error picking document:', error)
        }
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
        } catch (error) {
            //   console.error("Error fetching location and address:", error)
        } 
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
        } else { Utils.fetchDataLoc(setIsLoading, setLocation, setMapRegion, setCurrAddress) } 
    
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