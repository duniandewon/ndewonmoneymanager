import React, { Fragment, useState, useContext } from 'react';

/** Alert context */
import alertContext from '../../context/alert/alertContext';

/** Bootstrap components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });

  const { setAlert } = useContext(alertContext);

  const { name, email, password, confPassword } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password !== confPassword) {
      setAlert("Passwords don't match", 'danger');
    } else {
      console.log(user);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center'>
        Create <span className='text-primary'>Account</span>
      </h1>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
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
            <Button variant='success' type='submit' size='lg' block>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Register;
