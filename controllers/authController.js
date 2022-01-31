const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
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
      res.status(200).redirect('/');
    } else {
      res.status(400).send('Kullanıcı adı veya şifre hatalı!!!');
    }
  } catch (err) {
    console.log(err);
  }
};

/* exports.getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(200).render('categorys', { categorys, page_name: 'categorys' });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).render('category', { category, page_name: 'categorys' });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};
 */
