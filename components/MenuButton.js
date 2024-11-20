import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function MenuButton() {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => alert(`메뉴 버튼 클릭됨!`)}
    >
      <Image
        source={require('../dogAloneAssets/menu.png')} 
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    left:291,
    position: 'absolute', 
    bottom: 0, 
    alignSelf: 'center',
    width: 65, 
    height: 65, 
    borderRadius: 5, 
    backgroundColor: '#FFFFFF', 
   
    justifyContent: 'center', // 이미지 수직 중앙 정렬
    alignItems: 'center', // 이미지 수평 중앙 정렬
  },
  image: {
    width: 65, 
    height: 65, 
  },
});