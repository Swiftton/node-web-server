const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Example of middleware
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) console.log('Unable to store logs to server.log');
  });

  console.log(log);
  next();
});

/*
app.use((request, response, next) => {
  response.render('information.hbs');
});
*/

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('convertToUpper', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page Title',
    welcomeMessage: 'Hello, user!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page Title'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Something wrong'
  });
});

app.listen(port, () => {
  console.log('Server is up on the port ' + port);
});
