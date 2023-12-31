// SwipeCards.js
import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';

const SwipeCards = () => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        Animated.event(
          [
            null,
            { dx: panX, dy: panY } // Here, ensure that dx and dy are mapped correctly
          ],
          { useNativeDriver: false }
        )(e, gestureState);
      },
      onPanResponderRelease: (e, { dx, dy }) => {
        // Your logic for swipe left or right
        if (dx > 120) {
          // Swipe right
          // Add your action or animation here
        } else if (dx < -120) {
          // Swipe left
          // Add your action or animation here
        } else {
          // Return to the original position
          Animated.spring(panX, { toValue: 0, useNativeDriver: false }).start();
          Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  const panX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  const cardStyle = {
    transform: [{ translateX: panX }, { translateY: panY }],
  };

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, cardStyle]}
      >
        {/* Your card content goes here */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default SwipeCards;
