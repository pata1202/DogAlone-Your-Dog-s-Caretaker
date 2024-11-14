const db = require('./db');

// 사용자 정보 저장 API
exports.saveUserInfo = (req, res) => {
    const { userId, userName, dogName, dogBreed, age } = req.body;
    const query = 'INSERT INTO users (userId, userName, dogName, dogBreed, age) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [userId, userName, dogName, dogBreed, age], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error saving user information');
        } else {
            res.status(201).send('User information saved successfully');
        }
    });
};

// 사용자 정보 호출 API
exports.getUserInfo = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE userId = ?';

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving user information');
        } else if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(results[0]);
        }
    });
};
