const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const axios = require('axios');

var app = express();

//http 서버 생성 및 socketio 바인딩
const server = http.createServer(app);
const io = socketIo(server);

//포트 연결
server.listen(3000, function(){
    console.log('Connected to 3000 port')
});

//클라이언트 연결
io.on('connection', function(socket){
    console.log('Client connected');
    //오디오 데이터 받기
    socket.on('audioStream', function(audioData){
        console.log("Start receiving audio data");
        processAudioData(audioData);
    });
    socket.on('disconnect', function(){
        console.log('Client disconnected')
    });
});

//AI로 오디오 데이터 보내고 add.js 로 보내기
const processAudioData = async (audioData) => {
    try{
        const aiResult = await axios.post('http://localhost:5000/analyze_audio',{
            audioData: audioData,
        });
        console.log("결과: ", aiResult);

        // AI 결과와 현재 시간을 add.js로 전송
        socket.emit('audioResult', {
            current_time: aiResult.data['current time'],  // 현재 시간
            analyze_result: aiResult.data["analyze_result"] // 분석 결과
        });

    } catch(error){
        console.error('Error processing audio data: ', error);
    }
};