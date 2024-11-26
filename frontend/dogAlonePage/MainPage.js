import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import RecommendButton from "../components/RecommendButton";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import HomeButton from "../components/HomeButton";
import ReportButton from "../components/ReportButton";
import DocuButton from "../components/DocuButton";
import MenuButton from "../components/MenuButton";

import { Audio } from "expo-av";
import io from "socket.io-client";
import * as FileSystem from 'expo-file-system';


const socket = io("http://192.168.0.48:3000"); // <your-computer-ip>를 로컬 IP로 변경

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

  const toggleTV = () => setIsTVOn(!isTVOn);
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);
  const togglePetCare = () => setIsPetCareOn(!isPetCareOn);
  const toggleAirCon = () => setIsAirConOn(!isAirConOn);

  const [recording, setRecording] = useState(null);
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [isRecording, setIsRecording] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

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
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      console.log("Audio mode set successfully");
    } catch (err) {
      console.error("Failed to set audio mode:", err);
      Alert.alert("오디오 설정 실패", "녹음을 활성화할 수 없습니다.");
    }
  };

  const recordingOptions = {
    isMeteringEnabled: true,
    android: {
      extension: ".wav",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_PCM_16BIT,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

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
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
      setIsRecording(true);

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

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the backend server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the backend server");
    });

    // 클린업: 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  const stopRecording = async () => {
    try {
        console.log("Stopping recording...");
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log("Recording saved at:", uri);

            // 파일을 Base64로 변환
            const fileData = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Base64 데이터를 소켓을 통해 전송
            socket.emit("audioStream", { base64: fileData });  // fileData로 변경
            console.log("Base64 데이터 길이:", fileData.length);
            console.log("Audio data sent to the server");
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

      <View style={styles.customBox}>
        <Text style={styles.customBoxText}>
          실시간 반려견 소리를 감지해보세요!
        </Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require("../dogAloneAssets/recordingblue.png")}
            style={{ marginTop: -38, marginLeft: 270, width: 60, height: 60 }}
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

      <View style={styles.customBox}>
        <Text style={styles.customBoxText}>
          실시간 반려견 소리를 감지해보세요!
        </Text>
        <View style={{ marginTop: -38, marginLeft: 280 }}>
          {/* 녹음 버튼 */}
          <TouchableOpacity onPress={handleRecordingPress}>
            <Image
              source={
                isRecording
                  ? require("../dogAloneAssets/recordingred.png")
                  : require("../dogAloneAssets/recordingblue.png")
              }
              style={styles.recordingButton}
            />
          </TouchableOpacity>
          {/* 타이머 */}
          {isRecording && <Text style={styles.timerText}>{recordingTime}</Text>}
        </View>
      </View>

      <View style={styles.mainBox}>
        <Image
          source={require("../dogAloneAssets/dogbox.png")}
          style={styles.dogBoxImage}
        />
        <Image
          source={require("../dogAloneAssets/dog.png")}
          style={styles.dogImage}
        />
        <Image
          source={require("../dogAloneAssets/textbubble.png")}
          style={styles.textbubbleImage}
        />
        <Text style={styles.bubbleState}>행복해요</Text>
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
    marginTop: 335,
    alignSelf: "center",
    width: 351,
    height: 77,
    backgroundColor: "#FAF1C3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  customBoxText: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
  },

  mainBox: {
    position: "absolute",
    marginTop: 100,
    alignSelf: "center",
    width: 351,
    height: 215,
    backgroundColor: "rgba(9, 9, 9, 0.07)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  normalHome: {
    marginTop: 145,
    marginLeft: 15,
    fontSize: 20,
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
    width: 112,
    height: 98,
    marginTop: -135,
    marginLeft: 35,
  },

  textbubbleImage: {
    width: 72,
    height: 28,
    marginTop: -120,
    marginLeft: 80,
  },

  bubbleState: {
    marginTop: -21,
    marginLeft: 96,
    fontSize: 12,
    fontFamily: "Inter_800ExtraBold",
    width: "100%",
  },

  dogNameState: {
    marginTop: 113,
    marginLeft: 60,
    fontSize: 12,
    fontFamily: "Inter_800ExtraBold",
  },

  recommendText: {
    marginTop: -168,
    marginLeft: 185,
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
    fontWeight: "bold",
  },
  recommend2Text: {
    marginTop: 1,
    marginLeft: 185,
    fontSize: 8,
    fontFamily: "Inter_800ExtraBold",
    color: "rgba(0, 0, 0, 0.6)",
  },

  boxContainer: {
    flexDirection: "column", // 두 줄을 세로로 정렬
    marginTop: 175,
    marginLeft: 182,
    left: 12,
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
    width: 60,
    height: 60,
  },
  timerText: {
    marginTop: -42.5,
    marginLeft: 7.7,
    fontSize: 15,
    fontWeight: "bold",
  },
});
