import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function Loading1({navigation}) {
 
// Animated.Value를 사용하여 강아지 이미지의 위치 애니메이션 설정
const moveAnim = useRef(new Animated.Value(-200)).current; // 왼쪽 화면 밖에서 시작
const spinAnim = useRef(new Animated.Value(0)).current; // 회전 애니메이션을 위한 초기 값 설정

useEffect(() => {
  // 애니메이션 효과를 반복하여 실행하는 함수
  Animated.loop(
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 400, // 오른쪽 끝으로 이동
        duration: 2000, // 이동 시간 설정 (밀리초 단위)
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: -400, // 왼쪽 시작 위치로 돌아옴
        duration: 0, // 즉시 위치 초기화
        useNativeDriver: true,
      }),
    ])
  ).start();
  Animated.loop(
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();
  // 일정 시간 후에 로그인 화면으로 전환
  const timer = setTimeout(() => {
    navigation.replace('Login');  // 일정 시간 후 LoginScreen으로 전환
  }, 3000);  // 3000ms = 3초 동안 로딩 화면 표시

  return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리

}, [moveAnim,spinAnim,navigation]);

// 회전 애니메이션을 위한 interpolate 설정
const spin = spinAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'], // 0도에서 360도까지 회전
});
  return (
    <View style={styles.container}>
    
   
    <Image source={require('../dogAloneAssets/loadinglogo.png')} style={styles.loadinglogo} />

    
    <Animated.Image
        source={require('../dogAloneAssets/loadingdog.png')}
        style={[styles.loadingdog, { transform: [{ translateX: moveAnim }] }]} // 이동 애니메이션 적용
        />
    
    <Animated.Image
        source={require('../dogAloneAssets/loadCon.png')}
        style={[styles.loadCon, { transform: [{ rotate: spin }] }]}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // 위에서부터 배치 시작
    alignItems: 'center',           // 가로로 중앙 정렬
    backgroundColor: '#FFFFFF',     // 배경색 설정
  },
  loadinglogo: {
    alignItems: 'center',
    resizeMode: 'contain', // 이미지의 비율을 유지하면서 크기 조정
    marginTop: 180,       // 상단 여백 추가
    right: -6,
  },
  loadingdog: {
    width: 100,           
    height: 89,          
    position: 'absolute',
    top: 490,             
  },
  loadCon: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 620,
  },
});
