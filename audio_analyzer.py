from flask import Flask, request, jsonify
import ai_model #이제 학습할 모델들

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