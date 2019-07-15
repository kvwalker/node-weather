'use strict';

const request = require('request');
const argv = require('yargs').argv;

const apiKey = '3fe9d31050cdda0ff7e9a86a7af2237d';
let city = argv.c || 'portland';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

request(url, (err, response, body) => {
  if(err) {
    console.log('error:', error);
    return;
  }

  const weather = JSON.parse(body);
  if (weather && weather.main) {
    const message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  } else if (weather.message === 'city not found') {
    console.log(`The city ${city} was not found.`);
  }
});
