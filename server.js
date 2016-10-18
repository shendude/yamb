var express = require('express');
var app = express();
var port = 1337;

app.listen(port, function() {
  console.log('mean server listening on ' + port);
});