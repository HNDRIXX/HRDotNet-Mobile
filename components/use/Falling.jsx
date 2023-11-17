import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const FallingEmoji = () => {
  const emojis = ['🚀', '🌟', '❤️', '😊', '🎉']; // Add more emojis if you like
  const emojiSize = 40;

  const emojisList = emojis.map((emoji, index) => ({
    emoji,
    translateY: new Animated.Value(-emojiSize),
    key: index,
  }));

  useEffect(() => {
    startContinuousFallingAnimation();
  }, []);

  const startContinuousFallingAnimation = () => {
    emojisList.forEach(({ translateY }, index) => {
      animateEmoji(translateY, index);
    });

    setInterval(() => {
      emojisList.forEach(({ translateY }, index) => {
        animateEmoji(translateY, index);
      });
    }, 2000); // Adjust the interval for continuous falling
  };

  const animateEmoji = (animatedValue, index) => {
    animatedValue.setValue(-emojiSize);
    Animated.timing(animatedValue, {
      toValue: SCREEN_HEIGHT + emojiSize,
      duration: 2000 + Math.random() * 1000, // Adjust the duration with some randomness
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => animateEmoji(animatedValue, index));
  };

  return (
    <View style={styles.container}>
      {emojisList.map(({ emoji, translateY, key }) => (
        <Animated.Text key={key} style={[styles.emoji, { transform: [{ translateY }] }]}>
          {emoji}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    position: 'absolute',
  },
});

export default FallingEmoji;
