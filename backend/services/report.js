const { getDatabase } = require('../config/db')
const moment = require('moment');

const translateEmotion = (emotion) => {
    const emotionMap = {
      Grunt: "만족",
      Bark: "흥분",
      Growl: "두려움",
      Whimper: "불안",
      Howl: "외로움",
      Yip: "아픔",
    };

    return emotionMap[emotion] || "알 수 없는 감정";
  };

/**
 * 일일 보고서 조회
 * @returns {Promise<*>}
 */
exports.getDailyReport = async (date) => {

    const db = await getDatabase();
    console.log('일일 보고서 조회 요청 받음', date); // 요청이 들어올 때마다 로그 찍기
    
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

    // 날짜 범위 설정 (해당 날짜의 00:00:00부터 23:59:59까지)
    const startTime = `${date} 00:00:00`; // 시작 날짜
    const endTime = `${date} 23:59:59`;   // 종료 날짜

    try {
        const [results] = await db.promise().query(query, [startTime, endTime]);

        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        // 각 emotion의 count를 비교하여 가장 큰 값 찾기
        results.forEach(row => {
            const counts = {
                Bark: row.bark_count,
                Growl: row.growl_count,
                Grunt: row.grunt_count,
                Howl: row.howl_count,
                Whimper: row.whimper_count,
                Yip: row.yip_count
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
        const formattedDate = moment(startTime).format('YYYY년 MM월 DD일');

        maxEmotion = translateEmotion(maxEmotion)
        // 'reportResults'에 있는 각각의 advice와 description을 출력 형식으로 변환
        let reportAnalyze = `초코는 '${formattedDate}'에 \n'${maxEmotion}'을 가장 많이 느꼈어요. \n총 '${maxCount}번'의 짖음 소리로 \n'${maxEmotion}'을 표현했어요. \n초코에게 적합한 조언을 확인해보세요.\n`;

        // 각 reportResult의 advice와 description을 출력
        reportResults.forEach(reportResults => {
            reportAnalyze += `\n${reportResults.advice}: ${reportResults.description}\n`;
        });

        report_result = {
            'counts': results,
            'report': reportAnalyze
        };
        console.log(report_result)

        return report_result;
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
        throw e;
    }
}

/**
 * 주간 보고서 조회
 * @returns {Promise<*>}
 */
exports.getWeeklyReport = async (date) => {

    const db = await getDatabase();
    console.log('주간 보고서 조회 요청 받음', date); // 요청이 들어올 때마다 로그 찍기
        
        const query = `
      SELECT 
          COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
          COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
          COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
          COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
          COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
          COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
      FROM emotion
      WHERE time >= ? AND time < ?;
    `;

    const startTime = `${date} 00:00:00`;  // 시작 시간 예시 (11월 첫째 주)
    const startDate = new Date(startTime + ' UTC');
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);  // 7일 후 (한 주)
    const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log(startDate, endDate);

    try {
        // query 실행 - 특정 기간 동안의 모든 감정 데이터 집계
        const [results] = await db.promise().query(query, [startTime, endTime]);

        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 감정별 카운트
        const counts = {
            Bark: results[0].bark_count,
            Growl: results[0].growl_count,
            Grunt: results[0].grunt_count,
            Howl: results[0].howl_count,
            Whimper: results[0].whimper_count,
            Yip: results[0].yip_count
        };

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        for (const emotion in counts) {
            if (counts[emotion] > maxCount) {
                maxCount = counts[emotion];
                maxEmotion = emotion;
            }
        }

        // 가장 많이 발생한 감정 출력
        console.log(`가장 많이 발생한 감정: ${maxEmotion}`);

        // query2 실행 - 감정에 해당하는 보고서 정보 가져오기
        const query2 = `SELECT * FROM report WHERE emotion = ?`;

        const [reportResults] = await db.promise().query(query2, [maxEmotion]);

        console.log(`가장 많이 발생한 감정인 '${maxEmotion}'에 대한 결과:`, reportResults);
        const formattedStartDate = moment(startDate).format('YYYY년 MM월 DD일');
        const formattedEndDate = moment(endDate).format('YYYY년 MM월 DD일');

        maxEmotion = translateEmotion(maxEmotion);
        // 'reportResults'에 있는 각각의 advice와 description을 출력 형식으로 변환
        let reportAnalyze = `초코는 '${formattedStartDate}부터 ${formattedEndDate}'에 \n'${maxEmotion}'을 가장 많이 느꼈어요. \n총 '${maxCount}번'의 짖음 소리로 \n'${maxEmotion}'을 표현했어요. \n초코에게 적합한 조언을 확인해보세요.\n`;

        // 각 reportResult의 advice와 description을 출력
        reportResults.forEach(reportResult => {
            reportAnalyze += `\n${reportResult.advice}: ${reportResult.description}\n`;
        });

        // 최종 보고서 결과 반환
        report_result = {
            'counts': results,
            'report': reportAnalyze
        };
        console.log(report_result)

        return report_result;
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
        throw e;
    }
};

exports.getMonthlyReport = async () => {

    const db = await getDatabase();

    const query = `
    SELECT 
        COUNT(CASE WHEN emotion = 'bark' THEN 1 END) AS bark_count,
        COUNT(CASE WHEN emotion = 'growl' THEN 1 END) AS growl_count,
        COUNT(CASE WHEN emotion = 'grunt' THEN 1 END) AS grunt_count,
        COUNT(CASE WHEN emotion = 'howl' THEN 1 END) AS howl_count,
        COUNT(CASE WHEN emotion = 'whimper' THEN 1 END) AS whimper_count,
        COUNT(CASE WHEN emotion = 'yip' THEN 1 END) AS yip_count
    FROM emotion
    WHERE time >= ? AND time < ?;
  `;

    const startTime = '2024-11-01 00:00:00';  // 예시 시작 시간 (2024년 1월 1일)
    const startDate = new Date(startTime + ' UTC');
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);  // 한 달 뒤

    const endTime = endDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    try {
        const [results] = await db.promise().query(query, [startTime, endTime]);

        console.log(`쿼리 결과 (${startTime} ~ ${endTime}):`, results);

        // 가장 많이 발생한 emotion 찾기
        let maxEmotion = '';
        let maxCount = 0;

        // 각 emotion의 count를 비교하여 가장 큰 값 찾기
        results.forEach(row => {
            const counts = {
                Bark: row.bark_count,
                Growl: row.growl_count,
                Grunt: row.grunt_count,
                Howl: row.howl_count,
                Whimper: row.whimper_count,
                Yip: row.yip_count
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
        const formattedStartDate = moment(startDate).format('YYYY년 MM월 DD일');
        const formattedEndDate = moment(endDate).format('YYYY년 MM월 DD일');

        maxEmotion = translateEmotion(maxEmotion)
        // 'reportResults'에 있는 각각의 advice와 description을 출력 형식으로 변환
        let reportAnalyze = `초코는 '${formattedStartDate}부터 ${formattedEndDate}'에 \n'${maxEmotion}'을 가장 많이 느꼈어요. \n총 '${maxCount}번'의 짖음 소리로 \n'${maxEmotion}'을 표현했어요. \n초코에게 적합한 조언을 확인해보세요.\n`;

        // 각 reportResult의 advice와 description을 출력
        reportResults.forEach(reportResults => {
            reportAnalyze += `\n${reportResults.advice}: ${reportResults.description}\n`;
        });

        report_result = {
            'counts': results,
            'report': reportAnalyze
        };
        console.log(report_result)

        return report_result;
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
        throw e;
    }
}

