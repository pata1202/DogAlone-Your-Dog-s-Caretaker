import React, {useState} from 'react';
import { View, Image, StyleSheet, Text,ScrollView, TextInput,TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import HomeButton from '../components/HomeButton';
import ReportButton from '../components/ReportButton';
import DocuButton from '../components/DocuButton';
import MenuButton from '../components/MenuButton';

export default function DocuPage(){

return(
    <View style={styles.container}>
        <View style={styles.topbox}>
      <Text style={styles.toptext}>DogAlone 사용설명서</Text>
      <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />
      <BackButton></BackButton>
      </View>
      <View style={styles.bigBox}>
      <ScrollView style={styles.mainTextCon}>
      <Text style={styles.mainText}>DogAlone은 개의 울음소리를 분석하여 감정을 파악하고, 그에 따른 스마트홈 솔루션을 제공하는 어플리케이션입니다.  </Text>
      <Text></Text>
      <Text style={styles.mainText}>주인이 외출할 때 개는 스트레스와 불안, 외로움 등의 부정적인 감정을 느끼게 되고, 이는 개의 건강에 부정적인 영향을 미칩니다. </Text>
      <Text></Text>
      <Text style={styles.mainText}>DogAlone의 ‘실시간 반려견 소리 분석’ 버튼을 누르면, 실시간으로 반려견의 소리를  AI로 분석하여 개의 감정 상태를 인식하고, 적절한 솔루션을 제공해줍니다.</Text>
      <Text></Text>
      <Text style={styles.mainText}>DogAlone의 스마트홈 솔루션은 여러 논문과 수의사 처방 결과를 바탕으로 결정되었습니다.</Text>
      <Text></Text>
      <Text style={styles.mainText}>흥분(bark): 집안 음악 끄기, 부드러운 조명 켜기, 간식로봇 작동하기</Text>
      <Text></Text>
      <Text style={styles.mainText}>두려움(growl): 조용한 음악 틀기, 집안 온도 높이기, 간식로봇 작동하기</Text>
      <Text></Text>
      <Text style={styles.mainText}>만족(grunt): 조용한 음악 틀기, 자연 영상 틀기, 공기청정기 가동하기</Text>
      <Text></Text>
      <Text style={styles.mainText}>불안(whimper): 스피커로 통화 연결하기, 부드러운 조명 켜기, 동물 영상 틀기</Text>
      <Text></Text>
      <Text style={styles.mainText}>외로움(howl): 스피커로 주인 목소리 틀기, 동물 영상 틀기, 간식로봇 작동하기</Text>
      <Text></Text>
      <Text style={styles.mainText}>아픔(yip): 주변 동물병원 정보, 조용한 음악 틀기, 부드러운 조명 켜기</Text>
      
      </ScrollView>
      </View>
      <View style={styles.triangle}></View>
      <Image source={require('../dogAloneAssets/dog.png')} style={styles.dog} />
      <HomeButton></HomeButton>
      <ReportButton></ReportButton>
      <DocuButton></DocuButton>
      <MenuButton></MenuButton>
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
    con:{
      position:"absolute",
      top:200,
      
    },
    topbox:{
      width: 393, 
    height: 60,
    backgroundColor: '#FAF1C3', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 2, 
    justifyContent: 'center', // 수직 방향 중앙 정렬
    alignItems: 'center', // 수평 방향 중앙 정렬
    top: 48,
    },
    toptext: {
      fontSize: 20, 
      fontFamily: 'Inter', 
      fontWeight: '500', // Medium에 해당하는 Weight
      color: '#000000', // 검정색 텍스트
    },
    logo:{
      position: "absolute",
      width:60,
      height:60,
      right:20,
    },
    bigBox:{
      top:80,
      width:345,
      height:480,
      backgroundColor: '#FAF1C3', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 2, 
    justifyContent: 'center', // 수직 방향 중앙 정렬
    alignItems: 'center', // 수평 방향 중앙 정렬
    borderRadius:30,
    },
    mainTextCon:{
      position:"absolute",
      width:285,
      height:350,
      top:60,
      
      
    },
    mainText:{
      fontSize: 14, 
      fontFamily: 'Jockey One', 
      fontWeight: '500', // Medium에 해당하는 Weight
      color: '#000000', // 검정색 텍스트
    },
    triangle: {
      position: "absolute",
      top: 610, // 삼각형의 위치 조정
      right:55,
      width: 0,
      height: 0,
      borderLeftWidth: 21, // 삼각형의 왼쪽 길이
      borderRightWidth: 21, // 삼각형의 오른쪽 길이
      borderTopWidth: 50, // 삼각형의 높이 (위쪽으로 색상 지정)
      borderLeftColor: "transparent", // 왼쪽을 투명하게
      borderRightColor: "transparent", // 오른쪽을 투명하게
      borderTopColor: "#FAF1C3", // 위쪽을 삼각형 색상으로 설정
      borderBottomWidth: 0, // 아래쪽은 제거
      backgroundColor: "transparent", // 내부 투명
    },
    dog:{
      position:"absolute",
      top:637,
      right:20,
    }
});