import axios from "axios";
import React, { useState, useEffect } from "react"
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import BackButton from "../components/BackButton";
import DayMonthButton from "../components/DayMonthButton";
import HomeButton from "../components/HomeButton";
import ReportButton from "../components/ReportButton";
import DocuButton from "../components/DocuButton";
import MenuButton from "../components/MenuButton";
import { Calendar } from "react-native-calendars";
import { getDailyReport, getWeeklyReport, getMonthlyReport } from "../libs/api";

export default function ReportPage() {
  const [viewMode, setViewMode] = useState("일별"); // '일별', '주별', '월별'
  const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 날짜
  const [showCalendarModal, setShowCalendarModal] = useState(false); // 캘린더 모달 표시 상태
  const [emotionData, setEmotionData] = useState({
    bark_count: 0,
    growl_count: 0,
    grunt_count: 0,
    howl_count: 0,
    whimper_count: 0,
    yip_count: 0,
  });
  const [reportData, setReportData] = useState([]); // 두 번째 쿼리 결과 저장
  const [dateLabel, setDateLabel] = useState("데이터를 불러오는 중입니다..."); // 백엔드에서 전달받는 날짜 범위 텍스트

  // 데이터 로드 함수
  const fetchEmotionData = async () => {
    try {
      let result;
      if (viewMode === "일별") {
        result = await getDailyReport();
      } else if (viewMode === "주별") {
        result = await getWeeklyReport();
      } else if (viewMode === "월별") {
        result = await getMonthlyReport();
      }

      if (result.emotionCounts) {
        setEmotionData(result.emotionCounts); // 감정 데이터 업데이트
      } else {
        setEmotionData({
          bark_count: 0,
          growl_count: 0,
          grunt_count: 0,
          howl_count: 0,
          whimper_count: 0,
          yip_count: 0,
        }); // 기본 값 설정
      }

      if (result.reportDetails) {
        setReportData(result.reportDetails); // 리포트 데이터 업데이트
      } else {
        setReportData([]); // 데이터가 없을 경우 빈 배열 설정
      }

      if (result.dateLabel) {
        setDateLabel(result.dateLabel); // 날짜 범위 텍스트 업데이트
      } else {
        setDateLabel("데이터를 불러오는 중입니다...");
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setDateLabel("데이터를 불러오는 중입니다");
    }
  };

  useEffect(() => {
    fetchEmotionData();
  }, [viewMode, selectedDate]);

  // 최대 막대 높이 (그래프의 전체 높이에 맞춰 조정)
  const MAX_BAR_HEIGHT = 210;

  // 데이터 값을 기준으로 비율 계산
  const calculateBarHeight = (value) => {
    const maxValue = Math.max(
      emotionData.bark_count,
      emotionData.growl_count,
      emotionData.grunt_count,
      emotionData.howl_count,
      emotionData.whimper_count,
      emotionData.yip_count
    );

    // 최대값이 0인 경우를 방지하여 비율 계산
    return maxValue > 0 ? (value / maxValue) * MAX_BAR_HEIGHT : 0;
  };

  // 캘린더에서 날짜 선택 시 처리
  const onDateSelect = (date) => {
    setSelectedDate(new Date(date.dateString)); // 선택한 날짜 업데이트
    setViewMode("일별"); // "일별" 버튼 선택
    setShowCalendarModal(false); // 캘린더 모달 닫기
  };

  return (
    <View style={styles.container}>
      {/* 상단 영역 */}
      <View style={styles.topbox}>
        <Text style={styles.toptext}>반려견 울음 리포트</Text>
        <Image
          source={require("../dogAloneAssets/logo.png")}
          style={styles.logo}
        />
        <BackButton />
      </View>

      {/* 캘린더 모달 */}
      <Modal
        visible={showCalendarModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={selectedDate.toISOString().slice(0, 10)} // 현재 선택된 날짜
              minDate={new Date(new Date().setMonth(new Date().getMonth() - 6))
                .toISOString()
                .slice(0, 10)} // 6개월 전 날짜 제한
              maxDate={new Date().toISOString().slice(0, 10)} // 오늘까지 가능
              onDayPress={onDateSelect} // 날짜 선택 처리
              markedDates={{
                [selectedDate.toISOString().slice(0, 10)]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#FAF1C3",
                },
              }}
              theme={{
                todayTextColor: "#007BFF",
                arrowColor: "#007BFF",
                selectedDayBackgroundColor: "#FAF1C3",
                selectedDayTextColor: "#000000",
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendarModal(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 스크롤 가능한 영역 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.DayCon}>
          {/* 일별/주별/월별 버튼 */}
          <DayMonthButton
            selected={viewMode}
            onChange={(mode) => setViewMode(mode)}
          />
          {/* 캘린더 버튼 */}
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowCalendarModal(true)}
          >
            <Image
              source={require("../dogAloneAssets/calendar.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 날짜 텍스트 */}
        <Text style={styles.date}>{dateLabel}</Text>

        {/* 리포트 박스 */}
        <View style={styles.reportBox}>
          {/* 노란색 막대 */}
          <View style={styles.barContainer}>
            {[
              "bark_count",
              "growl_count",
              "grunt_count",
              "howl_count",
              "whimper_count",
              "yip_count",
            ].map((emotion) => (
              <View
                key={emotion}
                style={[
                  styles.bar,
                  { height: calculateBarHeight(emotionData[emotion]) },
                ]}
              />
            ))}
          </View>

          {/* 원래 선 복구 */}
          <View style={styles.lineBottom}></View>

          <Image
            source={require("../dogAloneAssets/report10.png")}
            style={styles.report1}
          />
          <Image
            source={require("../dogAloneAssets/report11.png")}
            style={styles.report2}
          />
          <Image
            source={require("../dogAloneAssets/report12.png")}
            style={styles.report3}
          />
          <Image
            source={require("../dogAloneAssets/report13.png")}
            style={styles.report4}
          />
          <Image
            source={require("../dogAloneAssets/report14.png")}
            style={styles.report6}
          />
          <Image
            source={require("../dogAloneAssets/report15.png")}
            style={styles.report7}
          />
          <Text style={styles.text1}>흥분</Text>
          <Text style={styles.text2}>두려움</Text>
          <Text style={styles.text3}>만족</Text>
          <Text style={styles.text4}>불안</Text>
          <Text style={styles.text6}>외로움</Text>
          <Text style={styles.text7}>아픔</Text>
        </View>

        <View style={styles.feedBox}>
          <Image
            source={require("../dogAloneAssets/report5.png")}
            style={styles.report5}
          />
          <Text style={styles.text5}>리포트 분석</Text>
          <Text style={styles.reportResult}>
            {reportData.length > 0
              ? reportData
                  .map(
                    (item) => `• [${item.advice}] ${item.description}` // advice와 description 연결
                  )
                  .join("\n") // 각 결과를 줄바꿈(\n)으로 연결
              : "결과를 가져오는 중입니다..."}
          </Text>
        </View>
      </ScrollView>

      {/* 하단 네비게이션 바 */}
      <View style={styles.bottomBar}>
        <HomeButton />
        <ReportButton />
        <DocuButton />
        <MenuButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 48,
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // 막대 사이를 균등 분배
    alignItems: "flex-end",
    height: 180,
    width: "100%", // 부모 박스 크기에 맞추기
    paddingHorizontal: 10, // 양쪽 여백 최소화
  },
  bar: {
    width: 20, // 막대 너비
    backgroundColor: "#FAF1C3",
    marginHorizontal: 2, // 막대 간 간격 조정
    top: 179,
  },
  topbox: {
    width: "100%",
    height: 60,
    backgroundColor: "#FAF1C3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // 스크롤 뷰 위로 보이게 설정
  },
  toptext: {
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "500",
    color: "#000000",
  },
  logo: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 20,
  },
  scrollContainer: {
    paddingBottom: 100, // 하단바 공간을 확보하기 위해 추가 여백
  },
  DayCon: {
    marginTop: 20,
    alignItems: "center",
  },
  date: {
    fontFamily: "JockeyOne-Regular",
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  reportBox: {
    width: 345,
    height: 448,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#9D9D9D",
    alignSelf: "center",
  },
  lineBottom: {
    height: 1,
    width: "100%",
    backgroundColor: "#9D9D9D",
    position: "absolute",
    top: 359,
  },
  report1: {
    position: "absolute",
    top: 370,
    left: 12,
  },
  report2: {
    position: "absolute",
    top: 370,
    left: 67,
  },
  report3: {
    position: "absolute",
    top: 370,
    left: 122,
  },
  report4: {
    position: "absolute",
    top: 370,
    left: 177,
  },
  report7: {
    position: "absolute",
    top: 370,
    left: 232,
  },
  report6: {
    position: "absolute",
    top: 370,
    left: 287,
  },
  text1: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 420,
    left: 23,
  },
  text2: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 420,
    left: 72,
  },
  text3: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 420,
    left: 133,
  },
  text4: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 420,
    left: 188,
  },
  text7: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 420,
    left: 242,
  },
  text6: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 420,
    left: 292,
  },
  feedBox: {
    width: 345,
    height: 152,
    backgroundColor: "#FAF1C3",
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  report5: {
    width: 23,
    height: 21,
    left: 16,
    top: 17,
  },
  text5: {
    left: 48,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    top: -3,
  },
  reportResult: {
    left: 48,
    fontFamily: "Inter",
    fontSize: 16,
    color: "#000000",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around", // 버튼 간격 균등 분배
    alignItems: "center",
  },
  calendarButton: {
    position: "absolute",
    left: 313,
    top: -7,
  },
  calendarIcon: {
    width: 40,
    height: 40,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
