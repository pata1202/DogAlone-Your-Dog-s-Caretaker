import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';
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
    triangle:{
      position:"absolute",
      width: 0,
      height: 0,
      borderLeft: '23px solid transparent',  // 왼쪽 경계선
      borderRight: '23px solid transparent', // 오른쪽 경계선
      borderBottom: '60px solid #FAF1C3',    // 아래쪽 경계선 색상
    },
    dog:{
      position:"absolute",
      top:637,
      right:20,
    }
});