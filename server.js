'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '3fe9d31050cdda0ff7e9a86a7af2237d';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)  => {
  res.render('index');
});

app.post('/', (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  request(url, (err, response, body) => {
    if(err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      const weather = JSON.parse(body);
      if (weather && weather.main) {
        const message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: message, error: null });
      } else if (weather.message === 'city not found') {
        const errorMessage = `The city ${city} was not found.`;
        res.render('index', { weather: null, error: errorMessage });
      } else {
        res.render('index', { weather: null, error: 'Error, please try again' });
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
