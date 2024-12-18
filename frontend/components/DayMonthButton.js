import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DayMonthButton({ viewMode, onSelectionChange }) {

  return (
    <View style={styles.container}>
      {/* 일별 버튼 */}
      <TouchableOpacity
        style={[
          styles.button,
          viewMode === '일별' && styles.selectedButton, // 선택된 버튼 스타일 적용
        ]}
        onPress={() => onSelectionChange('일별')}
      >
        <Text style={[styles.buttonText, viewMode === '일별' && styles.selectedText]}>
          일별
        </Text>
      </TouchableOpacity>

      {/* 주별 버튼 */}
      <TouchableOpacity
        style={[
          styles.button,
          viewMode === '주별' && styles.selectedButton, // 선택된 버튼 스타일 적용
        ]}
        onPress={() => onSelectionChange ('주별')}
      >
        <Text style={[styles.buttonText, viewMode === '주별' && styles.selectedText]}>
          주별
        </Text>
      </TouchableOpacity>

      {/* 월별 버튼 */}
      <TouchableOpacity
        style={[
          styles.button,
          viewMode === '월별' && styles.selectedButton, // 선택된 버튼 스타일 적용
        ]}
        onPress={() => onSelectionChange ('월별')}
      >
        <Text style={[styles.buttonText, viewMode === '월별' && styles.selectedText]}>
          월별
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 210, 
    height: 30, 
    flexDirection: 'row', 
    borderWidth: 0.5, 
    borderColor: '#000000', 
    borderRadius: 30, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'space-between', // 버튼 간 간격 균등
    alignItems: 'center', // 수직 정렬
    paddingHorizontal: 3, // 버튼 간 좌우 간격
  },
  button: {
    width: 67, 
    height: 26, 
    justifyContent: 'center', // 텍스트 수직 정렬
    alignItems: 'center', // 텍스트 가로 정렬
    borderRadius: 10, 
  },
  selectedButton: {
    backgroundColor: '#FAF1C3', // 선택된 버튼의 노란색 배경
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 2, 
  },
  buttonText: {
    fontFamily: 'Inter', 
    fontWeight: '500', 
    fontSize: 15, 
    color: '#000000', 
    textAlign: 'center', 
  },
  selectedText: {
    fontWeight: 'bold', // 선택된 버튼 텍스트 굵게
  },
});