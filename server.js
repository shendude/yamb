var express = require('express');
var path = require('path');
var app = express();
var port = 1337;

app.listen(port, function() {
  console.log('mean server listening on ' + port);
});

app.use('/', express.static(path.join(__dirname + '/')));