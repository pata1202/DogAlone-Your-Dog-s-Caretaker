from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model

# 저장된 모델 불러오기
ai_model = load_model('../ai/dog_emotion_model_100.h5')

#Flask 애플리케이션 객체 생성
app = Flask(__name__) 

@app.route('/analyze_audio', methods=['POST'])
def analyze_audio():

    #클라이언트로부터 audioData 받아오기
    audio_data = request.json.get('audioData')

    #ai 모델에 데이터 입력
    result = ai_model(audio_data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)