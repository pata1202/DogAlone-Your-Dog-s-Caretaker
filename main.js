var http = require('http');
var fs = require('fs');
 
var app = http.createServer(function(request,response){
    response.writeHead(200);

    var data = 'AI Result';
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>${data}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>${data}</h1>
    </body>
    </html>
    `;

    response.end(template);
 
});
app.listen(3000);