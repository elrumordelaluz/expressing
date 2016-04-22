var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

// Static Middleware
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routing
app.get('/', function(request, response) {
  response.end('Welcome to the Homepage.');
});

app.get('/about', function(request, response) {
  response.end('This is the About page.');
});

app.get('/why', function(request, response) {
  response.redirect('/hello/wordl');
});

app.get('/music', function(request, response) {
  response.sendFile("music.mp4", {
    root: publicPath
  });
});

app.get('/hello/:who', function(request, response) {
  response.end('Hello, ' + request.params.who + '.');
});

// If doesn't match with the previous...
app.use(function(request, response) {
  response.statusCode = 404;
  response.end('404!')
});

http.createServer(app).listen(3000);
