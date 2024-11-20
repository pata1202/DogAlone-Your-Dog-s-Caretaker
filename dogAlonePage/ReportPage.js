import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import DayMonthButton from '../components/DayMonthButton';
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
      <View style={styles.reportBox}>
        <View style={styles.lineBottom}></View>
        <Image source={require('../dogAloneAssets/report1.png')} style={styles.report1} />
        <Image source={require('../dogAloneAssets/report2.png')} style={styles.report2} />
        <Image source={require('../dogAloneAssets/report3.png')} style={styles.report3} />
        <Image source={require('../dogAloneAssets/report4.png')} style={styles.report4} />
        <Text style={styles.text1}>불안감</Text>
        <Text style={styles.text2}>외로움</Text>
        <Text style={styles.text3}>배고픔</Text>
        <Text style={styles.text4}>아픔</Text>
      </View>
      <View style={styles.feedBox}>
      <Image source={require('../dogAloneAssets/report5.png')} style={styles.report5} />
      <Text style={styles.text5}>오늘의 울음 리포트</Text>
      </View>
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
    DayCon:{
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
      left:16,},
    report2:{
      position: "absolute",
      top:370,
      left:99,},
    report3:{
      position: "absolute",
      top:370,
      right:99,},
    report4:{
      position: "absolute",
      top:370,
      right:16,
    },
    text1:{
      fontFamily: 'Inter',      
      fontSize: 12,             
      fontWeight: 'bold',        
      color: '#000000',    
      position: "absolute",
      top:426,
      left:29,//16    
    },
    text2:{
      fontFamily: 'Inter',      
      fontSize: 12,             
      fontWeight: 'bold',        
      color: '#000000', 
      position: "absolute",
      top:426,
      left:112,        
    },
    text3:{
      fontFamily: 'Inter',      
      fontSize: 12,             
      fontWeight: 'bold',       
      color: '#000000',    
      position: "absolute",
      top:426,
      right:112,  
    },
    text4:{
      fontFamily: 'Inter',     
      fontSize: 12,             
      fontWeight: 'bold',       
      color: '#000000',  
      position: "absolute",
      top:426,
      right:35,         
    },
    feedBox:{
      width: 345,                 
      height: 152,                
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

})