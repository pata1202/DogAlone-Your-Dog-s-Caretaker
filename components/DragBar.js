import React, { useRef } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';

export default function DragBar() {
  const barWidth = 180; // 바의 전체 폭
  const circleSize = 14; // 원 크기
  const padding = 5; // 바 양쪽 여백
  const initialPosition = (barWidth - circleSize) / 2; // 중앙 위치 계산
  const position = useRef(new Animated.Value(initialPosition)).current; // 초기값 설정

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPos = Math.min(
        Math.max(initialPosition + gestureState.dx, padding),
        barWidth - padding - circleSize
      );
      position.setValue(newPos); // Animated.Value 업데이트
    },
    onPanResponderRelease: () => {
      // 필요 시 추가 동작
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: barWidth }]}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateX: position }] },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:180,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  bar: {
    height: 20.5,
    backgroundColor: '#F7E588',
    borderRadius: 7.84,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    position: 'absolute',
    top: 3.25, // 중앙 배치
  },
});
