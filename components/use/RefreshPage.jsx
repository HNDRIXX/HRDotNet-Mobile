import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { COLORS } from '../../constant'

export default function RefreshPage ({ setRestart, refreshing, onRefresh }) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      
      contentContainerStyle={{
        flexGrow: 1,
      }}

      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#007AFF']}
        />
      }
    >
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={COLORS.powderBlue} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    button: {
        backgroundColor: COLORS.orange, borderRadius: 10, 
        paddingHorizontal: 30, 
        paddingVertical: 5, 
        marginTop: 20, 
        flexDirection: 'row',
    },

    textButton: {
        fontFamily: 'Inter_600SemiBold', 
        fontSize: 17, 
        marginLeft: 10,
        color: COLORS.clearWhite
    },
})