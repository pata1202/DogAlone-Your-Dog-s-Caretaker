import React, { useState,useEffect } from "react";
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

export default function ReportPage() {
  const [viewMode, setViewMode] = useState("일별"); // '일별', '주별', '월별'
  const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 날짜
  const [showCalendarModal, setShowCalendarModal] = useState(false); // 캘린더 모달 표시 상태
  const [emotionData, setEmotionData] = useState({
    bark: 0,
    growl: 0,
    grunt: 0,
    howl: 0,
    whimper: 0,
    yip: 0,
  });
  const [reportData, setReportData] = useState([]); // 두 번째 쿼리 결과 저장
  
  // 데이터 로드 함수
  const fetchEmotionData = async () => {
    try {
      const response = await fetch("데이터 베이스 주소"); // 서버의 API 엔드포인트
      const result = await response.json();

      // 첫 번째 쿼리 결과를 emotionData에 저장
      if (result.emotionCounts) {
        setEmotionData(result.emotionCounts);
      }

      // 두 번째 쿼리 결과를 reportData에 저장
      if (result.reportDetails) {
        setReportData(result.reportDetails);
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchEmotionData();
  }, []);

  // 최대 막대 높이 (그래프의 전체 높이에 맞춰 조정)
  const MAX_BAR_HEIGHT = 210;

  // 데이터 값을 기준으로 비율 계산
  const calculateBarHeight = (value) => {
    const maxValue = Math.max(
      emotionData.bark,
      emotionData.growl,
      emotionData.grunt,
      emotionData.whimper,
      emotionData.howl,
      emotionData.yip,
    );
    return (value / maxValue) * MAX_BAR_HEIGHT;
  };

  // 날짜 포맷 함수 (yyyy-mm-dd)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 주별 날짜 범위 계산
  const getWeekRange = (date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay(); // 0: 일요일, 1: 월요일 ...
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);

    // 월요일로 이동 (일요일이면 -6일, 그 외는 -dayOfWeek + 1일)
    startOfWeek.setDate(
      currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    );
    // 일요일로 이동 (월요일 기준으로 +6일)
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return `${formatDate(startOfWeek)} ~ ${formatDate(endOfWeek)}`;
  };

  // 날짜 범위 텍스트 반환
  const getDateRange = () => {
    if (viewMode === "일별") {
      return formatDate(selectedDate); // 선택된 날짜 유지
    } else if (viewMode === "주별") {
      return getWeekRange(selectedDate); // 주별 날짜 범위
    } else if (viewMode === "월별") {
      const year = selectedDate.getFullYear();
      const month = selectedDate.toLocaleString("ko-KR", { month: "2-digit" }); // 한국어로 '11월' 형식
      return `${year}년 ${month}`;
    }
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
              current={formatDate(selectedDate)} // 현재 선택된 날짜
              minDate={formatDate(
                new Date(new Date().setMonth(new Date().getMonth() - 6))
              )} // 6개월 전 날짜 제한
              maxDate={formatDate(new Date())} // 오늘까지 가능
              onDayPress={onDateSelect} // 날짜 선택 처리
              markedDates={{
                [formatDate(selectedDate)]: {
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
            onChange={(mode) => {
              setViewMode(mode);
              if (mode === "일별") {
                setSelectedDate(selectedDate);
              }
            }}
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
        <Text style={styles.date}>{getDateRange()} 울음 리포트</Text>

        {/* 리포트 박스 */}
        <View style={styles.reportBox}>
          {/* 노란색 막대 */}
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { height: calculateBarHeight(emotionData.bark) },
              ]}
            />
            <View
              style={[
                styles.bar,
                { height: calculateBarHeight(emotionData.growl) },
              ]}
            />
            <View
              style={[
                styles.bar,
                { height: calculateBarHeight(emotionData.grunt) },
              ]}
            />
            <View
              style={[
                styles.bar,
                { height: calculateBarHeight(emotionData.howl) },
              ]}
            />
            <View
              style={[
                styles.bar,
                { height: calculateBarHeight(emotionData.whimper) },
              ]}
            />
            <View
              style={[
                styles.bar,
                { height: calculateBarHeight(emotionData.yip) },
              ]}
            />
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
          (item, index) =>
            `• [${item.advice}] ${item.description}` // advice와 description 연결
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
    left:122,
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
  reportResult:{
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
});