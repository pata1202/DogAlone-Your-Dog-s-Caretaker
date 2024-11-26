import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FoodMoveButton1() {
  const navigation = useNavigation(); // 네비게이션 훅 사용

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('smartHome')} 
    >
      <Image
        source={require('../dogAloneAssets/plus.png')} 
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 23, // 버튼 너비
    height: 27, // 버튼 높이
    
   
    justifyContent: 'center', // 이미지 수직 중앙 정렬
    alignItems: 'center', // 이미지 수평 중앙 정렬
  },
  image: {
    width: 23, // 이미지 너비
    height: 27, // 이미지 높이
  },
});