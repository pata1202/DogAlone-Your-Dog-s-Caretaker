import tensorflow as tf
import librosa
import numpy as np
import matplotlib.pyplot as plt
import os
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.preprocessing import image


def audio_to_spectrogram(audio_path, output_image_path, n_mels=128, hop_length=512):
    # 오디오 파일을 로드 / 새로운걸로
    y, sr = librosa.load(audio_path, sr=None)

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

def predict_emotion(model_path, audio_path):
    # 오디오 파일을 스펙트로그램 이미지로 변환
    spectrogram_image_path = r'C:\Users\SeoyeonKim\Documents\hanyangUni\4th_grade\1st_sem\SW_Eng\dev\AI\test_image'
    audio_to_spectrogram(audio_path, spectrogram_image_path)

    # 모델 로드
    model = tf.keras.models.load_model(model_path)

    # 이미지를 로드하고 전처리
    img = load_img(spectrogram_image_path, target_size=(128, 128))  # 모델 입력 크기와 맞추기
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가

    # 예측
    predictions = model.predict(img_array)
    print(predictions)

if __name__ == "__main__":
    model_path = r'C:\Users\SeoyeonKim\Documents\hanyangUni\4th_grade\1st_sem\SW_Eng\dev\emotion_model.keras'  # 학습된 모델 경로
    audio_path = r'C:\Users\SeoyeonKim\Documents\hanyangUni\4th_grade\1st_sem\SW_Eng\dev\AI\data\dog_grunt_test\Dog35.wav'  # 예측할 오디오 파일 경로
    predict_emotion(model_path, audio_path)
