var db = require('./db');

// data 추가
db.query('INSERT INTO emotion (id, emotion, value) VALUES (?, ?, ?)',[1, 'sad', 35], function (error, results, emotion) {
    if (error) {
        console.log(error);
    } else {
        console.log("Data inserted successfully: ", results);
    }
  });
  
// 모든 data 출력
  db.query('SELECT * FROM emotion', function (error, results, emotion) {
      if (error) {
          console.log(error);
      }
      console.log(results);
  });