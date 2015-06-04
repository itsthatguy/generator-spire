var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.resolve(__dirname, 'dist');
var bowerPath = path.resolve(__dirname, 'dist/bower_components');
app.use(express.static(staticPath));
app.use('/bower_components', express.static(bowerPath));

app.listen(process.env.PORT || 3002, function() {
  console.log('listening');
});
