import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import OnOffButton from './OnOffButton'; // On/Off 버튼 컴포넌트
import ExpandableBar from './ExpandableBar'; // 드롭다운 컴포넌트
import DragBar from './DragBar'; // 슬라이더 컴포넌트

export default function LGtvCard() {

    const [isExpanded, setIsExpanded] = useState(false); // 펼침 상태 관리

  const handleToggleExpand = (expanded) => {
    setIsExpanded(expanded); // `ExpandableBar`로부터 상태를 전달받음
  };

  return (
    <View style={styles.cardContainer}>
      {/* LG 티비 텍스트 */}
      <Text style={styles.titleText}>LG 티비</Text>

      {/* 티비 이미지 */}
      <Image
        source={require('../dogAloneAssets/tv.png')}
        style={styles.tvImage}
      />

      {/* On/Off 버튼 */}
      <View style={styles.onOffContainer}>
        <OnOffButton />
      </View>

      <Text style={styles.labelText2}>티비 채널</Text>
      {/* 스피커 채널 */}
      <View style={styles.channelContainer}>
        
        <ExpandableBar items={["채널1","채널2","채널3","채널4"]}
        onToggleExpand={handleToggleExpand} // 상태 업데이트 함수 전달
        />
      </View>

      {/* 스피커 볼륨 */}
      <View style={styles.volumeContainer}>
        <Text style={styles.labelText}>티비 볼륨</Text>
        <DragBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 360,
    height: 160,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#000000',
    position: 'absolute',
    left: 27,
    top: 19,
  },
  tvImage: {
    width: 94,
    height: 97,
    resizeMode: 'contain',
    position: 'absolute',
    left: 11,
    top: 32, // LG 스피커 텍스트 아래에 위치
  },
  onOffContainer: {
    position: 'absolute',
    left: 8,
    top: 120, // 스피커 이미지 바로 아래
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0, // 
    left: 182,
    width: 150,
    zIndex: 2, // 드래그 바 위로 배치
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 75, // 스피커 채널 아래로 14 떨어짐
    left: 115,
    width: 150,
    zIndex: 1, // ExpandableBar 아래로 배치
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000000',
    marginRight: 8, // 텍스트와 컴포넌트 간격
  },
  labelText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000000',
    marginRight: 8, // 텍스트와 컴포넌트 간격
    position: "absolute",
    top:50,
    left:115,
  },

});