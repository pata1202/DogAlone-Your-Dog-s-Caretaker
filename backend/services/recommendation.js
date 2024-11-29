const { getDatabase } = require('../config/db')

exports.getRecommendation = async () => {

    const db = await getDatabase()

    // emotion_table과 recommendation_table을 JOIN하여 데이터 조회
    const query = `
    SELECT e.*, r.recommendation
    FROM emotion e
    JOIN recommendation r ON e.emotion = r.emotion
    ORDER BY e.id DESC
    LIMIT 1;
    `;

    try {
        const [results] = await db.promise().query(query)

        return results[0]
    } catch (e) {
        console.error('쿼리 실행 중 오류 발생:', e);
    }
}
