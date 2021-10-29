var express = require('express');
// var cookieParser = require('cookie-parser');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/api', indexRouter);

// set static folder
app.use('/data', express.static('data'));

app.listen(4000, function () {
  console.log('Express running on port 4000!');
});

app.use(express.static(path.join(__dirname, "build")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
