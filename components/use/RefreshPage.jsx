// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { COLORS, COMPONENT_STYLES } from '../../constant'

export default function RefreshPage({ setRestart, refreshing, onRefresh, text }) {
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

        { text && (
          <Animatable.View
              animation={'fadeIn'}
              duration={500}
              delay={5000}
          >
            <Text style={styles.text}>{text}</Text>
          </Animatable.View>
        )}
      </View>
    </ScrollView>
  )
}