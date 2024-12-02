import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import ReportButton from "../components/ReportButton";
import DocuButton from "../components/DocuButton";
import MenuButton from "../components/MenuButton";
import RedButton from "../components/RedButton";

export default function FoodPage() {
  const [schedules, setSchedules] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("time"); // 'time', 'days', 'amount'
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [temporaryTime, setTemporaryTime] = useState(new Date()); // 임시로 선택된 시간

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      { time: "00:00", days: "매일", amount: "1회" },
    ]);
  };

  const deleteSchedule = () => {
    if (schedules.length > 0) {
      const updatedSchedules = [...schedules];
      updatedSchedules.pop(); // 마지막 항목 제거
      setSchedules(updatedSchedules);
    }
  };

  const updateSchedule = (index, key, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][key] = value;
    setSchedules(updatedSchedules);
  };

  const openPicker = (index, type) => {
    setCurrentIndex(index);
    setModalType(type);
    setModalVisible(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTemporaryTime(selectedTime); // 임시로 시간 저장
    }
  };

  const confirmTimeSelection = () => {
    const time = temporaryTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    updateSchedule(currentIndex, "time", time); // 확정된 시간 업데이트
    setShowTimePicker(false); // 시간 선택기 닫기
  };

  const daysOptions = ["월", "화", "수", "목", "금", "토", "일", "매일"];
  const amountOptions = ["1회", "2회", "3회", "4회"];

  return (
    <View style={styles.container}>
      <View style={styles.topbox}>
        <Text style={styles.toptext}>스마트 급식기</Text>
        <BackButton />
      </View>
      <Text style={styles.mainText}>급식 스케줄</Text>
      <View style={styles.lineBottom}></View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {schedules.map((schedule, index) => (
          <View key={index} style={styles.scheduleBox}>
            {/* 시간 */}
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(index);
                setTemporaryTime(new Date()); // 초기값 설정
                setShowTimePicker(true);
              }}
              style={styles.timeBox}
            >
              <Text style={styles.timeText}>{schedule.time}</Text>
            </TouchableOpacity>
            <View style={styles.dateCon}>
              {/* 날짜 */}
              <TouchableOpacity onPress={() => openPicker(index, "days")}>
                <Text style={styles.detailText}>날짜: {schedule.days}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.countCon}>
              {/* 급식횟수 */}
              <TouchableOpacity onPress={() => openPicker(index, "amount")}>
                <Text style={styles.detailText}>
                  / 급식횟수: {schedule.amount}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Red Button */}
            <View style={styles.redButtonCon}>
              <RedButton style={styles.redButton} />
            </View>
          </View>
        ))}
        {/* 추가 버튼 */}
        <TouchableOpacity style={styles.addButton} onPress={addSchedule}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <HomeButton></HomeButton>
        <ReportButton></ReportButton>
        <DocuButton></DocuButton>
        <MenuButton></MenuButton>
      </View>

      {/* 박스 삭제 버튼 */}
      <TouchableOpacity style={styles.deleteButton} onPress={deleteSchedule}>
        <Text style={styles.deleteButtonText}>delete</Text>
      </TouchableOpacity>

      {/* 시간 선택기 */}
      {showTimePicker && (
        <View style={styles.timePickerOverlay}>
          <View style={styles.timePickerContainer}>
            <DateTimePicker
              value={temporaryTime}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={handleTimeChange}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmTimeSelection}
            >
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 날짜/급식횟수 선택 Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalType === "days" &&
              daysOptions.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => {
                    updateSchedule(currentIndex, "days", day);
                    setModalVisible(false);
                  }}
                  style={styles.modalOption}
                >
                  <Text>{day}</Text>
                </TouchableOpacity>
              ))}
            {modalType === "amount" &&
              amountOptions.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  onPress={() => {
                    updateSchedule(currentIndex, "amount", amount);
                    setModalVisible(false);
                  }}
                  style={styles.modalOption}
                >
                  <Text>{amount}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topbox: {
    width: 393,
    height: 60,
    backgroundColor: "#FAF1C3",
    justifyContent: "center",
    alignItems: "center",
    top: 48,
  },
  toptext: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000000",
  },
  mainText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "800",
    top: 136,
    left: 20,
  },
  lineBottom: {
    height: 1,
    width: "100%",
    backgroundColor: "#DADADA",
    position: "absolute",
    top: 777,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  scrollView: {
    top: 140,
    bottom: 10,
  },
  scheduleBox: {
    width: 360,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DADADA",
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
  timeBox: {
    position: "absolute",
    left: 24,
    top: 17,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  detailText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  redButton: {
    alignSelf: "flex-end",
  },
  addButton: {
    width: 360,
    height: 38,
    backgroundColor: "#FAF3CE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  deleteButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    padding: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  timePickerContainer: {
    position: "absolute",
    top: 200,
    width: 400,
    height: 400,
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
    backgroundColor: "rgba(0, 0, 0, 0.0)", // 배경 흐림 효과
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FAF3CE",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  dateCon: {
    position: "absolute",
    top: 46,
    left: 24,
  },
  countCon: {
    position: "absolute",
    top: 46,
    left: 85,
  },
  redButtonCon: {
    position: "absolute",
    left: 293,
    top: 30,
  },
  timePickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
    justifyContent: "center",
    alignItems: "center",
  },
  timePickerContainer: {
    backgroundColor: "#FFFFFF", // 시간 선택기 배경색
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Android 그림자
  },
  confirmButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FAF3CE",
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
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
