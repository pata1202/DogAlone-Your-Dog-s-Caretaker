import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

// ExpandableBar 컴포넌트
export default function ExpandableBar({ items,onToggleExpand }) {
  // 펼쳐짐 상태 관리 (true: 펼쳐짐, false: 접힘)
  const [isExpanded, setIsExpanded] = useState(false);

  // 애니메이션을 위한 Animated 값 생성
  const [heightAnimation] = useState(new Animated.Value(0)); // 초기 높이: 0

  // 펼치기/접기 토글 함수
  const toggleExpand = () => {
    if (isExpanded) {
      // 접기 애니메이션 (높이를 0으로)
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300, // 애니메이션 지속 시간 (밀리초)
        useNativeDriver: false,
      }).start(() => onToggleExpand(false)); // 상태 전달
    } else {
      // 펼치기 애니메이션 (항목 개수에 따라 높이 설정)
      Animated.timing(heightAnimation, {
        toValue: items.length * 35, // 항목 하나당 높이 40px
        duration: 300,
        useNativeDriver: false,
      }).start(() => onToggleExpand(true)); // 상태 전달
    }
    setIsExpanded(!isExpanded); // 상태 업데이트
  };

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <TouchableOpacity style={styles.bar} onPress={toggleExpand}>
        <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* 펼쳐지는 메뉴 (애니메이션 효과 포함) */}
      <Animated.View style={[styles.menu, { height: heightAnimation }]}>
        
        {items.map((item, index) => (
          // 메뉴 항목 각각에 TouchableOpacity 추가 (버튼 효과)
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => alert(`${item} 버튼 클릭됨!`)} // 클릭 시 알림 팝업
          >
            <Text style={styles.menuItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  // 전체 컨테이너 스타일
  container: {
    width: 180,               // 컨테이너 폭
    borderColor: '#DADADA',     // 외곽선 색상
    borderRadius: 7.84,         // 외곽선 둥글기
   
    marginTop: 50,              // 컨테이너의 세로 위치
    backgroundColor: '#FFFFFF', // 배경 색상
  },
  // 상단 바 스타일
  bar: {
    height: 20.5,                 // 상단 바 높이
    backgroundColor: '#F7E588', // 상단 바 배경 색상
    justifyContent: 'center',   // 세로 정렬
    alignItems: 'center',       // 가로 정렬
    borderRadius: 7.84,         // 테두리 둥글기
    shadowColor: '#000',        // 그림자 색상
    shadowOpacity: 0.2,         // 그림자 투명도
    shadowRadius: 4,            // 그림자 반경
    elevation: 3,               // 안드로이드 그림자
  },
  // 화살표 텍스트 스타일
  arrow: {
    fontSize: 16,               // 화살표 크기
    color: '#000',              // 화살표 색상
    opacity: 0.5,               // 불투명도
    left:-75,
  },
  // 메뉴 스타일 (펼쳐지는 영역)
  menu: {
    overflow: 'hidden',         // 내용이 영역을 넘지 않도록 설정
    backgroundColor: '#FAFAFA', // 메뉴 배경 색상
    borderRadius: 7.84,         // 메뉴 테두리 둥글기
  },
  // 메뉴 항목 스타일
  menuItem: {
    height: 30,                 // 항목 높이
    justifyContent: 'center',   // 세로 정렬
    alignItems: 'center',       // 가로 정렬
    backgroundColor: '#E0E0E0', // 항목 배경 색상
    marginVertical: 2,          // 항목 간격
    borderRadius: 5,            // 항목 둥글기
  },
  // 메뉴 텍스트 스타일
  menuItemText: {
    fontFamily: 'Montserrat',   // 폰트 설정
    fontWeight: 'bold',         // 텍스트 두께
    fontSize: 14,               // 텍스트 크기
    color: '#000',              // 텍스트 색상
  },
});
