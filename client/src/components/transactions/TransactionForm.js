import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Context API */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TransactionForm = ({ show, handleClose }) => {
  const [transaction, setTransaction] = useState({
    date: null,
    type: '',
    trnCategory: '',
    trnBank: null,
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
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const bank = banks.filter(
      bank => bank.name === transaction.trnBank && bank
    )[0];

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
      trnCategory: '',
      trnBank: '',
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
          trnCategory: '',
          trnBank: '',
          description: '',
          amount: null
        });
  }, [ndewonContext, current]);

  const { date, type, trnBank, trnCategory, amount, description } = transaction;

  return (
    <Fragment>
      <Modal show={show} onHide={handleHide} centered>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {current ? 'Edit Transaction' : 'Add New Transaction'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId='date'>
              <Form.Label column sm={3}>
                Date:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='input'
                  type='date'
                  defaultValue={date}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='type'>
              <Form.Label column sm={3}>
                Type:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='select'
                  defaultValue={type}
                  onChange={onChange}
                  required
                >
                  <option>Choose One</option>
                  <option value='income'>Income</option>
                  <option value='expenses'>Expenses</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='trnCategory'>
              <Form.Label column sm={3}>
                Category:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='select'
                  defaultValue={trnCategory}
                  onChange={onChange}
                  required
                >
                  <option>Choose One</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='description'>
              <Form.Label column sm={3}>
                Description:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='input'
                  placeholder='description'
                  defaultValue={description}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='amount'>
              <Form.Label column sm={3}>
                Amount:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='input'
                  type='number'
                  placeholder='amount'
                  defaultValue={amount}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='trnBank'>
              <Form.Label column sm={3}>
                Bank:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='select'
                  defaultValue={trnBank}
                  onChange={onChange}
                >
                  <option>Choose One</option>
                  {banks.map(bank => (
                    <option key={bank.id} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
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
