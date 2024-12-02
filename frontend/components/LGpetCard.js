import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // 공식 DateTimePicker
import OnOffButton from "../components/OnOffButton"; // On/Off 버튼 컴포넌트

export default function LGpetCard() {
  const [nextFeedTime, setNextFeedTime] = useState(new Date()); // 예정 배식 시간
  const [pickerVisible, setPickerVisible] = useState(false); // Picker 상태

  const showPicker = () => {
    setPickerVisible(true);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      // 취소 시 Picker 닫기
      setPickerVisible(false);
      return;
    }

    const currentDate = selectedDate || nextFeedTime;
    setNextFeedTime(currentDate); // 선택된 시간 업데이트
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes} ${period}`;
  };

  return (
    <View style={styles.cardContainer}>
      {/* LG 펫케어 텍스트 */}
      <Text style={styles.titleText}>간식로봇</Text>

      {/* 펫케어 이미지 */}
      <Image
        source={require("../dogAloneAssets/newpet.png")}
        style={styles.petImage}
      />

      {/* On/Off 버튼 */}
      <View style={styles.onOffContainer}>
        <OnOffButton />
      </View>

      {/* 마지막 작동 시간 (고정된 값) */}
      <Text style={styles.labelText2}>마지막 작동 시간</Text>
      <View style={[styles.timeButton, styles.redButton]}>
        <Text style={styles.timeButtonTextBlack}>9:41 AM</Text>
      </View>

      {/* 예정된 작동 시간 (TimePicker 포함) */}
      <Text style={styles.labelText}>예정된 작동 시간</Text>
      <TouchableOpacity
        style={[styles.timeButton, styles.blueButton]}
        onPress={showPicker}
      >
        <Text style={styles.timeButtonTextRed}>{formatTime(nextFeedTime)}</Text>
      </TouchableOpacity>

      {/* TimePicker 및 확인 버튼 */}
      {pickerVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={() => setPickerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={nextFeedTime}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "clock"} // Android에서 모달 UI
                onChange={onChange}
                is24Hour={false}
              />
              <Button
                title="확인"
                onPress={() => setPickerVisible(false)}
                color="#007AFF"
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

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
    fontWeight: "500",
    color: "#000000",
    position: "absolute",
    left: 22,
    top: 22,
  },
  petImage: {
    width: 60,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    left: 21,
    top: 68,
  },
  onOffContainer: {
    position: "absolute",
    left: 260,
    top: 20,
  },
  labelText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#000000",
    position: "absolute",
    left: 100,
    top: 105,
  },
  labelText2: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#000000",
    position: "absolute",
    left: 100,
    top: 70,
  },
  timeButton: {
    width: 102, // 버튼의 너비
    height: 21, // 버튼의 높이
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE", // 버튼 배경색
    position: "absolute",
  },
  redButton: {
    top: 69,
    left: 235,
  },
  blueButton: {
    top: 104,
    left: 235,
  },
  timeButtonTextBlack: {
    fontSize: 14, // 버튼 텍스트 크기
    fontWeight: "bold",
    color: "#000000", // 검은 글씨
  },
  timeButtonTextRed: {
    fontSize: 14, // 버튼 텍스트 크기
    fontWeight: "bold",
    color: "#FF0000", // 빨간 글씨
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  pickerWrapper: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFFFFF", // 흰색 박스
    borderRadius: 10,
    alignItems: "center",
  },
});
