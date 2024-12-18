import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import OnOffButton from "./OnOffButton"; // On/Off 버튼 컴포넌트
import ExpandableBar from "./ExpandableBar"; // 드롭다운 컴포넌트

// 온도 조절 컴포넌트
const TemperatureControl = () => {
  const [temperature, setTemperature] = useState(18); // 초기 온도 설정

  const increaseTemperature = () => {
    setTemperature((prevTemp) => prevTemp + 1);
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemp) => prevTemp - 1);
  };

  return (
    <View style={temperatureStyles.container}>
      <TouchableOpacity
        onPress={decreaseTemperature}
        style={temperatureStyles.arrow}
      >
        <Text style={temperatureStyles.arrowText}>▼</Text>
      </TouchableOpacity>
      <Text style={temperatureStyles.temperatureText}>{temperature}°C</Text>
      <TouchableOpacity
        onPress={increaseTemperature}
        style={temperatureStyles.arrow}
      >
        <Text style={temperatureStyles.arrowText}>▲</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function LGspeakerCard() {
  const [isExpanded, setIsExpanded] = useState(false); // 펼침 상태 관리

  const handleToggleExpand = (expanded) => {
    setIsExpanded(expanded); // `ExpandableBar`로부터 상태를 전달받음
  };

  return (
    <View style={styles.cardContainer}>
      {/* LG 스피커 텍스트 */}
      <Text style={styles.titleText}>에어컨</Text>

      {/* 스피커 이미지 */}
      <Image
        source={require("../dogAloneAssets/newair.png")}
        style={styles.speakerImage}
      />

      {/* On/Off 버튼 */}
      <View style={styles.onOffContainer}>
        <OnOffButton />
      </View>

      <Text style={styles.labelText2}>모드 변경</Text>
      {/* 스피커 채널 */}
      <View style={styles.channelContainer}>
        <ExpandableBar
          items={["모드1", "모드2", "모드3", "모드4"]}
          onToggleExpand={handleToggleExpand} // 상태 업데이트 함수 전달
        />
      </View>

      {/* 온도 조절 */}
      <View style={styles.volumeContainer}>
        <Text style={styles.labelText}>온도 조절</Text>
        <TemperatureControl />
      </View>
    </View>
  );
}

const temperatureStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 157,
    height: 24,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#f4f4f4",
    top: 7,
  },
  arrow: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 14,
    color: "#000",
  },
  temperatureText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

const styles = StyleSheet.create({
  cardContainer: {
    width: 360,
    height: 160,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "bold",
    fontWeight: "500",
    color: "#000000",
    position: "absolute",
    left: 26,
    top: 22,
  },
  speakerImage: {
    width: 60,
    height: 67,
    resizeMode: "contain",
    position: "absolute",
    left: 20,
    top: 63, // LG 스피커 텍스트 아래에 위치
  },
  onOffContainer: {
    position: "absolute",
    left: 260,
    top: 20, // 스피커 이미지 바로 아래
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 180,
    width: 150,
    zIndex: 2, // 드래그 바 위로 배치
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 95, // 스피커 채널 아래로 14 떨어짐
    left: 100,
    width: 150,
    zIndex: 1, // ExpandableBar 아래로 배치
  },
  labelText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#000000",
    marginRight: 20, // 텍스트와 컴포넌트 간격
    top: 6,
  },
  labelText2: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#000000",
    marginRight: 30, // 텍스트와 컴포넌트 간격
    position: "absolute",
    top: 70,
    left: 100,
  },
});
