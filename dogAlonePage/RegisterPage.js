import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
export default function RegisterPage(){


return(
    <View style={styles.container}>
        <View style={styles.con}>
        <BackButton></BackButton>
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
      
    }
})