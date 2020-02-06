import React, { Fragment, useContext, useState, useEffect } from 'react';
import Moment from 'react-moment';

/** Context API */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

/** Ndewon components */
import TransactionForm from './TransactionForm';

const TransactionItem = () => {
  const [form, setForm] = useState(false);

  const handleClose = () => setForm(false);
  const handleShow = () => setForm(true);

  const {
    banks,
    categories,
    updateBank,
    transactions,
    deleteTransaction,
    setCurrent,
    filtered,
    loading
  } = useContext(ndewonContext);

  const handleDelete = transaction => {
    const bank = banks.filter(bank => bank._id === transaction.bank && bank)[0];

    transaction.type === 'income'
      ? (bank.balance -= Number(transaction.amount))
      : (bank.balance += Number(transaction.amount));

    updateBank(bank);
    deleteTransaction(transaction._id);
  };

  if (transactions !== null && transactions.length === 0 && !loading) {
    return (
      <p className='lead text-center'>
        No transactions available. Please create new transactions
      </p>
    );
  }

  const trnCategories = transactions.map(
    trn => categories.find(cat => cat._id === trn.category).name
  );

  return (
    <Fragment>
      <Card.Body className='p-0'>
        <Table responsive hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              ? filtered.map((transaction, i) => (
                  <tr key={transaction._id}>
                    <td>{i + 1}</td>
                    <td>{transaction.date}</td>
                    <td>
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td>${transaction.amount}</td>
                    <td>
                      <Button
                        variant='danger'
                        onClick={() => handleDelete(transaction)}
                      >
                        <i className='fas fa-trash-alt' />
                      </Button>{' '}
                      <Button
                        variant='info'
                        onClick={() => {
                          setCurrent(transaction);
                          handleShow();
                        }}
                      >
                        <i className='fas fa-cog' />
                      </Button>
                    </td>
                  </tr>
                ))
              : transactions.map((transaction, i) => (
                  <tr key={transaction._id}>
                    <td>{i + 1}</td>
                    <td>
                      <Moment format={'YYYY/MM/DD'}>{transaction.date}</Moment>
                    </td>
                    <td>
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </td>
                    <td>{trnCategories[i]}</td>
                    <td>{transaction.description}</td>
                    <td>${transaction.amount}</td>
                    <td>
                      <Button
                        variant='danger'
                        onClick={() => handleDelete(transaction)}
                      >
                        <i className='fas fa-trash-alt' />
                      </Button>{' '}
                      <Button
                        variant='info'
                        onClick={() => {
                          setCurrent(transaction);
                          handleShow();
                        }}
                      >
                        <i className='fas fa-cog' />
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </Card.Body>
      <TransactionForm show={form} handleClose={handleClose} />
    </Fragment>
  );
};

export default TransactionItem;
