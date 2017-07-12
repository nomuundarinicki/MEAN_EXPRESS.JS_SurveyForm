var express = require("express");
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.use(session({secret: 'I dont know what to put here !!'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index');
})

app.post('/submit', function(req, res) {
  req.session.name = req.body.name;
  req.session.location = req.body.location;
  req.session.language = req.body.language;
  req.session.comment = req.body.comment;
  res.redirect('/result');
})

app.get('/result', function(req, res) {
  let locals = {
    name: req.session.name,
    location: req.session.location,
    language: req.session.language,
    comment: req.session.comment
  }
  res.render('result', locals);
})
app.get('/back', function(req, res) {

  res.redirect('/');
})




app.listen(8000, function(){
  console.log("listening on port 8000");
})
