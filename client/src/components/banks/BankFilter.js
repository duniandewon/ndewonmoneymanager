import React, { Fragment, useContext, useRef, useEffect } from 'react';

/** Bank context */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BankFilter = ({ handleShow }) => {
  const { filtered, filter, clearFilter } = useContext(ndewonContext);

  const text = useRef('');

  const onChange = e => {
    text.current.value !== '' ? filter(e.target.value) : clearFilter();
  };

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, []);

  return (
    <Fragment>
      <Col>
        <Form.Group>
          <Form.Control
            as='input'
            ref={text}
            placeholder='Search'
            onChange={onChange}
          />
        </Form.Group>
      </Col>
      <Col xs='auto'>
        <Button variant='primary' size='lg' onClick={handleShow}>
          New Bank
        </Button>
      </Col>
    </Fragment>
  );
};

export default BankFilter;
