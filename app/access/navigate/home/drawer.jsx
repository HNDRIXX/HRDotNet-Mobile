// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign, } from "@expo/vector-icons";
import CachedImage from 'expo-cached-image'

import { COLORS, ICONS, STYLES} from "../../../../constant";

export default function DrawerPage ({ navigation }) {
    const styles = STYLES.Drawer

    const onHandlePress = (page) => {
        navigation.navigate(`${page}`)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.topHeader}>
                    <Text style={styles.textHeader}>HRDotNet</Text>

                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name='arrowright' size={30} color={COLORS.clearWhite} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={styles.button}>
                        <CachedImage
                            source={{ uri: ICONS.privacy }}
                            cacheKey={`privacy`}
                            placeholderContent={( 
                                <ActivityIndicator size={'small'} />
                            )} 
                            style={{ height: 30, width: 30 }} 
                        />

                        <Text style={styles.textButton}>Privacy Policy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} >
                        <CachedImage
                            source={{ uri: ICONS.terms }}
                            cacheKey={`condition`}
                            placeholderContent={( 
                                <ActivityIndicator size={'small'} />
                            )} 
                            style={{ height: 30, width: 30 }} 
                        />
                    
                        <Text style={styles.textButton}>Terms and Conditions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => onHandlePress('AboutUs')}
                    >
                        <CachedImage
                            source={{ uri: ICONS.info }}
                            cacheKey={`info`}
                            placeholderContent={( 
                                <ActivityIndicator size={'small'} />
                            )} 
                            style={{ height: 30, width: 30 }}
                        />
                        
                        <Text style={styles.textButton}>About Us</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => navigation.navigate('LogIn')}
                >
                    <Text style={styles.logOutText}>LOG-OUT</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}