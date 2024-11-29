const { getDatabase } = require('../config/db')

/**
 * 일일 보고서 조회
 * @returns {Promise<*>}
 */
exports.getDailyReport = async () => {

    const db = await getDatabase();
    console.log('일일 보고서 조회 요청 받음'); // 요청이 들어올 때마다 로그 찍기
    
    const query = `
  SELECT time AS date,
         COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
         COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
         COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
         COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
         COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
         COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
  FROM emotion
  WHERE time >= ? AND time < ?
  GROUP BY DATE(time)
  ORDER BY time;
`;

    const startTime = '2024-11-26 00:00:00';

    // startTime을 Date 객체로 변환
    const startDate = new Date(startTime + ' UTC');

    // endTime은 startTime에서 하루를 더한 시간으로 설정
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);  // 하루를 더함

    // endTime을 MySQL에서 사용할 수 있는 형식으로 변환 (YYYY-MM-DD HH:mm:ss)
    const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

    try {
        const [results] = await db.promise().query(query, [startTime, endTime]);

        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        // 각 emotion의 count를 비교하여 가장 큰 값 찾기
        results.forEach(row => {
            const counts = {
                bark: row.bark_count,
                growl: row.growl_count,
                grunt: row.grunt_count,
                howl: row.howl_count,
                whimper: row.whimper_count,
                yip: row.yip_count
            };

            for (const emotion in counts) {
                if (counts[emotion] > maxCount) {
                    maxCount = counts[emotion];
                    maxEmotion = emotion;
                }
            }
        });

        // 가장 많이 발생한 감정 출력
        console.log(`가장 많이 발생한 감정: ${maxEmotion}`);

        // query2 실행
        const query2 = `SELECT * FROM report WHERE emotion = ?`;

        const [reportResults] = await db.promise().query(query2, [maxEmotion]);

        console.log(`가장 많이 발생한 감정인 '${maxEmotion}'에 대한 결과:`, reportResults);

        return reportResults;
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
        throw e;
    }
}

/**
 * 주간 보고서 조회
 * @returns {Promise<*>}
 */
exports.getWeeklyReport = async () => {

    const db = await getDatabase();

    const query = `
  SELECT YEARWEEK(time) AS week,  -- 주별로 그룹화
         COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
         COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
         COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
         COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
         COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
         COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
  FROM emotion
  WHERE time >= ? AND time < ?
  GROUP BY YEARWEEK(time)
  ORDER BY YEARWEEK(time);
`;

    const startTime = '2024-11-25 00:00:00';  // 시작 시간 예시 (11월 첫째 주)
    const startDate = new Date(startTime + ' UTC');
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);  // 7일 후 (한 주)

    const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

    try {
        // 쿼리 실행
        const [results] = await db.promise().query(query, [startTime, endTime]);
        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        // 각 emotion의 count를 비교하여 가장 큰 값 찾기
        results.forEach(row => {
            const counts = {
                bark: row.bark_count,
                growl: row.growl_count,
                grunt: row.grunt_count,
                howl: row.howl_count,
                whimper: row.whimper_count,
                yip: row.yip_count
            };

            for (const emotion in counts) {
                if (counts[emotion] > maxCount) {
                    maxCount = counts[emotion];
                    maxEmotion = emotion;
                }
            }
        });

        // 가장 많이 발생한 감정 출력
        console.log(`가장 많이 발생한 감정: ${maxEmotion}`);

        // query2 실행
        const query2 = `SELECT * FROM report WHERE emotion = ?`;
        const [reportResults] = await db.promise().query(query2, [maxEmotion]);

        console.log(`가장 많이 발생한 감정인 '${maxEmotion}'에 대한 결과:`, reportResults);

        return reportResults;
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
        throw e;
    }
}

exports.getMonthlyReport = async () => {

    const db = await getDatabase();

    const query = `
  SELECT YEAR(time) AS year, MONTH(time) AS month,  -- 연도와 월 추출
         COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
         COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
         COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
         COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
         COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
         COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
  FROM emotion
  WHERE time >= ? AND time < ?
  GROUP BY YEAR(time), MONTH(time)
  ORDER BY YEAR(time), MONTH(time);
`;

    const startTime = '2024-11-01 00:00:00';  // 예시 시작 시간 (2024년 1월 1일)
    const startDate = new Date(startTime + ' UTC');
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);  // 한 달 뒤

    const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    try {
        // 쿼리 실행
        const [results] = await db.promise().query(query, [startTime, endTime]);
        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        // 각 emotion의 count를 비교하여 가장 큰 값 찾기
        results.forEach(row => {
            const counts = {
                bark: row.bark_count,
                growl: row.growl_count,
                grunt: row.grunt_count,
                howl: row.howl_count,
                whimper: row.whimper_count,
                yip: row.yip_count
            };

            for (const emotion in counts) {
                if (counts[emotion] > maxCount) {
                    maxCount = counts[emotion];
                    maxEmotion = emotion;
                }
            }
        });

        // 가장 많이 발생한 감정 출력
        console.log(`가장 많이 발생한 감정: ${maxEmotion}`);

        // query2 실행
        const query2 = `SELECT * FROM report WHERE emotion = ?`;
        const [reportResults] = await db.promise().query(query2, [maxEmotion]);

        console.log(`가장 많이 발생한 감정인 '${maxEmotion}'에 대한 결과:`, reportResults);

        return reportResults;
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
        throw e;
    }
}
