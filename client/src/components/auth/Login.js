import React, { Fragment, useState } from 'react';

/** Bootstrap components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };
  return (
    <Fragment>
      <h1 className='text-center'>
        User <span className='text-primary'>Login</span>
      </h1>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Form>
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
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
