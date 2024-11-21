// var http = require('http');
// var fs = require('fs');
// var mysql = require('mysql');
// var db = require('./db');

// // TODO : AI model 정해지면 호출해서 결과 받아오는 코드 직성

// // 결과를 DB에 저장
// var app = http.createServer(function (request, response) {
//   response.writeHead(200);

//   db.query('SELECT * FROM emotion WHERE id =?', [1], function (error2, emotion) {
//     if (error2) {
//       throw error2;
//     }

//     console.log(emotion);

//     var status = emotion[0].emotion;
//     var value = emotion[0].value;
//     var template = `
//         <!doctype html>
//         <html>
//         <head>
//           <title>${status}, ${value}</title>
//           <meta charset="utf-8">
//         </head>
//         <body>
//           <h1>${status}, ${value}</h1>
//         </body>
//         </html>
//         `;

//     response.end(template);

//   });

//   // 시간별로 저장하는 기능 필요하면 추가


// });
// app.listen(3000);