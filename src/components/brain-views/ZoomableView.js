import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ZoomableView({ children, width, height, minScale = 1, maxScale = 3 }) {
  const viewWidth = width || SCREEN_WIDTH - 40;
  const viewHeight = height || 300;

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const scaleVal = useRef(1);
  const translateVal = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef(0);
  const lastCenter = useRef({ x: 0, y: 0 });
  const isPinching = useRef(false);

  const getDistance = (touches) => {
    const [t1, t2] = touches;
    const dx = t1.pageX - t2.pageX;
    const dy = t1.pageY - t2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gs) => {
        return Math.abs(gs.dx) > 3 || Math.abs(gs.dy) > 3;
      },
      onPanResponderGrant: (evt) => {
        const touches = evt.nativeEvent.touches;
        if (touches && touches.length === 2) {
          isPinching.current = true;
          lastPinchDist.current = getDistance(touches);
        } else {
          isPinching.current = false;
          lastCenter.current = {
            x: translateVal.current.x,
            y: translateVal.current.y,
          };
        }
      },
      onPanResponderMove: (evt, gs) => {
        const touches = evt.nativeEvent.touches;
        if (touches && touches.length === 2) {
          isPinching.current = true;
          const dist = getDistance(touches);
          if (lastPinchDist.current > 0) {
            const newScale = Math.max(
              minScale,
              Math.min(maxScale, scaleVal.current * (dist / lastPinchDist.current))
            );
            scaleVal.current = newScale;
            scale.setValue(newScale);
          }
          lastPinchDist.current = dist;
        } else if (!isPinching.current && scaleVal.current > 1) {
          // Pan when zoomed in
          const maxPan = (scaleVal.current - 1) * viewWidth * 0.3;
          const newX = Math.max(-maxPan, Math.min(maxPan, lastCenter.current.x + gs.dx));
          const newY = Math.max(-maxPan, Math.min(maxPan, lastCenter.current.y + gs.dy));
          translateVal.current = { x: newX, y: newY };
          translateX.setValue(newX);
          translateY.setValue(newY);
        }
      },
      onPanResponderRelease: () => {
        isPinching.current = false;
        lastPinchDist.current = 0;
      },
    })
  ).current;

  const handleDoubleTap = (() => {
    let lastTap = 0;
    return () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        // Double tap: toggle zoom
        if (scaleVal.current > 1.2) {
          scaleVal.current = 1;
          translateVal.current = { x: 0, y: 0 };
          Animated.parallel([
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          ]).start();
        } else {
          scaleVal.current = 2;
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }).start();
        }
      }
      lastTap = now;
    };
  })();

  return (
    <View
      style={[styles.container, { width: viewWidth, height: viewHeight }]}
      {...panResponder.panHandlers}
      onTouchEnd={handleDoubleTap}
    >
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              { translateX },
              { translateY },
              { scale },
            ],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
