var express = require('express');
// var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/api', indexRouter);

// set static folder
app.use('/data', express.static('data'));

app.listen(4000, function () {
  console.log('API running on port 4000!');
});

module.exports = app;
