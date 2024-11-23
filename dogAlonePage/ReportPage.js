import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import DayMonthButton from '../components/DayMonthButton';
import HomeButton from '../components/HomeButton';
import ReportButton from '../components/ReportButton';
import DocuButton from '../components/DocuButton';
import MenuButton from '../components/MenuButton';
export default function ReportPage(){


return(
    <View style={styles.container}>
        <View style={styles.topbox}>
      <Text style={styles.toptext}>반려견 울음 리포트</Text>
      <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />
      <BackButton></BackButton>
      </View>
      <View style={styles.DayCon}>
        <DayMonthButton></DayMonthButton>
      </View>
      <Text style={styles.date}>2024-11 20 울음 리포트</Text>
      <ScrollView style={styles.scrollCon}>
    
      <View style={styles.reportBox}>
        <View style={styles.lineBottom}></View>
        <Image source={require('../dogAloneAssets/report1.png')} style={styles.report1} />
        <Image source={require('../dogAloneAssets/report2.png')} style={styles.report2} />
        <Image source={require('../dogAloneAssets/report3.png')} style={styles.report3} />
        
        <Text style={styles.text1}>흥분</Text>
        <Text style={styles.text2}>불안함</Text>
        <Text style={styles.text3}>편안함</Text>
        
      </View>
      <View style={styles.feedBox}>
      <Image source={require('../dogAloneAssets/report5.png')} style={styles.report5} />
      <Text style={styles.text5}>오늘의 울음 리포트</Text>
      </View>
      </ScrollView>
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
    scrollCon:{
      position:'absolute',
      top: 200, // 큰 컨테이너 기준 상단 여백
      height: 777 - 200, // 스크롤뷰의 높이를 제한
      
    },
    DayCon:{
      alignSelf:'center',
      marginTop:70,
      
    },
    date: {
      fontFamily: 'JockeyOne-Regular', 
      fontWeight: '400',              // Regular (기본 두께)
      fontSize: 18,                   
      color: '#000000',               // 텍스트 색상 (검정)
      textAlign: 'center',            // 텍스트 가운데 정렬
      marginTop: 10,
      marginBottom: 10,
      fontWeight: 'bold',   
    },
    reportBox: {
      width: 345,                 
      height: 448,                
      backgroundColor: '#FFFFFF', 
      borderRadius: 30,           
      borderWidth: 1,             
      borderColor: '#9D9D9D',    
      
    },
    lineBottom: {
      height: 1,
      width: '100%', // 화면 전체 너비를 차지하도록 설정
      backgroundColor: '#9D9D9D', // 
      position: 'absolute', // 고정 위치
      top: 359, // 화면 하단에 고정
    },
    report1:{
      position: "absolute",
      top:370,
      left:40,},
    report2:{
      position: "absolute",
      top:370,
      left:145
      },
    report3:{
      position: "absolute",
      top:370,
      right:40,},
    
    text1:{
      fontFamily: 'Inter',      
      fontSize: 12,             
      fontWeight: 'bold',        
      color: '#000000',    
      position: "absolute",
      top:426,
      left:57,//16    
    },
    text2:{
      fontFamily: 'Inter',      
      fontSize: 12,             
      fontWeight: 'bold',        
      color: '#000000', 
      position: "absolute",
      top:426,
      left:158,        
    },
    text3:{
      fontFamily: 'Inter',      
      fontSize: 12,             
      fontWeight: 'bold',       
      color: '#000000',    
      position: "absolute",
      top:426,
      right:52,  
           
    },
    feedBox:{
      width: 345,                 
      height: 250,                
      backgroundColor: '#FAF1C3', 
      borderRadius: 10,          
      marginTop: 20,
    },
    report5:{
      width:23,
      height:21,
      left:16,
      top:17,
    },
    text5:{
      left:48,
      fontFamily: 'Inter',     
      fontSize: 16,             
      fontWeight: 'bold',       
      color: '#000000',  
      top:-3,
    }

});