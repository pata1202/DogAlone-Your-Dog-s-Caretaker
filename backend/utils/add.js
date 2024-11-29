var db = require('../config/db');
const io = require('socket.io-client');
const socket = io('http://192.168.0.47:3000');

// 서버에서 'audioResult' 이벤트가 발생할 때마다 처리
socket.on('aiResult', function (data) {
    console.log("Current Time:", data.current_time);
    console.log("Analyze Result:", data.analyze_result);

    // 받은 분석 결과를 DB에 저장
    const time = data.current_time;
    const emotion = data.analyze_result; 

    // DB에 데이터 추가 (emotion 테이블에 감정 상태와 값 저장)
    db.query('INSERT INTO emotion (time, emotion) VALUES (?, ?)', [time, emotion], function (error, results) {
        if (error) {
            console.log("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully: ", results);
        }
    });
});