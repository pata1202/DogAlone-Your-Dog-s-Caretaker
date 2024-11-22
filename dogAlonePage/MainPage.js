import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import RecommendButton from "../components/RecommendButton";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import HomeButton from '../components/HomeButton';
import ReportButton from '../components/ReportButton';
import DocuButton from '../components/DocuButton';
import MenuButton from '../components/MenuButton';

export default function Main() {
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

  // 폰트가 로드되지 않은 경우 로딩 화면을 표시합니다.
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.helloBox}>
        <Text style={styles.helloText}>초코의 주인님, 안녕하세요!</Text>
        <Image
          source={require("../dogAloneAssets/alarm.png")}
          style={{ width: 46, height: 46, marginTop: -35, marginLeft: 300 }}
        />
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
            <Text style={styles.modalTitle}>공지사항</Text>
            <Text style={styles.modalContent}>dogalone의 공지사항</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Image
            source={require("../dogAloneAssets/closeicon.png")} // 닫기 아이콘 경로
            style={styles.closeButtonImage}
          />
        </TouchableOpacity>
      </Modal>

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
        <Text style={styles.bubbleState}>불안해요</Text>
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

        {/* 두 번째 상자 */}
        <View>
          <RecommendButton
            onPress={handleLightPress}
            title="집안 조명 조절하기"
          />
        </View>

        {/* 세 번째 상자 */}
        <View style={styles.box}>
          <RecommendButton
            onPress={handleVideoPress}
            title="진정되는 영상 재생하기"
          />
        </View>
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
            <Image
              source={require("../dogAloneAssets/onbutton.png")} // onbutton 이미지 경로
              style={styles.onbuttonImage}
            />
            <Text style={styles.miniBoxText}>티비</Text>
          </View>
          <View style={styles.miniBox}>
            <Image
              source={require("../dogAloneAssets/onbutton.png")} // onbutton 이미지 경로
              style={styles.onbuttonImage}
            />
            <Text style={styles.miniBoxText}>스피커</Text>
          </View>
        </View>

        {/* 두 번째 줄 */}
        <View style={styles.miniBoxRow}>
          <View style={styles.miniBox}>
            <Image
              source={require("../dogAloneAssets/offbutton.png")} // offbutton 이미지 경로
              style={styles.offbuttonImage}
            />
            <Text style={styles.miniBoxText2}>펫케어</Text>
          </View>
          <View style={styles.miniBox}>
            <Image
              source={require("../dogAloneAssets/offbutton.png")} // offbutton 이미지 경로
              style={styles.offbuttonImage}
            />
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
    backgroundColor: '#FFFFFF',     // 배경색 설정
    marginTop: 50,
  },

  helloBox: {
    position: "absolute",
    marginTop: 5,
    alignSelf: "center",
    width: 393,
    height: 77,
    backgroundColor: '#FAF1C3', 
    shadowColor: '#000', 
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
    backgroundColor: '#FAF1C3', 
    shadowColor: '#000', 
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
    marginTop: 155,
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
    marginTop: 12,
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
    marginLeft: 190,
    left: 12,
  },

  onbuttonImage: {
    width: 55,
    height: 25,
    marginTop: 69,
    marginLeft: 89,
  },

  offbuttonImage: {
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },

  closeButtonImage: {
    position: "absolute",
    marginTop: -645,
    marginLeft: 305,
    width: 32,
    height: 32,
  },
});