import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import LGspeakerCard from '../components/LGspeakerCard';
import LGtvCard from '../components/LGtvCard';
import LGlightCard from '../components/LGlightCard';
import LGairCard from '../components/LGairCard';
import LGpetCard from '../components/LGpetCard';
import LGwaterCard from '../components/LGwaterCard';
import BackButton from '../components/BackButton';
import HomeButton from '../components/HomeButton';
import ReportButton from '../components/ReportButton';
import DocuButton from '../components/DocuButton';
import MenuButton from '../components/MenuButton';

export default function SmartHome() {


  return (
    <View style={styles.container}>
      <View style={styles.topbox}>
        <Text style={styles.toptext}>스마트홈 서비스</Text>
        <Image source={require('../dogAloneAssets/logo.png')} style={styles.logo} />
        <BackButton></BackButton>
      </View>
      <Text style={styles.listName}>내 가전 목록</Text>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollCon}>

          <View style={styles.speakerCon}>
            <LGspeakerCard></LGspeakerCard>
          </View>
          <View style={styles.tvCon}>
            <LGtvCard></LGtvCard>
          </View>
          <View style={styles.petCon}>
            <LGpetCard></LGpetCard>
          </View>
          <View style={styles.waterCon}>
            <LGwaterCard></LGwaterCard>
          </View>
          <View style={styles.airCon}>
            <LGairCard></LGairCard>
          </View>
          <View style={styles.lightCon}>
            <LGlightCard></LGlightCard>
          </View>

        </ScrollView>
      </View>
      <View style={styles.lineBottom}></View>
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
  topbox: {
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
    color: '#000000',
    left: -70,

  },
  logo: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 20,
  },

  listName: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "500",
    position: "absolute",  // 절대 위치 설정
    top: 140,              // 상단 여백
    left: 16,              // 왼쪽 여백

  },
  scrollContainer: {
    position: 'absolute',
    top: 164, // 큰 컨테이너 기준 상단 여백
    bottom: 777 - 164, // 상단과 하단 사이 영역
    width: '100%', // 스크롤 컨테이너 너비
    height: 777 - 164, // 스크롤뷰의 높이를 제한
    backgroundColor: '#FFFFFF',
    alignItems: 'center',           // 가로로 중앙 정렬
  },
  speakerCon: {
    marginTop: 10,
  },
  tvCon: {
    marginTop: 20,
  },
  lightCon: {
    marginTop: 20,
  },
  airCon: {
    marginTop: 20,
  },
  petCon: {
    marginTop: 20,
  },
  waterCon: {
    marginTop: 20,
  },
  lineBottom: {
    height: 1,
    width: '100%', // 화면 전체 너비를 차지하도록 설정
    backgroundColor: '#DADADA', // 회색 선
    position: 'absolute', // 고정 위치
    top: 777, // 화면 하단에 고정

  },
});