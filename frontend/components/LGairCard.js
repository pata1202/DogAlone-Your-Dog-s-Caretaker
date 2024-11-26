import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import OnOffButton from '../components/OnOffButton'; // On/Off 버튼 컴포넌트
import DragBar from '../components/DragBar'; // 슬라이더 컴포넌트

export default function LGairCard() {

   

  return (
    <View style={styles.cardContainer}>
      {/* LG 에어컨 텍스트 */}
      <Text style={styles.titleText}>LG 에어컨</Text>

      {/* 에어컨 이미지 */}
      <Image
        source={require('../dogAloneAssets/air.png')}
        style={styles.airImage}
      />

      {/* On/Off 버튼 */}
      <View style={styles.onOffContainer}>
        <OnOffButton />
      </View>
      <Text style={styles.labelText2}>현재 온도   </Text>
      <Text style={styles.labelText3}>36.5</Text>
      <View style={styles.channelContainer}>
        
        
      </View>

      {/* 온도 조절 */}
      <View style={styles.volumeContainer}>
        <Text style={styles.labelText}>온도 조절</Text>
        <DragBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 360,
    height: 160,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#000000',
    position: 'absolute',
    left: 27,
    top: 19,
  },
    airImage: {
    width: 30,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
    left: 42,
    top: 42, // LG 스피커 텍스트 아래에 위치
  },
  onOffContainer: {
    position: 'absolute',
    left: 8,
    top: 120, // 스피커 이미지 바로 아래
  },
  
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 75, // 스피커 채널 아래로 14 떨어짐
    left: 115,
    width: 150,
     zIndex: 1, // ExpandableBar 아래로 배치
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000000',
    marginRight: 8, // 텍스트와 컴포넌트 간격
  },
  labelText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000000',
    marginRight: 8, // 텍스트와 컴포넌트 간격
    position: "absolute",
    top:50,
    left:115,
  },
  labelText3: {
    fontSize: 13,
    fontFamily: 'Roboto',
    color: '#000000',
    marginRight: 8, // 텍스트와 컴포넌트 간격
    position: "absolute",
    top:53,
    left:189,
    fontWeight: 'bold', // 텍스트 굵게
  },

});
