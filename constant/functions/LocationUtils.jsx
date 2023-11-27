import { DateTimeUtils } from "./DateTimeUtils";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

const deg2rad = (deg) => deg * (Math.PI / 180)

export const LocationUtils = {
    locationPermissionEnabled: async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          // Permission denied, request again
          await LocationUtils.locationPermissionEnabled()
          return
        }
    },

    locationEnabled: async () => {
        const isLocationEnabled = await Location.hasServicesEnabledAsync();
    
        if (!isLocationEnabled) {
          const askEnableLocation = await Location.enableNetworkProviderAsync();
          if (!askEnableLocation) {
            await LocationUtils.locationEnabled()
            return;
          }
        }
    },

    officialWorkLocation: async (location, setLocation) => {
        try {
            const isLocationEnabled = await Location.hasServicesEnabledAsync()
        
            if (!isLocationEnabled) {
                const askEnableLocation = await Location.enableNetworkProviderAsync()
                
                if (!askEnableLocation) {
                    await LocationUtils.officialWorkLocation()
                    return
                }
            }
            
            const { coords } = await Location.getCurrentPositionAsync({})
            setLocation(`${coords.latitude.toString()}, ${coords.longitude.toString()}`)
            setProceed(true)
          } catch (error) {
          }
    },

    openLocation: async () => {
        try {
            const askEnableLocation = await Location.enableNetworkProviderAsync()
        
            if (!isLocationEnabled) {
                setProceed(false)
                const askEnableLocation = await Location.enableNetworkProviderAsync()
                
                if (!askEnableLocation) {
                    await LocationUtils.officialWorkLocation()
                    return
                }
            }
            
            // const { coords } = await Location.getCurrentPositionAsync({})
            // setLocation(`${coords.latitude.toString()}, ${coords.longitude.toString()}`)
            // setProceed(true)
            } catch (error) {
            console.error('Error getting location:', error);
            }
    },

    calculationDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371 // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1)
        const dLon = deg2rad(lon2 - lon1)
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c * 1000 // Distance in meters
        return distance
        
    }
}