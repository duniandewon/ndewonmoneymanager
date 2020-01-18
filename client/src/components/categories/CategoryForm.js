import React, { Fragment, useState, useContext, useEffect } from 'react';

/** Category context */
import ndewonContext from '../../context/ndewon/ndewonContext';

/** Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CategoryForm = ({ show, handleClose }) => {
  const [category, setCategory] = useState({ name: '' });

  const { addCategory, updateCategory, current, clearCurrent } = useContext(
    ndewonContext
  );

  const handleHide = () => {
    handleClose();
    clearCurrent();
  };

  const onChange = e =>
    setCategory({ ...category, [e.target.id]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addCategory(category);
    } else {
      updateCategory(category);
      clearCurrent();
    }

    setCategory({ name: '' });
    handleClose();
  };

  useEffect(() => {
    current ? setCategory(current) : setCategory({ name: '' });
  }, [ndewonContext, current]);

  return (
    <Fragment>
      <Modal show={show} onHide={handleHide} centered>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {current ? 'Edit Category' : 'Create New Category'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} controlId='name'>
              <Form.Label column sm='2'>
                Name:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as='input'
                  placeholder='Name'
                  defaultValue={category.name}
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
                setCategory({ name: '' });
                handleClose();
              }}
            >
              Close
            </Button>
            <Button size='lg' type='submit' variant='success'>
              {current ? 'Update category' : 'Submit'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CategoryForm;
