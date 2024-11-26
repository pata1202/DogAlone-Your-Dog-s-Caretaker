import os
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

# 처리된 파일 목록 저장 위치
processed_files_record = 'processed_files.txt'

# 처리된 파일 목록 불러오기
def load_processed_files(record_path):
    if os.path.exists(record_path):
        with open(record_path, 'r') as f:
            return set(line.strip() for line in f)
    return set()

# 처리된 파일 목록 갱신
def update_processed_files(record_path, processed_files):
    with open(record_path, 'a') as f:
        for file in processed_files:
            f.write(f"{file}\n")

# 스펙트로그램을 저장할 경로
output_dir = 'test_png/'

# 오디오 데이터를 스펙트로그램으로 변환하는 함수
def audio_to_spectrogram(file_path, output_path):
    # librosa로 오디오 파일을 로드
    y, sr = librosa.load(file_path, sr=None)
    
    # Mel-spectrogram 변환 (인자 전달 방식 수정)
    S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
    
    # dB로 변환
    S_dB = librosa.power_to_db(S, ref=np.max)
    
    # 스펙트로그램을 이미지로 저장
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(S_dB, x_axis='time', y_axis='mel', cmap='inferno')
    plt.colorbar(format='%+2.0f dB')
    plt.tight_layout()
    
    # 이미지로 저장
    plt.savefig(output_path)
    plt.close()

# 폴더에서 .wav 파일을 찾고, 각 파일을 스펙트로그램 이미지로 변환
def process_audio_files(data_dir):
    processed_files = load_processed_files(processed_files_record)
    new_processed_files = set()

    # 각 감정별 폴더를 순차적으로 처리
    for emotion in ['test_wav']:
        emotion_dir = os.path.join(data_dir, emotion)
        
        # 각 폴더 안의 .wav 파일 처리
        for file_name in os.listdir(emotion_dir):
            if file_name.endswith('.wav'):
                file_path = os.path.join(emotion_dir, file_name)
                
                # 스펙트로그램 이미지를 저장할 경로 설정
                output_folder = os.path.join(output_dir, emotion)
                os.makedirs(output_folder, exist_ok=True)
                output_file_path = os.path.join(output_folder, file_name.replace('.wav', '.png'))

                # 새로 추가된 파일만 처리
                if file_name not in processed_files:
                    print(f"Processing {file_path} -> {output_file_path}")
                    audio_to_spectrogram(file_path, output_file_path)
                    new_processed_files.add(file_name)

                    # 처리된 파일 기록 갱신
    update_processed_files(processed_files_record, new_processed_files)

# 데이터 디렉토리 경로
data_dir = './'

# 스펙트로그램 변환 시작
process_audio_files(data_dir)
