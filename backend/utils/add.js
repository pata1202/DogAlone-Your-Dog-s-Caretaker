var db = require('../config/db');
const io = require('socket.io-client');
const socket = io('http://192.168.0.47:3001');

// 서버에서 'aiResult' 이벤트 발생 시 처리
socket.on('aiResult', function (data) {
    console.log("Current Time:", data.current_time);
    console.log("Analyze Result:", data.analyze_result);

    // 받은 분석 결과를 DB에 저장
    const time = data.current_time;
    const emotion = data.analyze_result;

    // 쿼리 실행
    db.executeQuery('INSERT INTO emotion (time, emotion) VALUES (?, ?)', [time, emotion])
        .then(results => {
            console.log("Data inserted successfully:", results);
        })
        .catch(error => {
            console.log("Error inserting data:", error);
        });
});
