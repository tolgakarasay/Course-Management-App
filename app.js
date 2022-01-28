const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

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

// ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App is started on port ${port}`);
});
