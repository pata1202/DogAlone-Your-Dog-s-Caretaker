var db = require('../config/db.js');
const { processAudioData } = require('../server/audioStreamServer.js');

const result = processAudioData();
console.log("Current Time:", result.current_time);
    console.log("Analyze Result:", result.analyze_result);

    // 받은 분석 결과를 DB에 저장
    const time = result.current_time
    const emotion = result.current_time;  // 감정 상태 (예: 'bark', 'growl', 'grunt')

    // DB에 데이터 추가 (emotion 테이블에 감정 상태와 값 저장)
    db.query('INSERT INTO emotion (time, emotion) VALUES (?, ?)', [time, emotion], function (error, results) {
        if (error) {
            console.log("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully: ", results);
        }
    });
