import React, { Fragment, useContext, useRef, useEffect } from 'react';

/** Category context */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootsrap Components */
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CategoryFilter = ({ handleShow }) => {
  const { filtered, filter, clearFilter } = useContext(ndewonContext);

  const text = useRef('');

  const onChange = e => {
    if (text.current.value !== '') {
      filter(e.target.value);
    } else {
      clearFilter();
    }
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
          New Category
        </Button>
      </Col>
    </Fragment>
  );
};

export default CategoryFilter;
