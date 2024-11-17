import React from 'react';
import { TextInput, Text, StyleSheet,View } from 'react-native';

export default function inputBox({inputText}){
    return(
    <View style={styles.inputContainer}>
        <TextInput
        style={styles.textInput}
        placeholder={inputText} // 기본 placeholder
        placeholderTextColor="#B0B0B0" // placeholder 텍스트 색상
      />
    </View>
    );
}

const styles =StyleSheet.create({
    inputContainer: {
        width: 264.3,                   // 입력 창의 폭 설정
        height: 42.35,                  // 입력 창의 높이 설정
        borderRadius: 7.84,             // 테두리 둥글기 설정
        backgroundColor: '#FFFFFF',     // 배경색 설정
        borderColor: 'rgba(0, 0, 0, 0.5)', // 테두리 색상과 투명도 설정
        borderWidth: 1.57,              // 테두리 두께 설정
        paddingHorizontal: 20,          // 입력 창 안의 텍스트를 왼쪽에서 20px 떨어지게 설정
        justifyContent: 'center',       // 텍스트를 세로 중앙 정렬
        shadowColor: "#000000",         // 그림자 색상 설정
        shadowOpacity: 0.2,             // 그림자 투명도 설정
        shadowRadius: 4,                // 그림자 반경 설정
        elevation: 5,                   // 안드로이드에서의 그림자 높이 설정
        marginTop: 130,                  // 기본 텍스트 아래 간격
      },
      textInput: {
        fontFamily: 'Roboto',           // 텍스트 폰트 설정
        fontSize: 11.76,                // 텍스트 크기 설정
        color: '#B0B0B0',               // 텍스트 색상 (회색)
      },

})