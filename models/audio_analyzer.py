from flask import Flask, request, jsonify
import numpy as np
import librosa
import librosa.display
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
import os
from io import BytesIO
from datetime import datetime


#Flask 애플리케이션 객체 생성
app = Flask(__name__) 

# 경로 설정
output_image_path = './spectrogram.png'
model_path = 'dog_emotion_model.h5'

#오디오 데이터 받고 이미지로 변환
def audio_processing(wav_data, n_mels=128, hop_length=512):
    try:
        # 실시간 스트림 데이터 받기
        audio_stream = BytesIO(wav_data)  # Raw 바이너리 데이터
        
        # 오디오 파일을 로드 / 새로운걸로
        y, sr = librosa.load(audio_stream, sr=None)

        # 스펙트로그램 생성 (Mel-spectrogram)
        mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=n_mels, hop_length=hop_length)

        # 로그 스케일로 변환 (시각화 용도)
        log_mel_spec = librosa.power_to_db(mel_spec, ref=np.max)

        # 스펙트로그램을 이미지로 저장
        plt.figure(figsize=(10, 4))
        librosa.display.specshow(log_mel_spec, x_axis='time', y_axis='mel', sr=sr, hop_length=hop_length)
        plt.colorbar(format='%+2.0f dB')
        plt.title('Mel-frequency spectrogram')

        # 이미지를 파일로 저장
        plt.savefig(output_image_path)
        plt.close()

        return output_image_path

    except Exception as e:
        raise ValueError(f"Error during audio processing: {str(e)}")

def analyze_audio():
    try:
        # 저장된 모델 불러오기
        model = load_model(model_path)

        # 이미지를 모델에 맞게 전처리
        img = image.load_img(output_image_path, target_size=(150, 150))  # 이미지 크기 맞추기
        img_array = image.img_to_array(img) / 255.0  # 이미지 배열로 변환 및 정규화
        img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가

        # 모델을 사용하여 예측
        predictions = model.predict(img_array)

        # 예측 결과 출력
        class_labels = ['bark', 'growl', 'grunt']  # 클래스 레이블
        predicted_class = np.argmax(predictions)  # 예측된 클래스 인덱스
        predicted_class_label = class_labels[predicted_class]  # 예측된 클래스 이름
 
        return predicted_class_label

    except Exception as e:
        raise ValueError(f"Error during audio analysis: {str(e)}")

#Flask 엔드포인트
@app.route('/analyze_audio', methods=['POST'])
def analyze_audio_endpoint():
    try:
        # 오디오 데이터 받기
        wav_data = request.data
        if not wav_data:
            return jsonify({"error": "No audio data provided"}), 400

        # 오디오 처리 및 분석
        image_path = audio_processing(wav_data)
        result = analyze_audio(image_path)

        # 처리 완료 후 이미지 삭제
        if os.path.exists(image_path):
            os.remove(image_path)

        # 현재 날짜와 시간 추가
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 예: "2024-11-21 14:35:10"

        return jsonify({
            "current time": current_time,
            "analyze_result": result,
            }
        }), 200        

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
