const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const Bank = require('../models/Bank');

/**
 * @route   GET api/banks
 * @desc    Get list of banks
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const bank = await Bank.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json(bank);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/banks
 * @desc    Create new banks
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('name', "Bank name shouldn't be empty")
        .not()
        .isEmpty(),
      check('accountHolder', "Acount holder name shouldn't be empty")
        .not()
        .isEmpty(),
      check('accountNumber', "Acount number shouldn't be empty")
        .not()
        .isEmpty(),
      check('balance', "Balance shouldn't be empty")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, accountNumber, accountHolder, balance } = req.body;

    try {
      let newBank = await Bank.findOne({ accountNumber });

      if (newBank)
        return res
          .status(400)
          .json({ msg: 'Bank with the same account number already exists' });

      newBank = new Bank({
        name,
        accountNumber,
        accountHolder,
        balance,
        user: req.user.id
      });

      const bank = await newBank.save();

      res.json(bank);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route   PUT api/banks/:id
 * @desc    Update banks
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  const { name, accountNumber, accountHolder, balance } = req.body;

  const bankFields = {};

  if (name) bankFields.name = name;
  if (accountHolder) bankFields.accountHolder = accountHolder;
  if (accountNumber) bankFields.accountNumber = accountNumber;
  if (balance) bankFields.balance = balance;

  try {
    let bank = await Bank.findById(req.params.id);

    if (!bank) return res.status(404).json({ msg: 'Bank not found' });

    /** Make sure user owns the bank */
    if (bank.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Action not auhtorized' });

    bank = await Bank.findByIdAndUpdate(
      req.params.id,
      { $set: bankFields },
      { new: true }
    );

    res.json(bank);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   DELETE api/banks/:id
 * @desc    Delete banks
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let bank = await Bank.findById(req.params.id);

    if (!bank) return res.status(404).json({ msg: 'Bank not found' });

    /** Make sure user owns bank */
    if (bank.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Action not auhtorized' });

    await Bank.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Bank removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
