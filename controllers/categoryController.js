const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.getAllCategorys = async (req, res) => {
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
