import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // 공식 DateTimePicker
import OnOffButton from '../components/OnOffButton'; // On/Off 버튼 컴포넌트

export default function LGpetCard() {
  const [lastFeedTime, setLastFeedTime] = useState(new Date()); // 마지막 배식 시간
  const [nextFeedTime, setNextFeedTime] = useState(new Date()); // 예정 배식 시간
  const [pickerState, setPickerState] = useState({ type: '', visible: false }); // Picker 상태

  const showPicker = (type) => {
    setPickerState({ type, visible: true });
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      // 취소 시 Picker 닫기
      setPickerState({ type: '', visible: false });
      return;
    }

    const currentDate = selectedDate || (pickerState.type === 'last' ? lastFeedTime : nextFeedTime);
    if (pickerState.type === 'last') {
      setLastFeedTime(currentDate);
    } else if (pickerState.type === 'next') {
      setNextFeedTime(currentDate);
    }
    setPickerState({ type: '', visible: false }); // Picker 닫기
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${hours % 12 || 12}:${minutes} ${period}`;
  };

  return (
    <View style={styles.cardContainer}>
      {/* LG 펫케어 텍스트 */}
      <Text style={styles.titleText}>LG 펫케어</Text>

      {/* 펫케어 이미지 */}
      <Image source={require('../dogAloneAssets/pet.png')} style={styles.petImage} />

      {/* On/Off 버튼 */}
      <View style={styles.onOffContainer}>
        <OnOffButton />
      </View>

      {/* 마지막 배식 시간 버튼 */}
      <Text style={styles.labelText2}>마지막 배식 시간</Text>
      <TouchableOpacity
        style={[styles.timeButton, styles.redButton]}
        onPress={() => showPicker('last')}
      >
        <Text style={styles.timeButtonText}>{formatTime(lastFeedTime)}</Text>
      </TouchableOpacity>

      {/* 예정된 배식 시간 버튼 */}
      <Text style={styles.labelText}>예정된 배식 시간</Text>
      <TouchableOpacity
        style={[styles.timeButton, styles.blueButton]}
        onPress={() => showPicker('next')}
      >
        <Text style={styles.timeButtonText}>{formatTime(nextFeedTime)}</Text>
      </TouchableOpacity>

      {/* 시간 선택 Picker */}
      {pickerState.visible && (
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={() => setPickerState({ type: '', visible: false })}
        >
          <View style={styles.modalContainer}>
            <DateTimePicker
              value={pickerState.type === 'last' ? lastFeedTime : nextFeedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'clock'} // Android에서 모달 UI
              onChange={onChange}
              is24Hour={false}
            />
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
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#000000',
    position: 'absolute',
    left: 27,
    top: 19,
  },
  petImage: {
    width: 110,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
    left: 3,
    top: 40,
  },
  onOffContainer: {
    position: 'absolute',
    left: 8,
    top: 120,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000000',
    position: 'absolute',
    left: 115,
    top: 90,
  },
  labelText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000000',
    position: 'absolute',
    left: 115,
    top: 50,
  },
  timeButton: {
    width: 86,
    height: 34,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  redButton: {
    borderColor: '#FFCCCC',
    backgroundColor: '#FFF5F5',
    top: 40,
    left: 240,
  },
  blueButton: {
    borderColor: '#CCCCFF',
    backgroundColor: '#F5F5FF',
    top: 83,
    left: 240,
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
});
