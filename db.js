var mysql      = require('mysql2');

var db = mysql.createConnection({
  host     : 'database-1.cz8ougc2ifoy.ap-southeast-2.rds.amazonaws.com',
  port     : 3306,
  user     : 'junhyeong',
  password : '123454321',
  database : 'SE'
});
  
db.connect();
module.exports = db;