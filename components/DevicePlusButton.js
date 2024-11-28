import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
} from "react-native";

export default function DevicePlusButton() {
  const [isDeviceModalVisible, setDeviceModalVisible] = useState(false); // LG 스마트홈 기기 수정 모달
  const [selectedDevice, setSelectedDevice] = useState(""); // 선택된 LG 기기
  const [serialNumber, setSerialNumber] = useState(""); // 기기 시리얼 번호
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  const deviceOptions = [
    "LG 에어컨",
    "LG 스피커",
    "LG 티비",
    "LG 스마트 급식기",
    "LG 조명",
    "LG 급수기",
  ];

  const toggleDeviceModal = () => {
    setDeviceModalVisible(!isDeviceModalVisible);
    setIsDropdownOpen(false); // 드롭다운 초기화
    setSelectedDevice(""); // 선택 초기화
    setSerialNumber(""); // 시리얼 번호 초기화
  };

  const handleDeviceSelection = (device) => {
    setSelectedDevice(device);
    setIsDropdownOpen(false);
  };

  const saveDeviceInfo = () => {
    if (selectedDevice && serialNumber) {
      alert(`기기 추가: ${selectedDevice}\n시리얼 번호: ${serialNumber}`);
      toggleDeviceModal();
    } else {
      alert("기기와 시리얼 번호를 입력해주세요.");
    }
  };

  return (
    <>
      {/* 버튼 */}
      <TouchableOpacity style={styles.button} onPress={toggleDeviceModal}>
        <Image
          source={require("../dogAloneAssets/plus.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* LG 스마트홈 기기 수정 모달 */}
      <Modal
        visible={isDeviceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleDeviceModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleDeviceModal}
            >
              <Image
                source={require("../dogAloneAssets/closeicon.png")}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>스마트홈 기기 추가</Text>

            {/* 드롭다운 레이블 */}
            <Text style={styles.label}>기기 종류 선택</Text>
            {/* 드롭다운 버튼 */}
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownText}>
                {selectedDevice || "추가할 기기를 선택해주세요"}
              </Text>
              <Image
                source={require("../dogAloneAssets/arrow.png")}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            {/* 드롭다운 리스트 */}
            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {deviceOptions.map((device, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleDeviceSelection(device)}
                  >
                    <Text style={styles.dropdownItemText}>{device}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* 텍스트 입력 레이블 */}
            <Text style={styles.label}>기기 시리얼 넘버</Text>
            {/* 시리얼 번호 입력 */}
            <TextInput
              style={styles.textInput}
              placeholder="기기의 시리얼 넘버를 입력해주세요"
              value={serialNumber}
              onChangeText={(text) => setSerialNumber(text)}
            />

            {/* 저장 버튼 */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveDeviceInfo}
            >
              <Text style={styles.saveButtonText}>등록 완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 23,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 23,
    height: 27,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%", // 넓이 조정
    backgroundColor: "#fff",
    borderRadius: 20, // 테두리 둥글게
    paddingVertical: 30, // 위아래 여백 추가
    paddingHorizontal: 20, // 양옆 여백 추가
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20, // 제목 아래 여백 추가
  },
  label: {
    fontSize: 16,
    marginBottom: 8, // 라벨과 입력 필드 사이 간격
    alignSelf: "flex-start", // 왼쪽 정렬
    color: "#000",
  },
  dropdownButton: {
    width: "100%",
    height: 50, // 높이를 약간 늘림
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15, // 내부 여백
    backgroundColor: "#F4F4F4",
    borderRadius: 10, // 테두리 둥글게
    marginBottom: 20, // 필드 사이 간격 추가
    borderColor: "#DADADA",
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 14,
    color: "#A9A9A9", // 플레이스홀더 스타일
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  dropdownList: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  textInput: {
    width: "100%",
    height: 50, // 높이를 드롭다운과 맞춤
    backgroundColor: "#F4F4F4",
    borderRadius: 10, // 테두리 둥글게
    borderWidth: 1,
    borderColor: "#DADADA",
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 20,
    color: "#000", // 텍스트 색상
  },
  saveButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FAF1C3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  closeButtonImage: {
    width: 20,
    height: 20,
  },
});
