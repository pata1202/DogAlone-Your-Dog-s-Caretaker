import os
import tensorflow as tf
from tensorflow.keras import layers, models

# 모델 설계
def build_model(input_shape):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(3, activation='softmax')  # 3개의 감정 클래스 (bark, growl, grunt)
    ])
    return model

# 스펙트로그램 이미지 데이터셋 로딩
def load_spectrograms(data_dir):
    # 디렉토리에서 이미지를 불러옴
    dataset = tf.keras.preprocessing.image_dataset_from_directory(
        data_dir,
        image_size=(128, 128),  # 스펙트로그램 이미지 크기 (예: 128x128)
        label_mode='int',  # 라벨을 정수로 처리
        shuffle=True,  # 데이터를 섞기
    )
    return dataset

# 데이터 디렉토리 경로
data_dir = 'spectrograms'

# 데이터셋 로딩
train_dataset = load_spectrograms(data_dir)

# 모델 생성
input_shape = (128, 128, 3)  # (height, width, channels) -> RGB 이미지일 경우 3채널
model = build_model(input_shape)

# 모델 컴파일
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 모델 훈련
model.fit(train_dataset, epochs=10)

# 모델 저장
model.save('saved_model/my_emotion_model')

# 모델 평가 (선택적)
# loss, accuracy = model.evaluate(test_dataset)
# print(f"Test Accuracy: {accuracy}")
