const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

var app = express();
let aiResponse = null;

// http 서버 생성 및 socketio 바인딩
const server = http.createServer(app);
const io = socketIo(server);

// 클라이언트 소켓을 저장할 객체
let clientSockets = [];

// 포트 연결
server.listen(3001, function () {
    console.log('Connected to 3001 port');
});

// 클라이언트 연결
io.on('connection', function (socket) {
    console.log('Client connected');

    // 클라이언트 소켓 배열에 추가
    clientSockets.push(socket);

    // 오디오 데이터(Base64) 받기
    socket.on('audioStream', async function (audioData) {
        console.log("Received audio data in Base64 format");

        const audioBase64 = audioData.fileData; // Base64 데이터를 받음
        if (audioBase64) {
            try {
                // Base64 데이터를 WAV 파일로 변환하여 저장
                const wavFilePath = saveBase64AsWav(audioBase64);
                console.log(`WAV file saved to: ${wavFilePath}`);

                // 받은 WAV 파일을 AI 서버로 전송
                aiResponse = await processAudioData(wavFilePath);
                console.log("AI 분석 결과:", aiResponse);

                // 오디오 데이터를 보낸 클라이언트에게 전송
                socket.emit("aiResult", aiResponse);
                

                // 다른 클라이언트(add.js)에게도 전송
                clientSockets.forEach(clientSocket => {
                    if (clientSocket !== socket) { // 자기 자신은 제외하고
                        clientSocket.emit("aiResult", aiResponse);
                        console.log("Sent data to DB and Client")
                    }
                });

                // 분석 후 폴드 비우기
                clearAudioFolder();
            } catch (error) {
                console.error("Error processing audio data:", error);
            }
        } else {
            console.error("No Base64 data received");
        }
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected');
         // 클라이언트 소켓 배열에서 제거
         clientSockets = clientSockets.filter(clientSocket => clientSocket !== socket);
        });
    });

// Base64 데이터를 WAV 파일로 저장하는 함수
const saveBase64AsWav = (base64Data) => {
    const fileBuffer = Buffer.from(base64Data, 'base64'); // Base64를 버퍼로 변환
    const fileName = `audio_${Date.now()}.wav`; // 파일 이름에 타임스탬프 추가
    const savePath = path.join(__dirname, '..', 'server', 'audio_data', fileName); // 파일 저장 경로

    // audioFiles 폴더가 없으면 생성
    if (!fs.existsSync(path.dirname(savePath))) {
        fs.mkdirSync(path.dirname(savePath), { recursive: true });
    }

    // 파일을 지정된 경로에 저장
    fs.writeFileSync(savePath, fileBuffer);
    console.log('Audio Saved!')
    
    return savePath; // 저장된 파일 경로 반환
};

// AI 서버로 오디오 데이터 전송
const processAudioData = async (audioFilePath) => {
    try {
         const response = await axios.post('http://192.168.0.47:5000/analyze_audio', {
            audioData: audioFilePath, // 파일 경로만 서버로 전송
        });

        console.log('File sent to AI server.');
        return response.data; // AI 서버의 응답 데이터 반환
    } catch (error) {
        throw new Error("Failed to send data to AI server: " + error.message);
    }
};

// audio_data/audioFiles 폴더 비우는 함수
const clearAudioFolder = () => {
    const audioFolderPath = path.join(__dirname, '..', 'server', 'audio_data');
    fs.readdir(audioFolderPath, (err, files) => {
        if (err) {
            console.error("Error reading audio files folder:", err);
            return;
        }

        // 폴더에 있는 모든 파일 삭제
        files.forEach((file) => {
            const filePath = path.join(audioFolderPath, file);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
            });
        });
    });
};