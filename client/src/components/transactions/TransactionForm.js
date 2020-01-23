import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Context API */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootstrap Components */
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TransactionForm = ({ show, handleClose }) => {
  const [transaction, setTransaction] = useState({
    date: null,
    type: '',
    category: '',
    bank: null,
    description: '',
    amount: null
  });

  const {
    banks,
    categories,
    updateBank,
    addTransaction,
    updateTransaction,
    current,
    clearCurrent
  } = useContext(ndewonContext);

  const handleHide = () => {
    handleClose();
    clearCurrent();
  };

  const onChange = e => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const bank = banks.filter(bank => bank._id === transaction.bank && bank)[0];

    if (current === null) {
      transaction.type === 'income'
        ? (bank.balance += Number(transaction.amount))
        : (bank.balance -= Number(transaction.amount));

      addTransaction(transaction);
    } else {
      const newBalance = transaction.amount - current.amount;

      transaction.type === 'income'
        ? (bank.balance += Number(newBalance))
        : (bank.balance -= Number(newBalance));
      updateTransaction(transaction);

      clearCurrent();
    }

    updateBank(bank);

    setTransaction({
      date: null,
      type: '',
      category: '',
      bank: '',
      description: '',
      amount: null
    });

    handleClose();
  };

  useEffect(() => {
    current
      ? setTransaction(current)
      : setTransaction({
          date: null,
          type: '',
          category: '',
          bank: '',
          description: '',
          amount: null
        });
  }, [ndewonContext, current]);

  const { date, type, bank, category, amount, description } = transaction;

  return (
    <Fragment>
      <Modal show={show} onHide={handleHide} size='lg' centered>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {current ? 'Edit Transaction' : 'Add New Transaction'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group row'>
              <label htmlFor='date' className='col-sm-2 col-form-label'>
                Date:
              </label>
              <div className='col-sm-10'>
                <input
                  type='date'
                  id='date'
                  name='date'
                  className='form-control'
                  value={date}
                  onChange={onChange}
                  // required
                />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='type' className='col-sm-2 col-form-label'>
                Type:
              </label>
              <div className='col-sm-10'>
                <select
                  name='type'
                  id='type'
                  className='form-control'
                  value={type}
                  onChange={onChange}
                  required
                >
                  <option>Choose One</option>
                  <option value='income'>Income</option>
                  <option value='expenses'>Expenses</option>
                </select>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='trnCategory' className='col-sm-2 col-form-label'>
                Category:
              </label>
              <div className='col-sm-10'>
                <select
                  name='category'
                  id='category'
                  className='form-control'
                  value={category}
                  onChange={onChange}
                  required
                >
                  <option>Choose One</option>
                  {categories &&
                    categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='description' className='col-sm-2 col-form-label'>
                Description:
              </label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  id='description'
                  name='description'
                  className='form-control'
                  value={description}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='amount' className='col-sm-2 col-form-label'>
                Amount:
              </label>
              <div className='col-sm-10'>
                <input
                  type='number'
                  id='amount'
                  name='amount'
                  className='form-control'
                  value={amount}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='trnBank' className='col-sm-2 col-form-label'>
                Bank:
              </label>
              <div className='col-sm-10'>
                <select
                  name='bank'
                  id='bank'
                  className='form-control'
                  value={bank}
                  onChange={onChange}
                  required
                >
                  <option>Choose One</option>
                  {banks &&
                    banks.map(bank => (
                      <option key={bank._id} value={bank._id}>
                        {bank.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size='lg'
              variant='danger'
              onClick={() => {
                clearCurrent();
                setTransaction({
                  date: '',
                  type: '',
                  trnCategory: '',
                  trnBank: '',
                  description: '',
                  amount: null
                });
                handleClose();
              }}
            >
              Close
            </Button>
            <Button size='lg' type='submit' variant='success'>
              {current ? 'Update Transaction' : 'Submit'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TransactionForm;
