// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'

import { COLORS, COMPONENT_STYLES } from '../../constant'

export default function RefreshPage({ setRestart, refreshing, onRefresh }) {
  const styles = COMPONENT_STYLES.RefreshPage

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