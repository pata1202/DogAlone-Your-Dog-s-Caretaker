import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert
} from "react-native";
import RecommendButton from "../components/RecommendButton";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import HomeButton from '../components/HomeButton';
import ReportButton from '../components/ReportButton';
import DocuButton from '../components/DocuButton';
import MenuButton from '../components/MenuButton';

import { Audio } from "expo-av";

export default function MainPage() {
  let [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
  });

  const navigation = useNavigation();

  const handleMusicPress = () => {
    alert("음악 재생");
  };

  const handleLightPress = () => {
    alert("조명 조절");
  };

  const handleVideoPress = () => {
    alert("영상 재생");
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isTVOn, setIsTVOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isPetCareOn, setIsPetCareOn] = useState(false);
  const [isAirConOn, setIsAirConOn] = useState(false);

  // 버튼 상태를 토글하는 함수
  const toggleTV = () => setIsTVOn(!isTVOn);
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);
  const togglePetCare = () => setIsPetCareOn(!isPetCareOn);
  const toggleAirCon = () => setIsAirConOn(!isAirConOn);

  const [recording, setRecording] = useState(null); // 녹음 객체
  const [recordingTime, setRecordingTime] = useState("00:00"); // 카운터
  const [isRecording, setIsRecording] = useState(false); // 녹음 상태
  const [timerInterval, setTimerInterval] = useState(null); // 타이머 간격 관리

  // 시간 형식 변환 함수
  const formatTime = (timeInMillis) => {
    const minutes = Math.floor(timeInMillis / 1000 / 60);
    const seconds = Math.floor((timeInMillis / 1000) % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const setupAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true, // iOS에서 녹음을 허용
        playsInSilentModeIOS: true, // 무음 모드에서도 녹음 가능
        staysActiveInBackground: true, // 백그라운드 상태에서도 유지
      });
      console.log("Audio mode set successfully");
    } catch (err) {
      console.error("Failed to set audio mode:", err);
      Alert.alert("오디오 설정 실패", "녹음을 활성화할 수 없습니다.");
    }
  };

  // 녹음 시작 함수
  const startRecording = async () => {
    try {
      console.log("Setting up audio mode...");
      await setupAudioMode();

      console.log("Requesting permissions...");
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("권한 거부", "오디오 녹음을 위해 권한이 필요합니다.");
        return;
      }

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);

      // 타이머 업데이트
      const interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.isRecording) {
          setRecordingTime(formatTime(status.durationMillis));
          if (status.durationMillis >= 60 * 60 * 1000) {
            Alert.alert("최대 녹음 시간을 초과했습니다.");
            stopRecording();
          }
        }
      }, 1000);
      setTimerInterval(interval);
    } catch (err) {
      console.error("Failed to start recording:", err);
      Alert.alert("녹음 오류", "녹음을 시작할 수 없습니다.");
    }
  };

  // 녹음 중지 함수
  const stopRecording = async () => {
    try {
      console.log("Stopping recording...");
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); // 녹음된 파일 경로
        console.log("Recording saved at:", uri);
      }
    } catch (err) {
      console.error("Failed to stop recording:", err);
    } finally {
      setRecording(null);
      setIsRecording(false);
      setRecordingTime("00:00");
      clearInterval(timerInterval);
    }
  };

  // 녹음 버튼 누를 때 처리
  const handleRecordingPress = () => {
    if (!isRecording) {
      startRecording();
    } else {
      Alert.alert(
        "녹음을 종료하시겠습니까?",
        "",
        [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: () => stopRecording() },
        ],
        { cancelable: false }
      );
    }
  };


  // 폰트가 로드되지 않은 경우 로딩 화면을 표시합니다.
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.helloBox}>
        <Text style={styles.helloText}>초코의 주인님, 안녕하세요!</Text>
        <TouchableOpacity onPress={toggleModal}>
        <Image
          source={require("../dogAloneAssets/alarm.png")}
          style={{ width: 46, height: 46, marginTop: -35, marginLeft: 300 }}
        />
        </TouchableOpacity>
      </View>

      {/* 팝업창 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal} // 뒤로가기 시 닫힘
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>🔔알림</Text>
            <Text style={styles.modalContent}>
            강아지가 짖었어요{"\n"}
            {"\n"}🐶:왈왈
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Image
            source={require("../dogAloneAssets/closeicon.png")} // 닫기 아이콘 경로
            style={styles.closeButtonImage}
          />
        </TouchableOpacity>
      </Modal>
        {/* 녹음 박스 */}
      <View style={styles.customBox}>
        <Text style={styles.customBoxText}>
          실시간 반려견 소리를 감지해보세요!
        </Text>
        <Text style={styles.customBoxTextSub}>
          REC 버튼을 누르면 실시간 반려견 소리 분석이 시작됩니다.
        </Text>
        <View style={{ marginTop: -38, marginLeft: 280 }}>
          {/* 녹음 버튼 */}
          <TouchableOpacity onPress={handleRecordingPress}>
            <Image
              source={
                isRecording
                  ? require("../dogAloneAssets/recordingred1.png")
                  : require("../dogAloneAssets/recordingblue1.png")
              }
              style={styles.recordingButton}
            />
          </TouchableOpacity>
          {/* 타이머 */}
          {isRecording && <Text style={styles.timerText}>{recordingTime}</Text>}
        </View>
      </View>

        {/* 서비스 추천 박스 */}
      <View style={styles.mainBox}>
        
        
        <Image
          source={require("../dogAloneAssets/dog1.png")}
          style={styles.dogImage}
        />
        <Image
          source={require("../dogAloneAssets/textbubble1.png")}
          style={styles.textbubbleImage}
        />
        <Text style={styles.bubbleState}>행복해요</Text>

        <View style={styles.dogNameCon}></View>
        <Text style={styles.dogNameState}>초코(닥스훈트)</Text>
        

        <Text style={styles.recommendText}>서비스 추천</Text>
        <Text style={styles.recommend2Text}>
          감정상태에 적합한 서비스를 추천해드려요!
        </Text>
      </View>

      <View style={styles.boxContainer}>
        {/* 첫 번째 상자 */}
        <View>
          <RecommendButton
            onPress={handleMusicPress}
            title="진정되는 음악 재생하기"
          />
        </View>

        <Image
          source={require("../dogAloneAssets/miniMusic.png")}
          style={{ position: "absolute", marginTop: 7, marginLeft: 13 }}
        />

        {/* 두 번째 상자 */}
        <View>
          <RecommendButton
            onPress={handleLightPress}
            title="집안 조명 조절하기"
          />
        </View>

        <Image
          source={require("../dogAloneAssets/miniLight.png")}
          style={{ position: "absolute", marginTop: 41, marginLeft: 12 }}
        />

        {/* 세 번째 상자 */}
        <View style={styles.box}>
          <RecommendButton
            onPress={handleVideoPress}
            title="진정되는 영상 재생하기"
          />
        </View>
        
        <Image
          source={require("../dogAloneAssets/miniVideo.png")}
          style={{ position: "absolute", marginTop: 75, marginLeft: 14 }}
        />

      </View>
      <Text style={styles.normalHome1}>식사 제어</Text>
      <View style={styles.foodCon}>
      <Image source={require('../dogAloneAssets/food.png')} style={styles.foodImage} />
          <Text>스마트 급식기</Text>
      </View>
      <Text style={styles.normalHome}>우리집 환경</Text>

      <TouchableOpacity onPress={() => navigation.navigate("smartHome")}>
        <Text style={styles.normalAdjust}>환경 조정하러 가기▶</Text>
      </TouchableOpacity>

      {/* MiniBox 전체 컨테이너 */}
      <View style={styles.miniBoxMainContainer}>
        {/* 첫 번째 줄 */}
        <View style={styles.miniBoxRow}>
          <View style={styles.miniBox}>
          <TouchableOpacity onPress={toggleTV}>
              <Image
                source={
                  isTVOn
                    ? require("../dogAloneAssets/onbutton.png")
                    : require("../dogAloneAssets/offbutton.png")
                }
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <Text style={styles.miniBoxText}>티비</Text>
          </View>
          <View style={styles.miniBox}>
          <TouchableOpacity onPress={toggleSpeaker}>
              <Image
                source={
                  isSpeakerOn
                    ? require("../dogAloneAssets/onbutton.png")
                    : require("../dogAloneAssets/offbutton.png")
                }
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <Text style={styles.miniBoxText}>스피커</Text>
          </View>
        </View>
 {/* 두 번째 줄 */}
 <View style={styles.miniBoxRow}>
          <View style={styles.miniBox}>
            <TouchableOpacity onPress={togglePetCare}>
              <Image
                source={
                  isPetCareOn
                    ? require("../dogAloneAssets/onbutton.png")
                    : require("../dogAloneAssets/offbutton.png")
                }
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <Text style={styles.miniBoxText2}>펫케어</Text>
          </View>
          <View style={styles.miniBox}>
            <TouchableOpacity onPress={toggleAirCon}>
              <Image
                source={
                  isAirConOn
                    ? require("../dogAloneAssets/onbutton.png")
                    : require("../dogAloneAssets/offbutton.png")
                }
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <Text style={styles.miniBoxText2}>에어컨</Text>
          </View>
        </View>
      </View>

      <Image
        source={require("../dogAloneAssets/tv.png")}
        style={{
          width: 71,
          height: 60,
          marginTop: -235,
          marginLeft: 15,
        }}
      />
      <Image
        source={require("../dogAloneAssets/speaker.png")}
        style={{ width: 78, height: 92.76, marginTop: -75, marginLeft: 205 }}
      />
      <Image
        source={require("../dogAloneAssets/pet.png")}
        style={{ width: 110, height: 73.25, marginTop: 38, marginLeft: -1 }}
      />
      <Image
        source={require("../dogAloneAssets/air.png")}
        style={{ width: 27, height: 59, marginTop: -65, marginLeft: 228 }}
      />
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF", // 배경색 설정
    marginTop: 50,
  },

  helloBox: {
    position: "absolute",
    marginTop: 5,
    alignSelf: "center",
    width: 393,
    height: 77,
    backgroundColor: "#FAF1C3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  helloText: {
    marginTop: 28,
    marginLeft: 38,
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
    width: "100%",
  },

  customBox: {
    position: "absolute",
    marginTop: 315,
    alignSelf: "center",
    width: 351,
    height: 67,
    backgroundColor: "#FAF1C3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  customBoxText: {
    marginTop: 15,
    marginLeft: 25,
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
    
  },
  customBoxTextSub:{
    top:5,
    fontSize: 11,
    marginLeft: 25,
    color: "rgba(51, 51, 51, 0.7)",
  },
  mainBox: {
    position: "absolute",
    marginTop: 100,
    alignSelf: "center",
    width: 351,
    height: 196, // Figma의 높이를 반영
    backgroundColor: '#FFFFFF', // 배경색
    borderWidth: 0.5, // Stroke 두께
    borderColor: "#DADADA", // Stroke 색상
    borderRadius: 10, // 모서리 둥글기
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Drop shadow offset
    shadowOpacity: 0.1, // 투명도
    shadowRadius: 4, // 그림자 번짐 정도
    elevation: 5, // Android용 그림자 효과
  },
  normalHome: {
    marginTop: 150,
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "Inter_800ExtraBold",
  },
  foodCon:{
    alignSelf: "center",
    top:145,
    width: 351, // 너비
    height: 57, // 높이
    backgroundColor: "#FFFFFF", // 배경색
    borderRadius: 10, // 모서리 둥글기
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 오프셋
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 4, // 그림자 번짐 정도
    elevation: 5, // Android용 그림자 효과
  },
  normalHome1:{
    position:"absolute",
    marginTop: 395,
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "Inter_800ExtraBold",
  },
  normalAdjust: {
    marginTop: -14,
    marginLeft: 278,
    fontSize: 10,
    fontFamily: "Inter_800ExtraBold",
    textDecorationLine: "underline",
  },
  miniBoxMainContainer: {
    flexDirection: "column", // 두 줄을 세로로 정렬
    alignSelf: "center",
    marginTop: 8,
    width: 351, // 전체 컨테이너의 너비
  },
  miniBoxRow: {
    flexDirection: "row", // 가로로 정렬
    justifyContent: "space-between", // 박스 간 간격 균등
    marginBottom: 15, // 줄 간 간격
  },
  miniBox: {
    width: 165,
    height: 108,
    backgroundColor: "rgba(9, 9, 9, 0.07)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  dogBoxImage: {

    width: 149,
    height: 181,
    marginTop: 15,
    marginLeft: 20,
  },

  dogImage: {
    position:"absolute",
    width: 101,
    height: 93,
    marginTop: 53,
    marginLeft: 35,
  },

  textbubbleImage: {
    position:"absolute",
    width: 80,
    height: 24,
    marginTop: 16,
    marginLeft: 75,
  },

  bubbleState: {
    position: "absolute",
    marginTop: 21,
    marginLeft: 96,
    fontSize: 12,
    fontFamily: "Inter_800ExtraBold",
    width: "100%",
  },

  dogNameState: {
    position:"absolute",
    marginTop: 156,
    marginLeft: 51,
    fontSize: 12,
    fontFamily: "Inter_800ExtraBold",
  },

  dogNameCon:{
    position:"absolute",
    width: 90, // 너비
    height: 20, // 높이
    backgroundColor: "#FAF1C3", // 배경색
    borderRadius: 10, // 모서리 둥글기
    marginTop: 154,
    marginLeft: 42,
  },

  recommendText: {
    position: "absolute",
    marginTop: 33,
    marginLeft: 180,
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
    fontWeight: "bold",
  },
  recommend2Text: {
    position: "absolute",
    marginTop: 58,
    marginLeft: 180,
    fontSize: 8,
    fontFamily: "Inter_800ExtraBold",
    color: "rgba(0, 0, 0, 0.6)",
  },

  boxContainer: {
    flexDirection: "column", // 두 줄을 세로로 정렬
    marginTop: 180,
    marginLeft: 182,
    left: 15,
  },

  buttonImage: {
    width: 55,
    height: 25,
    marginTop: 69,
    marginLeft: 89,
  },

  miniBoxText: {
    marginTop: -15,
    marginLeft: 23.8,
    fontSize: 16, // 텍스트 크기
  },

  miniBoxText2: {
    marginTop: -15,
    marginLeft: 23,
    fontSize: 16, // 텍스트 크기
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 320,
    height: 500,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalContent: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },

  closeButtonImage: {
    position: "absolute",
    marginTop: -645,
    marginLeft: 305,
    width: 32,
    height: 32,
  },

  recordingButton: {
    top:5,
    width: 65,
    height: 26,
  },
  timerText: {
    marginTop: -42.5,
    marginLeft: 7.7,
    fontSize: 15,
    fontWeight: "bold",
  },
});