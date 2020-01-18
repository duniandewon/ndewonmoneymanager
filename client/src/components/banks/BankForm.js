import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Banks context */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BankForm = ({ show, handleClose }) => {
  const [bank, setBank] = useState({
    name: '',
    accountNumber: '',
    accountHolder: '',
    balance: null
  });

  const { addBank, updateBank, current, clearCurrent } = useContext(
    ndewonContext
  );

  const handleHide = () => {
    handleClose();
    clearCurrent();
  };

  const onChange = e => {
    setBank({
      ...bank,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addBank(bank);
    } else {
      updateBank(bank);
      clearCurrent();
    }

    setBank({
      name: '',
      accountNumber: '',
      accountHolder: '',
      balance: null
    });
    handleClose();
  };

  useEffect(() => {
    current
      ? setBank(current)
      : setBank({
          name: '',
          accountNumber: '',
          accountHolder: '',
          balance: null
        });
  }, [ndewonContext, current]);

  const { name, accountNumber, accountHolder, balance } = bank;

  return (
    <Fragment>
      <Modal show={show} onHide={handleHide} centered>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{current ? 'Edit Bank' : 'Add New Bank'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId='name'>
              <Form.Label column sm='4'>
                Name:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as='input'
                  placeholder='BCA'
                  defaultValue={name}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='accountNumber'>
              <Form.Label column sm='4'>
                Account Number:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as='input'
                  type='number'
                  placeholder='1234567890'
                  defaultValue={accountNumber}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='accountHolder'>
              <Form.Label column sm='4'>
                Account Holder:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as='input'
                  placeholder='John Doe'
                  defaultValue={accountHolder}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='balance'>
              <Form.Label column sm='4'>
                Balance:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as='input'
                  type='number'
                  placeholder='$1000'
                  defaultValue={balance}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size='lg'
              variant='danger'
              onClick={() => {
                clearCurrent();
                setBank({
                  name: '',
                  accountNumber: '',
                  accountHolder: '',
                  balance: null
                });
                handleClose();
              }}
            >
              Close
            </Button>
            <Button size='lg' type='submit' variant='success'>
              {current ? 'Update Bank' : 'Submit'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default BankForm;
