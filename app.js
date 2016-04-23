var express = require('express');
var path = require('path');
var zipdb = require('zippity-do-dah');
var ForecastIo = require('forecastio');
var ejs = require('ejs');
var logger = require('morgan');

var app = express();
var weather = new ForecastIo('2aab27832656b2cf3af4ffb1290996f8');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('short'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
  var zipcode = req.params[0];
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude, longitude, function(err, data) {
    if (err) {
      next();
      return;
    }

    res.json({
      zipcode: zipcode,
      temperature: data.currently.temperature
    });
  });
});

app.use(function(req, res) {
  res.status(404).render('404');
});

app.listen(3000, function() {
  console.log('App started on Port: 3000.');
})
