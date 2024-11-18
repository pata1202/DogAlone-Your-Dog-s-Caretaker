import React from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import LoginButton from '../components/ExpandableBar'; // 펼쳐지는 바 컴포넌트 가져오기
import ExpandableBar from '../components/ExpandableBar';

export default function smartHome(){



return(
    <View style={styles.container}>
        <View style={styles.ExpandCon}>
        <ExpandableBar items={["채널1","채널2","채널3","채널4"]}/>
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
    ExpandCon: {
        top:100,
    }

});