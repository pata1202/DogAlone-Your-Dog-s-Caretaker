from flask import Flask, request, jsonify
import os
import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt
import tensorflow as tf
from datetime import datetime

app = Flask(__name__)

# 분석 모델 로드
model = tf.keras.models.load_model('dog_emotion_model.h5')

# 스펙트로그램 생성 함수
def audio_to_spectrogram(audio_path, target_size=(150, 150)):
    """
    주어진 .wav 파일을 스펙트로그램으로 변환하고, 모델 입력에 적합한 배열로 반환합니다.
    """
    try:
        # 오디오 파일 로드
        y, sr = librosa.load(audio_path, sr=None)
        S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
        S_db = librosa.power_to_db(S, ref=np.max)

        # 스펙트로그램 시각화
        plt.figure(figsize=(3, 3))
        librosa.display.specshow(S_db, sr=sr, x_axis='time', y_axis='mel', fmax=8000, cmap='viridis')
        plt.axis('off')

        # 플롯 데이터를 모델 입력 배열로 변환
        canvas = plt.get_current_fig_manager().canvas
        canvas.draw()
        spectrogram_image = np.frombuffer(canvas.tostring_rgb(), dtype=np.uint8)
        spectrogram_image = spectrogram_image.reshape(canvas.get_width_height()[::-1] + (3,))
        plt.close()

        # 배열 크기 변경 및 정규화
        spectrogram_array = tf.image.resize(spectrogram_image, target_size) / 255.0
        return np.expand_dims(spectrogram_array, axis=0)  # 배치 차원 추가
    except Exception as e:
        print(f"Error generating spectrogram: {e}")
        return None

# 분석 수행 함수
def analyze_audio(audio_path):
    """
    .wav 파일 경로를 입력받아 모델 예측 결과를 반환합니다.
    """
    try:
        # 스펙트로그램 생성
        spectrogram_array = audio_to_spectrogram(audio_path)
        if spectrogram_array is None:
            return None

        # 모델 예측
        predictions = model.predict(spectrogram_array)
        class_labels = ['Bark', 'Growl', 'Grunt', 'Howl', 'Whimper', 'Yip']  # 클래스 레이블
        predicted_class = np.argmax(predictions)  # 예측된 클래스 인덱스
        predicted_class_label = class_labels[predicted_class]  # 예측된 클래스 이름

        print(f"Predicted Emotion: {predicted_class_label}")
        print("Prediction Probabilities:")
        for label, prob in zip(class_labels, predictions[0]):
            print(f"{label}: {prob * 100:.2f}%")

        return predicted_class_label
    except Exception as e:
        print(f"Error analyzing audio: {e}")
        return None

# 플라스크 엔드포인트
@app.route('/analyze_audio', methods=['POST'])
def analyze_audio_endpoint():
    """
    클라이언트에서 .wav 파일 경로를 받아 분석 결과를 반환합니다.
    """
    data = request.get_json()  # JSON 데이터 받기
    audio_path = data.get('audioData')  # .wav 파일 경로 받기

    if not audio_path or not os.path.exists(audio_path):
        return jsonify({"error": "Invalid or missing audio path"}), 400

    # 오디오 분석 수행
    result = analyze_audio(audio_path)
    if result is None:
        return jsonify({"error": "Error analyzing audio"}), 500

    # 현재 날짜와 시간 추가
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 예: "2024-11-21 14:35:10"

    return jsonify({
        "current time": current_time,
        "analyze_result": result,
        }
    ), 200    
    
if __name__ == '__main__':
    app.run(host='192.168.0.48', port=5000)
