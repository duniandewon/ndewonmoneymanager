import React, { Fragment, useState } from 'react';

/** Bootstrap components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });

  const { name, email, password, confPassword } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  return (
    <Fragment>
      <h1 className='text-center'>
        Create <span className='text-primary'>Account</span>
      </h1>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Form>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as='input'
                type='text'
                defaultValue={name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                as='input'
                type='email'
                defaultValue={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                as='input'
                type='password'
                defaultValue={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='confPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                as='input'
                type='password'
                defaultValue={confPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Register;
