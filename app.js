const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');

const app = express();

// CONNECT TO DATABASE
mongoose
  .connect('mongodb://localhost/course-db')
  .then(() => {
    console.log('Database connection is successful.');
  })
  .catch((err) => {
    console.log('Database connection failed.');
    console.log(err);
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App is started on port ${port}`);
});
