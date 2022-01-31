const bcrypt = require('bcrypt');
const { redirect } = require('express/lib/response');
const User = require('../models/User');
const Category = require('../models/Category');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userID = user._id;
      res.status(200).redirect('dashboard');
    } else {
      res.status(400).send('Kullanıcı adı veya şifre hatalı!!!');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find({});
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
  });
};
