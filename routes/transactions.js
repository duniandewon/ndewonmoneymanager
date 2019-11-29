const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const Bank = require('../models/Bank');

/**
 * @route   GET api/transactions
 * @desc    Get list of transactions
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/transactions
 * @desc    Create new transactions
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('type', 'Select a transactions type')
        .not()
        .isEmpty(),
      check('amount', "Amount shouldn't be empty")
        .not()
        .isEmpty(),
      check('description', "Description shouldn't be empty")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { date, type, category, amount, bank, description } = req.body;

    const transactionBank = await Bank.findOne({ name: bank });
    const transactionCategory = await Category.findOne({ name: category });

    if (!transactionBank)
      return res.status(404).json({ msg: "Bank doesn't exist" });

    if (!transactionCategory)
      return res.status(404).json({ msg: "Category doesn't exist" });

    try {
      const newTransaction = new Transaction({
        date,
        type,
        amount,
        description,
        category: transactionCategory.id,
        bank: transactionBank.id,
        user: req.user.id
      });

      type === 'Pengeluaran'
        ? await Bank.findByIdAndUpdate(transactionBank.id, {
            balance: transactionBank.balance - Number(amount)
          })
        : await Bank.findByIdAndUpdate(transactionBank.id, {
            balance: transactionBank.balance + Number(amount)
          });

      const transaction = await newTransaction.save();

      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route   POST api/transactions/:id
 * @desc    Update transactions
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  /** @todo Enable user to update bank and type */

  const { date, category, amount, description, type, bank } = req.body;

  if (type)
    return res.status(400).json({ msg: "You can't change transaction type" });
  if (bank)
    return res.status(400).json({ msg: "You can't change transaction bank" });

  const getNewCategory = await Category.findOne({ name: category });

  const transactionFields = {};
  if (date) transactionFields.date = date;
  if (description) transactionFields.description = description;
  if (category) transactionFields.category = getNewCategory.id;

  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ msg: 'Transaction not found' });

    /** Make sure user owns the bank */
    if (transaction.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Action not auhtorized' });

    if (amount) {
      transactionFields.amount = amount;

      /** Get bank to update balance */
      const bank = await Bank.findById(transaction.bank);

      /** Calculate balance */
      let newBalance;

      transaction.type === 'Pengeluaran'
        ? (newBalance = bank.balance - (Number(amount) - transaction.amount))
        : (newBalance = bank.balance + (Number(amount) - transaction.amount));

      /** Update balance in the bank */
      await Bank.findByIdAndUpdate(transaction.bank, { balance: newBalance });
    }

    /** Update transaction */
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: transactionFields },
      { new: true }
    );

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   DELET api/transactions/:id
 * @desc    Delete transactions
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ msg: 'Transaction not found' });

    /** Make sure user owns the bank */
    if (transaction.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Action not auhtorized' });

    /** Get bank to update balance */
    const bank = await Bank.findById(transaction.bank);

    transaction.type === 'Pengeluaran'
      ? await Bank.findByIdAndUpdate(transaction.bank, {
          balance: bank.balance + transaction.amount
        })
      : await Bank.findByIdAndUpdate(transaction.bank, {
          balance: bank.balance - transaction.amount
        });

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
