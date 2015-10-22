var express = require('express');
var app = express();

app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});

app.use("/", express.static(__dirname + '/'));

var port = 3000

app.listen(port);

console.log("Running on http://localhost:"+port);