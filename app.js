var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
var morganMiddleware = morgan('short');
var staticPath = path.join(__dirname, 'static');

app.use(morganMiddleware);
app.use(express.static(staticPath));


app.use(function(req, res) {
  res.status(404);
  res.send('File not found!');
})

app.listen(3000, function() {
  console.log('App started on Port: 3000.');
})
