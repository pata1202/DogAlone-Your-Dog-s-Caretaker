import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import HomeButton from '../components/HomeButton';
import ReportButton from '../components/ReportButton';
import DocuButton from '../components/DocuButton';
import MenuButton from '../components/MenuButton';
export default function MainPage(){


return(
    <View style={styles.container}>
        <View style={styles.con}>
        <BackButton></BackButton>
        <Text style={styles.pagename}>메인창!!</Text>
        </View>
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
    pagename:{
      fontSize: 20,
      position: "absolute",
      top: 200,
    }
})