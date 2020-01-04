const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return req.status(200).json({});
  }
  next();
});

app.use('/admin', require('./api/routes/admin'));
app.use('/teacher', require('./api/routes/teacher'));
app.use('/teachers', require('./api/routes/teachers'));
app.use('/exams', require('./api/routes/exams'));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ err: { msg: error.message } });
});

module.exports = app;
