// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import * as Location from 'expo-location';

const deg2rad = (deg) => deg * (Math.PI / 180)

export const LocationUtils = {
    locationPermissionEnabled: async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          return LocationUtils.locationPermissionEnabled()
        }
    },

    locationEnabled: async () => {
        const isLocationEnabled = await Location.hasServicesEnabledAsync();
    
        if (!isLocationEnabled) {
            const askEnableLocation = await Location.enableNetworkProviderAsync()
            if (!askEnableLocation) {
                return LocationUtils.locationEnabled()
            }
        }
    },

    officialWorkLocation: async (location, setLocation) => {
        Location.hasServicesEnabledAsync()
            .then((isLocationEnabled) => {
                if (!isLocationEnabled) {
                    return Location.enableNetworkProviderAsync()
                } else {
                    return Location.getCurrentPositionAsync({})
                }
            })
            .then((result) => {
                if (!result) {
                    return LocationUtils.officialWorkLocation()
                } else {
                    const { coords } = result
                    return Location.reverseGeocodeAsync({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    })
                }
            })
            .then((geocodeLocation) => {
                if (geocodeLocation) {
                    const currAddress = geocodeLocation[0]
                    setLocation(
                        `${currAddress?.name} ${currAddress?.street}, ${currAddress?.city}, ${currAddress?.country}`
                    )
                }
            })
            .catch((error) => {})
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