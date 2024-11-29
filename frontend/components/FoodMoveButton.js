import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";

export default function FoodMoveButton() {
  const [isModalVisible, setIsModalVisible] = useState(false); // 입력 모달 상태
  const [serialNumber, setSerialNumber] = useState(""); // 시리얼 넘버 입력 상태

  const toggleInputModal = () => {
    setIsModalVisible(!isModalVisible); // 입력 모달 토글
    setSerialNumber(""); // 입력 초기화
  };

  const handleRegister = () => {
    if (serialNumber.trim() === "") {
      // 시리얼 넘버를 입력하지 않았을 경우
      Alert.alert("알림", "시리얼 넘버를 입력해주세요."); // 알림 팝업 표시
    } else {
      // 시리얼 넘버가 입력되었을 경우
      Alert.alert(
        "연결완료!",
        `[${serialNumber}] 스마트 급식기로 연결되었습니다.`
      );
      setIsModalVisible(false); // 모달 닫기
      setSerialNumber(""); // 입력 초기화
    }
  };

  return (
    <>
      {/* 버튼 */}
      <TouchableOpacity style={styles.button} onPress={toggleInputModal}>
        <Image
          source={require("../dogAloneAssets/plus.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* 입력 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleInputModal} // 뒤로가기 버튼 처리
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleInputModal}
            >
              <Image
                source={require("../dogAloneAssets/closeicon.png")}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>스마트 펫케어 연결</Text>

            {/* 입력창 */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>기기 시리얼 넘버</Text>
              <TextInput
                style={styles.input}
                placeholder="기기의 시리얼 넘버를 입력해주세요."
                placeholderTextColor="#A9A9A9"
                value={serialNumber}
                onChangeText={setSerialNumber} // 입력값 업데이트
              />
            </View>

            {/* 등록 완료 버튼 */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRegister} // 팝업으로 변경된 등록 버튼
            >
              <Text style={styles.submitButtonText}>등록 완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 23, // 버튼 너비
    height: 27, // 버튼 높이
    justifyContent: "center", // 이미지 수직 중앙 정렬
    alignItems: "center", // 이미지 수평 중앙 정렬
  },
  image: {
    width: 23, // 이미지 너비
    height: 27, // 이미지 높이
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 어둡게
  },
  modalContainer: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5, // 그림자 효과
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 23,
  },
  closeButtonImage: {
    width: 25,
    height: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    top: 5,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#000",
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#FAF1C3",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
