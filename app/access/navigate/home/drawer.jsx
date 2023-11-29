import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import { COLORS, ICONS, STYLES} from "../../../../constant";

export default function DrawerPage ({ navigation }) {
    const styles = STYLES.Drawer
    
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
                    <TouchableOpacity style={styles.button} >
                 
                        <Image 
                            style={{ height: 30, width: 30 }}
                            uri={ICONS.privacy}
                        />

                        <Text style={styles.textButton}>Privacy Policy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} >
                        <Image 
                            style={{ height: 30, width: 30 }}
                            uri={ICONS.terms}
                        />
                    
                        <Text style={styles.textButton}>Terms and Conditions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} >
                        <Image 
                            style={{ height: 30, width: 30 }} 
                            uri={ICONS.info}
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