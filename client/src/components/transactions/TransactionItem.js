import React, { Fragment, useContext, useState } from 'react';

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
    updateBank,
    transactions,
    deleteTransaction,
    setCurrent
  } = useContext(ndewonContext);

  const handleDelete = transaction => {
    const bank = banks.filter(
      bank => bank.name === transaction.trnBank && bank
    )[0];

    transaction.type === 'income'
      ? (bank.balance -= Number(transaction.amount))
      : (bank.balance += Number(transaction.amount));

    updateBank(bank);
    deleteTransaction(transaction.id);
  };

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
            {transactions.map((transaction, i) => (
              <tr key={transaction.id}>
                <td>{i + 1}</td>
                <td>{transaction.date}</td>
                <td>
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </td>
                <td>{transaction.trnCategory}</td>
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
