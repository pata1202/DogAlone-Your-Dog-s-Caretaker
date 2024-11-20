import React from 'react';
import { TextInput, Text, StyleSheet,View } from 'react-native';

export default function InputBox({inputText}){
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
        width: 264.3,                   
        height: 42.35,                  
        borderRadius: 7.84,             
        backgroundColor: '#FFFFFF',     
        borderColor: 'rgba(0, 0, 0, 0.5)', 
        borderWidth: 1.57,              
        paddingHorizontal: 20,          
        justifyContent: 'center',       
        shadowColor: "#000000",         
        shadowOpacity: 0.2,             
        shadowRadius: 4,                
        elevation: 5,                   
        marginTop: 130,                  // 기본 텍스트 아래 간격
      },
      textInput: {
        fontFamily: 'Roboto',           
        fontSize: 11.76,                
        color: '#B0B0B0',               // 텍스트 색상 (회색)
      },

})