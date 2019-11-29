const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const Category = require('../models/Category');

/**
 * @route   GET api/categories
 * @desc    Get list of categories
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/categories
 * @desc    Create new categories
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please enter a name')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCategotry = new Category({
        name: req.body.name,
        user: req.user.id
      });

      const category = await newCategotry.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route   PUT api/categories/:id
 * @desc    Update categories
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: 'Category not found' });

    /** Make sure user owns category */
    if (category.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Action not auhtorized' });

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   DELETE api/categories/:id
 * @desc    Delete categories
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: 'Category not found' });

    /** Make sure user owns category */
    if (category.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Action not auhtorized' });

    await Category.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
