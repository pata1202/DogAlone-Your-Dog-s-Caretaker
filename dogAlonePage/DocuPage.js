import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ReportButton from "../components/ReportButton";
import DocuButton from "../components/DocuButton";
import MenuButton from "../components/MenuButton";

export default function DocuPage() {
  return (
    <View style={styles.container}>
      <View style={styles.topbox}>
        <Text style={styles.toptext}>DogAlone 사용설명서</Text>
        <Image
          source={require("../dogAloneAssets/logo.png")}
          style={styles.logo}
        />
        <BackButton></BackButton>
      </View>
      <View style={styles.bigBox}>
        <ScrollView style={styles.mainTextCon}>
          <Text style={styles.mainText}>
            DogAlone은 개의 울음소리를 분석하여 감정을 파악하고, 그에 따른
            스마트홈 솔루션을 제공하는 어플리케이션입니다.{" "}
          </Text>
          <Text></Text>
          <Text style={styles.mainText}>
            주인이 외출할 때 개는 스트레스와 불안, 외로움 등의 부정적인 감정을
            느끼게 되고, 이는 개의 건강에 부정적인 영향을 미칩니다.{" "}
          </Text>
          <Text></Text>
          <Text style={styles.mainText}>
            DogAlone의 ‘실시간 반려견 소리 분석’ 버튼을 누르면, 실시간으로
            반려견의 소리를 AI로 분석하여 개의 감정 상태를 인식하고, 적절한
            솔루션을 제공해줍니다.
          </Text>
          <Text></Text>
          <Text style={styles.mainText}>
            DogAlone의 ‘실시간 반려견 소리 분석’ 버튼을 누르면, 실시간으로
            반려견의 소리를 AI로 분석하여 개의 감정 상태를 인식하고, 적절한
            솔루션을 제공해줍니다.
          </Text>
          <Text></Text>
          <Text style={styles.mainText}>
            DogAlone의 ‘실시간 반려견 소리 분석’ 버튼을 누르면, 실시간으로
            반려견의 소리를 AI로 분석하여 개의 감정 상태를 인식하고, 적절한
            솔루션을 제공해줍니다.
          </Text>
          <Text></Text>
          <Text style={styles.mainText}>
            DogAlone의 ‘실시간 반려견 소리 분석’ 버튼을 누르면, 실시간으로
            반려견의 소리를 AI로 분석하여 개의 감정 상태를 인식하고, 적절한
            솔루션을 제공해줍니다.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.triangle}></View>
      <Image source={require("../dogAloneAssets/dog.png")} style={styles.dog} />

      <View style={styles.bottomBar}>
        <HomeButton></HomeButton>
        <ReportButton></ReportButton>
        <DocuButton></DocuButton>
        <MenuButton></MenuButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // 위에서부터 배치 시작
    alignItems: "center", // 가로로 중앙 정렬
    backgroundColor: "#FFFFFF", // 배경색 설정
  },
  con: {
    position: "absolute",
    top: 200,
  },
  topbox: {
    width: 393,
    height: 60,
    backgroundColor: "#FAF1C3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center", // 수직 방향 중앙 정렬
    alignItems: "center", // 수평 방향 중앙 정렬
    top: 48,
  },
  toptext: {
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "500", // Medium에 해당하는 Weight
    color: "#000000", // 검정색 텍스트
  },
  logo: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 20,
  },
  bigBox: {
    top: 80,
    width: 345,
    height: 480,
    backgroundColor: "#FAF1C3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center", // 수직 방향 중앙 정렬
    alignItems: "center", // 수평 방향 중앙 정렬
    borderRadius: 30,
  },
  mainTextCon: {
    position: "absolute",
    width: 285,
    height: 350,
    top: 60,
  },
  mainText: {
    fontSize: 14,
    fontFamily: "Jockey One",
    fontWeight: "500", // Medium에 해당하는 Weight
    color: "#000000", // 검정색 텍스트
  },
  triangle: {
    position: "absolute",
    top: 610, // 삼각형의 위치 조정
    right: 55,
    width: 0,
    height: 0,
    borderLeftWidth: 21, // 삼각형의 왼쪽 길이
    borderRightWidth: 21, // 삼각형의 오른쪽 길이
    borderTopWidth: 50, // 삼각형의 높이 (위쪽으로 색상 지정)
    borderLeftColor: "transparent", // 왼쪽을 투명하게
    borderRightColor: "transparent", // 오른쪽을 투명하게
    borderTopColor: "#FAF1C3", // 위쪽을 삼각형 색상으로 설정
    borderBottomWidth: 0, // 아래쪽은 제거
    backgroundColor: "transparent", // 내부 투명
  },
  dog: {
    position: "absolute",
    top: 637,
    right: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 65, // 하단 바 높이
    backgroundColor: "#FFFFFF", // 흰색
    justifyContent: "space-around", // 버튼 간 간격 동일
    flexDirection: "row", // 가로 정렬
    alignItems: "center",
    // 경계선 제거
    borderTopWidth: 0,
  },
});
