import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# 저장된 모델 불러오기
model = load_model('dog_emotion_model.h5')

# 예측할 이미지 경로
img_path = os.path.join('test', 'Dog5.png')

# 이미지를 모델에 맞게 전처리
img = image.load_img(img_path, target_size=(150, 150))  # 이미지 크기 맞추기
img_array = image.img_to_array(img) / 255.0  # 이미지 배열로 변환 및 정규화
img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가

# 모델을 사용하여 예측
predictions = model.predict(img_array)

# 예측 결과 출력
class_labels = ['angry', 'happy', 'neutral']  # 클래스 레이블
predicted_class = np.argmax(predictions)  # 예측된 클래스 인덱스
predicted_class_label = class_labels[predicted_class]  # 예측된 클래스 이름

print(f"Predicted Emotion: {predicted_class_label}")
