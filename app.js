const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

//GLOBAL VARIABLE
global.userIN = null;

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/course-db' }),
  })
);

// ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App is started on port ${port}`);
});
