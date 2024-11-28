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

export default function MenuButton() {
  const [menuVisible, setMenuVisible] = useState(false); // 메뉴 표시 상태
  const [isPetInfoModalVisible, setPetInfoModalVisible] = useState(false); // 반려견 정보 수정 모달
  const [isNoticeModalVisible, setNoticeModalVisible] = useState(false); // 공지사항 모달
  const [isInquiryModalVisible, setInquiryModalVisible] = useState(false); // 문의하기 모달
  const [petName, setPetName] = useState(""); // 반려견 이름
  const [petBreed, setPetBreed] = useState(""); // 반려견 종

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const togglePetInfoModal = () =>
    setPetInfoModalVisible(!isPetInfoModalVisible);
  const toggleNoticeModal = () => setNoticeModalVisible(!isNoticeModalVisible);
  const toggleInquiryModal = () =>
    setInquiryModalVisible(!isInquiryModalVisible);

  const handleSavePetInfo = () => {
    Alert.alert(
      "수정완료!", // 팝업 타이틀 변경
      `반려견 이름: ${petName}\n반려견 종: ${petBreed}` // 내용
    );
    togglePetInfoModal();
  };

  return (
    <>
      {/* 메뉴 버튼 */}
      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <Image
          source={require("../dogAloneAssets/menu.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* 메뉴 리스트 */}
      {menuVisible && (
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              togglePetInfoModal();
              setMenuVisible(false); // 메뉴 닫기
            }}
          >
            <Text style={styles.menuText}>반려견 정보 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={toggleNoticeModal}>
            <Text style={styles.menuText}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={toggleInquiryModal}
          >
            <Text style={styles.menuText}>문의하기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 반려견 정보 수정 모달 */}
      <Modal
        visible={isPetInfoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={togglePetInfoModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={togglePetInfoModal}
            >
              <Image
                source={require("../dogAloneAssets/closeicon.png")}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>반려견 정보 수정</Text>
            <TextInput
              style={styles.textInput}
              placeholder="반려견 이름을 입력하세요"
              value={petName}
              onChangeText={(text) => setPetName(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="반려견 종을 입력하세요"
              value={petBreed}
              onChangeText={(text) => setPetBreed(text)}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSavePetInfo}
            >
              <Text style={styles.saveButtonText}>정보 수정 완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 공지사항 모달 */}
      <Modal
        visible={isNoticeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleNoticeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleNoticeModal}
            >
              <Image
                source={require("../dogAloneAssets/closeicon.png")}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>공지사항</Text>
            <Text style={styles.modalContent}>
              공지사항 내용이 여기에 표시됩니다.
            </Text>
          </View>
        </View>
      </Modal>

      {/* 문의하기 모달 */}
      <Modal
        visible={isInquiryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleInquiryModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleInquiryModal}
            >
              <Image
                source={require("../dogAloneAssets/closeicon.png")}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>문의하기</Text>
            <Text style={styles.modalContent}>
              문의 사항은 아래 이메일로 보내주세요: {"\n"}
              example@example.com
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    left: 291,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 65,
    height: 65,
  },
  menuList: {
    position: "absolute",
    bottom: 75,
    right: 10,
    backgroundColor: "#F4EDF8",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
  },
  menuItem: {
    paddingVertical: 15,
    width: "100%",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#FAF1C3",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonImage: {
    width: 25,
    height: 25,
  },
});
